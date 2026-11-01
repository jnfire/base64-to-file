# Evolución

*Leer esto en [Inglés](README.md).*

Cómo Base64 to File pasó de su primer commit a hoy, con las capturas para verlo.

![Base64 to File en tres etapas, escritorio](base64-to-file-evolution-desktop.png)

## La historia

Base64 to File no ha cambiado tanto de aspecto como de forma. Empezó como un decodificador con un título grande y etiquetas. Cada necesidad real que apareció añadió una pieza, y cada pieza se convirtió en un componente o en un patrón: pestañas cuando hubo dos direcciones, un componente de vista previa común para imágenes, PDF y texto, una tarjeta de ajustes para el tema y las opciones del codificador, un selector de idioma accesible. Por el camino la interfaz se hizo más simple: desapareció el bloque grande de presentación y el pie de página dice los hechos.

Versiones: la v0.1.0 y la v0.2.0 (mayo de 2026) se quedan como estaban; este trabajo las continúa como 1.0.0.

## Cronología

| Cuándo | Qué pasó |
| --- | --- |
| Abril de 2026 | Primer commit. |
| Mayo de 2026 | Primera versión (v0.1.0): el decodificador, con su título grande, la bandera del idioma y las etiquetas. Una semana después (v0.2.0) llegó el codificador, con pestañas y un diseño para móvil. |
| Julio–agosto de 2026 | Selector de idioma accesible con banderas, cabecera fija con la versión en el pie, configuración unificada (tema y opciones del codificador), roles ARIA y teclado, un componente de vista previa común y más tests. |
| Octubre de 2026 | Software libre (AGPL-3.0), sin Google Analytics ni banner de cookies, un sistema de diseño compartido con las otras dos herramientas, CI que condiciona cada despliegue y la versión 1.0.0, el paso siguiente a la 0.1.0 y la 0.2.0. |

## En cifras

| | Antes (agosto de 2026) | Ahora |
| --- | --- | --- |
| Tests automáticos | 29 | 46 |
| Licencia | Todos los derechos reservados | AGPL-3.0 |
| Analítica | Google Analytics y banner de cookies | Ninguna |
| Despliegue | Solo si pasan los tests | Solo si pasan lint, formato, componentes compartidos, tests y build |
| Avisos de dependencias (npm audit) | Gravedad alta (vue-i18n) | Ninguno |

La columna "antes" es el estado del proyecto el 28 de agosto de 2026, justo antes de la ronda de trabajo que se describe arriba.

## Imágenes

Todas las imágenes están en esta carpeta y en [`../screenshots`](../screenshots); usan datos de ejemplo.

- [`base64-to-file-evolution-desktop.png`](base64-to-file-evolution-desktop.png): Tres etapas una junto a otra, en escritorio
- [`base64-to-file-evolution-mobile.png`](base64-to-file-evolution-mobile.png): Las mismas tres etapas en el móvil

## Cómo se ha construido

Diseñado y dirigido por [Javier Nicolás Pérez Mesa](https://github.com/jnfire): el producto, la arquitectura y las decisiones de diseño son del autor. La IA ha formado parte del trabajo como un experimento deliberado para aprender tecnología nueva: Gemini CLI, Antigravity, GitHub Copilot y Claude Code, probados uno tras otro. Empezó con pequeñas intervenciones y, a medida que avanzaba el experimento, fue ganando autonomía, siempre mediante pull requests que revisa el autor. Los commits hechos con Claude Code llevan un `Co-Authored-By`.
