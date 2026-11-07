<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { FileInfo } from '../core/types';
import { formatSize } from '../utils/format';
import AppIcon from './AppIcon.vue';
import FilePreview from './FilePreview.vue';

const props = defineProps<{
  fileInfo: FileInfo | null;
}>();

defineEmits<{
  (emitEvent: 'download'): void;
}>();

const { locale } = useI18n();
const fileSize = computed(() =>
  props.fileInfo ? formatSize(props.fileInfo.data.length, locale.value) : '',
);
</script>

<template>
  <section class="settings-card pane" :aria-label="$t('result.title')">
    <div class="pane-head">
      <span class="card-title">{{ $t('result.title') }}</span>
      <button
        type="button"
        class="btn-primary"
        :disabled="!fileInfo"
        :aria-label="fileInfo ? `${$t('result.btn_download')} (.${fileInfo.extension})` : undefined"
        @click="$emit('download')"
      >
        <AppIcon name="download" />
        {{ $t('result.btn_download') }}
      </button>
    </div>

    <template v-if="fileInfo">
      <div class="sr-only" role="status" aria-live="polite">
        {{ $t('result.title') }}: {{ fileInfo.mime }}, .{{ fileInfo.extension }}, {{ fileSize }}
      </div>
      <div class="meta-row">
        <span class="chip mono">{{ fileInfo.mime }}</span>
        <span class="chip mono">.{{ fileInfo.extension }}</span>
        <span class="chip">{{ fileSize }}</span>
      </div>
      <FilePreview :objectUrl="fileInfo.objectUrl" :mimeType="fileInfo.mime" />
    </template>
    <div v-else class="empty">
      <AppIcon name="file" class="ico-lg" />
      <p>
        <strong>{{ $t('result.empty_title') }}</strong>
      </p>
      <p>{{ $t('result.empty_text') }}</p>
    </div>
  </section>
</template>
