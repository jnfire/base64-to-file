<!-- src/components/EncoderSettingsCard.vue -->
<script setup lang="ts">
import { autoCopyConfig, mimeFormatConfig } from '../utils/config';
</script>

<template>
  <section class="settings-card" :aria-label="$t('settings.encoder')">
    <h3 class="section-title enc-title">{{ $t('settings.encoder') }}</h3>
    <p class="st-help">{{ $t('settings.encoderHelp') }}</p>
    <div class="check-list">
      <label class="check">
        <input v-model="autoCopyConfig" type="checkbox" />
        {{ $t('settings.autoCopy') }}
      </label>
      <label class="check">
        <input v-model="mimeFormatConfig" type="checkbox" />
        {{ $t('settings.mimeFormat') }}
      </label>
    </div>
  </section>
</template>
