<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { FileInfo } from '../core/types';

const props = defineProps<{
  fileInfo: FileInfo;
  previewPossible: boolean;
}>();

defineEmits<{
  (e: 'download'): void;
}>();

const isImage = computed(() => 
  props.fileInfo.mime.startsWith('image/') || props.fileInfo.mime === 'image/svg+xml'
);
const isPdf = computed(() => props.fileInfo.mime === 'application/pdf');
const isText = computed(() => 
  props.fileInfo.mime.startsWith('text/') || 
  props.fileInfo.mime === 'application/json' || 
  props.fileInfo.mime === 'application/xml'
);

const textContent = ref('');
const fileSizeKb = computed(() => (props.fileInfo.data.length / 1024).toFixed(2));

watch(() => props.fileInfo, (newVal) => {
  if (newVal && isText.value) {
    const rawText = new TextDecoder().decode(newVal.data);
    if (newVal.mime === 'application/json') {
      try {
        textContent.value = JSON.stringify(JSON.parse(rawText), null, 2);
      } catch {
        textContent.value = rawText;
      }
    } else {
      textContent.value = rawText;
    }
  } else {
    textContent.value = '';
  }
}, { immediate: true });
</script>

<template>
  <div class="file-result">
    <div class="result-header">
      <div class="meta-info">
        <h3>{{ $t('result.title') }}</h3>
        <div class="meta-details">
          <span class="meta-item"><span class="label">{{ $t('result.mime') }}</span> {{ fileInfo.mime }}</span>
          <span class="meta-item"><span class="label">{{ $t('result.extension') }}</span> .{{ fileInfo.extension }}</span>
          <span class="meta-item"><span class="label">{{ $t('result.size') }}</span> {{ fileSizeKb }} KB</span>
        </div>
      </div>
      <button @click="$emit('download')" class="btn-download">{{ $t('result.btn_download') }}</button>
    </div>

    <div v-if="previewPossible" class="preview-area">
      <div class="preview-container">
        <img v-if="isImage" :src="fileInfo.objectUrl" alt="Previsualización" />
        <iframe v-else-if="isPdf" :src="fileInfo.objectUrl" frameborder="0" title="Previsualización PDF"></iframe>
        <pre v-else-if="isText" class="text-preview">{{ textContent }}</pre>
      </div>
    </div>
    <div v-else class="no-preview">
      <p>{{ $t('result.no_preview') }}</p>
    </div>
  </div>
</template>

<style scoped>
.file-result {
  background-color: var(--bg-surface);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.result-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid var(--border-color);
  gap: 1rem;
  flex-wrap: wrap;
}

.meta-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: var(--text-main);
  font-weight: 600;
}

.meta-details {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.meta-item .label {
  font-weight: 500;
  color: var(--text-main);
}

.btn-download {
  background-color: var(--accent-color);
  color: var(--bg-body);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-download:hover {
  opacity: 0.9;
}

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
  max-height: 600px;
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
  height: 600px;
  border: none;
}

.text-preview {
  width: 100%;
  padding: 1rem;
  margin: 0;
  overflow: auto;
  max-height: 500px;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-main);
}

.no-preview {
  padding: 3rem 2rem;
  text-align: center;
  color: var(--text-muted);
  background-color: var(--bg-body);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .result-header, .preview-area {
    padding: 1.25rem;
  }

  .text-preview {
    font-size: 0.95rem;
  }
}
</style>
