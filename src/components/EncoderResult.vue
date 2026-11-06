<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { MAX_FILE_SIZE_BYTES } from '../core/encoder';
import { formatSize } from '../utils/format';
import AppIcon from './AppIcon.vue';

const props = defineProps<{
  base64Result: string;
  includeDataUri: boolean;
  copied: boolean;
  resultBytes: number;
  overheadPercent: number;
}>();

const emit = defineEmits<{
  (emitEvent: 'update:includeDataUri', value: boolean): void;
  (emitEvent: 'copy'): void;
}>();

const { locale } = useI18n();
const resultSize = computed(() => formatSize(props.resultBytes, locale.value));
const maxMegabytes = (MAX_FILE_SIZE_BYTES / 1024 / 1024).toFixed(0);
</script>

<template>
  <section class="settings-card pane" :aria-label="$t('encoder.result_title')">
    <div class="pane-head">
      <span class="card-title">{{ $t('encoder.result_title') }}</span>
      <button type="button" class="btn-primary" :disabled="!base64Result" @click="emit('copy')">
        <AppIcon :name="copied ? 'check' : 'copy'" :stroke-width="copied ? 2.4 : 2" />
        {{ copied ? $t('encoder.copied') : $t('encoder.btn_copy') }}
      </button>
    </div>

    <template v-if="base64Result">
      <label class="check">
        <input
          type="checkbox"
          :checked="includeDataUri"
          @change="emit('update:includeDataUri', ($event.target as HTMLInputElement).checked)"
        />
        {{ $t('encoder.include_data_uri') }}
      </label>
      <label for="base64-result-textarea" class="sr-only">{{ $t('encoder.result_title') }}</label>
      <textarea
        id="base64-result-textarea"
        class="code-area"
        readonly
        spellcheck="false"
        :value="base64Result"
      ></textarea>
      <div class="pane-foot">
        <span class="foot-info">
          <span class="chip">{{ resultSize }}</span>
          <span v-if="overheadPercent > 0" class="chip">{{
            $t('encoder.overhead', { pct: overheadPercent })
          }}</span>
        </span>
      </div>
      <div class="sr-only" role="status" aria-live="polite">
        {{ copied ? $t('encoder.copied') : '' }}
      </div>
    </template>
    <div v-else class="empty">
      <AppIcon name="code" class="ico-lg" />
      <p>
        <strong>{{ $t('encoder.empty_title') }}</strong>
      </p>
      <p>{{ $t('encoder.empty_text', { mb: maxMegabytes }) }}</p>
    </div>
  </section>
</template>
