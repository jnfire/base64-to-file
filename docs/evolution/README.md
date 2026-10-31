# Evolution

*Read this in [Spanish](README-es.md).*

How Base64 to File went from its first commit to today, with the screenshots to show it.

![Base64 to File at three stages, desktop](base64-to-file-evolution-desktop.png)

## Timeline

| When | What happened |
| --- | --- |
| April 2026 | First commit. |
| May 2026 | First release (v0.1.0): the decoder, with its own large title, language flag and badges. A week later (v0.2.0) the encoder arrived, with tabs and a layout for phones. |
| July–August 2026 | Accessible language selector with flags, sticky header with the version in the footer, unified settings (theme and encoder options), ARIA roles and keyboard support, a shared preview component and more tests. |
| October 2026 | Free software (AGPL-3.0), no Google Analytics or cookie banner, one design system shared with the other two tools, CI that gates every deploy, and the first stable release. |

## In numbers

| | Before (August 2026) | Now |
| --- | --- | --- |
| Automated tests | 29 | 46 |
| License | All rights reserved | AGPL-3.0 |
| Analytics | Google Analytics and a cookie banner | None |
| Deploy | Only if the tests pass | Only if lint, format, shared components, tests and build pass |
| Dependency advisories (npm audit) | High severity (vue-i18n) | None |

The "before" column is the state of the project on 28 August 2026, just before the round of work described above.

## Images

All the images are in this folder and in [`../screenshots`](../screenshots); they use sample data, and the map tiles are not shown because they were captured offline.

- [`base64-to-file-evolution-desktop.png`](base64-to-file-evolution-desktop.png): Three stages side by side, desktop
- [`base64-to-file-evolution-mobile.png`](base64-to-file-evolution-mobile.png): The same three stages on a phone

## How it was built

Designed and directed by [Javier Nicolás Pérez Mesa](https://github.com/jnfire): the product, the architecture and the design decisions are his. Much of the implementation was written with AI assistance ([Claude Code](https://claude.com/claude-code)), working under his direction and through pull requests he reviews; the commits made that way carry a `Co-Authored-By` trailer.
