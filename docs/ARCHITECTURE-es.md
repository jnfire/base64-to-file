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
  - Reconociendo texto plano, JSON y SVG cuando no hay firma: el UTF-8 válido sin caracteres de control es texto, y el texto que se interpreta como objeto o lista es JSON.
- **`preview.ts`**: Contiene las reglas de negocio que determinan si un tipo MIME específico puede ser previsualizado de forma nativa en el navegador.

### 2. `src/composables/` (Capa de Adaptadores)
- **`useBase64Converter.ts`**: Un *composable* de Vue que sirve de puente entre la lógica pura del `core/` y la interfaz reactiva. Gestiona el estado (`base64Input`, `fileInfo`, `error`, `detectionMode`) y decodifica **en vivo**: un texto corto se decodifica en cuanto cambia, y uno de más de 20.000 caracteres espera 300 ms tras el último cambio. Una caja vacía no es un error. `fileInfo.source` indica de dónde salió el tipo (Data URI, el contenido del archivo o elegido a mano).
- **`useFileEncoder.ts`**: Lo mismo para codificar un archivo: arrastrar y soltar, el resultado Base64 (con o sin el prefijo Data URI), su tamaño y cuánto más grande es que el archivo, y el copiado con una breve confirmación.
- **`useRoute.ts`**: La pantalla se elige con el hash de la URL (`#/` decodifica, `#/codificar` codifica, `#/ajustes` son los ajustes), así que el botón Atrás funciona.
- **`keys.ts`**: El estado de las dos direcciones se crea una vez en `App.vue` y se proporciona con estas claves, así se conserva al moverse entre pantallas.

### 3. `src/components/` (Capa de Presentación)
Componentes de Vue de responsabilidad única.
- **`App.vue`**: Estructura raíz. Cabecera, la pantalla de la ruta y el pie.
- **`AppHeader.vue`**: Muestra el título, el subtítulo y el acceso a la configuración (componente compartido).
- **`ConverterView.vue`**: El selector de dirección (una lista de pestañas) y los dos paneles con la flecha entre ellos. En pantallas estrechas los paneles van uno debajo del otro.
- **`ConverterInput.vue`**: El panel para pegar Base64: el área de texto, el modo Auto o Manual, el selector de tipo en Manual, las etiquetas de detección y el error.
- **`FileResult.vue`**: El archivo decodificado: tipo, extensión y tamaño como etiquetas, la previsualización inteligente y el botón de descarga. Mientras no hay archivo, explica qué aparecerá.
- **`EncoderInput.vue`**: El panel para elegir un archivo: zona de arrastrar y soltar y, después, la vista previa y una barra con el nombre y el tamaño.
- **`EncoderResult.vue`**: El Base64 generado, la opción del Data URI, su tamaño y el botón de copiar.
- **`FilePreview.vue`**: La previsualización de imágenes (sobre un fondo de cuadros, para ver la transparencia), PDF y texto.
- **`SettingsView.vue`**: Las opciones del codificador (`EncoderSettingsCard.vue`) y la `PersonalizationCard.vue` compartida.
- **`AppIcon.vue`**: Los pocos iconos que usan las pantallas.
- **`AppFooter.vue`**: Renderiza los hechos, la versión, los enlaces al código fuente/licencia y el crédito del autor.
- **Estilos**: los tokens (incluido el color de acento), los botones y la disposición están en `assets/base.css`, y las pantallas del conversor y de ajustes en `assets/converter.css`. El color de acento solo se define aquí, así que las otras herramientas del portafolio mantienen el suyo.

### 4. `src/i18n/` (Internacionalización)
Contiene los diccionarios para seis idiomas (`de`, `en`, `es`, `fr`, `it`, `pt`) y la configuración de `vue-i18n` para soportar múltiples idiomas sin problemas.

### 5. `tests/`
Contiene las pruebas unitarias de Vitest que mantienen estables la lógica de `core/` y la decodificación en vivo, y comprueban las rutas, el formato de tamaños y que los idiomas definen los mismos textos.

### Componentes compartidos

La cabecera, el pie, los selectores, la tarjeta de configuración, los iconos y la utilidad de tema se comparten byte a byte con las otras herramientas del portafolio. Lo que cambia en cada app (repositorio y autor) está en `src/app.config.ts`. Ver [`DESIGN-SYSTEM-es.md`](DESIGN-SYSTEM-es.md).
