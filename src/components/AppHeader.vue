<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import LangSelector from './LangSelector.vue';

const { t, locale } = useI18n();

const languages = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' }
];
</script>

<template>
  <header class="app-header">
    <h1>{{ t('header.title') }}</h1>
    <div class="lang-selector-wrapper">
      <LangSelector v-model="locale" :options="languages" />
    </div>
    <p class="subtitle">{{ t('header.subtitle') }}</p>
    <div class="badges">
      <span class="badge">{{ t('header.badges.auditable') }}</span>
      <span class="badge">{{ t('header.badges.privacy') }}</span>
      <span class="badge">{{ t('header.badges.serverless') }}</span>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  margin-bottom: 2.5rem;
  text-align: center;
}

.lang-selector-wrapper {
  display: flex;
  justify-content: center;
  margin: 0.75rem 0 1rem 0;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.05em;
  color: var(--text-main);
  margin: 0;
}

.subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-bottom: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.badges {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.badge {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  background-color: var(--bg-surface);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 600px) {
  h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>
