import type { DetectFileTypeResult } from './types';
import { COMMON_TYPES } from './types';

function isPng(bytes: Uint8Array): boolean {
  return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
}

function isJpeg(bytes: Uint8Array): boolean {
  return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}

function isPdf(bytes: Uint8Array): boolean {
  return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
}

function isZip(bytes: Uint8Array): boolean {
  return bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04;
}

function isGif(bytes: Uint8Array): boolean {
  return bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38;
}

function isXml(bytes: Uint8Array): boolean {
  return bytes[0] === 0x3c && bytes[1] === 0x3f && bytes[2] === 0x78 && bytes[3] === 0x6d;
}

export function extractDataUriInfo(dataUri: string): DetectFileTypeResult | null {
  const match = dataUri.match(/^data:([^;]+);base64,/);
  if (!match) return null;

  const mime = match[1];
  // A known type has its own extension (image/svg+xml is .svg, image/jpeg is .jpg). For any
  // other one, the subtype, or its suffix when it has one: application/ld+json is .json.
  const known = COMMON_TYPES.find((type) => type.mime === mime);
  const subtype = mime.split('/')[1] || 'bin';
  const extension = known ? known.extension : (subtype.split('+').pop() as string);
  return { mime, extension };
}

/**
 * Returns the text if the bytes are text: valid UTF-8 with no control
 * characters other than tab and line breaks. Anything else, such as a file of
 * a type nobody has taught this detector, is not text.
 */
function readAsText(bytes: Uint8Array): string | null {
  let text: string;
  try {
    text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
  for (let index = 0; index < text.length; index += 1) {
    const code = text.charCodeAt(index);
    if (code < 32 && code !== 9 && code !== 10 && code !== 13) return null;
    if (code === 0x7f) return null;
  }
  return text;
}

function isJson(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) return false;
  try {
    JSON.parse(trimmed);
    return true;
  } catch {
    return false;
  }
}

export function detectFileType(bytes: Uint8Array): DetectFileTypeResult {
  if (bytes.length >= 4) {
    if (isPng(bytes)) return { mime: 'image/png', extension: 'png' };
    if (isJpeg(bytes)) return { mime: 'image/jpeg', extension: 'jpg' };
    if (isPdf(bytes)) return { mime: 'application/pdf', extension: 'pdf' };
    if (isZip(bytes)) return { mime: 'application/zip', extension: 'zip' };
    if (isGif(bytes)) return { mime: 'image/gif', extension: 'gif' };
    if (isXml(bytes)) return { mime: 'application/xml', extension: 'xml' };
  }

  // Without a signature, plain text is the next thing worth recognizing: the Base64 of a
  // JSON, an SVG or a note is very common (tokens, configuration, small files).
  const text = bytes.length > 0 ? readAsText(bytes) : null;
  if (text !== null) {
    if (isJson(text)) return { mime: 'application/json', extension: 'json' };
    if (text.trimStart().startsWith('<svg')) return { mime: 'image/svg+xml', extension: 'svg' };
    return { mime: 'text/plain', extension: 'txt' };
  }

  return { mime: 'application/octet-stream', extension: 'bin' };
}
