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

| Command                | Purpose                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| `bun run dev`          | Start Vite with React Fast Refresh                                      |
| `bun run typecheck`    | Check application and Vite configuration types                          |
| `bun run build`        | Typecheck, then compile the static site to `dist/`                      |
| `bun run preview`      | Serve the built site at <http://127.0.0.1:4173>                         |
| `bun run lint`         | Check JavaScript, TypeScript, React Hooks, and Fast Refresh conventions |
| `bun run format`       | Automatically format supported project files                            |
| `bun run format:check` | Check formatting without writing files                                  |
| `bun run test`         | Discover and run Bun unit tests under `src/`                            |

Vite and TypeScript run through Bun. Commit `bun.lock` alongside dependency
changes to keep installations reproducible. `preview` requires a successful
build and is intended for local verification, not production hosting.

## Current scope

The site has five minimal pages, client-side navigation, a 404 view, and basic
responsive styles. Linting, formatting, and test-runner setup are configured.
Meaningful unit tests and deployment configuration remain subsequent tasks.
No backend is required.

`src/main.tsx` mounts React in strict mode and imports global styles. `src/App.tsx`
selects page components through Wouter inside a shared `SiteLayout`.
`tsconfig.json` checks browser code, while `tsconfig.node.json` separately
checks Vite configuration with Node-compatible tooling types. Vite performs
bundling; TypeScript checks types without emitting files.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for source responsibilities,
component conventions, and guidance for adding experiments and journal content.
Folders are created when real code needs them; the documented layout does not
require empty scaffolding.

## Routes and navigation

| URL            | Page                             |
| -------------- | -------------------------------- |
| `/`            | Home                             |
| `/about`       | About                            |
| `/projects`    | Projects                         |
| `/lab`         | Engineering laboratory           |
| `/notes`       | Engineering journal              |
| Any other path | 404 view with a return-home link |

Home and the small 404 view load immediately. About, Projects, Lab, and Notes
load on demand through React `lazy` and `Suspense`, with a loading status while
their modules arrive. Navigation uses real links with browser history support.
Wouter matches these routes case-insensitively and permits one trailing slash;
canonical navigation links use lowercase paths without trailing slashes.

The shared layout provides a keyboard skip link, one main landmark, active-page
indicators, visible focus styles, document titles, and focus/scroll handling after
pathname changes. Page components provide their content without another `<main>`.

Vite serves direct route requests during development and local preview. Future
production hosting must serve `index.html` for application paths so direct links
and refreshes reach the router. The 404 view is a client-side result: a static
SPA fallback generally returns HTTP 200 even for unknown page paths. Caddy setup
and deployment details remain a separate task.

## Engineering conventions

ESLint uses flat configuration with recommended JavaScript, TypeScript, React
Hooks, and Vite Fast Refresh rules. Warnings fail the lint command. Prettier owns
formatting; `eslint-config-prettier` disables conflicting lint rules.

TypeScript is pinned to 6.0.3 because the installed stable `typescript-eslint`
8.72.1 supports TypeScript below 6.1. Upgrade them together after checking peer
compatibility. Prettier is pinned so updates do not silently change formatting.

Place unit tests beside the code they exercise as `*.test.ts`, `*.test.tsx`,
`*.spec.ts`, or `*.spec.tsx`, importing `describe`, `test`, and `expect` from
`bun:test`. `bunfig.toml` limits discovery to `src/`. Tests run in Bun without a
browser DOM; browser interaction tests will need a separate deliberate setup.
`tsconfig.test.json` adds Bun types for tests while the application configuration
keeps Bun globals out of browser code. Typechecking covers both environments.

No unit tests exist yet. The test script temporarily uses `--pass-with-no-tests`
so runner setup can be validated before task 7. Remove that flag when the first
meaningful tests are added. A successful empty run provides no test coverage.
Run `bun run test --coverage` when tests exist; coverage artifacts are ignored.

Use relative imports for now: the current source layout does not benefit from
aliases. Reassess when deeper modules make import paths cumbersome.

`bun run format` deliberately skips `docs/DEVLOG.md` to preserve previous
engineering records verbatim. Append new entries manually using its template.
Generated files, the lockfile, and environment-owned directories are also excluded.

## Environment variables

The starter runs without an environment file. If needed, copy `.env.example`
to `.env.local`, which Git ignores. Restart Vite after changing environment files;
production values are fixed at build time and require rebuilding to change.

Read public configuration through `import.meta.env`. Optional `VITE_SITE_URL`
is declared in `src/vite-env.d.ts` as a string that may be undefined, ready for
future canonical links; it does not currently change the UI. Add new public
variables explicitly to that declaration and to `.env.example`. Undeclared
variables are rejected by TypeScript. Types do not validate runtime values:
validate values where consumed and handle missing optional settings.

Every `VITE_` value is exposed to browser users. Never put credentials or secrets
in those variables. Bun may preload `.env` values before Vite starts; already-set
process values take precedence, so avoid defining the same key across files
when selecting development or production settings.

Read [AGENTS.md](AGENTS.md) before modifying the project. Engineering history
is recorded in [docs/DEVLOG.md](docs/DEVLOG.md); user-facing changes appear in
[CHANGELOG.md](CHANGELOG.md).
