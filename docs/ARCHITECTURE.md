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
- **`useBase64Converter.ts`**: A Vue composable that bridges the pure logic from `core/` with the reactive UI. It manages the state (`base64Input`, `fileInfo`, `error`, `detectionMode`) and exposes actions (`convert()`, `clear()`, `download()`) to the components.

### 3. `src/components/` (Presentation Layer)
Single-responsibility Vue components.
- **`AppHeader.vue`**: Displays the title, badges, and language switcher.
- **`ConverterInput.vue`**: Renders the input textarea and mode selection controls.
- **`FileResult.vue`**: Shows the decoded file metadata, the download button, and the smart preview.
- **`AppFooter.vue`**: Renders footer links and privacy info.

### 4. `src/i18n/` (Internationalization)
Contains dictionaries (`en.json`, `es.json`) and the `vue-i18n` setup to support multiple languages seamlessly.

### 5. `tests/`
Contains the Vitest unit tests that ensure the `core/` logic remains stable.
