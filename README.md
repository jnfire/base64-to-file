# Base64 to File Converter 📁

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
- **Interfaz:** Diseño limpio, responsivo y con soporte para temas claro/oscuro.

## 🛠️ Tecnologías Utilizadas
- **Vue.js 3** (Composition API) + **Vite**
- **TypeScript** para un código robusto y tipado.
- **Vanilla CSS** para un rendimiento óptimo y sin dependencias externas.

## 📁 Estructura del Proyecto
- `src/utils/fileDetection.ts`: Lógica central de decodificación y detección de tipos.
- `src/App.vue`: Interfaz de usuario reactiva y visualizadores.
- `index.html`: Configuración global, título y favicon (📁).

## 🚀 Cómo ejecutarlo localmente
1. **Instalar dependencias:**
   ```bash
   npm install
   ```
2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
3. **Construir para producción:**
   ```bash
   npm run build
   ```

---
Hecho con :heart: 2026.
