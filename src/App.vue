<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import ConverterInput from './components/ConverterInput.vue';
import FileResult from './components/FileResult.vue';
import AppFooter from './components/AppFooter.vue';
import { useBase64Converter } from './composables/useBase64Converter';

const {
  base64Input,
  error,
  detectionMode,
  selectedManualType,
  fileInfo,
  COMMON_TYPES,
  convert,
  clear,
  download,
  previewPossible
} = useBase64Converter();
</script>

<template>
  <div class="app-layout">
    <AppHeader />

    <main class="main-content">
      <ConverterInput
        v-model:base64Input="base64Input"
        v-model:detectionMode="detectionMode"
        v-model:selectedManualType="selectedManualType"
        :error="error"
        :commonTypes="COMMON_TYPES"
        @convert="convert"
        @clear="clear"
      />

      <FileResult
        v-if="fileInfo"
        :fileInfo="fileInfo"
        :previewPossible="previewPossible"
        @download="download"
      />
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
</style>
