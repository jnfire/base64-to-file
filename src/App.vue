<script setup lang="ts">
import { computed, provide, reactive } from 'vue';
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
import ConverterView from './components/ConverterView.vue';
import SettingsView from './components/SettingsView.vue';
import { decoderKey, encoderKey } from './composables/keys';
import { useBase64Converter } from './composables/useBase64Converter';
import { useFileEncoder } from './composables/useFileEncoder';
import { useRoute } from './composables/useRoute';

// The state of both directions lives here, so it survives moving between screens.
const decoder = reactive(useBase64Converter());
const encoder = reactive(useFileEncoder());
provide(decoderKey, decoder);
provide(encoderKey, encoder);

const { route, goDecode, goEncode, goSettings } = useRoute();

const onSettings = computed(() => route.value === 'settings');
const direction = computed(() => (route.value === 'encode' ? 'encode' : 'decode'));

// The gear opens the settings; pressing it again goes back to the converter.
const toggleSettings = () => (onSettings.value ? goDecode() : goSettings());
</script>

<template>
  <div class="app-wrapper">
    <AppHeader :showSettings="onSettings" @toggle-settings="toggleSettings" @home="goDecode" />

    <div class="app-layout">
      <main class="main-content">
        <SettingsView v-if="onSettings" />
        <ConverterView
          v-else
          :direction="direction"
          @select="$event === 'encode' ? goEncode() : goDecode()"
        />
      </main>
    </div>

    <div class="footer-container">
      <AppFooter />
    </div>
  </div>
</template>
