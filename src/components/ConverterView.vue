<script setup lang="ts">
import AppIcon from './AppIcon.vue';
import ConverterInput from './ConverterInput.vue';
import EncoderInput from './EncoderInput.vue';
import EncoderResult from './EncoderResult.vue';
import FileResult from './FileResult.vue';
import { inject } from 'vue';
import { decoderKey, encoderKey } from '../composables/keys';

type Direction = 'decode' | 'encode';

defineProps<{
  direction: Direction;
}>();

const decoder = inject(decoderKey)!;
const encoder = inject(encoderKey)!;

const emit = defineEmits<{ (e: 'select', direction: Direction): void }>();

// Arrow keys move between the two tabs, like in any tab list.
const handleTabKeydown = (keyboardEvent: KeyboardEvent, current: Direction) => {
  if (keyboardEvent.key === 'ArrowRight' || keyboardEvent.key === 'ArrowLeft') {
    keyboardEvent.preventDefault();
    const next: Direction = current === 'decode' ? 'encode' : 'decode';
    emit('select', next);
    document.getElementById(`tab-${next}`)?.focus();
  }
};
</script>

<template>
  <div class="cv">
    <div class="cv-top">
      <div class="dir" role="tablist" :aria-label="$t('header.title')">
        <button
          id="tab-decode"
          type="button"
          role="tab"
          :aria-selected="direction === 'decode'"
          aria-controls="panel-decode"
          :aria-label="$t('tabs.decode')"
          :tabindex="direction === 'decode' ? 0 : -1"
          @click="emit('select', 'decode')"
          @keydown="handleTabKeydown($event, 'decode')"
        >
          {{ $t('tabs.base64') }}
          <AppIcon name="arrow" />
          {{ $t('tabs.file') }}
        </button>
        <button
          id="tab-encode"
          type="button"
          role="tab"
          :aria-selected="direction === 'encode'"
          aria-controls="panel-encode"
          :aria-label="$t('tabs.encode')"
          :tabindex="direction === 'encode' ? 0 : -1"
          @click="emit('select', 'encode')"
          @keydown="handleTabKeydown($event, 'encode')"
        >
          {{ $t('tabs.file') }}
          <AppIcon name="arrow" />
          {{ $t('tabs.base64') }}
        </button>
      </div>
    </div>

    <div
      v-if="direction === 'decode'"
      id="panel-decode"
      role="tabpanel"
      aria-labelledby="tab-decode"
      class="panes"
    >
      <ConverterInput
        v-model:base64Input="decoder.base64Input"
        v-model:detectionMode="decoder.detectionMode"
        v-model:selectedManualType="decoder.selectedManualType"
        :error="decoder.error"
        :commonTypes="decoder.COMMON_TYPES"
        :fileInfo="decoder.fileInfo"
        @clear="decoder.clear"
      />
      <div class="flow" aria-hidden="true">
        <span class="flow-badge"><AppIcon name="arrow" /></span>
      </div>
      <FileResult :fileInfo="decoder.fileInfo" @download="decoder.download" />
    </div>

    <div v-else id="panel-encode" role="tabpanel" aria-labelledby="tab-encode" class="panes">
      <EncoderInput
        :selectedFile="encoder.selectedFile"
        :fileObjectUrl="encoder.fileObjectUrl"
        :isDragging="encoder.isDragging"
        :error="encoder.error"
        @file-selected="encoder.encodeFile"
        @clear="encoder.clear"
        @dragenter="encoder.handleDragEnter"
        @dragleave="encoder.handleDragLeave"
        @dragover="encoder.handleDragOver"
        @drop="encoder.handleDrop"
      />
      <div class="flow" aria-hidden="true">
        <span class="flow-badge"><AppIcon name="arrow" /></span>
      </div>
      <EncoderResult
        :base64Result="encoder.finalBase64Result"
        :includeDataUri="encoder.includeDataUri"
        :copied="encoder.copied"
        :resultBytes="encoder.resultBytes"
        :overheadPercent="encoder.overheadPercent"
        @update:includeDataUri="encoder.includeDataUri = $event"
        @copy="encoder.copyToClipboard"
      />
    </div>
  </div>
</template>
