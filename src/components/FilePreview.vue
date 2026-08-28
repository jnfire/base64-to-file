<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps<{
  objectUrl: string;
  mimeType: string;
  fileName?: string;
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
  { immediate: true }
);

const isSupportedPreview = computed(() => isImage.value || isPdf.value || isText.value);
</script>

<template>
  <div v-if="isSupportedPreview" class="preview-area">
    <div class="preview-container">
      <img 
        v-if="isImage" 
        :src="objectUrl" 
        :alt="fileName ? `Preview of ${fileName}` : $t('result.title')" 
      />
      <iframe 
        v-else-if="isPdf" 
        :src="objectUrl" 
        frameborder="0" 
        :title="fileName ? `PDF preview of ${fileName}` : `${$t('result.title')} PDF`"
      ></iframe>
      <pre 
        v-else-if="isText" 
        class="text-preview" 
        tabindex="0" 
        :aria-label="fileName ? `Text content of ${fileName}` : $t('result.title')"
      >{{ textContent }}</pre>
    </div>
  </div>
  <div v-else class="no-preview">
    <p>{{ $t('result.no_preview') }}</p>
  </div>
</template>

<style scoped>
.preview-area {
  padding: 1.5rem;
  background-color: var(--bg-body);
}

.preview-container {
  display: flex;
  justify-content: center;
  background-color: var(--bg-surface);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  min-height: 200px;
}

.preview-container img {
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
  background-image: linear-gradient(45deg, var(--bg-body) 25%, transparent 25%), 
                    linear-gradient(-45deg, var(--bg-body) 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, var(--bg-body) 75%), 
                    linear-gradient(-45deg, transparent 75%, var(--bg-body) 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.preview-container iframe {
  width: 100%;
  height: 500px;
  border: none;
}

.text-preview {
  width: 100%;
  padding: 1rem;
  margin: 0;
  overflow: auto;
  max-height: 400px;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-main);
}

.text-preview:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: -2px;
}

.no-preview {
  padding: 2.5rem 1.5rem;
  text-align: center;
  color: var(--text-muted);
  background-color: var(--bg-body);
}

@media (max-width: 600px) {
  .preview-area {
    padding: 1rem;
  }

  .text-preview {
    font-size: 0.95rem;
  }
}
</style>
