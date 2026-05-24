# Agent Instructions

This file is the canonical instruction source for coding agents working in this repository.

`CLAUDE.md` is a symbolic link to this file so Anthropic-based agents and OpenAI-based agents read the same project instructions.

## Bun workspace scripts for TUI apps

Do **not** run OpenTUI or other interactive/full-screen terminal apps through Bun's workspace filter runner.

Avoid this for TUI dev/start scripts:

```json
"dev:cli": "bun run --filter @nightcode/cli dev"
```

Use `bun run --cwd <app-dir> <script>` instead:

```json
"dev:cli": "bun run --cwd apps/cli dev",
"start:cli": "bun run --cwd apps/cli start"
```

Reason: `bun run --filter` runs scripts through Bun's workspace runner, which can buffer, prefix, or aggregate stdout/stderr and interfere with raw TTY control. OpenTUI needs direct access to the real terminal stdin/stdout for alternate-screen rendering, keyboard input, and cleanup. Running through `--cwd` executes the package script from the app directory without the workspace filter wrapper, matching `cd apps/cli && bun run dev` behavior.

Non-interactive scripts such as `build` can still use `--filter` because they do not depend on raw terminal control.

## File naming and source structure

Use kebab-case for source file names. Keep exported TypeScript symbols in the idiomatic casing for their role, such as PascalCase for React/OpenTUI components and camelCase for functions and values.

Keep runnable app entrypoints thin. Put screen-level composition in `screens/` and reusable UI pieces in `components/`; do not leave components scattered directly in a `src/` root. Avoid writing long static file trees in this document unless the structure itself is the subject of the guidance.
