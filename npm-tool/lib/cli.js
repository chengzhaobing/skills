const { installSkills, listSkills, resolveDefaultTarget } = require("./install");

const BANNER = String.raw`
  ____  __ __  ____  __    __       ______   ____  ____   ____  ______
 / ___||  |  ||    ||  |  |  |     |      | /    ||    \ |    ||      |
(   \_ |  |  | |  | |  |  |  |     |      ||  o  ||  _  | |  | |      |
 \__  ||  |  | |  | |  |  |  |___  |_|  |_||     ||  |  | |  | |_|  |_|
 /  \ ||  :  | |  | |  :  |      |   |  |  |  _  ||  |  | |  |   |  |
 \    ||     | |  |  \   /|      |   |  |  |  |  ||  |  | |  |   |  |
  \___| \__,_||____|  \_/ |______|   |__|  |__|__||__|__||____|  |__|
`;

function parseArgs(argv) {
  const args = {
    command: "install",
    target: resolveDefaultTarget(),
    force: false
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
    if (token === "--help" || token === "-h") {
      args.command = "help";
      continue;
    }
    throw new Error(`Unknown argument: ${token}`);
  }

  return args;
}

function printHelp() {
  console.log(BANNER);
  console.log("skillforge");
  console.log("\nInstall and update the skills-all collection.\n");
  console.log("Usage:");
  console.log("  skillforge install [--target <dir>] [--force]");
  console.log("  skillforge update [--target <dir>]");
  console.log("  skillforge list");
  console.log("  skillforge help");
  console.log("\nExamples:");
  console.log("  skillforge install");
  console.log("  skillforge install --target ~/.codex/skills");
  console.log("  skillforge update --target %USERPROFILE%\\.codex\\skills");
}

async function run(argv) {
  const args = parseArgs(argv);

  if (args.command === "help") {
    printHelp();
    return;
  }

  if (args.command === "list") {
    console.log(BANNER);
    const skills = listSkills();
    console.log(`Found ${skills.length} packaged skills:\n`);
    for (const skill of skills) {
      console.log(`- ${skill}`);
    }
    return;
  }

  if (args.command === "install" || args.command === "update") {
    console.log(BANNER);
    console.log(`[skillforge] target: ${args.target}`);
    const summary = installSkills({
      targetDir: args.target,
      overwrite: args.command === "update" || args.force
    });
    console.log(`[skillforge] copied: ${summary.copied.join(", ")}`);
    console.log(`[skillforge] skipped: ${summary.skipped.join(", ") || "none"}`);
    console.log("[skillforge] done");
    return;
  }

  throw new Error(`Unknown command: ${args.command}`);
}

module.exports = {
  run
};
