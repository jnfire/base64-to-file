# Project Architecture

*Read this in [Spanish](ARCHITECTURE-es.md).*

The `base64-to-file` project follows a clean, modular architecture separating business logic from the UI framework (Vue 3).

## Directory Structure

### 1. `src/core/` (Domain Layer)
This folder contains pure TypeScript logic. It is entirely framework-agnostic.
- **`types.ts`**: Defines standard interfaces (`FileInfo`, `DetectFileTypeResult`) and constants (`COMMON_TYPES`).
- **`decoder.ts`**: Handles the actual decoding of Base64 strings to binary data (`Uint8Array`). It includes helper functions to strip Data URI prefixes.
- **`detector.ts`**: Responsible for determining the MIME type of the decoded data. It does this in two ways:
  - Reading the Data URI header (if provided).
  - Inspecting the *Magic Bytes* (the first few bytes of the binary array) to detect formats like PNG, PDF, ZIP, etc.
- **`preview.ts`**: Contains the business rules that determine if a specific MIME type can be previewed natively in the browser.

### 2. `src/composables/` (Adapter Layer)
- **`useBase64Converter.ts`**: A Vue composable that bridges the pure logic from `core/` with the reactive UI. It manages the state (`base64Input`, `fileInfo`, `error`, `detectionMode`) and decodes **live**: a short text is decoded as soon as it changes, and a text longer than 20,000 characters waits 300 ms after the last change. An empty box is not an error. `fileInfo.source` says where the type came from (Data URI, the content of the file, or chosen by hand).
- **`useFileEncoder.ts`**: The same for encoding a file: drag and drop, the Base64 result (with or without the Data URI prefix), its size and how much bigger it is than the file, and copying with a short confirmation.
- **`useRoute.ts`**: The screen is chosen by the hash of the URL (`#/` decodes, `#/codificar` encodes, `#/ajustes` is the settings), so the Back button works.
- **`keys.ts`**: The state of both directions is created once in `App.vue` and provided with these keys, so it is kept when moving between screens.

### 3. `src/components/` (Presentation Layer)
Single-responsibility Vue components.
- **`App.vue`**: Root layout. Header, the screen of the route and the footer.
- **`AppHeader.vue`**: Displays the title, tagline, and settings toggle (shared component).
- **`ConverterView.vue`**: The direction selector (a tab list) and the two panes with the arrow between them. On narrow screens the panes are one below the other.
- **`ConverterInput.vue`**: The pane to paste Base64: the textarea, the Auto or Manual mode, the type selector in Manual, the detection chips and the error.
- **`FileResult.vue`**: The decoded file: type, extension and size as chips, the smart preview and the download button. Before there is a file, it explains what will appear.
- **`EncoderInput.vue`**: The pane to choose a file: drag and drop zone, then the preview and a bar with the name and size.
- **`EncoderResult.vue`**: The generated Base64, the Data URI option, its size and the copy button.
- **`FilePreview.vue`**: The preview of images (over a checkerboard, to show transparency), PDF and text.
- **`SettingsView.vue`**: The encoder options (`EncoderSettingsCard.vue`) and the shared `PersonalizationCard.vue`.
- **`AppIcon.vue`**: The few icons the screens use.
- **`AppFooter.vue`**: Renders facts, version, source/license links, and author credit.
- **Styles**: the tokens (including the accent color), the buttons and the layout are in `assets/base.css`, and the converter and settings screens in `assets/converter.css`. The accent color is only defined here, so the other portfolio tools keep their own.

### 4. `src/i18n/` (Internationalization)
Contains dictionaries for six languages (`de`, `en`, `es`, `fr`, `it`, `pt`) and the `vue-i18n` setup to support multiple languages seamlessly.

### 5. `tests/`
Contains the Vitest unit tests that keep the `core/` logic and the live decoding stable, and check the routes, the size format and that the languages define the same texts.

### Shared components

The header, footer, selects, settings card, icons and theme util are shared byte for byte with the other portfolio tools. What differs per app (repository and author) lives in `src/app.config.ts`. See [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md).
