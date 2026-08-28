import { ref, computed } from 'vue';
import { fileToDataUri, extractRawBase64, MAX_FILE_SIZE_BYTES } from '../core/encoder';
import { autoCopyConfig, mimeFormatConfig } from '../utils/config';

export function useFileEncoder() {
  const selectedFile = ref<File | null>(null);
  const dataUriResult = ref<string>('');
  const error = ref<string | null>(null);
  const includeDataUri = ref<boolean>(true);
  const isDragging = ref<boolean>(false);
  const isEncoding = ref<boolean>(false);

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
    try {
      await navigator.clipboard.writeText(finalBase64Result.value);
      return true;
    } catch (clipboardError) {
      console.error('Error al copiar:', clipboardError);
      return false;
    }
  };

  return {
    selectedFile,
    fileObjectUrl,
    dataUriResult,
    finalBase64Result,
    error,
    includeDataUri,
    isDragging,
    isEncoding,
    encodeFile,
    clear,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    copyToClipboard
  };
}
