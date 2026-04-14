# @fce/skillforge

`@fce/skillforge` is the npm CLI package for the `skills-all` repository.

It packages the current skill folders and installs them into your local Codex skills directory.

## Install

```bash
npm install -g @fce/skillforge
```

## Use Without Installing Globally

```bash
npx @fce/skillforge install
pnpm dlx @fce/skillforge install
```

## Commands

```bash
skillforge install
skillforge install --target ~/.codex/skills
skillforge update --target ~/.codex/skills
skillforge list
```

## Publish Flow

Before publishing, sync the current repository skills into the package:

```bash
npm run sync-skills
```

`prepack` runs this automatically during `npm publish`, so the package stays aligned with the latest skill folders in the repository.
