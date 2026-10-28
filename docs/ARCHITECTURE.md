# Architecture

raylonkai.dev is a personal website, engineering journal, and interactive
programming laboratory. The foundation is a client-rendered React application
using strict TypeScript, Vite, and Bun, with static production output in `dist/`.

## Current application

```text
index.html
  -> src/main.tsx
    -> src/App.tsx
      -> src/pages/Home.tsx
```

`index.html` provides the document and root element. `main.tsx` mounts React with
`StrictMode`. `App.tsx` composes the application; `Home.tsx` owns the starter
page's content and main landmark. Moving the content into a page component
preserves the rendered HTML and prepares a clear home for future route views.

Only the starter view exists today. Client-side routing, shared navigation,
additional pages, styling, and deployment configuration remain future tasks.
There is no backend, database, authentication system, or global state library.

## Source responsibilities

Only `src/pages/` is needed beyond the existing source root today. The other
locations below are conventions for future work, created when they have useful
files. Do not add placeholder components or empty directories to match a diagram.

| Location                 | Responsibility                                                          |
| ------------------------ | ----------------------------------------------------------------------- |
| `src/pages/`             | Whole-page views, such as Home or a future journal index                |
| `src/components/layout/` | Shared structure, such as navigation, headers, and footers              |
| `src/components/ui/`     | Reusable interface elements with an actual shared use                   |
| `src/labs/`              | Interactive experiments and their experiment-specific presentation      |
| `src/hooks/`             | Reusable React behavior shared across features                          |
| `src/lib/`               | Logic independent of React, such as algorithms and parsers              |
| `src/styles/`            | Shared styles and global presentation rules                             |
| `src/content/`           | Authored journal entries and project content                            |
| `src/assets/`            | Assets imported by source code and processed by Vite                    |
| `public/`                | Files served directly at stable paths without source imports            |
| `docs/`                  | Architecture, deployment guidance, and the permanent engineering record |
| `scripts/`               | Repository maintenance scripts when a concrete workflow needs them      |

Keep feature-specific code near the feature. Extract code into shared locations
when it has a clear shared purpose, rather than anticipating hypothetical reuse.
For example, a sorting visualization can live in `src/labs/`; its algorithm can
live in `src/lib/` when separating it allows useful independent tests or reuse.
This does not require a generic experiment framework.

## Component and import conventions

- Use functional components and PascalCase component filenames, such as `Home.tsx`.
- Keep page components responsible for their page content. Let `App.tsx` compose
  pages and, when introduced, routing and shared layout.
- Use a default export for a page component; prefer direct imports from its file.
  Add named exports for utilities or related types when needed. Avoid barrel files
  until they solve a concrete problem.
- Keep state local to the component or feature that owns it. Extract custom hooks
  for shared behavior, not simply to move code into another file.
- Use relative imports while paths remain clear. Add aliases only when the source
  layout makes them beneficial, with matching TypeScript and Vite configuration.
- Preserve semantic landmarks, keyboard access, and visible focus when adding
  interactive UI. The current Home owns `<main>`; if future shared layout owns it,
  remove the page's duplicate landmark in the same change.

## Types, configuration, and tests

`tsconfig.json` checks browser code; `tsconfig.node.json` checks Vite tooling.
`tsconfig.test.json` adds Bun types for test code while browser checks keep Bun
globals out of the application environment. `src/vite-env.d.ts` declares allowed
public environment keys; `.env.example` documents optional values. Never place
secrets in client-exposed variables.

Colocate meaningful unit tests with the code they exercise using `*.test.ts`,
`*.test.tsx`, `*.spec.ts`, or `*.spec.tsx`. Bun discovers tests under `src/`.
There are no unit tests yet; remove the temporary `--pass-with-no-tests` script
flag when the first meaningful tests are introduced. Rendering and browser
interaction need suitable checks beyond pure algorithm tests.

Use the commands in the [README](../README.md) for validation. ESLint checks code
rules, TypeScript checks types, Prettier controls formatting, and Vite creates
the production build. No additional dependencies are needed for this organization.

## Future extension points

Routing can select page components without changing React's entry point. Journal
content can adopt a format when publishing requirements are known; no Markdown
processor or content framework is selected yet. Labs can introduce workers,
WebAssembly, graphics, or networking integrations when an experiment requires
them, with decisions and browser constraints documented as they arise.

Production hosting is intended to serve the static build through Caddy. That
configuration, deployment workflow, and rollback guidance remain a separate task;
this organization does not install services or change system networking.
