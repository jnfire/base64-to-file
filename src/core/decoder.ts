function removeDataUriPrefix(base64String: string): string {
  if (base64String.includes(',')) {
    return base64String.split(',')[1];
  }
  return base64String;
}

function convertBase64StringToUint8Array(base64String: string): Uint8Array {
  const binaryString = atob(base64String.trim());
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function decodeBase64(base64: string): Uint8Array {
  const pureBase64 = removeDataUriPrefix(base64);
  return convertBase64StringToUint8Array(pureBase64);
}
