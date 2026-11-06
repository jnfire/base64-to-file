import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { useBase64Converter } from '../src/composables/useBase64Converter';

// "Hello" as a text file, and the same with a Data URI prefix.
const HELLO = btoa('Hello');
const PNG_URI = 'data:image/png;base64,' + btoa('\x89PNG\r\n\x1a\nrest');

describe('useBase64Converter (live decoding)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does nothing while the box is empty, and it is not an error', async () => {
    const converter = useBase64Converter();
    await nextTick();
    expect(converter.fileInfo.value).toBeNull();
    expect(converter.error.value).toBe('');
  });

  it('decodes as soon as a short text is pasted', async () => {
    const converter = useBase64Converter();
    converter.base64Input.value = HELLO;
    await nextTick();
    expect(converter.fileInfo.value).not.toBeNull();
    expect(new TextDecoder().decode(converter.fileInfo.value!.data)).toBe('Hello');
    expect(converter.error.value).toBe('');
  });

  it('reads the type from a Data URI and says so', async () => {
    const converter = useBase64Converter();
    converter.base64Input.value = PNG_URI;
    await nextTick();
    expect(converter.fileInfo.value).toMatchObject({
      mime: 'image/png',
      extension: 'png',
      source: 'uri',
    });
  });

  it('detects the type from the content when there is no Data URI', async () => {
    const converter = useBase64Converter();
    converter.base64Input.value = PNG_URI.split(',')[1];
    await nextTick();
    expect(converter.fileInfo.value).toMatchObject({ mime: 'image/png', source: 'signature' });
  });

  it('uses the chosen type in manual mode, and decodes again when it changes', async () => {
    const converter = useBase64Converter();
    converter.base64Input.value = HELLO;
    await nextTick();

    converter.detectionMode.value = 'manual';
    await nextTick();
    expect(converter.fileInfo.value).toMatchObject({
      mime: converter.selectedManualType.value.mime,
      source: 'manual',
    });

    const pdf = converter.COMMON_TYPES.find((type) => type.extension === 'pdf')!;
    converter.selectedManualType.value = pdf;
    await nextTick();
    expect(converter.fileInfo.value?.mime).toBe('application/pdf');
  });

  it('reports an error for text that is not Base64, and recovers when it is fixed', async () => {
    const converter = useBase64Converter();
    converter.base64Input.value = 'esto no es base64 válido ñ!';
    await nextTick();
    expect(converter.error.value).toBe('invalid');
    expect(converter.fileInfo.value).toBeNull();

    converter.base64Input.value = HELLO;
    await nextTick();
    expect(converter.error.value).toBe('');
    expect(converter.fileInfo.value).not.toBeNull();
  });

  it('clears the result when the box is emptied', async () => {
    const converter = useBase64Converter();
    converter.base64Input.value = HELLO;
    await nextTick();
    converter.base64Input.value = '';
    await nextTick();
    expect(converter.fileInfo.value).toBeNull();
    expect(converter.error.value).toBe('');
  });

  it('waits for a pause before decoding a long text', async () => {
    const converter = useBase64Converter();
    converter.base64Input.value = btoa('a'.repeat(30_000));
    await nextTick();
    expect(converter.fileInfo.value).toBeNull();

    vi.advanceTimersByTime(299);
    expect(converter.fileInfo.value).toBeNull();
    vi.advanceTimersByTime(1);
    expect(converter.fileInfo.value?.data.length).toBe(30_000);
  });

  it('restarts the wait while a long text keeps changing', async () => {
    const converter = useBase64Converter();
    converter.base64Input.value = btoa('a'.repeat(30_000));
    await nextTick();
    vi.advanceTimersByTime(200);
    converter.base64Input.value = btoa('b'.repeat(30_000));
    await nextTick();
    vi.advanceTimersByTime(200);
    expect(converter.fileInfo.value).toBeNull();
    vi.advanceTimersByTime(100);
    expect(new TextDecoder().decode(converter.fileInfo.value!.data.slice(0, 1))).toBe('b');
  });

  it('clear() empties the box and the result', async () => {
    const converter = useBase64Converter();
    converter.base64Input.value = HELLO;
    await nextTick();
    converter.clear();
    expect(converter.base64Input.value).toBe('');
    expect(converter.fileInfo.value).toBeNull();
  });

  it('revokes the object URL of the file it replaces', async () => {
    const revoke = vi.spyOn(URL, 'revokeObjectURL');
    const converter = useBase64Converter();
    converter.base64Input.value = HELLO;
    await nextTick();
    const first = converter.fileInfo.value!.objectUrl;

    converter.base64Input.value = btoa('World');
    await nextTick();
    expect(revoke).toHaveBeenCalledWith(first);
    revoke.mockRestore();
  });
});
