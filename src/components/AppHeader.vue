<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import LangSelector from './LangSelector.vue';

const { t, locale } = useI18n();

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' }
];
</script>

<template>
  <header class="navbar">
    <div class="navbar-container">
      <a href="./" class="navbar-brand" :aria-label="t('header.title')">
        <h1 class="title">{{ t('header.title') }}</h1>
      </a>

      <div class="navbar-actions">
        <LangSelector v-model="locale" :options="languages" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background-color: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0.75rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.navbar-container {
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  border-radius: 6px;
}

.navbar-brand:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 4px;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-main);
  margin: 0;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 600px) {
  .navbar-container {
    padding: 0 1rem;
  }

  .title {
    font-size: 1.05rem;
  }
}
</style>
