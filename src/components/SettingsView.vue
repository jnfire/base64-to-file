<script setup lang="ts">
import EncoderSettingsCard from './EncoderSettingsCard.vue';
import PersonalizationCard from './PersonalizationCard.vue';

defineProps<{
  show: boolean;
}>();
</script>

<template>
  <div v-if="show" class="settings-view">
    <EncoderSettingsCard />
    <PersonalizationCard />
  </div>
</template>

<style scoped>
.settings-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  width: 100%;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
