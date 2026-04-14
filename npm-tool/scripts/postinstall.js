const ansi = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  green: "\x1b[32m"
};

const title = [
  "   _____ __ ________    __    _________  ____  ____  _________ ",
  "  / ___// //_/  _/ /   / /   / ____/ __ \\/ __ \\/ __ \\/ ____/ _ \\",
  "  \\__ \\/ ,<  / // /   / /   / /_  / / / / /_/ / / / / / __/  __/",
  " ___/ / /| |_/ // /___/ /___/ __/ / /_/ / _, _/ /_/ / /_/ /\\___/ ",
  "/____/_/ |_/___/_____/_____/_/    \\____/_/ |_|\\____/\\____/       "
];

for (let row = 0; row < title.length; row += 1) {
  console.log(`${row === 0 ? ansi.bold : ansi.cyan}${title[row]}${ansi.reset}`);
}

console.log(`${ansi.bold}${ansi.cyan}\nThanks for installing @fce/skillforge${ansi.reset}`);
console.log(`${ansi.green}Run: skillforge install${ansi.reset}`);
console.log(`${ansi.yellow}默认流程：先选 中文 / English，再选 全部下载 / 自定义下载。${ansi.reset}`);
