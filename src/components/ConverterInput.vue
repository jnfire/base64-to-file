<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { FileInfo, FileTypeOption } from '../core/types';
import type { DecodeError } from '../composables/useBase64Converter';
import { formatSize } from '../utils/format';
import AppIcon from './AppIcon.vue';
import CustomSelect from './CustomSelect.vue';

const props = defineProps<{
  base64Input: string;
  error: DecodeError;
  detectionMode: 'auto' | 'manual';
  selectedManualType: FileTypeOption;
  commonTypes: FileTypeOption[];
  fileInfo: FileInfo | null;
}>();

const emit = defineEmits<{
  (e: 'update:base64Input', value: string): void;
  (e: 'update:detectionMode', value: 'auto' | 'manual'): void;
  (e: 'update:selectedManualType', value: FileTypeOption): void;
  (e: 'clear'): void;
}>();

const { locale } = useI18n();

const localInput = computed({
  get: () => props.base64Input,
  set: (value) => emit('update:base64Input', value),
});

const formatOptions = computed(() =>
  props.commonTypes.map((type) => ({
    value: type.mime,
    label: `${type.label} (.${type.extension})`,
  })),
);

const selectedMime = computed({
  get: () => props.selectedManualType?.mime || props.commonTypes[0]?.mime || '',
  set: (mimeValue: string) => {
    const matchingType = props.commonTypes.find((type) => type.mime === mimeValue);
    if (matchingType) {
      emit('update:selectedManualType', matchingType);
    }
  },
});

const inputSize = computed(() => formatSize(props.base64Input.length, locale.value));
</script>

<template>
  <section class="settings-card pane" :aria-label="$t('tabs.base64')">
    <div class="pane-head">
      <span class="card-title">{{ $t('tabs.base64') }}</span>
      <div class="mini-seg" role="radiogroup" :aria-label="$t('input.format')">
        <button
          type="button"
          role="radio"
          :aria-checked="detectionMode === 'auto'"
          @click="emit('update:detectionMode', 'auto')"
        >
          {{ $t('input.mode.auto') }}
        </button>
        <button
          type="button"
          role="radio"
          :aria-checked="detectionMode === 'manual'"
          @click="emit('update:detectionMode', 'manual')"
        >
          {{ $t('input.mode.manual') }}
        </button>
      </div>
    </div>

    <div v-if="detectionMode === 'manual'" class="field-row">
      <label id="format-label" class="field-label">{{ $t('input.format') }}</label>
      <CustomSelect id="fileType" v-model="selectedMime" :options="formatOptions" />
    </div>

    <label for="base64-input-textarea" class="sr-only">{{ $t('input.placeholder') }}</label>
    <textarea
      id="base64-input-textarea"
      v-model="localInput"
      class="code-area"
      :class="{ 'is-error': error }"
      :placeholder="$t('input.placeholder')"
      :aria-invalid="!!error"
      :aria-describedby="error ? 'decoder-error-msg' : undefined"
      spellcheck="false"
    ></textarea>

    <div class="pane-foot">
      <p v-if="error" id="decoder-error-msg" class="status is-error" role="alert">
        <AppIcon name="alert" />
        {{ $t('input.error_invalid') }}
      </p>
      <span v-else-if="fileInfo" class="foot-info">
        <span class="chip is-accent">{{ $t(`input.source.${fileInfo.source}`) }}</span>
        <span class="chip">{{ inputSize }}</span>
      </span>
      <span v-else>{{ $t('input.hint_live') }}</span>
      <button type="button" class="link-btn" :disabled="!base64Input" @click="emit('clear')">
        {{ $t('input.btn_clear') }}
      </button>
    </div>
  </section>
</template>
