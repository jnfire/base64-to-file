import { ref, computed, watch, getCurrentScope, onScopeDispose, type UnwrapNestedRefs } from 'vue';
import type { FileInfo, FileTypeSource } from '../core/types';
import { COMMON_TYPES } from '../core/types';
import { decodeBase64 } from '../core/decoder';
import { extractDataUriInfo, detectFileType } from '../core/detector';
import { isPreviewable } from '../core/preview';

/** Texts longer than this wait a moment after the last change before decoding. */
const LONG_INPUT_CHARS = 20_000;
const LONG_INPUT_DELAY_MS = 300;

export type DecodeError = '' | 'invalid';

export function useBase64Converter() {
  const base64Input = ref('');
  const error = ref<DecodeError>('');
  const detectionMode = ref<'auto' | 'manual'>('auto');
  const selectedManualType = ref(COMMON_TYPES[0]);

  const fileInfo = ref<FileInfo | null>(null);
  let timer: ReturnType<typeof setTimeout> | undefined;

  const releaseFile = () => {
    if (fileInfo.value?.objectUrl) {
      URL.revokeObjectURL(fileInfo.value.objectUrl);
    }
    fileInfo.value = null;
  };

  /** Decodes what is in the box right now. An empty box is not an error. */
  const convert = () => {
    clearTimeout(timer);
    releaseFile();
    error.value = '';

    const input = base64Input.value.trim();
    if (!input) return;

    try {
      const decodedData = decodeBase64(input);
      let mime = '';
      let extension = '';
      let source: FileTypeSource = 'signature';

      if (detectionMode.value === 'manual') {
        mime = selectedManualType.value.mime;
        extension = selectedManualType.value.extension;
        source = 'manual';
      } else {
        const dataUriInfo = extractDataUriInfo(input);
        if (dataUriInfo) {
          mime = dataUriInfo.mime;
          extension = dataUriInfo.extension;
          source = 'uri';
        } else {
          const detected = detectFileType(decodedData);
          mime = detected.mime;
          extension = detected.extension;
        }
      }

      const objectUrl = URL.createObjectURL(new Blob([decodedData], { type: mime }));
      fileInfo.value = { mime, extension, data: decodedData, objectUrl, source };
    } catch {
      error.value = 'invalid';
    }
  };

  // Decoding follows what is typed or pasted. Short texts decode at once; long
  // ones wait for a pause, so that a multi-megabyte paste is not decoded on
  // every key.
  watch([base64Input, detectionMode, selectedManualType], () => {
    clearTimeout(timer);
    if (base64Input.value.length > LONG_INPUT_CHARS) {
      timer = setTimeout(convert, LONG_INPUT_DELAY_MS);
    } else {
      convert();
    }
  });

  const clear = () => {
    clearTimeout(timer);
    base64Input.value = '';
    error.value = '';
    releaseFile();
  };

  const download = () => {
    if (!fileInfo.value) return;
    const a = document.createElement('a');
    a.href = fileInfo.value.objectUrl;
    a.download = `archivo_recuperado.${fileInfo.value.extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const previewPossible = computed(() => {
    return fileInfo.value ? isPreviewable(fileInfo.value.mime) : false;
  });

  /** Size of the text in the box, in bytes. */
  const inputBytes = computed(() => base64Input.value.length);

  if (getCurrentScope()) {
    onScopeDispose(() => {
      clearTimeout(timer);
      releaseFile();
    });
  }

  return {
    base64Input,
    error,
    detectionMode,
    selectedManualType,
    fileInfo,
    COMMON_TYPES,
    convert,
    clear,
    download,
    previewPossible,
    inputBytes,
  };
}

/** The state as the screens see it, once Vue has unwrapped the refs. */
export type DecoderState = UnwrapNestedRefs<ReturnType<typeof useBase64Converter>>;
