<div align="center">
  <img src="assets/skills-all-logo.svg" alt="skills-all logo" width="180" />
  <h1>skills-all</h1>
  <p><strong>一套面向现代工作、学习、创作与决策场景的 AI Skills 集合。</strong></p>
  <p>
    <img alt="skills" src="https://img.shields.io/badge/skills-17-111111?style=for-the-badge" />
    <img alt="package" src="https://img.shields.io/badge/npm-%40fce%2Fskillforge-CB3837?style=for-the-badge" />
    <img alt="license" src="https://img.shields.io/badge/license-MIT-16a34a?style=for-the-badge" />
  </p>
  <p>
    中文 · <a href="./README-EN.md">English</a>
  </p>
</div>

## 快速开始

使用 npm 全局安装：

```bash
npm install -g @fce/skillforge
skillforge install
```

直接运行，无需全局安装：

```bash
npx @fce/skillforge install
pnpm dlx @fce/skillforge install
```

默认会安装到当前目录下的 `.skills/`，并进入更完整的交互流程：

1. 先选择 `中文 / English`
2. 再选择 `下载全部 / 自定义下载`
3. 如果选择自定义，默认一个都不选，再进入勾选式技能选择界面
4. 安装完成后，提示用户“让 AI 使用该目录中的文件即可”

安装到自定义目录：

```bash
skillforge install --target ~/.codex/skills
```

更新已安装的 skills：

```bash
skillforge update --target ~/.codex/skills
```

跳过交互，直接安装全部 skills：

```bash
skillforge install --all
```

查看当前打包的 skill 列表：

```bash
skillforge list
```

## 项目简介

`skills-all` 是一个可直接复用、可持续更新、可独立拆分发布的 AI Skill 仓库。

它不是为了做“角色扮演式提示词合集”，而是把一组有明确使用边界、清晰触发条件、可执行输出结构的 skills 整理成一个统一项目。每个 skill 都是独立文件夹，方便你后续：

- 直接本地安装使用
- 继续扩展和迭代
- 独立拆仓发布
- 打包成 npm 工具分发

## 设计原则

1. 实用优先  
   每个 skill 都服务真实任务，而不是只停留在人设或口号。

2. 现代语境  
   传统题材、人物方法论、创作类主题都尽量转译为现代场景下可用的框架。

3. 有边界  
   医疗、金融、实时地图、在世创作者风格等高风险方向，都做了明确约束。

4. 易迁移  
   所有 skills 保持文件夹级独立，适合后续单独维护、单独发布。

## 技能列表

| 文件夹 | 方向 |
|---|---|
| `中国顶级厨师` | 中式烹饪、风味设计、菜单结构与出品思维 |
| `全球旅行计划` | 国际旅行规划、预算、节奏控制与风险预案 |
| `中医` | 整合式中医视角与现代医学边界 |
| `日常疾病治疗` | 常见病分诊与循证自我护理 |
| `全球首富进阶` | 财富系统、复利、商业杠杆与反骗局框架 |
| `草根逆袭` | 低资源逆袭、技能跃迁、作品集与现金流路径 |
| `导演` | 电影、广告、短内容导演方法与执行拆解 |
| `AI高中` | 面向高中阶段的 AI 辅学与学习方法设计 |
| `AI大学` | 面向大学阶段的 AI 学习、科研与项目协作 |
| `风水大师` | 将风水转译为空间优化与行为设计 |
| `薛之谦` | 公开风格特征抽象下的原创情绪流行创作框架 |
| `林俊杰` | 原创流行情歌与旋律表达框架 |
| `周杰伦` | 原创华语融合流行创作框架 |
| `方文山作词作曲` | 东方意象型歌词与作词作曲联动框架 |
| `高德地图` | 高德地图 / Amap 场景下的位置服务与产品思维 |
| `马斯克` | 使命驱动、第一性原理、制造与规模化方法论 |
| `爱因斯坦` | 思想实验、本质理解与直觉优先解释框架 |

## 仓库结构

```text
skills-all/
├── assets/
│   └── skills-all-logo.svg
├── npm-tool/
│   ├── package.json
│   ├── bin/
│   ├── lib/
│   ├── scripts/
│   └── skills/
├── 中国顶级厨师/
│   └── SKILL.md
├── 全球旅行计划/
│   └── SKILL.md
├── ...
├── 马斯克/
│   ├── SKILL.md
│   └── references/
│       └── methodology.md
├── README.md
├── README-EN.md
└── LICENSE
```

## npm 工具

仓库内的 [npm-tool](./npm-tool) 是对应的 npm CLI 包源码，包名为：

```bash
@fce/skillforge
```

这个工具会在发布前自动同步仓库中的最新 skills，并提供：

- `skillforge install`
- `skillforge update`
- `skillforge list`

安装体验默认是交互式的：

- 方向键移动
- 空格键勾选
- `A` 全选 / 取消全选
- 回车确认安装
- 默认目标目录为当前目录的 `.skills/`
- 首先选择中英文语言
- 然后选择“全部下载”或“自定义下载”

也就是说，后续你只要更新这个仓库，再发布 npm 包，用户拿到的就是同步后的最新 skill 集合。

## 安全说明

部分 skills 有意设置了更严格的边界：

- `中医`、`日常疾病治疗` 不是正式医疗诊断或治疗替代方案。
- `高德地图` 不能编造实时导航、路况或营业信息。
- `薛之谦`、`林俊杰`、`周杰伦`、`方文山作词作曲` 只允许做高层风格抽象后的原创创作，不直接模仿在世创作者。
- `马斯克`、`爱因斯坦` 是方法论 skill，不是假扮人物本人。

## 许可证

本仓库使用 [MIT License](./LICENSE)。

你可以：

- 商用
- 修改
- 分发
- 再授权
- 集成到自己的项目里

前提是保留原始许可证声明。

## 适合谁

这个仓库适合以下场景：

- 想把一组 skills 统一管理、统一发布的人
- 想通过 npm 一键安装 skills 的用户
- 需要持续迭代 skill 内容的人
- 准备把 skill 仓库做成产品雏形的人

---

<div align="center">
  想直接体验：<code>npm install -g @fce/skillforge</code>
</div>
