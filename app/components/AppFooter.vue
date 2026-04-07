<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-inner">
        <div class="footer-logo">
          <span>💥</span>
          <span>TaaS – Tabban as a Service</span>
        </div>
        <p class="footer-text">
          Made with ❤️ and a lot of تباً.<br/>
          <a href="https://github.com/ismail9k/Tabban-as-a-Service" target="_blank" class="footer-link">Contribute on GitHub</a>
        </p>
        <p class="footer-disclaimer">
          No feelings were permanently harmed in the making of this API. Probably.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 48px 0;
  text-align: center;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 1.1rem;
}

.footer-text {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.8;
}

.footer-link {
  color: var(--accent);
  text-decoration: none;
}

.footer-link:hover { text-decoration: underline; }

.footer-disclaimer {
  color: rgba(136, 136, 170, 0.5);
  font-size: 0.8rem;
  font-style: italic;
}
</style>
