<template>
  <footer class="footer">
    <div class="footer__content">
      <p class="footer__text">
        {{ $t('footer.text') }}
      </p>
      <div class="footer__links">
        <a
          href="https://github.com/jnfire/base64-to-file"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__link"
        >
          {{ $t('footer.source') }}
        </a>
        <span class="footer__divider">|</span>
        <a
          href="https://github.com/jnfire/base64-to-file/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__link"
        >
          {{ $t('footer.license') }}
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 3rem 1.5rem;
  margin-top: 4rem;
  border-top: 1px solid var(--border-color);
}

.footer__content {
  text-align: center;
}

.footer__text {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.footer__links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
}

.footer__link {
  color: var(--text-main);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.2s;
}

.footer__link:hover {
  opacity: 0.7;
}

.footer__divider {
  color: var(--border-color);
  font-size: 0.8rem;
}
</style>
