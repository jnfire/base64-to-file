# Base64 to File Converter 📁

*Read this in [English](README.md).*

Una herramienta web rápida y local-first diseñada para desarrolladores y usuarios técnicos. Permite decodificar cadenas de texto en formato Base64 (incluyendo Data URIs) y recuperar los archivos originales de forma instantánea.

Todo el procesamiento se realiza localmente en tu navegador web, garantizando un **control total** de tus datos (Local-First). Construida con **Vue 3 (Composition API)** y **TypeScript**.

**▶ [Pruébalo: base64-to-file.jnfire.dev](https://base64-to-file.jnfire.dev/)**

![Base64 to File en escritorio y móvil](docs/screenshots/base64-to-file-hero.png)

## ✨ Características Principales
- **Detección Dual:**
  - **Automática:** Identifica el tipo de archivo mediante Data URI o analizando los *Magic Bytes* del binario (PNG, JPEG, PDF, ZIP, GIF, XML).
  - **Manual:** Permite forzar el tipo de archivo desde un selector de formatos comunes (Word, Excel, JSON, SVG, etc.).
- **Previsualización Inteligente:**
  - **Imágenes y SVG:** Visualización directa en el navegador.
  - **PDF:** Embebido para revisión rápida sin descarga.
  - **Datos (JSON/XML/Texto):** Visor de código con **auto-formateo para JSON** para una lectura cómoda.
- **Procesamiento Local:** Todo el procesamiento ocurre en el cliente. Tus archivos y datos convertidos nunca se envían a ningún servidor.
- **Sin rastreo:** sin cookies, sin analítica y sin registro.
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

## 📚 Documentación

- [Arquitectura](docs/ARCHITECTURE-es.md)
- [Sistema de diseño](docs/DESIGN-SYSTEM-es.md), compartido con las otras herramientas del portafolio
- [Roadmap](docs/ROADMAP-es.md)
- [Evolución](docs/evolution/README-es.md): cómo ha cambiado el proyecto, con capturas

## 🤝 Desarrollo

Diseñado y dirigido por [Javier Nicolás Pérez Mesa](https://github.com/jnfire): el producto, la arquitectura y las decisiones de diseño son del autor. La IA ha formado parte del trabajo como un experimento deliberado para aprender tecnología nueva: Gemini CLI, Antigravity, GitHub Copilot y Claude Code, probados uno tras otro. Empezó con pequeñas intervenciones y, a medida que avanzaba el experimento, fue ganando autonomía, siempre mediante pull requests que revisa el autor. Los commits hechos con Claude Code llevan un `Co-Authored-By`.

## 📄 Licencia
Copyright (C) 2026 Javier Nicolás Pérez Mesa.

Este proyecto es software libre publicado bajo la [Licencia Pública General Affero de GNU v3.0](LICENSE) (`AGPL-3.0-only`). Puedes usarlo, estudiarlo, modificarlo y compartirlo. Si distribuyes una versión modificada, o la ofreces a usuarios a través de una red, debes publicar su código fuente bajo la misma licencia.

---
Hecho por [Javier Nicolás Pérez Mesa](https://github.com/jnfire), 2026.
