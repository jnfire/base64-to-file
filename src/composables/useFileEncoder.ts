import { ref, computed, type UnwrapNestedRefs } from 'vue';
import { copyText } from '../utils/clipboard';
import { fileToDataUri, extractRawBase64, MAX_FILE_SIZE_BYTES } from '../core/encoder';
import { autoCopyConfig, mimeFormatConfig } from '../utils/config';

export function useFileEncoder() {
  const selectedFile = ref<File | null>(null);
  const dataUriResult = ref<string>('');
  const error = ref<string | null>(null);
  const includeDataUri = ref<boolean>(true);
  const isDragging = ref<boolean>(false);
  const isEncoding = ref<boolean>(false);
  const copied = ref<boolean>(false);
  let copiedTimer: ReturnType<typeof setTimeout> | undefined;

  const finalBase64Result = computed(() => {
    if (!dataUriResult.value) return '';
    let result = '';
    if (includeDataUri.value) {
      result = dataUriResult.value;
    } else {
      result = extractRawBase64(dataUriResult.value);
    }

    if (mimeFormatConfig.value && !includeDataUri.value) {
      // Add line breaks every 76 characters only for raw base64
      const regex = /.{1,76}/g;
      const chunks = result.match(regex);
      if (chunks) {
        result = chunks.join('\n');
      }
    }
    return result;
  });

  const fileObjectUrl = ref<string>('');

  const encodeFile = async (file: File) => {
    error.value = null;
    if (fileObjectUrl.value) {
      URL.revokeObjectURL(fileObjectUrl.value);
    }
    selectedFile.value = file;
    fileObjectUrl.value = URL.createObjectURL(file);
    isEncoding.value = true;

    try {
      dataUriResult.value = await fileToDataUri(file);
      if (autoCopyConfig.value) {
        // give it a tick to compute
        setTimeout(() => {
          copyToClipboard();
        }, 50);
      }
    } catch (encodingError: unknown) {
      const errorObject = encodingError as { message?: string };
      if (errorObject?.message === 'FILE_TOO_LARGE') {
        const maxMegabytes = (MAX_FILE_SIZE_BYTES / 1024 / 1024).toFixed(0);
        error.value = `El archivo supera el límite de seguridad de ${maxMegabytes}MB.`;
      } else {
        error.value = 'Error al leer el archivo.';
      }
      dataUriResult.value = '';
    } finally {
      isEncoding.value = false;
    }
  };

  const clear = () => {
    if (fileObjectUrl.value) {
      URL.revokeObjectURL(fileObjectUrl.value);
      fileObjectUrl.value = '';
    }
    selectedFile.value = null;
    dataUriResult.value = '';
    error.value = null;
  };

  const handleDragEnter = (dragEvent: DragEvent) => {
    dragEvent.preventDefault();
    isDragging.value = true;
  };

  const handleDragLeave = (dragEvent: DragEvent) => {
    dragEvent.preventDefault();
    isDragging.value = false;
  };

  const handleDragOver = (dragEvent: DragEvent) => {
    dragEvent.preventDefault();
    isDragging.value = true;
  };

  const handleDrop = async (dragEvent: DragEvent) => {
    dragEvent.preventDefault();
    isDragging.value = false;

    if (dragEvent.dataTransfer && dragEvent.dataTransfer.files.length > 0) {
      const file = dragEvent.dataTransfer.files[0];
      await encodeFile(file);
    }
  };

  const copyToClipboard = async () => {
    if (!finalBase64Result.value) return false;
    const done = await copyText(finalBase64Result.value);
    if (done) {
      copied.value = true;
      clearTimeout(copiedTimer);
      copiedTimer = setTimeout(() => {
        copied.value = false;
      }, 2000);
    }
    return done;
  };

  /** Size of the result in bytes. */
  const resultBytes = computed(() => finalBase64Result.value.length);

  /** How much bigger than the original file the result is, as a whole percentage. */
  const overheadPercent = computed(() => {
    const original = selectedFile.value?.size ?? 0;
    if (!original || !resultBytes.value) return 0;
    return Math.round((resultBytes.value / original - 1) * 100);
  });

  return {
    selectedFile,
    fileObjectUrl,
    dataUriResult,
    finalBase64Result,
    error,
    includeDataUri,
    isDragging,
    isEncoding,
    copied,
    resultBytes,
    overheadPercent,
    encodeFile,
    clear,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    copyToClipboard,
  };
}

/** The state as the screens see it, once Vue has unwrapped the refs. */
export type EncoderState = UnwrapNestedRefs<ReturnType<typeof useFileEncoder>>;
