<script setup lang="ts">
import AppIcon from './AppIcon.vue';
import EncoderSettingsCard from './EncoderSettingsCard.vue';
import PersonalizationCard from './PersonalizationCard.vue';
import { useRoute } from '../composables/useRoute';

const { goDecode } = useRoute();
</script>

<template>
  <div class="st-page">
    <div class="st-head">
      <h2>{{ $t('settings.title') }}</h2>
      <button type="button" class="link-btn back-link" @click="goDecode">
        <AppIcon name="back" />
        {{ $t('nav.back') }}
      </button>
    </div>
    <div class="st-row2">
      <EncoderSettingsCard />
      <PersonalizationCard />
    </div>
  </div>
</template>
