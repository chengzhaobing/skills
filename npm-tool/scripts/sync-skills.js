const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..");
const packageRoot = path.resolve(__dirname, "..");
const outDir = path.join(packageRoot, "skills");
const excluded = new Set([".git", "assets", "npm-tool", "node_modules"]);

function copyRecursive(source, target) {
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      copyRecursive(path.join(source, entry), path.join(target, entry));
    }
    return;
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function isSkillFolder(dirName) {
  const folder = path.join(repoRoot, dirName);
  return fs.existsSync(path.join(folder, "SKILL.md"));
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const skillDirs = fs
  .readdirSync(repoRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => !excluded.has(name))
  .filter(isSkillFolder)
  .sort((a, b) => a.localeCompare(b, "zh-CN"));

for (const skillDir of skillDirs) {
  copyRecursive(path.join(repoRoot, skillDir), path.join(outDir, skillDir));
}

console.log(`[skillforge] synced ${skillDirs.length} skills into npm-tool/skills`);
