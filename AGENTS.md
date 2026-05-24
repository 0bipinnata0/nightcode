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
