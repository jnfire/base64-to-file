# Arquitectura del Proyecto

*Leer esto en [Inglés](ARCHITECTURE.md).*

El proyecto `base64-to-file` sigue una arquitectura limpia y modular que separa la lógica de negocio del framework de interfaz de usuario (Vue 3).

## Estructura de Directorios

### 1. `src/core/` (Capa de Dominio)
Esta carpeta contiene lógica pura en TypeScript. Es completamente independiente de cualquier framework.
- **`types.ts`**: Define interfaces estándar (`FileInfo`, `DetectFileTypeResult`) y constantes (`COMMON_TYPES`).
- **`decoder.ts`**: Maneja la decodificación real de cadenas Base64 a datos binarios (`Uint8Array`). Incluye funciones auxiliares para eliminar los prefijos de las Data URIs.
- **`detector.ts`**: Responsable de determinar el tipo MIME de los datos decodificados. Lo hace de dos formas:
  - Leyendo la cabecera de la Data URI (si se proporciona).
  - Inspeccionando los *Magic Bytes* (los primeros bytes del array binario) para detectar formatos como PNG, PDF, ZIP, etc.
- **`preview.ts`**: Contiene las reglas de negocio que determinan si un tipo MIME específico puede ser previsualizado de forma nativa en el navegador.

### 2. `src/composables/` (Capa de Adaptadores)
- **`useBase64Converter.ts`**: Un *composable* de Vue que sirve de puente entre la lógica pura del `core/` y la interfaz reactiva. Gestiona el estado (`base64Input`, `fileInfo`, `error`, `detectionMode`) y expone acciones (`convert()`, `clear()`, `download()`) a los componentes.

### 3. `src/components/` (Capa de Presentación)
Componentes de Vue de responsabilidad única.
- **`AppHeader.vue`**: Muestra el título, el subtítulo y el acceso a la configuración.
- **`ConverterInput.vue`**: Renderiza el área de texto de entrada, el selector de formato y los controles de modo.
- **`FileResult.vue`**: Muestra los metadatos del archivo decodificado, el botón de descarga y la previsualización inteligente.
- **`EncoderInput.vue`**: Proporciona el área de arrastrar y soltar y el selector de archivos para codificar.
- **`EncoderResult.vue`**: Muestra el resultado Base64 generado, la acción de copiado y la previsualización del archivo.
- **`AppFooter.vue`**: Renderiza los hechos, la versión, los enlaces al código fuente/licencia y el crédito del autor.

### 4. `src/i18n/` (Internacionalización)
Contiene los diccionarios para seis idiomas (`de`, `en`, `es`, `fr`, `it`, `pt`) y la configuración de `vue-i18n` para soportar múltiples idiomas sin problemas.

### 5. `tests/`
Contiene las pruebas unitarias de Vitest que aseguran que la lógica de `core/` permanece estable.

### Componentes compartidos

La cabecera, el pie, los selectores, la tarjeta de configuración, los iconos y la utilidad de tema se comparten byte a byte con las otras herramientas del portafolio. Lo que cambia en cada app (repositorio y autor) está en `src/app.config.ts`. Ver [`DESIGN-SYSTEM-es.md`](DESIGN-SYSTEM-es.md).
