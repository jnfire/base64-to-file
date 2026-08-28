import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { nextTick } from 'vue';

describe('Config Utility Module', () => {
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};

    globalThis.localStorage = {
      getItem: (key: string) => mockStorage[key] ?? null,
      setItem: (key: string, value: string) => {
        mockStorage[key] = value;
      },
      removeItem: (key: string) => {
        delete mockStorage[key];
      },
      clear: () => {
        mockStorage = {};
      },
      key: () => null,
      length: 0
    };

    (globalThis as unknown as { window: unknown }).window = {
      localStorage: globalThis.localStorage
    };

    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('provides reactive configuration flags with fallback defaults', async () => {
    const { autoCopyConfig, mimeFormatConfig } = await import('../src/utils/config');
    expect(typeof autoCopyConfig.value).toBe('boolean');
    expect(typeof mimeFormatConfig.value).toBe('boolean');

    autoCopyConfig.value = true;
    await nextTick();
    expect(globalThis.localStorage.getItem('base64-auto-copy')).toBe('true');

    autoCopyConfig.value = false;
    await nextTick();
    expect(globalThis.localStorage.getItem('base64-auto-copy')).toBe('false');
  });

  it('safely handles localStorage write exceptions', async () => {
    const { mimeFormatConfig } = await import('../src/utils/config');
    vi.spyOn(globalThis.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('Storage write failed');
    });

    expect(() => {
      mimeFormatConfig.value = true;
    }).not.toThrow();
  });
});
