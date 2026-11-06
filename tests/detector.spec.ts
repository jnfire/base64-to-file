import { describe, it, expect } from 'vitest';
import { extractDataUriInfo, detectFileType } from '../src/core/detector';

describe('detector', () => {
  describe('extractDataUriInfo', () => {
    it('should extract mime and extension from a valid Data URI', () => {
      const dataUri = 'data:image/png;base64,iVBORw0K...';
      const result = extractDataUriInfo(dataUri);

      expect(result).not.toBeNull();
      expect(result?.mime).toBe('image/png');
      expect(result?.extension).toBe('png');
    });

    it('should return null if the string is not a Data URI', () => {
      const pureBase64 = 'iVBORw0K...';
      const result = extractDataUriInfo(pureBase64);

      expect(result).toBeNull();
    });

    it.each([
      ['data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=', 'svg'],
      ['data:image/jpeg;base64,/9j/4AAQ', 'jpg'],
      ['data:application/ld+json;base64,e30=', 'json'],
      ['data:audio/mpeg;base64,SUQz', 'mpeg'],
    ])('should give a sensible extension for %s', (dataUri, extension) => {
      expect(extractDataUriInfo(dataUri)?.extension).toBe(extension);
    });

    it('should fallback to bin extension if mime has no subtype', () => {
      // Unlikely, but let's test the fallback
      const dataUri = 'data:something;base64,123';
      const result = extractDataUriInfo(dataUri);

      expect(result?.mime).toBe('something');
      expect(result?.extension).toBe('bin');
    });
  });

  describe('detectFileType', () => {
    it('should fallback to application/octet-stream if bytes < 4', () => {
      const bytes = new Uint8Array([0x89, 0x50, 0x4e]); // Only 3 bytes
      const result = detectFileType(bytes);

      expect(result.mime).toBe('application/octet-stream');
      expect(result.extension).toBe('bin');
    });

    it('should detect PNG files', () => {
      // PNG Magic Bytes: 89 50 4E 47
      const bytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
      const result = detectFileType(bytes);

      expect(result.mime).toBe('image/png');
      expect(result.extension).toBe('png');
    });

    it('should detect PDF files', () => {
      // PDF Magic Bytes: 25 50 44 46 (%PDF)
      const bytes = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x35]);
      const result = detectFileType(bytes);

      expect(result.mime).toBe('application/pdf');
      expect(result.extension).toBe('pdf');
    });

    it('should default to octet-stream for unknown signatures', () => {
      const bytes = new Uint8Array([0x12, 0x34, 0x56, 0x78]);
      const result = detectFileType(bytes);

      expect(result.mime).toBe('application/octet-stream');
      expect(result.extension).toBe('bin');
    });
  });

  describe('detectFileType: text without a signature', () => {
    const encode = (text: string) => new TextEncoder().encode(text);

    it('recognizes plain text', () => {
      expect(detectFileType(encode('Hola mundo\nSegunda línea con ñ y acentos.'))).toEqual({
        mime: 'text/plain',
        extension: 'txt',
      });
    });

    it('recognizes text shorter than four bytes', () => {
      expect(detectFileType(encode('Hi')).mime).toBe('text/plain');
    });

    it.each(['{"a":1,"b":[true,null]}', '[1, 2, 3]', '  {"padded": "yes"}\n'])(
      'recognizes JSON: %s',
      (json) => {
        expect(detectFileType(encode(json))).toEqual({
          mime: 'application/json',
          extension: 'json',
        });
      },
    );

    it('treats JSON-looking text that does not parse as plain text', () => {
      expect(detectFileType(encode('{not json at all')).mime).toBe('text/plain');
    });

    it('does not take a bare number or string for JSON', () => {
      expect(detectFileType(encode('42')).mime).toBe('text/plain');
      expect(detectFileType(encode('"hello"')).mime).toBe('text/plain');
    });

    it('recognizes an SVG without a Data URI', () => {
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"></svg>';
      expect(detectFileType(encode(svg))).toEqual({ mime: 'image/svg+xml', extension: 'svg' });
    });

    it('keeps the signatures first: an XML declaration is XML, not text', () => {
      expect(detectFileType(encode('<?xml version="1.0"?><a/>')).mime).toBe('application/xml');
    });

    it('does not take binary data for text', () => {
      expect(detectFileType(new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04])).mime).toBe(
        'application/octet-stream',
      );
      expect(detectFileType(new Uint8Array([0xc3, 0x28, 0x41, 0x42, 0x43])).mime).toBe(
        'application/octet-stream',
      );
      expect(detectFileType(encode('ok\u0000not text')).mime).toBe('application/octet-stream');
    });

    it('treats nothing as an unknown file', () => {
      expect(detectFileType(new Uint8Array([])).mime).toBe('application/octet-stream');
    });
  });
});
