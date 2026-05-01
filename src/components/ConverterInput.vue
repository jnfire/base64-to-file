<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  base64Input: string;
  error: string;
  detectionMode: 'auto' | 'manual';
  selectedManualType: any;
  commonTypes: any[];
}>();

const emit = defineEmits<{
  (e: 'update:base64Input', value: string): void;
  (e: 'update:detectionMode', value: 'auto' | 'manual'): void;
  (e: 'update:selectedManualType', value: any): void;
  (e: 'convert'): void;
  (e: 'clear'): void;
}>();

const localInput = computed({
  get: () => props.base64Input,
  set: (val) => emit('update:base64Input', val)
});

const localDetectionMode = computed({
  get: () => props.detectionMode,
  set: (val) => emit('update:detectionMode', val)
});

const localSelectedType = computed({
  get: () => props.selectedManualType,
  set: (val) => emit('update:selectedManualType', val)
});

</script>

<template>
  <div class="converter-input">
    <div class="controls-header">
      <div class="mode-selector">
        <button 
          :class="{ active: localDetectionMode === 'auto' }" 
          @click="localDetectionMode = 'auto'"
        >{{ $t('input.mode.auto') }}</button>
        <button 
          :class="{ active: localDetectionMode === 'manual' }" 
          @click="localDetectionMode = 'manual'"
        >{{ $t('input.mode.manual') }}</button>
      </div>

      <div v-if="localDetectionMode === 'manual'" class="manual-options">
        <label for="fileType">{{ $t('input.format') }}</label>
        <select id="fileType" v-model="localSelectedType">
          <option v-for="type in commonTypes" :key="type.mime" :value="type">
            {{ type.label }} (.{{ type.extension }})
          </option>
        </select>
      </div>
    </div>

    <textarea
      v-model="localInput"
      :placeholder="$t('input.placeholder')"
      rows="8"
    ></textarea>
    
    <div class="actions">
      <button @click="$emit('convert')" class="btn-primary">{{ $t('input.btn_decode') }}</button>
      <button @click="$emit('clear')" class="btn-secondary">{{ $t('input.btn_clear') }}</button>
    </div>
    
    <p v-if="error" class="error-msg">
      {{ error === 'Por favor, pega un código Base64.' ? $t('input.error_empty') : $t('input.error_invalid') }}
    </p>
  </div>
</template>

<style scoped>
.converter-input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: var(--bg-surface);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.controls-header {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.mode-selector {
  display: flex;
  background-color: var(--bg-body);
  padding: 0.25rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.mode-selector button {
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}

.mode-selector button:hover {
  color: var(--text-main);
}

.mode-selector button.active {
  background-color: var(--bg-surface);
  color: var(--text-main);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.manual-options {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: fadeIn 0.2s ease-out;
}

.manual-options label {
  font-size: 0.9rem;
  color: var(--text-muted);
}

select {
  padding: 0.5rem;
  border-radius: 6px;
  background-color: var(--bg-body);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  font-family: inherit;
  font-size: 0.9rem;
  cursor: pointer;
}

textarea {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-body);
  color: var(--text-main);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 120px;
  line-height: 1.5;
}

textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px var(--accent-color-alpha);
}

.actions {
  display: flex;
  gap: 1rem;
}

button {
  cursor: pointer;
  font-family: inherit;
}

.btn-primary {
  background-color: var(--text-main);
  color: var(--bg-body);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  flex: 1;
  transition: opacity 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  background-color: var(--bg-body);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background-color: var(--bg-surface-hover);
}

.error-msg {
  color: var(--error-color);
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 0.5rem;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 600px) {
  .converter-input {
    padding: 1rem;
  }

  .controls-header {
    flex-direction: column;
    align-items: stretch;
  }

  .mode-selector {
    width: 100%;
  }

  .mode-selector button {
    flex: 1;
  }

  .manual-options {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  .manual-options label {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  select {
    width: 100%;
  }
}
</style>
