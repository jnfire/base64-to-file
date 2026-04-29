import { ref, computed, watch } from 'vue';
import type { FileInfo } from '../core/types';
import { COMMON_TYPES } from '../core/types';
import { decodeBase64 } from '../core/decoder';
import { extractDataUriInfo, detectFileType } from '../core/detector';
import { isPreviewable } from '../core/preview';

export function useBase64Converter() {
  const base64Input = ref('');
  const error = ref('');
  const detectionMode = ref<'auto' | 'manual'>('auto');
  const selectedManualType = ref(COMMON_TYPES[0]);

  const fileInfo = ref<FileInfo | null>(null);

  const convert = () => {
    error.value = '';
    fileInfo.value = null;

    if (!base64Input.value.trim()) {
      error.value = 'Por favor, pega un código Base64.';
      return;
    }

    try {
      const input = base64Input.value.trim();
      let mime = '';
      let extension = '';

      const decodedData = decodeBase64(input);

      if (detectionMode.value === 'manual') {
        mime = selectedManualType.value.mime;
        extension = selectedManualType.value.extension;
      } else {
        const dataUriInfo = extractDataUriInfo(input);
        if (dataUriInfo) {
          mime = dataUriInfo.mime;
          extension = dataUriInfo.extension;
        }

        if (!mime) {
          const detected = detectFileType(decodedData);
          mime = detected.mime;
          extension = detected.extension;
        }
      }

      const blob = new Blob([decodedData], { type: mime });
      const objectUrl = URL.createObjectURL(blob);

      fileInfo.value = {
        mime,
        extension,
        data: decodedData,
        objectUrl
      };
    } catch (e) {
      console.error(e);
      error.value = 'Error al decodificar Base64. Asegúrate de que el formato sea correcto.';
    }
  };

  const clear = () => {
    base64Input.value = '';
    error.value = '';
    if (fileInfo.value?.objectUrl) {
      URL.revokeObjectURL(fileInfo.value.objectUrl);
    }
    fileInfo.value = null;
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

  // Evitar memory leaks revocando la URL antigua si cambia
  watch(fileInfo, (newVal, oldVal) => {
    if (oldVal?.objectUrl && newVal?.objectUrl !== oldVal.objectUrl) {
      URL.revokeObjectURL(oldVal.objectUrl);
    }
  });

  const previewPossible = computed(() => {
    return fileInfo.value ? isPreviewable(fileInfo.value.mime) : false;
  });

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
    previewPossible
  };
}
