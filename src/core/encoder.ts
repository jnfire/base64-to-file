export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Convierte un objeto File nativo a una cadena Data URI (Base64)
 */
export function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      reject(new Error('FILE_TOO_LARGE'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('INVALID_RESULT_TYPE'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('FILE_READ_ERROR'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Elimina el prefijo "data:[mime];base64," de una cadena Data URI
 * dejando únicamente el Base64 en bruto (Raw).
 */
export function extractRawBase64(dataUri: string): string {
  const commaIndex = dataUri.indexOf(',');
  if (commaIndex !== -1) {
    return dataUri.substring(commaIndex + 1);
  }
  return dataUri; // Fallback si no tiene prefijo
}
