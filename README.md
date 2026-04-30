# Base64 to File Converter 📁

*Leer esto en [Español](README-es.md).*

A fast, private, and serverless web tool designed for developers and technical users. It decodes Base64 text strings (including Data URIs) and retrieves the original files instantly.

All processing is done locally in your web browser, ensuring **total privacy** for your data. Built with **Vue 3 (Composition API)** and **TypeScript**.

## ✨ Key Features
- **Dual Detection:**
  - **Automatic:** Identifies file types via Data URIs or by parsing binary *Magic Bytes* (PNG, JPEG, PDF, ZIP, GIF, XML).
  - **Manual:** Forces a file type using a selector with common formats (Word, Excel, JSON, SVG, etc.).
- **Smart Preview:**
  - **Images & SVGs:** Displayed natively in the browser.
  - **PDFs:** Embedded for quick review without downloading.
  - **Data (JSON/XML/Text):** Embedded code viewer with **auto-formatting for JSON** for easy reading.
- **Total Privacy:** Everything happens 100% client-side. Your data never leaves your browser.
- **Interface:** Clean, responsive design with dark/light mode support. Multi-language support.

## 🛠️ Built With
- **Vue.js 3** (Composition API) + **Vite**
- **TypeScript** for robust, typed code.
- **Vue-i18n** for multi-language support.
- **Vanilla CSS** for optimal performance without external dependencies.

## 📁 Project Architecture
The project follows a modular architecture separating business logic from the view layer. You can check the details in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## 🚀 How to Run Locally
Please see our detailed guide in [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md).

## 📄 License
This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**. See the `LICENSE` file for more details.

---
Made with :heart: 2026.
