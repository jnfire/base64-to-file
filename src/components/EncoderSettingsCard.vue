<!-- src/components/EncoderSettingsCard.vue -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { autoCopyConfig, mimeFormatConfig } from '../utils/config';

const { t } = useI18n();
</script>

<template>
  <section class="settings-card" :aria-label="t('settings.encoder') || 'Encoder Settings'">
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
</template>

<style scoped>
.settings-column {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-main);
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  cursor: pointer;
  accent-color: var(--accent-color);
}
</style>
