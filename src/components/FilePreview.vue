<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps<{
  objectUrl: string;
  mimeType: string;
  fileName?: string;
  /** Text for a type that cannot be previewed; the default asks to download the file. */
  fallback?: string;
}>();

const isImage = computed(() => {
  const mime = props.mimeType.toLowerCase();
  return mime.startsWith('image/') || mime === 'image/svg+xml';
});

const isPdf = computed(() => props.mimeType.toLowerCase() === 'application/pdf');

const isText = computed(() => {
  const mime = props.mimeType.toLowerCase();
  return (
    mime.startsWith('text/') ||
    mime === 'application/json' ||
    mime === 'application/xml' ||
    mime === 'application/javascript' ||
    mime === 'application/typescript' ||
    mime === 'application/x-yaml'
  );
});

const textContent = ref<string>('');

watch(
  () => [props.objectUrl, props.mimeType],
  async ([currentUrl, currentMime]) => {
    if (currentUrl && isText.value) {
      try {
        const response = await fetch(currentUrl);
        const rawText = await response.text();
        if (currentMime === 'application/json') {
          try {
            textContent.value = JSON.stringify(JSON.parse(rawText), null, 2);
          } catch {
            textContent.value = rawText;
          }
        } else {
          textContent.value = rawText;
        }
      } catch {
        textContent.value = '';
      }
    } else {
      textContent.value = '';
    }
  },
  { immediate: true },
);

const isSupportedPreview = computed(
  () => !!props.objectUrl && (isImage.value || isPdf.value || isText.value),
);
</script>

<template>
  <div v-if="isSupportedPreview" class="preview" :class="{ 'preview--image': isImage }">
    <img
      v-if="isImage"
      :src="objectUrl"
      :alt="fileName ? `Preview of ${fileName}` : $t('result.title')"
    />
    <iframe
      v-else-if="isPdf"
      :src="objectUrl"
      class="preview-frame"
      :title="fileName ? `PDF preview of ${fileName}` : `${$t('result.title')} PDF`"
    ></iframe>
    <pre
      v-else-if="isText"
      class="preview-text"
      tabindex="0"
      :aria-label="fileName ? `Text content of ${fileName}` : $t('result.title')"
      >{{ textContent }}</pre>
  </div>
  <div v-else class="empty">
    <p>{{ fallback ?? $t('result.no_preview') }}</p>
  </div>
</template>
