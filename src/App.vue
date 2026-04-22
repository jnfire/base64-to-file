<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { decodeBase64, detectFileType, extractDataUriInfo, isPreviewable, COMMON_TYPES } from './utils/fileDetection';

const base64Input = ref('');
const error = ref('');
const detectionMode = ref<'auto' | 'manual'>('auto');
const selectedManualType = ref(COMMON_TYPES[0]);

const fileInfo = ref<{
  mime: string;
  extension: string;
  data: Uint8Array;
  objectUrl: string;
} | null>(null);

const handleConvert = () => {
  error.value = '';
  fileInfo.value = null;

  if (!base64Input.value.trim()) {
    error.value = 'Por favor, pega un código Base64.';
    return;
  }

  try {
    const input = base64Input.value.trim();
    let mime = '';
    let extension = '';

    const decodedData = decodeBase64(input);

    if (detectionMode.value === 'manual') {
      mime = selectedManualType.value.mime;
      extension = selectedManualType.value.extension;
    } else {
      // Auto detection logic
      const dataUriInfo = extractDataUriInfo(input);
      if (dataUriInfo) {
        mime = dataUriInfo.mime;
        extension = dataUriInfo.extension;
      }

      if (!mime) {
        const detected = detectFileType(decodedData);
        mime = detected.mime;
        extension = detected.extension;
      }
    }

    const blob = new Blob([decodedData], { type: mime });
    const objectUrl = URL.createObjectURL(blob);

    fileInfo.value = {
      mime,
      extension,
      data: decodedData,
      objectUrl
    };
  } catch (e) {
    console.error(e);
    error.value = 'Error al decodificar Base64. Asegúrate de que el formato sea correcto.';
  }
};

const handleClear = () => {
  base64Input.value = '';
  error.value = '';
  if (fileInfo.value?.objectUrl) {
    URL.revokeObjectURL(fileInfo.value.objectUrl);
  }
  fileInfo.value = null;
};

const downloadFile = () => {
  if (!fileInfo.value) return;
  const a = document.createElement('a');
  a.href = fileInfo.value.objectUrl;
  a.download = `archivo_recuperado.${fileInfo.value.extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// Cleanup object URLs to avoid memory leaks
watch(fileInfo, (newVal, oldVal) => {
  if (oldVal?.objectUrl && newVal?.objectUrl !== oldVal.objectUrl) {
    URL.revokeObjectURL(oldVal.objectUrl);
  }
});

const isPreviewPossible = computed(() => {
  return fileInfo.value && isPreviewable(fileInfo.value.mime);
});

const isImage = computed(() => 
  fileInfo.value?.mime.startsWith('image/') || fileInfo.value?.mime === 'image/svg+xml'
);
const isPdf = computed(() => fileInfo.value?.mime === 'application/pdf');
const isText = computed(() => 
  fileInfo.value?.mime.startsWith('text/') || 
  fileInfo.value?.mime === 'application/json' || 
  fileInfo.value?.mime === 'application/xml'
);

const textContent = ref('');
watch(fileInfo, async (newVal) => {
  if (newVal && isText.value) {
    const rawText = new TextDecoder().decode(newVal.data);
    if (newVal.mime === 'application/json') {
      try {
        textContent.value = JSON.stringify(JSON.parse(rawText), null, 2);
      } catch {
        textContent.value = rawText;
      }
    } else {
      textContent.value = rawText;
    }
  } else {
    textContent.value = '';
  }
});
</script>

<template>
  <div class="container">
    <header>
      <h1>Base64 to File</h1>
      <p>Recupera tus archivos originales a partir de cadenas Base64.</p>
    </header>

    <main>
      <div class="input-section">
        <div class="mode-selector">
          <button 
            :class="{ active: detectionMode === 'auto' }" 
            @click="detectionMode = 'auto'"
          >Detección Auto</button>
          <button 
            :class="{ active: detectionMode === 'manual' }" 
            @click="detectionMode = 'manual'"
          >Manual</button>
        </div>

        <div v-if="detectionMode === 'manual'" class="manual-options">
          <label for="fileType">Tipo de archivo:</label>
          <select id="fileType" v-model="selectedManualType">
            <option v-for="type in COMMON_TYPES" :key="type.mime" :value="type">
              {{ type.label }} ({{ type.extension }})
            </option>
          </select>
        </div>

        <textarea
          v-model="base64Input"
          placeholder="Pega aquí tu código Base64 o Data URI..."
          rows="10"
        ></textarea>
        
        <div class="actions">
          <button @click="handleConvert" class="btn-primary">Transformar</button>
          <button @click="handleClear" class="btn-secondary">Limpiar</button>
        </div>
        <p v-if="error" class="error-msg">{{ error }}</p>
      </div>

      <div v-if="fileInfo" class="result-section">
        <div class="file-meta">
          <h3>Archivo detectado/especificado</h3>
          <p><strong>Tipo MIME:</strong> {{ fileInfo.mime }}</p>
          <p><strong>Extensión sugerida:</strong> .{{ fileInfo.extension }}</p>
          <p><strong>Tamaño:</strong> {{ (fileInfo.data.length / 1024).toFixed(2) }} KB</p>
          <button @click="downloadFile" class="btn-download">Descargar Archivo</button>
        </div>

        <div v-if="isPreviewPossible" class="preview-section">
          <h3>Previsualización</h3>
          <div class="preview-container">
            <img v-if="isImage" :src="fileInfo.objectUrl" alt="Preview" />
            <iframe v-else-if="isPdf" :src="fileInfo.objectUrl" frameborder="0"></iframe>
            <pre v-else-if="isText" class="text-preview">{{ textContent }}</pre>
          </div>
        </div>
        <div v-else class="no-preview">
          <p>La previsualización no está disponible para este tipo de archivo, pero puedes descargarlo.</p>
        </div>
      </div>
    </main>

    <footer>
      <p>&copy; 2026 - Hecho con Vue 3 y mucho cariño.</p>
    </footer>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}

header {
  margin-bottom: 2rem;
  text-align: center;
}

h1 {
  margin-bottom: 0.5rem;
  color: #42b883;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.mode-selector {
  display: flex;
  gap: 0.5rem;
  background-color: #222;
  padding: 0.3rem;
  border-radius: 8px;
  align-self: flex-start;
}

.mode-selector button {
  padding: 0.4rem 1rem;
  background: transparent;
  border: none;
  color: #888;
  font-size: 0.9rem;
}

.mode-selector button.active {
  background-color: #444;
  color: white;
  border-radius: 6px;
}

.manual-options {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #222;
  padding: 1rem;
  border-radius: 8px;
  animation: slideDown 0.2s ease-out;
}

select {
  flex: 1;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: #333;
  color: white;
  border: 1px solid #444;
}

textarea {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #444;
  background-color: #1a1a1a;
  color: #eee;
  font-family: monospace;
  resize: vertical;
}

.actions {
  display: flex;
  gap: 1rem;
}

.btn-primary {
  background-color: #42b883;
  color: white;
  flex: 1;
}

.btn-primary:hover {
  background-color: #3aa876;
}

.btn-secondary {
  background-color: #444;
  color: white;
}

.error-msg {
  color: #ff5555;
  font-weight: bold;
}

.result-section {
  background-color: #2a2a2a;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #444;
  animation: fadeIn 0.3s ease-in;
}

.file-meta {
  margin-bottom: 1.5rem;
}

.btn-download {
  margin-top: 1rem;
  background-color: #646cff;
  color: white;
  width: 100%;
}

.preview-section h3 {
  margin-bottom: 1rem;
  border-top: 1px solid #444;
  padding-top: 1rem;
}

.preview-container {
  display: flex;
  justify-content: center;
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  min-height: 200px;
}

.preview-container img {
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
}

.preview-container iframe {
  width: 100%;
  height: 500px;
  border: none;
}

.text-preview {
  width: 100%;
  padding: 1rem;
  overflow: auto;
  max-height: 400px;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-all;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #adbac7;
}

.no-preview {
  text-align: center;
  color: #888;
  font-style: italic;
  padding: 2rem;
  border: 1px dashed #444;
  border-radius: 8px;
}

footer {
  margin-top: 4rem;
  text-align: center;
  font-size: 0.8rem;
  color: #666;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-color-scheme: light) {
  textarea {
    background-color: #f9f9f9;
    color: #333;
    border-color: #ccc;
  }
  .result-section {
    background-color: #f0f0f0;
    border-color: #ddd;
  }
  .preview-container {
    background-color: #fff;
  }
  .btn-secondary {
    background-color: #ccc;
    color: #333;
  }
  .mode-selector {
    background-color: #eee;
  }
  .mode-selector button.active {
    background-color: #ddd;
    color: #000;
  }
  .manual-options {
    background-color: #f5f5f5;
  }
  select {
    background-color: #fff;
    color: #333;
    border-color: #ccc;
  }
  .text-preview {
    color: #333;
  }
}
</style>
