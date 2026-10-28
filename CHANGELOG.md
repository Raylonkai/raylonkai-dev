# Changelog

User-facing features, fixes, and releases are recorded here. Internal engineering
activity is recorded in [the devlog](docs/DEVLOG.md).

## Unreleased

### Added

- Initial raylonkai.dev starter page describing the website's purpose.
- Home, About, Projects, Lab, and Notes routes with shared navigation and a 404 view.
- On-demand secondary pages, page titles, a keyboard skip link, active-page
  indicators, route-change focus handling, and minimal responsive styles.
- Vim-style navigation: `h/l` for previous/next pages, `j/k` for scrolling, and
  a visible switch to disable shortcuts, with typing and interactive-control safeguards.

### Fixed

- Unknown paths such as `//` no longer receive Home's title or active navigation state.
