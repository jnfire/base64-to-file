export interface FileInfo {
  mime: string;
  extension: string;
  data: Uint8Array;
  objectUrl: string;
}

export interface DetectFileTypeResult {
  mime: string;
  extension: string;
}

export const COMMON_TYPES = [
  { label: 'Imagen PNG', mime: 'image/png', extension: 'png' },
  { label: 'Imagen JPEG', mime: 'image/jpeg', extension: 'jpg' },
  { label: 'Documento PDF', mime: 'application/pdf', extension: 'pdf' },
  { label: 'Archivo ZIP', mime: 'application/zip', extension: 'zip' },
  { label: 'Imagen GIF', mime: 'image/gif', extension: 'gif' },
  { label: 'Texto Plano', mime: 'text/plain', extension: 'txt' },
  { label: 'Archivo JSON', mime: 'application/json', extension: 'json' },
  { label: 'Archivo XML', mime: 'application/xml', extension: 'xml' },
  { label: 'Documento Word', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', extension: 'docx' },
  { label: 'Hoja de Excel', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', extension: 'xlsx' },
  { label: 'Imagen SVG', mime: 'image/svg+xml', extension: 'svg' },
];
