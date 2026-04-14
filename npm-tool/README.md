# @fce/skillforge

`@fce/skillforge` is the npm CLI package for the `skills-all` repository.

It packages the current skill folders and installs them with a colorful interactive terminal picker.

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
skillforge install --target ./.skills
skillforge install --all
skillforge update --target ~/.codex/skills --all
skillforge list
```

## Interactive Flow

When `skillforge install` starts, the flow is:

1. choose `中文` or `English`
2. choose `Install all` or `Custom selection`
3. if custom mode is selected, start with nothing selected and choose skills manually
4. install into the current directory `./.skills` by default
5. show a final message telling the user to point their AI at the installed files

Controls:

- `↑ / ↓` move
- `Space` toggle a skill
- `A` toggle all
- `Enter` confirm
- `Q` quit

## Publish Flow

Before publishing, sync the current repository skills into the package:

```bash
npm run sync-skills
```

`prepack` runs this automatically during `npm publish`, so the package stays aligned with the latest skill folders in the repository.
