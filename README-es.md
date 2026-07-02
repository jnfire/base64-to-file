# Base64 to File Converter 📁

*Read this in [English](README.md).*

Una herramienta web rápida y local-first diseñada para desarrolladores y usuarios técnicos. Permite decodificar cadenas de texto en formato Base64 (incluyendo Data URIs) y recuperar los archivos originales de forma instantánea.

Todo el procesamiento se realiza localmente en tu navegador web, garantizando un **control total** de tus datos (Local-First). Construida con **Vue 3 (Composition API)** y **TypeScript**.

## ✨ Características Principales
- **Detección Dual:**
  - **Automática:** Identifica el tipo de archivo mediante Data URI o analizando los *Magic Bytes* del binario (PNG, JPEG, PDF, ZIP, GIF, XML).
  - **Manual:** Permite forzar el tipo de archivo desde un selector de formatos comunes (Word, Excel, JSON, SVG, etc.).
- **Previsualización Inteligente:**
  - **Imágenes y SVG:** Visualización directa en el navegador.
  - **PDF:** Embebido para revisión rápida sin descarga.
  - **Datos (JSON/XML/Texto):** Visor de código con **auto-formateo para JSON** para una lectura cómoda.
- **Procesamiento Local:** Todo el procesamiento ocurre en el cliente. Tus archivos y datos convertidos nunca se envían a ningún servidor.
- **Interfaz:** Diseño limpio, responsivo y con soporte para temas claro/oscuro. Soporte multi-idioma.

## 🛠️ Tecnologías Utilizadas
- **Vue.js 3** (Composition API) + **Vite**
- **TypeScript** para un código robusto y tipado.
- **Vue-i18n** para el soporte multi-idioma.
- **Vanilla CSS** para un rendimiento óptimo y sin dependencias externas.

## 📁 Estructura del Proyecto
El proyecto sigue una arquitectura modular separando la lógica de negocio de la vista. Puedes ver los detalles en [`docs/ARCHITECTURE-es.md`](docs/ARCHITECTURE-es.md).

## 🚀 Cómo ejecutarlo localmente
```sh
npm install
npm run dev
```

## 📄 Licencia
Este proyecto es propietario y tiene todos los derechos reservados por Javier Nicolás Pérez Mesa. Se publica exclusivamente con fines de revisión de portafolio, auditoría de código y uso estrictamente personal. Consulta el archivo `LICENSE` para más detalles.

---
Hecho con :heart: 2026.
