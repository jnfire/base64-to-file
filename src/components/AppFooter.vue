<template>
  <footer class="app-footer">
    <p>
      {{ $t('footer.text') }}
    </p>
    <div class="links">
      <a href="https://github.com/jaiver/base64-to-file" target="_blank" rel="noopener noreferrer">{{ $t('footer.source') }}</a>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
  text-align: center;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.links {
  margin-top: 0.5rem;
}

a {
  color: var(--text-main);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

a:hover {
  color: var(--accent-color);
  text-decoration: underline;
}
</style>
