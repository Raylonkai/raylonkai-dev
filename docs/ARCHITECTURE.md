# Architecture

raylonkai.dev is a personal website, engineering journal, and interactive
programming laboratory. The foundation is a client-rendered React application
using strict TypeScript, Vite, and Bun, with static production output in `dist/`.

## Current application

```text
index.html
  -> src/main.tsx
    -> src/App.tsx
      -> src/components/layout/SiteLayout.tsx
        -> selected src/pages/* view
```

`index.html` provides the document and root element. `main.tsx` mounts React with
`StrictMode` and imports `src/styles/global.css`. `App.tsx` defines Wouter routes
for Home, About, Projects, Lab, and Notes, followed by the unknown-path fallback.
`SiteLayout.tsx` owns the shared header, navigation, and single main landmark.
Pages provide their content without duplicating the main landmark.

The five views are deliberately minimal. Home and the small 404 view are eager
imports; the other four pages use module-level React `lazy` imports inside a
`Suspense` boundary. This keeps shared navigation mounted during loading and
lets Vite emit separate route chunks. Loading has a semantic status message.

Wouter provides client-side links and History API navigation without a larger
route framework. The shared layout tracks the pathname to set the document title,
mark the current navigation link, and move focus to main and scroll to the top
after pathname changes. It does not forcibly move focus on initial page load.
A skip link, native link semantics, visible focus styling, and wrapping navigation
provide the initial accessibility baseline. The layout mirrors Wouter's default
case-insensitive matching and optional single trailing slash for titles and
active links. Canonical links use lowercase paths without a trailing slash.

`src/lib/navigation.ts` owns the ordered navigation metadata and resolves a
pathname to its canonical page. Exact matching with one optional trailing slash
prevents unknown paths such as `//` or `/about//` from marking a page active.
The layout uses this resolver for titles and active links, and keyboard navigation
uses the same data for previous/next destinations.

`src/hooks/useVimNavigation.ts` owns the keyboard subscription and cleans it up
when disabled or unmounted. `src/lib/vim-navigation.ts` is the pure decision
function tested without React or a DOM. `h/l` navigate to adjacent pages without
wrapping, and `j/k` scroll 80 pixels without animation. Repeated page keys,
modifiers, composition events, and previously handled events are ignored.

The layout provides a visible enable/disable checkbox and key help. The setting
is local React state, initially enabled, retained across client navigation and
reset on document reload. Enabling focuses main. The hook protects interactive
controls, selected text, shadow-DOM editors, fullscreen content, and containers
marked `data-vim-ignore`. This lets future experiments own their keys without
competing with site navigation. Standard links and keyboard traversal remain
available when shortcuts are off.

The pathless final route renders a 404 view with a home link. Static SPA hosting
still needs an HTML fallback for direct requests; a client-side 404 view does not
set an HTTP 404 status. See the [README route table](../README.md#routes-and-navigation).

Content, interactive experiments, and production deployment remain future work.
There is no backend, database, authentication system, or global state library.

## Source responsibilities

`src/pages/`, `src/components/layout/`, `src/styles/`, `src/hooks/`, and `src/lib/`
currently contain code.
The other locations below are conventions for future work, created when they
have useful files. Do not add placeholder components or empty directories to
match a diagram.

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
  routing and shared layout.
- Use a default export for a page component; prefer direct imports from its file.
  Add named exports for utilities or related types when needed. Avoid barrel files
  until they solve a concrete problem.
- Keep state local to the component or feature that owns it. Extract custom hooks
  for shared behavior, not simply to move code into another file.
- Use relative imports while paths remain clear. Add aliases only when the source
  layout makes them beneficial, with matching TypeScript and Vite configuration.
- Preserve semantic landmarks, keyboard access, and visible focus when adding
  interactive UI. The shared layout owns `<main>`; pages must not duplicate it.

## Types, configuration, and tests

`tsconfig.json` checks browser code; `tsconfig.node.json` checks Vite tooling.
`tsconfig.test.json` adds Bun types for test code while browser checks keep Bun
globals out of the application environment. `src/vite-env.d.ts` declares allowed
public environment keys; `.env.example` documents optional values. Never place
secrets in client-exposed variables.

Colocate meaningful unit tests with the code they exercise using `*.test.ts`,
`*.test.tsx`, `*.spec.ts`, or `*.spec.tsx`. Bun discovers tests under `src/`.
Navigation metadata and Vim action decisions have colocated unit tests. The test
command fails if no tests are discovered. Browser checks separately verify real
keyboard events, input protection, focus, scrolling, links, and history; unit
tests do not establish those DOM behaviors.

Use the commands in the [README](../README.md) for validation. ESLint checks code
rules, TypeScript checks types, Prettier controls formatting, and Vite creates
the production build. Wouter is the only added runtime routing dependency; no
component library, global state library, or browser-test dependency is installed.

## Future extension points

New routes can add page components in `App.tsx` and navigation/title entries in
`src/lib/navigation.ts` without changing React's entry point. Journal content can adopt
a format when publishing requirements are known; no Markdown
processor or content framework is selected yet. Labs can introduce workers,
WebAssembly, graphics, or networking integrations when an experiment requires
them, with decisions and browser constraints documented as they arise.

Production hosting is intended to serve the static build through Caddy. That
repository template and its operational procedures are now in [Caddyfile](../Caddyfile)
and [DEPLOYMENT.md](DEPLOYMENT.md). A `current` symlink selects a complete release,
while a shared hashed-asset store keeps older lazy chunks reachable after deployment
and rollback. Asset requests bypass the SPA fallback. This is preparation only:
native Caddy validation and actual server deployment remain pending, and no
services or system networking have been changed.
