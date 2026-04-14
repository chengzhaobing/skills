const fs = require("fs");
const os = require("os");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");
const packagedSkillsDir = path.join(packageRoot, "skills");

function resolveDefaultTarget(cwd = process.cwd()) {
  return path.join(cwd, ".skills");
}

function resolveCodexTarget() {
  const codexHome = process.env.CODEX_HOME;
  if (codexHome) {
    return path.join(codexHome, "skills");
  }
  return path.join(os.homedir(), ".codex", "skills");
}

function listSkills() {
  if (!fs.existsSync(packagedSkillsDir)) {
    return [];
  }

  return fs
    .readdirSync(packagedSkillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "zh-CN"));
}

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

function installSkills({ targetDir, overwrite, only = [] }) {
  if (!fs.existsSync(packagedSkillsDir)) {
    throw new Error("No packaged skills found. Run `npm run sync-skills` before publishing.");
  }

  fs.mkdirSync(targetDir, { recursive: true });

  const allowed = new Set(only.length ? only : listSkills());
  const copied = [];
  const skipped = [];
  for (const skillName of listSkills()) {
    if (!allowed.has(skillName)) {
      continue;
    }

    const source = path.join(packagedSkillsDir, skillName);
    const target = path.join(targetDir, skillName);

    if (fs.existsSync(target)) {
      if (!overwrite) {
        skipped.push(skillName);
        continue;
      }
      fs.rmSync(target, { recursive: true, force: true });
    }

    copyRecursive(source, target);
    copied.push(skillName);
  }

  return { copied, skipped };
}

module.exports = {
  installSkills,
  listSkills,
  resolveCodexTarget,
  resolveDefaultTarget
};
