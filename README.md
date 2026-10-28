# raylonkai-dev

The foundation for raylonkai.dev: a personal website, engineering journal, and
interactive programming laboratory built with React, strict TypeScript, Vite,
and Bun.

## Local development

Use Bun 1.4.4 or newer. From the repository root:

```sh
bun install --frozen-lockfile
bun run dev
```

Open <http://127.0.0.1:5173>. The development server binds to loopback only.
Stop it with Ctrl+C.

## Available commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start Vite with React Fast Refresh |
| `bun run typecheck` | Check application and Vite configuration types |
| `bun run build` | Typecheck, then compile the static site to `dist/` |
| `bun run preview` | Serve the built site at <http://127.0.0.1:4173> |

Vite and TypeScript run through Bun. Commit `bun.lock` alongside dependency
changes to keep installations reproducible. `preview` requires a successful
build and is intended for local verification, not production hosting.

## Current scope

The starter renders one minimal page. Routing, styling, linting, formatting,
tests, and deployment configuration are subsequent tasks and are not configured
yet. No backend is required.

`src/main.tsx` mounts React in strict mode; `src/App.tsx` contains the starter
view. `tsconfig.json` checks browser code, while `tsconfig.node.json` separately
checks Vite configuration with Node-compatible tooling types. Vite performs
bundling; TypeScript checks types without emitting files.

Read [AGENTS.md](AGENTS.md) before modifying the project. Engineering history
is recorded in [docs/DEVLOG.md](docs/DEVLOG.md); user-facing changes appear in
[CHANGELOG.md](CHANGELOG.md).
