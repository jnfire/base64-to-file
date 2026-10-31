# Roadmap

*Leer esto en [Inglés](ROADMAP.md).*

Lo que hace Base64 to File hoy y hacia dónde podría ir. Las ideas están ordenadas por lo que ayudarían; son ideas, no compromisos ni fechas.

## Lo que hace hoy

- Decodificar Base64 y Data URI a archivos, con detección automática del tipo (Data URI y *magic bytes*) o tipo manual.
- Codificar cualquier archivo (hasta 5 MB) a Base64, con o sin el prefijo Data URI.
- Vista previa de imágenes, SVG, PDF y texto, con el JSON formateado para leerlo.
- Todo se ejecuta en el navegador, en seis idiomas, con tema claro y oscuro.

## Ideas

1. **Base64 seguro para URL** (la variante con `-` y `_` que usan los JWT y las URL): detectarla y decodificarla.
2. **Errores más claros:** decir qué falla en la entrada (carácter no válido, relleno incorrecto) en lugar de un mensaje genérico.
3. **Uso sin conexión** como aplicación instalable (PWA).
4. **Varios archivos a la vez** al codificar.
5. **Más vistas previas** (audio y vídeo); hoy cubren imágenes, SVG, PDF y texto.
6. **Un límite más alto con aviso** en lugar de 5 MB fijos.
7. **Tests automáticos de la interfaz;** hoy solo se prueban la lógica del núcleo y los ajustes.

## Fuera de alcance

- Cuentas, un backend o cualquier almacenamiento en un servidor: lo que escribes se queda en tu navegador, salvo las peticiones a los servicios públicos que se listan en [`ARCHITECTURE-es.md`](ARCHITECTURE-es.md).
- Publicidad y rastreo.
