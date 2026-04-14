const readline = require("readline");
const { installSkills, listSkills, resolveDefaultTarget } = require("./install");

const ansi = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m",
  red: "\x1b[31m",
  white: "\x1b[37m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m"
};

const TITLE = [
  "   _____ __ ________    __    _________  ____  ____  _________ ",
  "  / ___// //_/  _/ /   / /   / ____/ __ \\/ __ \\/ __ \\/ ____/ _ \\",
  "  \\__ \\/ ,<  / // /   / /   / /_  / / / / /_/ / / / / / __/  __/",
  " ___/ / /| |_/ // /___/ /___/ __/ / /_/ / _, _/ /_/ / /_/ /\\___/ ",
  "/____/_/ |_/___/_____/_____/_/    \\____/_/ |_|\\____/\\____/       "
];

const localePack = {
  zh: {
    languageTitle: "请选择语言",
    actionTitle: "请选择下载方式",
    actionAll: "下载全部 Skills",
    actionCustom: "自定义选择 Skills",
    pickerTitle: "请选择要安装的 Skills",
    pickerHint: "↑/↓ 移动  Space 勾选  A 全选/取消全选  Enter 确认  Q 退出",
    summaryTarget: "安装目录",
    summarySelected: "已选择",
    summaryCopied: "已复制",
    summarySkipped: "已跳过",
    doneTitle: "安装完成",
    doneBody: "让 AI 使用该目录中的对应文件即可。",
    doneTip: "默认安装目录为当前目录下的 .skills",
    noSelection: "未选择任何 skill，已取消安装。",
    cancelled: "安装已取消。",
    helpTitle: "交互式 Skills 安装器",
    helpUsage: "用法",
    helpDefaults: "默认安装到当前目录下的 .skills",
    helpExamples: "示例",
    listTitle: "当前打包的 skills",
    installTag: "准备安装",
    updateTag: "准备更新"
  },
  en: {
    languageTitle: "Choose language",
    actionTitle: "Choose install mode",
    actionAll: "Install all skills",
    actionCustom: "Custom selection",
    pickerTitle: "Select skills to install",
    pickerHint: "↑/↓ Move  Space Toggle  A Toggle all  Enter Confirm  Q Quit",
    summaryTarget: "Target",
    summarySelected: "Selected",
    summaryCopied: "Copied",
    summarySkipped: "Skipped",
    doneTitle: "Install completed",
    doneBody: "Point your AI to the files in this directory to use them.",
    doneTip: "Default target is .skills in the current directory",
    noSelection: "No skills selected. Installation cancelled.",
    cancelled: "Installation cancelled.",
    helpTitle: "Interactive skills installer",
    helpUsage: "Usage",
    helpDefaults: "Default target is ./.skills in the current directory",
    helpExamples: "Examples",
    listTitle: "Packaged skills",
    installTag: "Preparing install",
    updateTag: "Preparing update"
  }
};

function colorize(text, color) {
  return `${color}${text}${ansi.reset}`;
}

function renderBrand(subtitle) {
  const lines = TITLE.map((line, index) =>
    colorize(line, index === 0 ? ansi.bold : ansi.cyan)
  );
  console.log(lines.join("\n"));
  console.log(colorize(`\n ${subtitle}\n`, ansi.bold));
}

function rule() {
  console.log(colorize("─".repeat(88), ansi.dim));
}

function clearScreen() {
  process.stdout.write("\x1b[2J\x1b[0f");
}

function box(title, lines) {
  const content = [title, ...lines];
  const width = Math.max(...content.map((line) => line.length), 40);
  console.log(colorize(`┌${"─".repeat(width + 2)}┐`, ansi.dim));
  for (const line of content) {
    console.log(colorize(`│ ${line.padEnd(width)} │`, ansi.dim));
  }
  console.log(colorize(`└${"─".repeat(width + 2)}┘`, ansi.dim));
}

function clampPreview(items, locale) {
  if (!items.length) {
    return locale === "zh" ? "未选择" : "Nothing selected";
  }
  const preview = items.slice(0, 4).join(", ");
  return items.length > 4 ? `${preview} ...` : preview;
}

function parseArgs(argv) {
  const args = {
    command: "install",
    target: resolveDefaultTarget(process.cwd()),
    force: false,
    all: false,
    yes: false,
    lang: null
  };

  const rest = [...argv];
  if (rest[0] && !rest[0].startsWith("-")) {
    args.command = rest.shift();
  }

  while (rest.length) {
    const token = rest.shift();
    if (token === "--target" || token === "-t") {
      args.target = rest.shift();
      continue;
    }
    if (token === "--force" || token === "-f") {
      args.force = true;
      continue;
    }
    if (token === "--all" || token === "-a") {
      args.all = true;
      continue;
    }
    if (token === "--yes" || token === "-y") {
      args.yes = true;
      continue;
    }
    if (token === "--lang") {
      args.lang = rest.shift();
      continue;
    }
    if (token === "--help" || token === "-h") {
      args.command = "help";
      continue;
    }
    throw new Error(`Unknown argument: ${token}`);
  }

  return args;
}

function isInteractive() {
  return Boolean(process.stdin.isTTY && process.stdout.isTTY);
}

function printHelp() {
  clearScreen();
  renderBrand("skillforge");
  rule();
  console.log("Interactive skills installer / 交互式 Skills 安装器\n");
  console.log("Usage:");
  console.log("  skillforge install [--target <dir>] [--all] [--yes] [--lang zh|en]");
  console.log("  skillforge update [--target <dir>] [--all] [--yes] [--lang zh|en]");
  console.log("  skillforge list");
  console.log("  skillforge help\n");
  console.log("Defaults:");
  console.log("  install target -> ./.skills");
  console.log("  flow -> language -> all/custom -> selection\n");
  console.log("Examples:");
  console.log("  skillforge install");
  console.log("  skillforge install --all");
  console.log("  skillforge install --target ./.skills --lang zh");
}

function cleanupKeypress(onKeyPress) {
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(false);
  }
  process.stdin.removeListener("keypress", onKeyPress);
  if (typeof process.stdin.pause === "function") {
    process.stdin.pause();
  }
}

function selectMenu({ title, options, locale, subtitle }) {
  return new Promise((resolve, reject) => {
    let cursor = 0;
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }

    const render = () => {
      clearScreen();
      renderBrand(subtitle);
      rule();
      console.log(colorize(`${title}\n`, ansi.bold));
      options.forEach((option, index) => {
        const active = index === cursor;
        const marker = active ? colorize("▶", ansi.yellow) : " ";
        const badge = active ? colorize("◆", ansi.green) : colorize("◇", ansi.dim);
        const text = active ? colorize(option.label, ansi.bold) : option.label;
        console.log(`${marker} ${badge} ${text}`);
        if (active && option.description) {
          console.log(`   ${colorize(option.description, ansi.dim)}`);
        }
      });
      console.log(`\n${colorize(locale === "zh" ? "Enter 确认，Q 退出" : "Press Enter to confirm, Q to quit", ansi.dim)}`);
    };

    const onKeyPress = (_, key) => {
      if (!key) {
        return;
      }
      if (key.name === "up") {
        cursor = cursor === 0 ? options.length - 1 : cursor - 1;
        render();
        return;
      }
      if (key.name === "down") {
        cursor = cursor === options.length - 1 ? 0 : cursor + 1;
        render();
        return;
      }
      if (key.name === "return") {
        cleanupKeypress(onKeyPress);
        clearScreen();
        resolve(options[cursor].value);
        return;
      }
      if (key.name === "q" || (key.ctrl && key.name === "c")) {
        cleanupKeypress(onKeyPress);
        clearScreen();
        reject(new Error(localePack[locale].cancelled));
      }
    };

    process.stdin.on("keypress", onKeyPress);
    render();
  });
}

function pickSkills({ skills, locale, target }) {
  return new Promise((resolve, reject) => {
    const text = localePack[locale];
    const selected = new Set();
    let cursor = 0;

    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }

    const render = () => {
      clearScreen();
      renderBrand("skillforge");
      box(
        text.pickerTitle,
        [
          `${text.summaryTarget}: ${target}`,
          text.pickerHint,
          `${text.summarySelected}: ${selected.size}/${skills.length}`,
          `${locale === "zh" ? "当前摘要" : "Current selection"}: ${clampPreview([...selected], locale)}`
        ]
      );
      console.log("");
      skills.forEach((skill, index) => {
        const active = index === cursor;
        const prefix = active ? colorize("▶", ansi.yellow) : " ";
        const mark = selected.has(skill)
          ? colorize("[✓]", ansi.green)
          : colorize("[ ]", ansi.dim);
        const label = active ? colorize(skill, ansi.bold) : skill;
        const row = `${prefix} ${mark} ${label}`;
        console.log(row);
      });
      console.log("");
      rule();
      console.log(
        colorize(
          locale === "zh"
            ? "提示：自定义模式默认不选中任何 skill，请按 Space 逐个勾选。"
            : "Tip: custom mode starts with nothing selected. Press Space to choose skills.",
          ansi.cyan
        )
      );
    };

    const onKeyPress = (_, key) => {
      if (!key) {
        return;
      }
      if (key.name === "up") {
        cursor = cursor === 0 ? skills.length - 1 : cursor - 1;
        render();
        return;
      }
      if (key.name === "down") {
        cursor = cursor === skills.length - 1 ? 0 : cursor + 1;
        render();
        return;
      }
      if (key.name === "space") {
        const skill = skills[cursor];
        if (selected.has(skill)) {
          selected.delete(skill);
        } else {
          selected.add(skill);
        }
        render();
        return;
      }
      if (key.name === "a") {
        if (selected.size === skills.length) {
          selected.clear();
        } else {
          skills.forEach((skill) => selected.add(skill));
        }
        render();
        return;
      }
      if (key.name === "return") {
        cleanupKeypress(onKeyPress);
        clearScreen();
        resolve(skills.filter((skill) => selected.has(skill)));
        return;
      }
      if (key.name === "q" || (key.ctrl && key.name === "c")) {
        cleanupKeypress(onKeyPress);
        clearScreen();
        reject(new Error(text.cancelled));
      }
    };

    process.stdin.on("keypress", onKeyPress);
    render();
  });
}

async function chooseLanguage(args) {
  if (args.lang === "zh" || args.lang === "en") {
    return args.lang;
  }
  if (!isInteractive() || args.yes) {
    return "en";
  }

  return selectMenu({
    title: "Language / 语言",
    locale: "en",
    subtitle: "skillforge",
    options: [
      { label: "中文", description: "使用中文交互安装 skills", value: "zh" },
      { label: "English", description: "Install skills with English prompts", value: "en" }
    ]
  });
}

async function chooseMode(args, locale) {
  if (args.all || args.yes || !isInteractive()) {
    return "all";
  }

  const text = localePack[locale];
  return selectMenu({
    title: text.actionTitle,
    locale,
    subtitle: "skillforge",
    options: [
      {
        label: text.actionAll,
        description:
          locale === "zh"
            ? "一键安装全部 skills 到当前目录的 .skills"
            : "Install every packaged skill into ./.skills"
      ,
        value: "all"
      },
      {
        label: text.actionCustom,
        description:
          locale === "zh"
            ? "进入勾选界面，自定义安装你需要的 skills"
            : "Open the multi-select picker and install only what you want",
        value: "custom"
      }
    ]
  });
}

function printSummary({ locale, target, selected, summary }) {
  const text = localePack[locale];
  clearScreen();
  renderBrand("skillforge");
  box(text.doneTitle, [
    `${text.summaryTarget}: ${target}`,
    `${text.summarySelected}: ${selected.join(", ")}`,
    `${text.summaryCopied}: ${summary.copied.join(", ") || "none"}`,
    `${text.summarySkipped}: ${summary.skipped.join(", ") || "none"}`
  ]);
  console.log("");
  console.log(colorize(text.doneBody, ansi.green));
  console.log(colorize(text.doneTip, ansi.dim));
  console.log(
    colorize(
      locale === "zh"
        ? `你现在可以让 AI 直接读取这个目录中的 skills： ${target}`
        : `You can now point your AI to the installed skills in: ${target}`,
      ansi.cyan
    )
  );
}

async function run(argv) {
  const args = parseArgs(argv);

  if (args.command === "help") {
    printHelp();
    return;
  }

  if (args.command === "list") {
    clearScreen();
    renderBrand("skillforge");
    rule();
    const skills = listSkills();
    console.log(colorize(`Packaged skills / 当前打包的 skills: ${skills.length}\n`, ansi.cyan));
    for (const skill of skills) {
      console.log(`- ${skill}`);
    }
    return;
  }

  if (args.command !== "install" && args.command !== "update") {
    throw new Error(`Unknown command: ${args.command}`);
  }

  const locale = await chooseLanguage(args);
  const text = localePack[locale];
  const target = args.target;
  const skills = listSkills();

  if (!skills.length) {
    throw new Error("No packaged skills found. Run `npm run sync-skills` before publishing.");
  }

  const mode = await chooseMode(args, locale);
  const selected =
    mode === "all" ? skills : await pickSkills({ skills, locale, target });

  if (!selected.length) {
    console.log(colorize(text.noSelection, ansi.yellow));
    return;
  }

  clearScreen();
  renderBrand("skillforge");
  console.log(colorize(`${args.command === "update" ? text.updateTag : text.installTag}\n`, ansi.cyan));
  console.log(`${colorize(text.summaryTarget, ansi.bold)}: ${target}`);
  console.log(`${colorize(text.summarySelected, ansi.bold)}: ${selected.join(", ")}\n`);

  const summary = installSkills({
    targetDir: target,
    overwrite: args.command === "update" || args.force,
    only: selected
  });

  printSummary({ locale, target, selected, summary });
}

module.exports = {
  run
};
