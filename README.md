# Base64 to File Converter 📁

*Leer esto en [Español](README-es.md).*

A fast, local-first web tool designed for developers and technical users. It decodes Base64 text strings (including Data URIs) and retrieves the original files instantly.

All processing is done locally in your web browser, ensuring **complete control** of your data (Local-First). Built with **Vue 3 (Composition API)** and **TypeScript**.

## ✨ Key Features
- **Dual Detection:**
  - **Automatic:** Identifies file types via Data URIs or by parsing binary *Magic Bytes* (PNG, JPEG, PDF, ZIP, GIF, XML).
  - **Manual:** Forces a file type using a selector with common formats (Word, Excel, JSON, SVG, etc.).
- **Smart Preview:**
  - **Images & SVGs:** Displayed natively in the browser.
  - **PDFs:** Embedded for quick review without downloading.
  - **Data (JSON/XML/Text):** Embedded code viewer with **auto-formatting for JSON** for easy reading.
- **Local Processing:** Everything happens client-side. Your files and converted data are never sent to any server.
- **Interface:** Clean, responsive design with dark/light mode support. Multi-language support.

## 🛠️ Built With
- **Vue.js 3** (Composition API) + **Vite**
- **TypeScript** for robust, typed code.
- **Vue-i18n** for multi-language support.
- **Vanilla CSS** for optimal performance without external dependencies.

## 📁 Project Architecture
The project follows a modular architecture separating business logic from the view layer. You can check the details in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## 🚀 How to Run Locally
```sh
npm install
npm run dev
```

## 📄 License
This project is proprietary and all rights are reserved by Javier Nicolás Pérez Mesa. It is published exclusively for portfolio review, code audit, and personal use. See the `LICENSE` file for details.

---
Made with :heart: 2026.
