<div align="center">
  <img src="assets/skills-all-logo.svg" alt="skills-all logo" width="180" />
  <h1>skills-all</h1>
  <p><strong>A curated AI skill collection for modern work, learning, creativity, and decision-making.</strong></p>
  <p>
    <img alt="skills" src="https://img.shields.io/badge/skills-17-111111?style=for-the-badge" />
    <img alt="package" src="https://img.shields.io/badge/npm-%40fce%2Fskillforge-CB3837?style=for-the-badge" />
    <img alt="license" src="https://img.shields.io/badge/license-MIT-16a34a?style=for-the-badge" />
  </p>
  <p>
    <a href="./README.md">中文</a> · English
  </p>
</div>

## Quick Start

Install globally with npm:

```bash
npm install -g @fce/skillforge
skillforge install
```

Run directly without global install:

```bash
npx @fce/skillforge install
pnpm dlx @fce/skillforge install
```

Install into a custom target directory:

```bash
skillforge install --target ~/.codex/skills
```

Update previously installed skills:

```bash
skillforge update --target ~/.codex/skills
```

List packaged skills:

```bash
skillforge list
```

## Overview

`skills-all` is a reusable, maintainable, and publishable AI skill repository.

It is not just a persona prompt collection. The goal is to package standalone skills with clear trigger conditions, useful output structures, and explicit boundaries where safety or recency matters. Every skill lives in its own folder so the collection can be installed, extended, split, or republished later.

## Design Principles

1. Practical first  
   Each skill is meant to help solve real tasks, not just simulate a character.

2. Modern framing  
   Traditional themes, public-figure frameworks, and creative styles are translated into forms that make sense in current workflows.

3. Guardrails included  
   Medical, finance, real-time map, and living-artist areas include intentional boundaries.

4. Portable structure  
   Every skill stays folder-independent, which makes future maintenance and separate publishing easier.

## Skill List

| Folder | Focus |
|---|---|
| `中国顶级厨师` | Chinese culinary design, flavor architecture, menu structure, and execution |
| `全球旅行计划` | International travel planning, budgeting, pacing, and risk-aware itineraries |
| `中医` | Integrative traditional Chinese medicine framing with modern medical boundaries |
| `日常疾病治疗` | Everyday illness triage and evidence-aware self-care |
| `全球首富进阶` | Wealth systems, compounding, business leverage, and anti-scam logic |
| `草根逆袭` | Low-resource mobility through skills, proof, and cash-flow strategy |
| `导演` | Directing frameworks for film, ads, and short-form visual storytelling |
| `AI高中` | AI-assisted learning design for high school students |
| `AI大学` | AI-assisted study, research, and project workflows for university |
| `风水大师` | Feng shui translated into practical spatial and behavioral design |
| `薛之谦` | Original emotional pop-writing via high-level public trait abstraction |
| `林俊杰` | Original melodic pop-ballad framework |
| `周杰伦` | Original Mandopop fusion songwriting framework |
| `方文山作词作曲` | East Asian imagery-driven lyric and songwriting framework |
| `高德地图` | Amap-oriented location service and product thinking |
| `马斯克` | Mission, first-principles, manufacturing, and scale methodology |
| `爱因斯坦` | Thought experiments, essence-first explanation, and intuition-led understanding |

## Repository Structure

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

## npm Package

The [npm-tool](./npm-tool) folder contains the source for the npm CLI package:

```bash
@fce/skillforge
```

The package is designed to stay aligned with this repository and provides:

- `skillforge install`
- `skillforge update`
- `skillforge list`

Before publishing, it syncs the latest skill folders from the repo into the package, so npm releases follow the repository state.

## Safety Notes

Some skills intentionally include stricter boundaries:

- `中医` and `日常疾病治疗` are not substitutes for formal medical diagnosis or treatment.
- `高德地图` should not fabricate live navigation, traffic, or business data.
- `薛之谦`, `林俊杰`, `周杰伦`, and `方文山作词作曲` are for original creative work through high-level abstraction, not direct imitation of living creators.
- `马斯克` and `爱因斯坦` are methodology skills, not fake roleplay of the real person.

## License

This repository is released under the [MIT License](./LICENSE).

You may:

- use it commercially
- modify it
- distribute it
- sublicense it
- integrate it into your own work

The only requirement is preserving the license notice.

## Who This Is For

This repository is a good fit if you want to:

- manage multiple skills in one place
- distribute them through npm
- keep skills versioned and updateable
- turn a skill repository into a more productized distribution flow

---

<div align="center">
  Want the fastest path? <code>npm install -g @fce/skillforge</code>
</div>
