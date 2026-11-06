<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { formatSize } from '../utils/format';
import AppIcon from './AppIcon.vue';
import FilePreview from './FilePreview.vue';

const props = defineProps<{
  selectedFile: File | null;
  fileObjectUrl: string;
  isDragging: boolean;
  error: string | null;
}>();

const emit = defineEmits<{
  (e: 'file-selected', file: File): void;
  (e: 'clear'): void;
  (e: 'dragenter', event: DragEvent): void;
  (e: 'dragleave', event: DragEvent): void;
  (e: 'dragover', event: DragEvent): void;
  (e: 'drop', event: DragEvent): void;
}>();

const { locale } = useI18n();
const fileInputRef = ref<HTMLInputElement | null>(null);
const fileSize = computed(() =>
  props.selectedFile ? formatSize(props.selectedFile.size, locale.value) : '',
);

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    emit('file-selected', target.files[0]);
    // Reset the input so that the same file can be chosen again after clearing it.
    target.value = '';
  }
};
</script>

<template>
  <section
    class="settings-card pane"
    :aria-label="$t('encoder.file_title')"
    @dragenter="emit('dragenter', $event)"
    @dragleave="emit('dragleave', $event)"
    @dragover="emit('dragover', $event)"
    @drop="emit('drop', $event)"
  >
    <div class="pane-head">
      <span class="card-title">{{ $t('encoder.file_title') }}</span>
      <button v-if="selectedFile" type="button" class="link-btn" @click="triggerFileInput">
        {{ $t('encoder.change_file') }}
      </button>
    </div>

    <input
      ref="fileInputRef"
      type="file"
      class="sr-only"
      tabindex="-1"
      aria-hidden="true"
      @change="handleFileChange"
    />

    <template v-if="selectedFile">
      <FilePreview
        :objectUrl="fileObjectUrl"
        :mimeType="selectedFile.type || 'application/octet-stream'"
        :fileName="selectedFile.name"
        :fallback="$t('encoder.no_preview')"
      />
      <div class="file-bar" :class="{ 'is-dragging': isDragging }">
        <AppIcon name="file" />
        <span class="file-name" :title="selectedFile.name">{{ selectedFile.name }}</span>
        <span class="file-size">{{ fileSize }}</span>
        <button
          type="button"
          class="icon-btn"
          :aria-label="$t('encoder.remove_file')"
          :title="$t('encoder.remove_file')"
          @click="emit('clear')"
        >
          <AppIcon name="x" />
        </button>
      </div>
    </template>
    <div
      v-else
      class="drop"
      :class="{ 'is-dragging': isDragging }"
      role="button"
      tabindex="0"
      :aria-label="$t('encoder.drop_zone')"
      @click="triggerFileInput"
      @keydown.enter.prevent="triggerFileInput"
      @keydown.space.prevent="triggerFileInput"
    >
      <span class="drop-ico"><AppIcon name="upload" /></span>
      <strong>{{ $t('encoder.drop_zone') }}</strong>
      <span class="or">{{ $t('encoder.or') }}</span>
      <button type="button" class="btn-secondary with-ico" @click.stop="triggerFileInput">
        <AppIcon name="file" />
        {{ $t('encoder.btn_browse') }}
      </button>
    </div>

    <p v-if="error" class="status is-error" role="alert">
      <AppIcon name="alert" />
      {{ error }}
    </p>
  </section>
</template>
