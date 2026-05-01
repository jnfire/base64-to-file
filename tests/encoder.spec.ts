import { describe, it, expect } from 'vitest';
import { extractRawBase64 } from '../src/core/encoder';

describe('Encoder Utilities', () => {
  describe('extractRawBase64', () => {
    it('debe extraer el base64 raw de un data URI válido', () => {
      const dataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
      const expected = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
      expect(extractRawBase64(dataUri)).toBe(expected);
    });

    it('debe devolver la misma cadena si no tiene el prefijo de data URI', () => {
      const rawString = 'SGVsbG8gV29ybGQ=';
      expect(extractRawBase64(rawString)).toBe(rawString);
    });

    it('debe manejar correctamente un data URI sin tipo mime explícito pero con prefijo base64', () => {
      const dataUri = 'data:;base64,SGVsbG8gV29ybGQ=';
      const expected = 'SGVsbG8gV29ybGQ=';
      expect(extractRawBase64(dataUri)).toBe(expected);
    });
  });
});
