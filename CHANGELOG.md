# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses [Semantic Versioning](https://semver.org/). The version
number lives in a single place, `package.json`, and is shown live in the app
footer.

## [1.0.0] - 2026-10-31

First stable release. The tool decodes Base64 and Data URIs into files and
encodes files into Base64, entirely in the browser, with previews, six
languages and light and dark themes. This release brings it up to the
standard of the other portfolio tools.

### Added
- Credit to the author in the footer and the README, with a link to his GitHub.
- A design system shared byte for byte with the other portfolio tools
  (header, footer, selects, settings card, icons and theme), with a script
  that fails the build if a copy drifts (`npm run check:shared`) and a
  document that explains it (`docs/DESIGN-SYSTEM.md`).
- Screenshots in the README, a roadmap, a page on how the project evolved
  (`docs/evolution/`) and a preview image for shared links.
- ESLint and Prettier, and a CI that runs lint, formatting, the shared
  components check, tests and the build before every deploy.
- Tests that check the six languages define the same keys, including the
  keys the shared components need.
- A release workflow: pushing a `v*` tag creates the GitHub release from
  this changelog (`docs/RELEASING.md`).

### Changed
- License: GNU Affero General Public License v3.0 (`AGPL-3.0-only`).
- Dependencies aligned with the other tools: Vue 3.5, vue-i18n 11, Vite 7,
  Vitest 4 and TypeScript 5.9.
- The header shows a one-line description beside the app name (hidden on
  phones) and the footer states checkable facts: no cookies, no accounts,
  open source. The hero block with its badges is gone.
- The language selector has the same height as the theme selector, and the
  footer keeps the version together when the line wraps on a phone.
- The package is named `base64-to-file` (it was `base64-to`).

### Removed
- Google Analytics and the cookie-consent banner: the app uses no cookies,
  analytics or tracking.
- The unused Vite template assets.

### Fixed
- `<html lang>` follows the interface language.
- A high-severity advisory in vue-i18n (`@intlify/core-base`).
- The stricter lint found and fixed untyped values in the file-type selector
  and the decoder.

## Before 1.0

- **0.2.0 (2026-05-01):** the encoder (file to Base64) with a tabbed
  interface, and a layout for phones.
- **0.1.0 (2026-05-01):** the first version, a Base64 decoder with automatic
  type detection and preview.
- Between 0.2.0 and 1.0: an accessible language selector with flags, a sticky
  header, unified settings, ARIA roles and keyboard support, and a shared
  preview component.
