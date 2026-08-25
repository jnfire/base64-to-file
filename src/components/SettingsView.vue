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
  <div v-if="show" class="settings-view">
    <div class="settings-header">
      <h2 class="settings-title">{{ t('settings.title') || 'Settings' }}</h2>
      <button class="close-btn btn-secondary" @click="emit('close')">
        {{ t('common.close') || 'Cerrar' }}
      </button>
    </div>

    <div class="settings-content">
      <!-- General Settings Section -->
      <section class="settings-section">
        <h3 class="section-title">{{ t('settings.general') || 'General Settings' }}</h3>
        <div class="settings-column">
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
        <div class="settings-column">
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
</template>

<style scoped>
.settings-view {
  background-color: var(--bg-surface);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.settings-title {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-main);
}

.close-btn {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

.settings-column {
  display: flex;
  flex-direction: column;
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
