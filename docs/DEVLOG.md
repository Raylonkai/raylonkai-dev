# Engineering development log

This is the permanent chronological engineering record for raylonkai.dev. All
timestamps use Asia/Kolkata (IST, UTC+05:30) and come from the system clock.
Append entries; preserve previous records. User-facing changes belong in
`CHANGELOG.md` as well when relevant.

Use this structure for each entry:

```markdown
## YYYY-MM-DD HH:MM IST — Task title

### Objective
### Actions performed
### Files changed
### Technical decisions
### Validation
### Outstanding issues
### Next steps
```

## 2026-10-28 17:32 IST — Record the completed repository inspection

### Objective

Preserve task 1 findings before beginning initialization. This retrospective entry
was recorded during task 2; the inspection observed system time
2026-10-28 17:31:29 IST.

### Actions performed

- Inspected the root with `pwd`, `rg --files --hidden` with exclusions for Git,
  dependencies, environment files, credentials, and lockfiles, and `ls -la`.
- Checked applicable `AGENTS.md` paths in the repository and parent directories;
  none existed. Listed `.agents`, `.codex`, and `.aws`; all were empty and read-only.
- Read `README.md`; it contained only `# raylonkai-dev`.
- Ran `git status --short --branch`, `git log -1`, `git ls-files`, `git remote -v`,
  working and staged diff statistics, and selected repository configuration reads.
- Checked tool locations and versions, OS information, and local system time.
- Ran `bun pm ls` to inspect project dependencies.

### Files changed

- None during task 1. This record was added in task 2.

### Technical decisions

- Use `/home/raylon/raylonkai.dev` directly as the repository root.
- Preserve and later expand the existing README.
- No dependencies were installed or changed. Initialization awaits its selected task.

### Validation

- Working tree was clean on `main`, tracking `origin/main`; latest local commit
  was `0862a91` (`first commit`). Remote was `git@github.com:Raylonkai/raylonkai-dev.git`.
- Verified Bun 1.4.4, Git 2.56.0, Node.js 26.12.0, Zsh 5.9.2, and Arch Linux.
- npm was available; Caddy was absent from `PATH`.
- `bun pm ls` failed because no `package.json` existed. This is expected for the
  uninitialized repository; dependency inspection can resume after initialization.
- No application tests, build, or remote synchronization checks were run.

### Outstanding issues

- Application code, package configuration, and checks do not exist yet.
- No blocking issues were identified for the documentation task.

### Next steps

- Establish repository instructions, this permanent log, and a separate changelog
  as authorized in task 2.

## 2026-10-28 17:32 IST — Establish engineering instructions and records

### Objective

Complete task 2 by establishing permanent agent instructions, an append-only
engineering history, and a separate user-facing changelog.

### Actions performed

- Rechecked `git status --short`, the root listing, and the existing README before
  writing files. The working tree was clean.
- Read the actual system time using `TZ=Asia/Kolkata date`; observed
  17:32:08 IST before creation and 17:32:43 IST after validation.
- Created the instructions and records with `apply_patch`.
- Recorded task 1 retrospectively with its actual previously observed timestamp.
- Defined coding, architecture, dependency, security, validation, documentation,
  and reporting rules. No dependencies were added, upgraded, or removed.

### Files changed

- `AGENTS.md`: concise rules for future agents, including task scope and mandatory logs.
- `docs/DEVLOG.md`: permanent record, entry template, inspection history, and task result.
- `CHANGELOG.md`: unreleased section with no invented user-facing changes or releases.

### Technical decisions

- Document the intended stack and folder conventions without creating application
  scaffolding or configuring tools before task 3 is authorized.
- Keep internal engineering records separate from user-facing release history.
- Explicitly label the inspection record as retrospective to preserve chronology.

### Validation

- A Python documentation check passed for UTF-8 reading, final newlines, and absence
  of trailing whitespace in all three new files.
- Verified all seven required devlog sections and that the existing README was unchanged.
- `git diff --check` succeeded; new untracked documents were covered by the explicit
  Python check. `git status --short` showed only the three intended new documents.
- No application tests or formatting tools were run: application tooling is not
  configured yet.
- A final documentation check initially failed because it counted the example
  template heading as a real entry. Corrected the check to select dated headings;
  the corrected result is recorded below.
- The corrected final check passed for all documents and both dated entries;
  the existing README remained unchanged.

### Outstanding issues

- No blocking issues for task 2. Frontend initialization and executable checks
  remain future tasks.

### Next steps

- Task 2 is complete. Wait for the user's next selection; recommended task 3 is
  initialization of React, TypeScript, Vite, and Bun.

## 2026-10-28 17:42 IST — Initialize React, TypeScript, Vite, and Bun

### Objective

Complete selected task 3: establish a working frontend in the existing root
without implementing subsequent routing, design, linting, or testing tasks.
System time was observed at 17:40 IST before work and 17:42 IST after validation.

### Actions performed

- Read `AGENTS.md`, README, changelog, and previous devlog entries; inspected
  `git status --short` and repository files. Preserved existing uncommitted work.
- Consulted the official [Vite guide](https://vite.dev/guide/) and
  [TypeScript configuration reference](https://www.typescriptlang.org/tsconfig/).
  A React documentation fetch failed; package metadata and local validation
  established installed versions and compatibility.
- Queried current stable registry versions with `bun info <package> version`.
  Sandboxed registry queries failed with `DNSResolveFailed`; approved queries
  outside the sandbox succeeded.
- Added React 19.3.1 and React DOM 19.3.1 as runtime dependencies.
- Added Vite 8.3.5, React plugin 6.1.2, TypeScript 7.0.2, React and React DOM
  types 19.3.0, and Node types 26.6.5 as development dependencies.
- Ran `bun install`; sandboxed resolution failed with `DNSResolveFailed`.
  Repeated with approved network access: 26 packages installed and `bun.lock` saved.
- Added strict browser and tooling type configurations, a minimal starter view,
  and development, build, preview, and typecheck commands.
- Started development and preview servers temporarily on loopback, verified
  HTTP responses, and stopped both via Ctrl+C (expected exit code 130).

### Files changed

- `package.json`: private ESM package, Bun version declaration, dependencies, and scripts.
- `bun.lock`: exact resolved dependencies for reproducible installation.
- `.gitignore`: dependencies, build output, type caches, logs, and local environment files.
- `index.html`: accessible document metadata and application mount point.
- `src/main.tsx`: React strict-mode bootstrap with a root-element guard.
- `src/App.tsx`: minimal semantic starter page.
- `tsconfig.json`: strict browser TypeScript configuration without emitted files.
- `tsconfig.node.json`: separate tooling environment for Vite configuration.
- `vite.config.ts`: React integration and explicit loopback server bindings.
- `README.md`: setup, commands, implementation choices, and current scope.
- `CHANGELOG.md`: initial starter page under Unreleased.
- `docs/DEVLOG.md`: this task's activity and final results.

### Technical decisions

- Initialize manually to preserve existing documentation and avoid template
  tooling installing unselected linting or design scaffolding.
- Run Vite and TypeScript explicitly through Bun; retain only Bun's lockfile.
- Keep tooling types separate from browser globals. Enable strict mode,
  unchecked-index protection, exact optional property types, and unused-code checks.
- Typecheck before production compilation because bundling alone does not
  establish type safety. Use `dist/` as Vite's default build destination.
- Include a minimal `.gitignore` now to protect dependency, build, and local
  environment files as they are created; broader tooling remains task 4.
- Bind servers to `127.0.0.1` with strict port selection; no system or public
  network configuration was changed.
- Skip unnecessary empty directories and abstractions. Routing remains task 6.

### Validation

- `bun install --frozen-lockfile`: passed with no dependency changes.
- `bun pm ls`: confirmed all eight direct dependencies and resolved versions.
- `bun run typecheck`: passed for application and Vite configuration.
- `bun run build`: passed, including typechecking; emitted HTML and a bundled
  JavaScript asset to `dist/` (219.83 kB JavaScript, 68.73 kB gzip reported).
- A Bun `react-dom/server` render smoke check passed for the starter's main
  landmark and heading. This is a one-off check, not a configured unit test suite.
- Initial `bun run dev` and `bun run preview` failed with sandbox `EPERM` on
  listening sockets. Approved retries started successfully on ports 5173 and 4173.
- Sandboxed `curl` requests could not reach the servers. An approved Python
  `urllib.request` check passed for both HTML responses, all referenced JavaScript
  entries, and development TSX transformation, each returning HTTP 200.
- Browser interaction and visual rendering were not tested. HTTP and server-side
  rendering checks do not establish browser behavior or client-side routing.
- `git diff --check`: passed. `git check-ignore` confirmed `node_modules/`,
  `dist/`, and `.env.local` are ignored.
- ESLint, Prettier, and unit tests were not run because task 4 has not configured
  them. No npm, pnpm, or Yarn lockfile was introduced.

### Outstanding issues

- No blocking issue remains for task 3. Local sandbox restrictions require
  approved access for registry downloads and server verification in this session.
- Linting, formatting, tests, routes, and deployment preparation remain selected
  future tasks; only the initial starter page is implemented.

### Next steps

- Task 3 is complete. Await the user's selection; recommended task 4 is development
  tooling, remaining scripts, aliases if useful, and environment variable conventions.
- Launch locally with `bun install --frozen-lockfile` followed by `bun run dev`.

## 2026-10-28 17:45 IST — Prepare the authorized GitHub handoff

### Objective

Commit and push the completed foundation and engineering documentation as
explicitly requested by the user.

### Actions performed

- Read repository instructions and reviewed Git status, diffs, source,
  configuration, remote, commit history, and the files intended for staging.
- Retrieved actual system time using `TZ=Asia/Kolkata date`.
- Ran `git fetch origin` with approved access for network and Git metadata writes.
- Ran `git rev-list --left-right --count HEAD...origin/main`: `0 0`, confirming
  no remote divergence before committing.
- Checked the intended file list for private-key headers and common credential
  patterns; none were found. Confirmed generated output and local environment
  files remain ignored.

### Files changed

- `docs/DEVLOG.md`: record of the requested handoff. The commit will also include
  all previously completed task 2 and task 3 files.

### Technical decisions

- Use the configured `origin` remote and `main` branch without force pushing.
- Stage explicit project paths; exclude dependencies and generated artifacts.
- Preserve existing Git identity and all prior commits. No application changes
  or dependency changes were needed for this handoff.

### Validation

- `git diff --check` passed; the file review and credential-pattern check passed.
- Task 3 application validation already passed; unchanged application checks
  were not repeated. Linting, formatting, and unit tests remain unconfigured.
- Fetch succeeded; no commands failed during this preparation.

### Outstanding issues

- Commit and push are the next operations; their actual outcome will be recorded
  in a subsequent entry.

### Next steps

- Commit the foundation, push to `origin/main`, and record the verified outcome.

## 2026-10-28 17:45 IST — Confirm foundation published to GitHub

### Objective

Record the completed GitHub handoff and its actual result.

### Actions performed

- Staged the 13 explicit project files with `git add`, checked the staged diff,
  and committed as `52fb3dc` (`Initialize React TypeScript foundation and engineering records`).
- Ran `git push origin main`; GitHub accepted the update from `0862a91` to `52fb3dc`.
- Checked `git status --short --branch` and `git rev-parse HEAD origin/main`.
- Appended this result for a follow-up documentation commit and push.

### Files changed

- `docs/DEVLOG.md`: actual commit and publication results.

### Technical decisions

- Record the successful push in a follow-up documentation commit so that the
  published history contains the observed outcome rather than a predicted result.
- No release, tag, force push, application change, or dependency change was needed.

### Validation

- Staged whitespace checks passed. The foundation commit and push succeeded.
- Local HEAD and `origin/main` both resolved to
  `52fb3dcffa627a0fd11bd041622893c78bb83a22` after the push; working tree was clean.
- No commands failed during the commit and push. Prior application validation
  remains documented in task 3; application tests were not repeated for this log update.

### Outstanding issues

- No issue remains with publishing the foundation. This outcome entry awaits its
  own commit and push; the final user report will confirm that operation's result.

### Next steps

- Publish this outcome entry, confirm a clean synchronized branch, and await the
  next selected development task.

## 2026-10-28 19:41 IST — Configure development tooling and environment conventions

### Objective

Complete task 4 with ESLint, Prettier, Bun test discovery, typed public environment
variables, remaining scripts, and updated developer documentation. Preserve the
selected scope: meaningful sample tests remain task 7 and routing remains task 6.

### Actions performed

- Read `AGENTS.md`, existing configurations, README, and recent devlog entries;
  inspected source files and `git status --short --branch`. The working tree
  started clean on `main`, synchronized with `origin/main`.
- Read actual system time using `TZ=Asia/Kolkata date`: 19:37 IST before work,
  19:40 IST during validation, and 19:41 IST before this final record.
- Consulted official documentation for
  [typescript-eslint](https://typescript-eslint.io/getting-started/),
  [Prettier](https://prettier.io/docs/install),
  [Bun test configuration](https://bun.sh/docs/test/configuration), and
  [Vite environment variables](https://vite.dev/guide/env-and-mode).
- Queried stable package versions and peer dependencies with `bun info` using
  approved registry access, given the previously observed sandbox DNS restriction.
- Ran `bun add --dev` for ESLint 10.13.0, `@eslint/js` 10.0.1,
  `typescript-eslint` 8.72.1, `eslint-plugin-react-hooks` 7.1.1,
  `eslint-plugin-react-refresh` 0.5.7, `eslint-config-prettier` 10.1.8,
  `globals` 17.13.0, `@types/bun` 1.4.4, and TypeScript 6.0.3.
- Ran `bun add --dev --exact prettier@3.9.10`. Updated the Bun lockfile;
  runtime dependencies were unchanged and no other package-manager lockfile was added.
- Added scripts, flat lint configuration, formatter rules and ignores, Bun test
  discovery, test typechecking, typed public environment declarations, and an example.
- Ran the new checks, applied `bun run format`, and reran validation.

### Files changed

- `package.json` and `bun.lock`: tooling dependencies, TypeScript compatibility
  adjustment, and all eight requested scripts.
- `eslint.config.js`: recommended JavaScript, TypeScript, Hooks, and Fast Refresh
  rules with browser/tooling globals, artifact ignores, and Prettier compatibility.
- `.prettierrc.json`: single quotes and trailing commas.
- `.prettierignore`: artifact, lockfile, environment-owned directory, and append-only
  devlog exclusions.
- `bunfig.toml`: test discovery rooted at `src/`.
- `tsconfig.json` and `tsconfig.test.json`: separate browser and Bun test type
  environments; test configuration includes source until test files are added.
- `src/vite-env.d.ts` and `.env.example`: strict environment key declarations
  and optional public `VITE_SITE_URL` placeholder, not consumed by the UI yet.
- `.gitignore`: coverage output exclusion.
- `README.md`: all commands, tests, compatibility decisions, aliases, formatting,
  environment conventions, and remaining scope.
- `src/App.tsx`: formatting only; the production bundle remained unchanged.
- `docs/DEVLOG.md`: append this task record without modifying prior entries.

### Technical decisions

- Downgrade TypeScript from 7.0.2 to stable 6.0.3: installed stable
  `typescript-eslint` declares support for TypeScript >=4.8.4 and <6.1.0.
  Pin newly selected tooling versions and upgrade compatible tools together.
- Keep formatting in Prettier, with conflicting ESLint rules disabled; lint
  warnings fail the script. Use standard recommended lint rules without adding
  project-service complexity at this stage.
- Use Bun's built-in runner without a DOM library or separate test framework.
  Temporarily permit an empty suite with `--pass-with-no-tests` until task 7;
  explicitly document that a successful empty invocation provides no test coverage.
- Do not introduce path aliases: current relative imports are short and clear.
- Keep Bun types out of the browser type environment. Add explicit typed public
  variable keys, account for absent optional values, and document that runtime
  validation belongs where values are consumed.
- Keep environment values optional for local startup; `.env.example` contains
  no secrets and is trackable. Document client exposure, build-time values, and
  Bun's environment preloading behavior.
- Exclude the permanent devlog from format mutations to preserve history. No
  user-facing behavior changed, so no new changelog entry was needed.

### Validation

- Initial `bun run lint` and `bun run typecheck`: passed.
- Initial `bun run format:check`: failed, identifying `eslint.config.js`, README,
  `src/App.tsx`, and `tsconfig.json`. Resolved with `bun run format`.
- Final `bun run format:check`: passed; `bun run format` executed successfully.
- Final `bun run lint`: passed with zero warnings. An additional in-memory ESLint
  probe detected invalid conditional Hook usage and confirmed active TypeScript
  unused-variable and Fast Refresh rules, without writing a fixture to the repository.
- Final `bun run typecheck`: passed for browser, tooling, and test configurations
  using supported TypeScript 6.0.3.
- `bun run test`: exited successfully and explicitly reported `No tests found!`.
  No project unit tests ran, and no test coverage is claimed.
- `bun run build`: passed, including all typechecks; bundle remained
  `index-D3XlOMs5.js`, 219.83 kB (68.73 kB gzip).
- `bun install --frozen-lockfile`: passed, checked 164 installs with no changes.
- `git diff --check`: passed. Git ignore checks confirmed dependencies, production
  output, coverage output, and `.env.local` are ignored while `.env.example` is not.
- Compared previous devlog bytes against `HEAD` before appending: unchanged.
- Local server and browser checks were not repeated: this task made no functional
  UI or routing changes, and the production bundle matched task 3.

### Outstanding issues

- No blocking issues for task 4. Unit tests still need meaningful cases in task 7;
  remove the temporary empty-suite allowance then.
- Environment runtime validation will be required when variables are consumed.
- Changes remain uncommitted and unpushed; the earlier GitHub handoff covered
  the previously completed foundation.

### Next steps

- Task 4 is complete. Await the user's selection; recommended task 5 is source
  architecture, creating directories only as needed for real modules.

## 2026-10-28 19:43 IST — Prepare task 4 commit and push

### Objective

Publish the completed development tooling changes following the user's explicit
instruction to commit and push.

### Actions performed

- Read repository instructions and reviewed status, diffs, new configurations,
  the public environment example, and the configured GitHub remote.
- Obtained the timestamp from the system clock in Asia/Kolkata.
- Ran `git fetch origin` with approved access and compared local and remote
  history with `git rev-list --left-right --count HEAD...origin/main`.
- Checked changed files for private keys and common credential patterns.
- Prepared explicit staging of the 14 task 4 files, excluding generated output
  and local environment files.

### Files changed

- `docs/DEVLOG.md`: append this Git handoff record; other pending changes are
  the task 4 files documented in the preceding entry.

### Technical decisions

- Commit to the existing `main` branch and push to `origin/main` without force.
- Keep this handoff limited to the previously validated tooling changes.

### Validation

- Fetch succeeded; history comparison returned `0 0` before committing.
- `git diff --check` and the changed-file credential-pattern check passed.
- Task 4 validation already passed; unchanged application checks were not repeated.
- The configured test command still has no tests, as recorded above.

### Outstanding issues

- Commit and push are pending; their actual result will be recorded afterward.

### Next steps

- Commit the reviewed tooling changes, push them, and record the outcome.

## 2026-10-28 19:43 IST — Confirm task 4 published to GitHub

### Objective

Record the observed successful publication of the development tooling changes.

### Actions performed

- Staged the 14 reviewed task 4 files, checked the staged diff, and committed
  as `144dc62` (`Configure linting formatting and Bun test tooling`).
- Ran `git push origin main`; GitHub accepted `30084b5..144dc62` on `main`.
- Checked working-tree status and local/remote-tracking commit identities.
- Appended this result for a follow-up documentation commit and push.

### Files changed

- `docs/DEVLOG.md`: actual task 4 commit and push results.

### Technical decisions

- Record the observed push result in a separate documentation commit, preserving
  prior history. No release, force push, or additional application change is needed.

### Validation

- Staged whitespace check, commit, and push succeeded without failures.
- Working tree was clean after the push. Local HEAD and `origin/main` both
  resolved to `144dc62a919c8e1d1b42c41b8c7c0928fc449be5`.
- Earlier task 4 checks remain valid; no application checks were repeated for
  this documentation-only handoff.

### Outstanding issues

- No issue remains with publishing task 4. This outcome entry awaits its own
  commit and push; the final report will confirm that operation.

### Next steps

- Publish this record, verify synchronization, and await the next selected task.

## 2026-10-28 19:51 IST — Establish source architecture and page ownership

### Objective

Complete task 5 by separating the starter page from application composition and
documenting clear locations for future features, without changing the rendered
website or implementing routing and shared navigation from task 6.

### Actions performed

- Read `AGENTS.md`, source, configurations, README, and recent devlog entries;
  inspected repository files and Git status. The working tree started clean.
- Obtained actual system timestamps in Asia/Kolkata: 19:50 IST before the change
  and 19:51 IST before recording the final result.
- Captured the original App's static React markup in a uniquely named temporary
  file under `/tmp` for a before/after comparison.
- Moved the starter content into `src/pages/Home.tsx` and made `src/App.tsx`
  compose that page through a direct relative import.
- An initial partial patch left the old return block in App and an incomplete
  Home component. Immediate source inspection caught this intermediate editing
  error; completed the move before running checks.
- Documented present structure, future folder responsibilities, component and
  import conventions, experiment boundaries, and extension points.
- Formatted affected files with `bun --bun prettier README.md docs/ARCHITECTURE.md
  src/App.tsx src/pages/Home.tsx --write`, then ran all configured checks.
- Temporarily started `bun run dev` on loopback using approved access because
  previous sandbox runs blocked listening sockets. Checked HTTP responses with
  approved Python `urllib.request` access, then stopped the server via Ctrl+C.

### Files changed

- `src/pages/Home.tsx`: owns the unchanged starter page content and main landmark.
- `src/App.tsx`: composes Home instead of containing its page markup.
- `docs/ARCHITECTURE.md`: current application flow, source responsibilities, and
  conventions for adding real modules without empty scaffolding.
- `README.md`: updated entry-point explanation and architecture documentation link.
- `docs/DEVLOG.md`: append this task's decisions, actual checks, and final result.

### Technical decisions

- Create only the directory needed for a real page; document other planned
  locations until useful layout, UI, labs, hooks, utilities, content, or assets exist.
- Keep relative imports and direct page exports. Add no framework, router,
  shared component abstraction, state library, or dependencies for this refactor.
- Explain the future distinction between independent experiment logic and React
  presentation without introducing a speculative experiment framework.
- Keep Home responsible for the main landmark for now; document that a future
  layout must avoid duplicate main landmarks if it takes ownership.
- No user-facing behavior changed, so no changelog entry is required. Package
  configuration, dependency versions, and lockfile remain unchanged.

### Validation

- `bun run typecheck`: passed for browser, tooling, and test environments.
- `bun run lint`: passed with zero warnings.
- `bun run format:check`: passed after targeted formatting.
- `bun run test`: exited successfully and reported `No tests found!`; no unit
  tests ran and no coverage is claimed.
- `bun run build`: passed; 16 modules transformed, JavaScript output 219.86 kB
  (68.74 kB gzip) in `dist/`.
- One-off React static rendering comparison passed: App's before/after HTML
  matched exactly, including the main landmark, heading, and both paragraphs.
- Development startup passed at `http://127.0.0.1:5173`. The document, App module,
  and moved Home module returned HTTP 200 with expected content; App's transformed
  module referenced the new Home path.
- Browser interaction and visual checks were not run. HTTP checks and static
  rendering do not establish browser behavior; no client-side routing exists yet.
- Server stopped with expected exit code 130. `git diff --check` passed and status
  showed only intended source/document changes before this log append.
- No validation commands failed; the intermediate editing issue was corrected
  during source inspection before validation.

### Outstanding issues

- No blocking issues for task 5. Meaningful unit tests still belong to task 7;
  routing, navigation, additional views, and 404 handling remain task 6.
- Changes are uncommitted and unpushed; the previous GitHub handoff covered task 4.

### Next steps

- Task 5 is complete. Await the user's next selection; recommended task 6 is
  routing, accessible navigation, lazy page loading where useful, and a 404 view.

## 2026-10-28 19:52 IST — Prepare task 5 GitHub handoff

### Objective

Commit and push the source architecture changes following explicit user authorization.

### Actions performed

- Read repository instructions, reviewed the five changed or new files, and
  checked status, diffs, the configured remote, and actual system time in IST.
- Ran `git fetch origin` with approved access and compared branch history.
- Checked the intended files for private keys and common credential patterns.

### Files changed

- `docs/DEVLOG.md`: this handoff record. The commit also includes the task 5
  README update, App refactor, Home component, and architecture document.

### Technical decisions

- Stage only the five reviewed task 5 paths and use the existing `main` branch.
- Push to `origin/main` without force; keep dependencies and generated files excluded.

### Validation

- Fetch and `git diff --check` succeeded. Branch comparison returned `0 0`.
- No common credential patterns were found in the intended files.
- Prior task 5 checks passed; unchanged application checks were not repeated.
- No unit tests exist, as documented in task 5. No commands failed during preparation.

### Outstanding issues

- Commit and push are pending. Record their actual outcome after publication.

### Next steps

- Commit and push task 5, then record the verified result.

## 2026-10-28 19:53 IST — Confirm task 5 published to GitHub

### Objective

Record the observed successful task 5 commit and push.

### Actions performed

- Staged the five reviewed files, checked staged whitespace, and committed as
  `417014a` (`Organize starter page and document source architecture`).
- Ran `git push origin main`; GitHub accepted `85fcf4f..417014a` on `main`.
- Verified status and commit identities; obtained the current IST system timestamp.
- Appended this outcome for a follow-up documentation commit and push.

### Files changed

- `docs/DEVLOG.md`: actual task 5 publication result.

### Technical decisions

- Preserve prior entries and record the observed publication outcome in a
  separate documentation commit. No application or dependency changes are needed.

### Validation

- Staged whitespace check, commit, and push succeeded without failures.
- The working tree was clean after publication; HEAD and `origin/main` both
  resolved to `417014af36fec5ac2e912402986c83094623c227`.
- Prior task 5 validation remains recorded above; application checks were not
  repeated for this documentation update.

### Outstanding issues

- No issue remains with publishing task 5. This outcome entry awaits its own
  commit and push, to be confirmed in the final user report.

### Next steps

- Publish this record, confirm branch synchronization, and await the next task.

## 2026-10-28 20:00 IST — Add routing, accessible navigation, and minimal views

### Objective

Complete task 6 with Home, About, Projects, Lab, and Notes routes, shared semantic
navigation, useful route-level lazy loading, minimal styles, and an unknown-route
404 view. Verify real browser behavior without implementing a finished visual
design or the future unit-test task.

### Actions performed

- Read `AGENTS.md`, existing source, package configuration, architecture, and
  recent history; inspected status and applicable repository files. The working
  tree started clean on `main`.
- Obtained actual system timestamps in Asia/Kolkata: 19:55 IST before work,
  19:56 IST during setup, and 20:00 IST before this record.
- An initial tool-orchestration script had an extra closing parenthesis and
  failed with `SyntaxError` before executing commands. Corrected and reran it.
- Consulted the official [Wouter repository](https://github.com/molefrog/wouter),
  [React lazy reference](https://react.dev/reference/react/lazy), and Mozilla's
  [WebDriver BiDi connection guide](https://developer.mozilla.org/en-US/docs/Web/WebDriver/How_to/Create_BiDi_connection).
  Direct Firefox source-documentation and W3C spec fetches failed; the Mozilla
  guide supplied the supported browser automation connection method.
- Queried `bun info wouter version` and peer dependencies with approved network
  access; installed Wouter 3.13.0 with `bun add wouter@3.13.0` (three packages).
- Added routes, four lazy imports, a loading status, shared layout, minimal page
  content, global CSS, and a 404 return-home link.
- Matched navigation/title normalization to Wouter's case-insensitive route
  matching and single optional trailing slash; verified unusual paths in Firefox.
- Updated user-facing and architectural documentation, then ran configured checks.
- Started loopback Vite development and preview servers with approved access.
- Used installed Firefox 158.0.1 in headless mode with a temporary isolated
  `/tmp` profile and loopback WebDriver BiDi automation. No browser/test packages
  were added. A one-off `/tmp` script checked development and production preview.
- Stopped both servers and the temporary browser via Ctrl+C after verification.

### Files changed

- `package.json`, `bun.lock`: Wouter 3.13.0 and its resolved dependencies.
- `src/App.tsx`: five routes, eager Home/404 imports, lazy secondary pages,
  `Suspense` loading status, and final unknown-path fallback.
- `src/components/layout/SiteLayout.tsx`: header, primary navigation, skip link,
  single main landmark, page titles, active links, and navigation focus/scroll handling.
- `src/pages/Home.tsx`: retain content while removing its duplicate main wrapper.
- `src/pages/About.tsx`, `Projects.tsx`, `Lab.tsx`, `Notes.tsx`: minimal route views
  with no fabricated biography, projects, experiments, or journal entries.
- `src/pages/NotFound.tsx`: explicit 404 message and client-side home link.
- `src/styles/global.css`, `src/main.tsx`: shared responsive basics and stylesheet import.
- `README.md`, `docs/ARCHITECTURE.md`: actual routes, layout ownership, loading,
  accessibility behavior, extension conventions, and static-host fallback limits.
- `CHANGELOG.md`: user-facing route, navigation, loading, and accessibility additions.
- `docs/DEVLOG.md`: append this actual activity record and final result.

### Technical decisions

- Choose Wouter for a small client-side routing API compatible with the installed
  React version (declared peer requirement React >=16.8.0).
- Load Home and the tiny 404 immediately. Defer secondary views with module-level
  React `lazy` imports so shared navigation remains mounted while content loads.
- Use native links, `aria-current`, visible focus indicators, a keyboard skip
  link, and one layout-owned main landmark. Move focus and scroll after pathname
  changes, without forcing focus on initial document load.
- Keep views simple and avoid component libraries, global state, content engines,
  backend systems, or deployment infrastructure.
- Document static SPA behavior accurately: the router's 404 view does not set
  an HTTP 404 response. Production direct links need an HTML fallback; Caddy
  configuration remains task 8.
- Keep browser smoke automation temporary rather than adding a browser-test stack
  before requirements justify it. Project unit tests remain task 7.

### Validation

- `bun run typecheck`, `bun run lint`, `bun run format:check`: passed after
  targeted Prettier formatting. All checks were rerun after the final source change.
- `bun run test`: exited successfully and reported `No tests found!`; no Bun
  project unit tests ran and no unit-test coverage is claimed.
- `bun run build`: passed, transformed 32 modules, and emitted four separate
  secondary-page chunks, CSS, and a 228.68 kB main JavaScript bundle (72.27 kB gzip).
- `bun install --frozen-lockfile`: passed, checked 167 installs with no changes.
- Both development and production-preview Firefox smoke runs passed: all five
  routes rendered, each had one main landmark and one h1, titles and active
  links matched, and client transitions preserved the same document.
- Verified keyboard Tab reveals the first skip link and Enter focuses main;
  route transitions focus main; browser Back/Forward restores the expected views.
- Verified direct requests, uppercase/single-trailing-slash matching,
  query/hash URLs, unknown paths, unknown nested paths, malformed double trailing
  slashes, and the 404 home link in both runs.
- Browser resource timings confirmed secondary modules were absent on initial
  Home load and requested after navigation, for development and built assets.
- Verified no horizontal overflow on Home at 360px and inspected its screenshot.
  Neither browser run recorded application JavaScript errors. This is not a
  comprehensive accessibility or cross-browser audit; no screen reader was tested.
- Firefox emitted headless graphics and telemetry/background warnings, including
  a failed telemetry upload and channel-exit messages during shutdown. These
  were browser-process diagnostics; both page automation runs completed successfully.
- All three temporary processes stopped with expected exit code 130. No system
  service, firewall rule, or publicly exposed port was configured.
- `git diff --check` passed; generated/private files remained ignored. Compared
  the previous devlog against HEAD before appending: unchanged.

### Outstanding issues

- No blocking issue remains for task 6. Unit tests, production Caddy fallback,
  and fuller real content remain future tasks.
- Dynamic imports depend on successful asset delivery; production deployment
  and rollback planning must account for clients requesting older chunks.
- Changes remain uncommitted and unpushed; the previous handoff covered task 5.

### Next steps

- Task 6 is complete. Await the next selection; recommended task 7 is meaningful
  unit coverage and removal of the temporary empty-suite allowance.
- Launch locally with `bun run dev` and open `http://127.0.0.1:5173`.

## 2026-10-28 20:04 IST — Prepare task 6 GitHub handoff

### Objective

Commit and push the completed routing and navigation changes as explicitly requested.

### Actions performed

- Read `AGENTS.md`, reviewed diffs and new source files, and checked Git status,
  the remote, file list, and actual system time in Asia/Kolkata.
- Ran `git fetch origin` with approved access and compared branch history.
- Checked all 16 changed or new files for private keys and common credential
  patterns, and verified generated/private paths remain ignored.

### Files changed

- `docs/DEVLOG.md`: append this publication record. The intended commit includes
  the task 6 source, styles, dependency lockfile, and documentation listed above.

### Technical decisions

- Stage only the reviewed task 6 paths; preserve generated and local files.
- Use the existing `main` branch and `origin` remote without force pushing.
- No further application or dependency changes are needed for this handoff.

### Validation

- Fetch succeeded; `git rev-list --left-right --count HEAD...origin/main`
  returned `0 0` before committing.
- `git diff --check` and the credential-pattern/ignore checks passed.
- Task 6 application and browser checks already passed; unchanged checks were
  not repeated. The unit-test suite remains empty as previously documented.
- No commands failed during handoff preparation.

### Outstanding issues

- Commit and push are pending; record the observed result after publication.

### Next steps

- Commit and push the reviewed task 6 changes, then record the result.

## 2026-10-28 20:05 IST — Confirm task 6 published to GitHub

### Objective

Record the observed successful routing and navigation publication.

### Actions performed

- Staged the 16 reviewed files, checked staged whitespace, and committed as
  `c32d47b` (`Add routes accessible navigation and lazy-loaded pages`).
- Ran `git push origin main`; GitHub accepted `f06cddf..c32d47b` on `main`.
- Verified status and commit identities; obtained actual IST system time.
- Appended this outcome for a follow-up documentation commit and push.

### Files changed

- `docs/DEVLOG.md`: actual task 6 commit and publication results.

### Technical decisions

- Record the observed successful publication in a separate documentation commit
  without rewriting existing history or making further application changes.

### Validation

- Staged whitespace check, commit, and push succeeded without failures.
- The working tree was clean after publication; HEAD and `origin/main` both
  resolved to `c32d47bfaa54fe2814687610069d68f8eee2102d`.
- Prior task 6 application/browser validation remains recorded above; no checks
  were repeated for this documentation-only update.

### Outstanding issues

- No issue remains with publishing task 6. This outcome entry awaits its own
  commit and push, to be confirmed in the final user report.

### Next steps

- Publish this record, confirm synchronization, and await the next selected task.
