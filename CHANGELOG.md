# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses [Semantic Versioning](https://semver.org/). The version
number lives in a single place, `package.json`, and is shown live in the app
footer.

## [1.1.0] - 2026-11-06

### Added
- Live decoding: the file, its preview and the download button appear as soon as a Base64 string or a Data URI is pasted, with no button to press. A text longer than 20,000 characters waits 300 ms after the last change. An empty box is not an error, and an invalid text shows its message next to the box.
- The two panes, input and result, are side by side with an arrow between them, so what you paste and what you get are on screen together. On narrow screens one goes below the other.
- Messages for the empty states that say what will appear and where, chips for the type, the extension and the size, and the size of the Base64 with how much bigger it is than the file.
- Routes in the URL hash (`#/`, `#/codificar`, `#/ajustes`) so that the Back button works.
- Plain text, JSON and SVG are recognized from their content when there is no Data URI. Before, the Base64 of a JSON or a note was a `.bin` file with no preview until the type was chosen by hand.
- Copying falls back to the old selection-based copy on pages without the clipboard API (plain HTTP).
- Tests for the live decoding, the type detection, the routes and the size format: 46 to 85.

### Changed
- Teal accent color, in light and dark themes. The shared components keep working as before and the other portfolio tools keep their own accent.
- The direction selector is compact and uses short labels (Base64 → File, File → Base64) that no longer break on phones.
- Previews of images are shown over a checkerboard, so that transparency can be seen.
- When encoding, the preview of the file is next to the choice of the file, and the result has the copy button in its header.
- The settings screen has a title and a link back to the converter, and the two cards side by side on wide screens.
- Sizes use the number format of the language (1,76 KB or 1.76 KB), and small sizes show two decimals.
- Text sizes and spaces follow one scale (12, 13.6 and 15.2 px for text, multiples of 4 px for spaces), and the buttons and fields have global styles instead of one copy per component.
- Texts are in sentence case in all six languages.
- The arrow of the selects is drawn with CSS instead of a text glyph, so it keeps the same size and weight in every browser and animates cleanly when the list opens.

### Removed
- The Decode button and the message asking for a Base64 string when the box is empty.
- Texts that were no longer used.

## [1.0.0] - 2026-11-01

First stable release. The tool decodes Base64 and Data URIs into files and
encodes files into Base64, entirely in the browser, with previews, six
languages and light and dark themes. This release brings it up to the
standard of the other portfolio tools.

### Added
- Credit to the author in the footer and the README, with a link to the author's GitHub.
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

## Earlier versions (tags kept)

- **0.2.0 (2026-05-01):** the encoder (file to Base64) with a tabbed
  interface, and a layout for phones.
- **0.1.0 (2026-05-01):** the first version, a Base64 decoder with automatic
  type detection and preview.
- Between 0.2.0 and 1.0: an accessible language selector with flags, a sticky
  header, unified settings, ARIA roles and keyboard support, and a shared
  preview component.
