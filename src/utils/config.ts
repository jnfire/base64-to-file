import { ref, watch } from 'vue';

const getBool = (key: string, def: boolean) => {
  const item = localStorage.getItem(key);
  return item !== null ? item === 'true' : def;
};

export const autoCopyConfig = ref(getBool('base64-auto-copy', false));
export const mimeFormatConfig = ref(getBool('base64-mime-format', false));

watch(autoCopyConfig, (val) => {
  localStorage.setItem('base64-auto-copy', val ? 'true' : 'false');
});

watch(mimeFormatConfig, (val) => {
  localStorage.setItem('base64-mime-format', val ? 'true' : 'false');
});
