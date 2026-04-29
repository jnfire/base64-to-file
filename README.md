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
El proyecto sigue una arquitectura modular separando la lógica de negocio de la vista:
- `src/core/`: Lógica de dominio pura (Typescript).
  - `decoder.ts`: Decodificación Base64.
  - `detector.ts`: Detección de tipos MIME (*Magic Bytes* y Data URIs).
  - `preview.ts`: Reglas de previsualización.
- `src/composables/`: Hooks de Vue que conectan el estado y la lógica de negocio con la interfaz (`useBase64Converter.ts`).
- `src/components/`: Componentes de interfaz de usuario de responsabilidad única (`ConverterInput`, `FileResult`, etc.).
- `tests/`: Pruebas unitarias para asegurar la estabilidad de la capa core.

## 🚀 Cómo ejecutarlo localmente
1. **Instalar dependencias:**
   ```bash
   npm install
   ```
2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
3. **Ejecutar Pruebas Unitarias:**
   El proyecto utiliza **Vitest** para garantizar el funcionamiento correcto de su núcleo lógico.
   ```bash
   npm run test
   ```
4. **Construir para producción:**
   ```bash
   npm run build
   ```

---
Hecho con :heart: 2026.
