<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SettingsIcon from './SettingsIcon.vue';

defineProps<{
  showSettings?: boolean;
}>();

const { t } = useI18n();

const emit = defineEmits<{
  (e: 'toggle-settings'): void;
  (e: 'home'): void;
}>();
</script>

<template>
  <header class="navbar">
    <div class="navbar-container">
      <button class="navbar-brand" @click="emit('home')" :aria-label="t('header.title')">
        <h1 class="title">{{ t('header.title') }}</h1>
      </button>

      <div class="navbar-actions">
        <button
          class="btn-secondary config-toggle"
          :class="{ 'config-toggle--active': showSettings }"
          @click="emit('toggle-settings')"
          :aria-label="t('settings.title') || 'Settings'"
        >
          <SettingsIcon class="icon" />
          <span class="text">{{ t('settings.title') || 'Settings' }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped >
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
  gap: 0.75rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
  border-radius: 6px;
  text-decoration: none;
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

.config-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-main);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.config-toggle:hover {
  background-color: var(--bg-surface-hover);
}

.config-toggle--active {
  background-color: var(--accent-color);
  color: var(--bg-body);
  border-color: var(--accent-color);
}

.config-toggle--active:hover {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  opacity: 0.9;
}

.icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 600px) {
  .navbar-container {
    padding: 0 1rem;
  }
  .title {
    font-size: 1.05rem;
  }
  .config-toggle .text {
    display: none;
  }
}
</style>
