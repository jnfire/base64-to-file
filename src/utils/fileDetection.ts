/**
 * Utilities for Base64 decoding and file type detection.
 */

export interface FileInfo {
  mime: string;
  extension: string;
  data: Uint8Array;
}

/**
 * Decodes a Base64 string into a Uint8Array.
 */
export function decodeBase64(base64: string): Uint8Array {
  // Remove possible Data URI prefix
  const pureBase64 = base64.includes(',') ? base64.split(',')[1] : base64;
  const binaryString = atob(pureBase64.trim());
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Extracts MIME type and data from a Data URI.
 */
export function extractDataUriInfo(dataUri: string): { mime: string; extension: string } | null {
  const match = dataUri.match(/^data:([^;]+);base64,/);
  if (!match) return null;

  const mime = match[1];
  const extension = mime.split('/')[1] || 'bin';
  return { mime, extension };
}

/**
 * Detects file type from the first few bytes (Magic Bytes).
 */
export function detectFileType(bytes: Uint8Array): { mime: string; extension: string } {
  if (bytes.length < 4) return { mime: 'application/octet-stream', extension: 'bin' };

  // PNG: 89 50 4E 47
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
    return { mime: 'image/png', extension: 'png' };
  }

  // JPEG: FF D8 FF
  if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
    return { mime: 'image/jpeg', extension: 'jpg' };
  }

  // PDF: 25 50 44 46 (%PDF)
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return { mime: 'application/pdf', extension: 'pdf' };
  }

  // ZIP: 50 4B 03 04 (PK..)
  if (bytes[0] === 0x50 && bytes[1] === 0x4B && bytes[2] === 0x03 && bytes[3] === 0x04) {
    return { mime: 'application/zip', extension: 'zip' };
  }

  // GIF: 47 49 46 38 (GIF8)
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) {
    return { mime: 'image/gif', extension: 'gif' };
  }

  // XML: 3C 3F 78 6D (<?xm)
  if (bytes[0] === 0x3C && bytes[1] === 0x3F && bytes[2] === 0x78 && bytes[3] === 0x6D) {
    return { mime: 'application/xml', extension: 'xml' };
  }

  // Default to octet-stream
  return { mime: 'application/octet-stream', extension: 'bin' };
}

/**
 * Common MIME types for manual selection.
 */
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

/**
 * Checks if a MIME type is previewable in common browsers.
 */
export function isPreviewable(mime: string): boolean {
  return (
    mime.startsWith('image/') ||
    mime === 'application/pdf' ||
    mime.startsWith('text/') ||
    mime === 'application/json' ||
    mime === 'application/xml' ||
    mime === 'image/svg+xml'
  );
}
