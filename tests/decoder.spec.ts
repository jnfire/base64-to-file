import { describe, it, expect } from 'vitest';
import { decodeBase64 } from '../src/core/decoder';

describe('decoder', () => {
  it('should decode a pure base64 string to Uint8Array correctly', () => {
    // "hello" in base64 is "aGVsbG8="
    const base64 = 'aGVsbG8=';
    const result = decodeBase64(base64);
    
    expect(result).toBeInstanceOf(Uint8Array);
    const decodedText = new TextDecoder().decode(result);
    expect(decodedText).toBe('hello');
  });

  it('should strip Data URI prefix before decoding', () => {
    // Data URI for "hello"
    const dataUri = 'data:text/plain;base64,aGVsbG8=';
    const result = decodeBase64(dataUri);
    
    expect(result).toBeInstanceOf(Uint8Array);
    const decodedText = new TextDecoder().decode(result);
    expect(decodedText).toBe('hello');
  });

  it('should handle base64 with surrounding whitespaces', () => {
    const base64 = '  aGVsbG8=  ';
    const result = decodeBase64(base64);
    
    const decodedText = new TextDecoder().decode(result);
    expect(decodedText).toBe('hello');
  });
});
