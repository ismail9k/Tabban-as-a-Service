<template>
  <header class="header animate-slide-in-down">
    <div class="container">
      <div class="header-inner">
        <div class="logo">
          <span class="logo-icon">💥</span>
          <span class="logo-text">TaaS</span>
          <span class="logo-sub">Tabban as a Service</span>
        </div>
        <nav class="nav">
          <a href="#playground" class="btn btn-ghost btn-sm">Playground</a>
          <a href="#api" class="btn btn-ghost btn-sm">API Docs</a>
          <a
            href="https://github.com/ismail9k/Tabban-as-a-Service"
            target="_blank"
            rel="noopener"
            class="btn btn-ghost btn-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 16px 0;
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon { font-size: 1.5rem; }

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-sub {
  font-size: 0.75rem;
  color: var(--text-muted);
  border-left: 1px solid var(--border);
  padding-left: 10px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-sm {
  padding: 8px 14px;
  font-size: 0.85rem;
}

@media (max-width: 700px) {
  .logo-sub { display: none; }
  .nav a:first-child { display: none; }
}

@keyframes slideInDown {
  from { opacity: 0; transform: translateY(-15px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-in-down { animation: slideInDown 0.5s ease; }
</style>
