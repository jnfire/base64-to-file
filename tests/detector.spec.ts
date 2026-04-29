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
      const bytes = new Uint8Array([0x89, 0x50, 0x4E]); // Only 3 bytes
      const result = detectFileType(bytes);
      
      expect(result.mime).toBe('application/octet-stream');
      expect(result.extension).toBe('bin');
    });

    it('should detect PNG files', () => {
      // PNG Magic Bytes: 89 50 4E 47
      const bytes = new Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
      const result = detectFileType(bytes);
      
      expect(result.mime).toBe('image/png');
      expect(result.extension).toBe('png');
    });

    it('should detect PDF files', () => {
      // PDF Magic Bytes: 25 50 44 46 (%PDF)
      const bytes = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2D, 0x31, 0x2E, 0x35]);
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
});
