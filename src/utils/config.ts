import { ref, watch } from 'vue';

const getBoolConfig = (storageKey: string, defaultValue: boolean): boolean => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return defaultValue;
    }
    const storedValue = window.localStorage.getItem(storageKey);
    return storedValue !== null ? storedValue === 'true' : defaultValue;
  } catch (storageError) {
    return defaultValue;
  }
};

export const autoCopyConfig = ref<boolean>(getBoolConfig('base64-auto-copy', false));
export const mimeFormatConfig = ref<boolean>(getBoolConfig('base64-mime-format', false));

watch(autoCopyConfig, (isEnabled: boolean) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('base64-auto-copy', isEnabled ? 'true' : 'false');
    }
  } catch (storageError) {
    // ignore storage write errors
  }
});

watch(mimeFormatConfig, (isEnabled: boolean) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('base64-mime-format', isEnabled ? 'true' : 'false');
    }
  } catch (storageError) {
    // ignore storage write errors
  }
});
