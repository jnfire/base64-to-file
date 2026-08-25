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
    
    if (mimeFormatConfig.value) {
      // Add line breaks every 76 characters
      const regex = /.{1,76}/g;
      const chunks = result.match(regex);
      if (chunks) {
        result = chunks.join('\n');
      }
    }
    return result;
  });

  const encodeFile = async (file: File) => {
    error.value = null;
    selectedFile.value = file;
    isEncoding.value = true;
    
    try {
      dataUriResult.value = await fileToDataUri(file);
      if (autoCopyConfig.value) {
        // give it a tick to compute
        setTimeout(() => {
          copyToClipboard();
        }, 50);
      }
    } catch (e: any) {
      if (e.message === 'FILE_TOO_LARGE') {
        const mb = (MAX_FILE_SIZE_BYTES / 1024 / 1024).toFixed(0);
        error.value = `El archivo supera el límite de seguridad de ${mb}MB.`;
      } else {
        error.value = 'Error al leer el archivo.';
      }
      dataUriResult.value = '';
    } finally {
      isEncoding.value = false;
    }
  };

  const clear = () => {
    selectedFile.value = null;
    dataUriResult.value = '';
    error.value = null;
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = true;
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = false;
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = true;
  };

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = false;
    
    if (e.dataTransfer && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      await encodeFile(file);
    }
  };

  const copyToClipboard = async () => {
    if (!finalBase64Result.value) return false;
    try {
      await navigator.clipboard.writeText(finalBase64Result.value);
      return true;
    } catch (err) {
      console.error('Error al copiar:', err);
      return false;
    }
  };

  return {
    selectedFile,
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
