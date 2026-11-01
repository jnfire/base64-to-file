# Roadmap

*Read this in [Spanish](ROADMAP-es.md).*

What Base64 to File does today and where it could go. The ideas are ordered by how much they would help; they are ideas, not commitments or dates.

## What it does today

- Decode Base64 and Data URIs into files, with automatic type detection (Data URI and magic bytes) or a manual type.
- Encode any file (up to 5 MB) into Base64, with or without the Data URI prefix.
- Previews for images, SVG, PDF and text, with JSON formatted for reading.
- Everything runs in the browser, in six languages, with light and dark themes.

## Ideas

1. **URL-safe Base64** (the `-` and `_` variant used in JWTs and URLs): detect it and decode it.
2. **Clearer errors:** say what is wrong with the input (invalid character, wrong padding) instead of a generic message.
3. **Offline use** as an installable app (PWA).
4. **Several files at once** when encoding.
5. **More previews** (audio and video); today they cover images, SVG, PDF and text.
6. **A higher limit with a warning** instead of a fixed 5 MB.
7. **Automated tests for the interface;** today only the core logic and the settings are tested.

## Out of scope

- Accounts, a backend or any storage on a server: what you enter stays in your browser.
- Advertising and tracking.
