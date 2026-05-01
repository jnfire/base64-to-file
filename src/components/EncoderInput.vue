<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  selectedFile: File | null;
  isDragging: boolean;
  error: string | null;
}>();

const emit = defineEmits<{
  (e: 'file-selected', file: File): void;
  (e: 'clear'): void;
  (e: 'dragenter', event: DragEvent): void;
  (e: 'dragleave', event: DragEvent): void;
  (e: 'dragover', event: DragEvent): void;
  (e: 'drop', event: DragEvent): void;
}>();

const fileInputRef = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
};

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    emit('file-selected', target.files[0]);
    // Resetear el input para permitir seleccionar el mismo archivo después de limpiarlo
    target.value = '';
  }
};
</script>

<template>
  <div class="encoder-input">
    <div 
      class="drop-zone"
      :class="{ 'is-dragging': isDragging }"
      @dragenter="emit('dragenter', $event)"
      @dragleave="emit('dragleave', $event)"
      @dragover="emit('dragover', $event)"
      @drop="emit('drop', $event)"
      @click="triggerFileInput"
    >
      <input 
        type="file" 
        ref="fileInputRef" 
        style="display: none;" 
        @change="handleFileChange"
      >
      <div v-if="!selectedFile" class="drop-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="upload-icon">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <p>{{ $t('encoder.drop_zone') }}</p>
        <p class="text-sm text-muted">{{ $t('encoder.or') }}</p>
        <button class="btn-browse" @click.stop="triggerFileInput">{{ $t('encoder.btn_browse') }}</button>
      </div>
      <div v-else class="file-selected">
        <div class="file-info">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
          <div>
            <p class="filename">{{ selectedFile.name }}</p>
            <p class="filesize">{{ (selectedFile.size / 1024).toFixed(2) }} KB</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="actions">
      <button v-if="selectedFile" @click="emit('clear')" class="btn-secondary">{{ $t('encoder.btn_clear') }}</button>
    </div>
    
    <p v-if="error" class="error-msg">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.encoder-input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.drop-zone {
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  background-color: var(--bg-surface);
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drop-zone:hover {
  border-color: var(--accent-color);
  background-color: var(--bg-surface-hover);
}

.drop-zone.is-dragging {
  border-color: var(--accent-color);
  background-color: rgba(74, 158, 255, 0.1);
  transform: scale(1.02);
}

.drop-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-main);
}

.upload-icon {
  margin-bottom: 1rem;
  color: var(--accent-color);
}

.text-muted {
  color: var(--text-muted);
}

.text-sm {
  font-size: 0.9rem;
}

.btn-browse {
  margin-top: 0.5rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-browse:hover {
  opacity: 0.9;
}

.file-selected {
  width: 100%;
}

.file-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--text-main);
}

.filename {
  font-weight: 600;
  margin: 0;
  word-break: break-all;
}

.filesize {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  background-color: var(--bg-surface);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background-color: var(--bg-surface-hover);
}

.error-msg {
  color: #ef4444;
  font-weight: 500;
  margin: 0;
}
</style>
