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

// defineEmits removed

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

.settings-content {
  display: flex;
  flex-direction: column;
}

.settings-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.settings-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.section-title {
  margin: 0 0 1rem 0;
  color: var(--text-main);
  font-size: 1.2rem;
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
  max-width: 300px;
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
  padding: 0.6rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-surface);
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.9rem;
  width: 100%;
}
</style>
