import type { DetectFileTypeResult } from './types';

function isPng(bytes: Uint8Array): boolean {
  return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47;
}

function isJpeg(bytes: Uint8Array): boolean {
  return bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF;
}

function isPdf(bytes: Uint8Array): boolean {
  return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
}

function isZip(bytes: Uint8Array): boolean {
  return bytes[0] === 0x50 && bytes[1] === 0x4B && bytes[2] === 0x03 && bytes[3] === 0x04;
}

function isGif(bytes: Uint8Array): boolean {
  return bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38;
}

function isXml(bytes: Uint8Array): boolean {
  return bytes[0] === 0x3C && bytes[1] === 0x3F && bytes[2] === 0x78 && bytes[3] === 0x6D;
}

export function extractDataUriInfo(dataUri: string): DetectFileTypeResult | null {
  const match = dataUri.match(/^data:([^;]+);base64,/);
  if (!match) return null;

  const mime = match[1];
  const extension = mime.split('/')[1] || 'bin';
  return { mime, extension };
}

export function detectFileType(bytes: Uint8Array): DetectFileTypeResult {
  if (bytes.length < 4) {
    return { mime: 'application/octet-stream', extension: 'bin' };
  }

  if (isPng(bytes)) return { mime: 'image/png', extension: 'png' };
  if (isJpeg(bytes)) return { mime: 'image/jpeg', extension: 'jpg' };
  if (isPdf(bytes)) return { mime: 'application/pdf', extension: 'pdf' };
  if (isZip(bytes)) return { mime: 'application/zip', extension: 'zip' };
  if (isGif(bytes)) return { mime: 'image/gif', extension: 'gif' };
  if (isXml(bytes)) return { mime: 'application/xml', extension: 'xml' };

  return { mime: 'application/octet-stream', extension: 'bin' };
}
