<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const toggleLanguage = () => {
  locale.value = locale.value === 'es' ? 'en' : 'es';
};
</script>

<template>
  <header class="app-header">
    <div class="header-top">
      <h1>{{ t('header.title') }}</h1>
      <button class="lang-toggle" @click="toggleLanguage" aria-label="Toggle language">
        {{ locale === 'es' ? '🇪🇸 ES' : '🇬🇧 EN' }}
      </button>
    </div>
    <p class="subtitle">{{ t('header.subtitle') }}</p>
    <div class="badges">
      <span class="badge">{{ t('header.badges.opensource') }}</span>
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

.header-top {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  position: relative;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.05em;
  color: var(--text-main);
  margin: 0;
}

.lang-toggle {
  position: absolute;
  right: 0;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s;
}

.lang-toggle:hover {
  background: var(--bg-surface-hover);
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
  .header-top {
    flex-direction: column;
    margin-bottom: 1.5rem;
  }

  .lang-toggle {
    position: static;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>
