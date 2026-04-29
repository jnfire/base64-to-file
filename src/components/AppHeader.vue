<template>
  <header class="app-header">
    <h1>Base64 to File</h1>
    <p class="subtitle">Decodificador local de cadenas Base64 a archivos.</p>
    <div class="badges">
      <span class="badge">Open Source</span>
      <span class="badge">Privacidad Local</span>
      <span class="badge">Sin Servidor</span>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  margin-bottom: 2.5rem;
  text-align: center;
}

h1 {
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.05em;
  color: var(--text-main);
}

.subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.badges {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.badge {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  background-color: var(--bg-surface);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
