<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  base64Result: string;
  includeDataUri: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:includeDataUri', value: boolean): void;
  (e: 'copy'): void;
}>();

const copied = ref(false);

const handleCopy = () => {
  emit('copy');
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>

<template>
  <div class="encoder-result" v-if="base64Result">
    <div class="result-header">
      <h3>{{ $t('encoder.result_title') }}</h3>
      <label class="checkbox-label">
        <input 
          type="checkbox" 
          :checked="includeDataUri"
          @change="emit('update:includeDataUri', ($event.target as HTMLInputElement).checked)"
        >
        {{ $t('encoder.include_data_uri') }}
      </label>
    </div>

    <div class="result-area">
      <textarea 
        readonly 
        :value="base64Result"
        class="result-textarea"
        rows="10"
      ></textarea>
      
      <div class="actions">
        <button @click="handleCopy" class="btn-primary" :class="{ 'btn-success': copied }">
          <svg v-if="copied" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          {{ copied ? $t('encoder.copied') : $t('encoder.btn_copy') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.encoder-result {
  background-color: var(--bg-surface);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-top: 1.5rem;
}

.result-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  flex-wrap: wrap;
  gap: 1rem;
}

.result-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--text-main);
  font-weight: 600;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.95rem;
}

.checkbox-label input[type="checkbox"] {
  width: 1.1rem;
  height: 1.1rem;
  cursor: pointer;
  accent-color: var(--accent-color);
}

.result-area {
  padding: 1.5rem;
  background-color: var(--bg-body);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.result-textarea {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-surface);
  color: var(--text-main);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  resize: vertical;
  min-height: 150px;
}

.result-textarea:focus {
  outline: none;
  border-color: var(--accent-color);
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--accent-color);
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-success {
  background-color: #10b981;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .encoder-result {
    padding: 0;
  }
  
  .result-header, .result-area {
    padding: 1.25rem;
  }

  .result-textarea {
    font-size: 0.95rem;
  }
}
</style>
