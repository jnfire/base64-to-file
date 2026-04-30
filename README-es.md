# Base64 to File Converter 📁

*Read this in [English](README.md).*

Una herramienta web rápida, privada y sin servidor diseñada para desarrolladores y usuarios técnicos. Permite decodificar cadenas de texto en formato Base64 (incluyendo Data URIs) y recuperar los archivos originales de forma instantánea.

Todo el procesamiento se realiza localmente en tu navegador web, lo que garantiza una **privacidad total** de tus datos. Construida con **Vue 3 (Composition API)** y **TypeScript**.

## ✨ Características Principales
- **Detección Dual:**
  - **Automática:** Identifica el tipo de archivo mediante Data URI o analizando los *Magic Bytes* del binario (PNG, JPEG, PDF, ZIP, GIF, XML).
  - **Manual:** Permite forzar el tipo de archivo desde un selector de formatos comunes (Word, Excel, JSON, SVG, etc.).
- **Previsualización Inteligente:**
  - **Imágenes y SVG:** Visualización directa en el navegador.
  - **PDF:** Embebido para revisión rápida sin descarga.
  - **Datos (JSON/XML/Texto):** Visor de código con **auto-formateo para JSON** para una lectura cómoda.
- **Privacidad Total:** Todo el procesamiento ocurre 100% en el cliente. Tus datos nunca salen de tu navegador.
- **Interfaz:** Diseño limpio, responsivo y con soporte para temas claro/oscuro. Soporte multi-idioma.

## 🛠️ Tecnologías Utilizadas
- **Vue.js 3** (Composition API) + **Vite**
- **TypeScript** para un código robusto y tipado.
- **Vue-i18n** para el soporte multi-idioma.
- **Vanilla CSS** para un rendimiento óptimo y sin dependencias externas.

## 📁 Estructura del Proyecto
El proyecto sigue una arquitectura modular separando la lógica de negocio de la vista. Puedes ver los detalles en [`docs/ARCHITECTURE-es.md`](docs/ARCHITECTURE-es.md).

## 🚀 Cómo ejecutarlo localmente
Consulta nuestra guía detallada en [`docs/CONTRIBUTING-es.md`](docs/CONTRIBUTING-es.md).

## 📄 Licencia
Este proyecto está licenciado bajo la **GNU General Public License v3.0 (GPL-3.0)**. Consulta el archivo `LICENSE` para más detalles.

---
Hecho con :heart: 2026.
