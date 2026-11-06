import { describe, expect, it } from 'vitest';
import { formatSize } from '../src/utils/format';

describe('formatSize', () => {
  it('shows small sizes in bytes', () => {
    expect(formatSize(0, 'en')).toBe('0 B');
    expect(formatSize(1023, 'en')).toBe('1023 B');
  });

  it('uses two decimals under 10 KB and one above', () => {
    expect(formatSize(1807, 'en')).toBe('1.76 KB');
    expect(formatSize(12738, 'en')).toBe('12.4 KB');
  });

  it('switches to MB from 1024 KB', () => {
    expect(formatSize(1024 * 1024, 'en')).toBe('1.00 MB');
    expect(formatSize(5 * 1024 * 1024, 'en')).toBe('5.00 MB');
  });

  it('uses the decimal separator of the language', () => {
    expect(formatSize(1807, 'es')).toBe('1,76 KB');
    expect(formatSize(1807, 'de')).toBe('1,76 KB');
    expect(formatSize(1807, 'en')).toBe('1.76 KB');
  });
});
