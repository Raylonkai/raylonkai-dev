# Engineering instructions

## Purpose and stack

- Build raylonkai.dev as a personal website, engineering journal, and interactive programming laboratory.
- Target React, strict TypeScript, Vite, and Bun. Use ESLint, Prettier, and Bun's test runner when configured.
- Future production hosting is a static build served by Caddy on a self-hosted Linux server.

## Before making changes

- Read this file and any applicable directory instructions, inspect existing code and configuration, and check Git status.
- Preserve existing work. Do not overwrite unrelated changes, delete files, reset Git history, commit, or push without explicit authorization.
- Work in this repository root; do not create a nested project directory.
- Respect the user's selected task scope. Do not implement later tasks without authorization.

## Architecture and code

- Use functional React components, strict types, semantic HTML, keyboard access, and visible focus indicators.
- Keep route views in `src/pages`, shared layout in `src/components/layout`, and reusable UI in `src/components/ui`.
- Place experiments in `src/labs`, hooks in `src/hooks`, utilities in `src/lib`, styles in `src/styles`, authored content in `src/content`, and imported assets in `src/assets`. Use `public` for assets served directly.
- Create directories and abstractions when needed; avoid empty scaffolding, excessive indirection, and unnecessary dependencies.
- Keep documentation in `docs` and maintenance scripts in `scripts`. Document consequential architecture decisions.

## Dependencies and security

- Use Bun for dependencies and scripts. Keep Bun's lockfile; do not introduce npm, pnpm, or Yarn lockfiles.
- Choose stable dependencies compatible with the environment. Explain additions, upgrades, and removals in the devlog.
- Never commit secrets, credentials, local environment files, dependencies, or generated builds. Provide placeholder environment examples when needed.
- Treat client-exposed environment variables as public; never put secrets in them.
- Do not add a backend, database, authentication, global state library, or infrastructure without a concrete requirement.
- Do not change system services, firewall rules, or public network exposure without explicit authorization.

## Validation and reporting

- Run checks appropriate to the change. Once configured, validate application changes with `bun run typecheck`, `bun run lint`, `bun run format:check`, `bun run test`, and `bun run build`.
- Add meaningful tests for behavior that warrants coverage; avoid tests that merely mirror implementation or test static documentation.
- Verify affected routes and local startup when changing application behavior. Do not describe HTTP fallback alone as proof of client-side routing.
- Report commands actually run, outcomes, failures, checks not run, and incomplete work. Never claim success without evidence.

## Permanent engineering record

- Append to `docs/DEVLOG.md` after every meaningful task and record the final session result before ending work.
- Obtain timestamps from the system using `TZ=Asia/Kolkata date '+%Y-%m-%d %H:%M IST'`; never invent timestamps.
- Append entries chronologically using the existing template: objective, actions performed, files changed, technical decisions, validation, outstanding issues, and next steps.
- Record meaningful commands, dependency and configuration changes, decisions, failures, and their resolution. Preserve previous entries; explain corrections in a new entry.
- Identify retrospective records explicitly and distinguish their recording time from an earlier observed event time.
- Maintain `README.md` and relevant architecture or deployment documentation when behavior or workflows change.
- Update `CHANGELOG.md` for user-facing features, fixes, and releases. Keep internal engineering activity in the devlog; do not invent releases or release dates.
