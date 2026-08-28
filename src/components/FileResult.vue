<script setup lang="ts">
import { computed } from 'vue';
import type { FileInfo } from '../core/types';
import FilePreview from './FilePreview.vue';

const props = defineProps<{
  fileInfo: FileInfo;
  previewPossible: boolean;
}>();

defineEmits<{
  (emitEvent: 'download'): void;
}>();

const fileSizeKb = computed(() => (props.fileInfo.data.length / 1024).toFixed(2));
</script>

<template>
  <div class="file-result" role="region" :aria-label="$t('result.title')">
    <div class="sr-only" role="status" aria-live="polite">
      {{ $t('result.title') }}: {{ fileInfo.mime }}, .{{ fileInfo.extension }}, {{ fileSizeKb }} KB
    </div>
    <div class="result-header">
      <div class="meta-info">
        <h3>{{ $t('result.title') }}</h3>
        <div class="meta-details">
          <span class="meta-item"><span class="label">{{ $t('result.mime') }}</span> {{ fileInfo.mime }}</span>
          <span class="meta-item"><span class="label">{{ $t('result.extension') }}</span> .{{ fileInfo.extension }}</span>
          <span class="meta-item"><span class="label">{{ $t('result.size') }}</span> {{ fileSizeKb }} KB</span>
        </div>
      </div>
      <button 
        type="button" 
        @click="$emit('download')" 
        class="btn-download"
        :aria-label="`${$t('result.btn_download')} (.${fileInfo.extension})`"
      >
        {{ $t('result.btn_download') }}
      </button>
    </div>

    <FilePreview
      :objectUrl="fileInfo.objectUrl"
      :mimeType="fileInfo.mime"
      :fileName="`archivo_recuperado.${fileInfo.extension}`"
    />
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

.btn-download:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .result-header {
    padding: 1rem;
  }
}
</style>
