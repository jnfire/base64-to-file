<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from './components/AppHeader.vue';
import ConverterInput from './components/ConverterInput.vue';
import FileResult from './components/FileResult.vue';
import EncoderInput from './components/EncoderInput.vue';
import EncoderResult from './components/EncoderResult.vue';
import AppFooter from './components/AppFooter.vue';
import { useBase64Converter } from './composables/useBase64Converter';
import { useFileEncoder } from './composables/useFileEncoder';

const activeTab = ref<'decode' | 'encode'>('decode');

const {
  base64Input,
  error: decoderError,
  detectionMode,
  selectedManualType,
  fileInfo,
  COMMON_TYPES,
  convert: convertBase64,
  clear: clearDecoder,
  download,
  previewPossible
} = useBase64Converter();

const {
  selectedFile,
  finalBase64Result,
  error: encoderError,
  includeDataUri,
  isDragging,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  encodeFile,
  clear: clearEncoder,
  copyToClipboard
} = useFileEncoder();
</script>

<template>
  <div class="app-layout">
    <AppHeader />

    <main class="main-content">
      <div class="tabs">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'decode' }"
          @click="activeTab = 'decode'"
        >
          {{ $t('tabs.decode') }}
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'encode' }"
          @click="activeTab = 'encode'"
        >
          {{ $t('tabs.encode') }}
        </button>
      </div>

      <div v-if="activeTab === 'decode'" class="tab-pane">
        <ConverterInput
          v-model:base64Input="base64Input"
          v-model:detectionMode="detectionMode"
          v-model:selectedManualType="selectedManualType"
          :error="decoderError"
          :commonTypes="COMMON_TYPES"
          @convert="convertBase64"
          @clear="clearDecoder"
        />

        <FileResult
          v-if="fileInfo"
          :fileInfo="fileInfo"
          :previewPossible="previewPossible"
          @download="download"
        />
      </div>

      <div v-if="activeTab === 'encode'" class="tab-pane">
        <EncoderInput
          :selectedFile="selectedFile"
          :isDragging="isDragging"
          :error="encoderError"
          @file-selected="encodeFile"
          @clear="clearEncoder"
          @dragenter="handleDragEnter"
          @dragleave="handleDragLeave"
          @dragover="handleDragOver"
          @drop="handleDrop"
        />
        
        <EncoderResult
          :base64Result="finalBase64Result"
          :includeDataUri="includeDataUri"
          @update:includeDataUri="includeDataUri = $event"
          @copy="copyToClipboard"
        />
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style>
/* Global CSS variables for Light/Dark Mode (Sober, Developer-focused) */
:root {
  --bg-body: #ffffff;
  --bg-surface: #f9fafb;
  --bg-surface-hover: #f3f4f6;
  --text-main: #111827;
  --text-muted: #6b7280;
  --border-color: #e5e7eb;
  --accent-color: #000000;
  --accent-color-alpha: rgba(0, 0, 0, 0.1);
  --error-color: #ef4444;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-body: #111827;
    --bg-surface: #1f2937;
    --bg-surface-hover: #374151;
    --text-main: #f9fafb;
    --text-muted: #9ca3af;
    --border-color: #374151;
    --accent-color: #ffffff;
    --accent-color-alpha: rgba(255, 255, 255, 0.1);
    --error-color: #f87171;
  }
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--bg-body);
  color: var(--text-main);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-layout {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  background-color: var(--bg-surface);
  padding: 0.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  margin-bottom: 1.5rem;
}

.tab-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: var(--text-main);
  background-color: var(--bg-surface-hover);
}

.tab-btn.active {
  background-color: var(--accent-color);
  color: var(--bg-body);
}

.tab-pane {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
