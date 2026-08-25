<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import LangSelector from './LangSelector.vue';
import { getTheme, setTheme, type Theme } from '../utils/theme';
import { setUiLanguage, type SupportedLocale } from '../i18n';
import { autoCopyConfig, mimeFormatConfig } from '../utils/config';

defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const { t, locale } = useI18n();

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' }
];

const currentTheme = ref<Theme>(getTheme());

const handleThemeChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const theme = target.value as Theme;
  currentTheme.value = theme;
  setTheme(theme);
};

const handleLanguageChange = (langCode: string) => {
  setUiLanguage(langCode as SupportedLocale);
};
</script>

<template>
  <div v-if="show" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <header class="modal-header">
        <h2 class="modal-title">{{ t('settings.title') || 'Settings' }}</h2>
        <button class="close-btn" @click="emit('close')" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </header>

      <div class="modal-body">
        <!-- General Settings Section -->
        <section class="settings-section">
          <h3 class="section-title">{{ t('settings.general') || 'General Settings' }}</h3>
          <div class="settings-grid">
            <div class="setting-item">
              <label class="setting-label">{{ t('settings.language') || 'Language' }}</label>
              <LangSelector
                :modelValue="locale"
                @update:modelValue="handleLanguageChange"
                :options="languages"
              />
            </div>
            <div class="setting-item">
              <label class="setting-label" for="theme-select">{{ t('settings.theme') || 'Theme' }}</label>
              <select id="theme-select" class="input-element theme-select" :value="currentTheme" @change="handleThemeChange">
                <option value="light">{{ t('settings.themeLight') || 'Light' }}</option>
                <option value="dark">{{ t('settings.themeDark') || 'Dark' }}</option>
                <option value="system">{{ t('settings.themeSystem') || 'System' }}</option>
              </select>
            </div>
          </div>
        </section>

        <!-- Encoder Settings Section -->
        <section class="settings-section">
          <h3 class="section-title">{{ t('settings.encoder') || 'Encoder Settings' }}</h3>
          <div class="settings-grid">
            <div class="setting-item check-item">
              <label class="checkbox-label">
                <input type="checkbox" v-model="autoCopyConfig" />
                {{ t('settings.autoCopy') || 'Auto-copy base64 to clipboard' }}
              </label>
            </div>
            <div class="setting-item check-item">
              <label class="checkbox-label">
                <input type="checkbox" v-model="mimeFormatConfig" />
                {{ t('settings.mimeFormat') || 'MIME format (line breaks every 76 chars)' }}
              </label>
            </div>
          </div>
        </section>
      </div>

    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
}

.modal-content {
  background-color: var(--bg-body);
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  color: var(--text-main);
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  background-color: var(--bg-surface);
  color: var(--text-main);
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  max-height: 70vh;
}

.settings-section {
  margin-bottom: 2rem;
}

.settings-section:last-child {
  margin-bottom: 0;
}

.section-title {
  margin: 0 0 1rem 0;
  font-size: 1.05rem;
  color: var(--text-main);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.setting-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-main);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-main);
  cursor: pointer;
}

.theme-select {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-surface);
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.9rem;
}

:deep(.lang-selector-container),
:deep(.lang-selector-trigger) {
  width: 100%;
}
:deep(.lang-selector-trigger) {
  justify-content: space-between;
}
:deep(.lang-selector-dropdown) {
  width: 100%;
}
</style>
