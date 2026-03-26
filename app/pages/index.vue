<template>
  <div class="page">
    <!-- ─── Header ─── -->
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
              href="https://github.com/ismail9k/tabban"
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

    <!-- ─── Hero ─── -->
    <section class="hero">
      <div class="container">
        <div class="hero-inner animate-fade-in-up">
          <div class="hero-badge">
            <span>✨ Open Source & Free</span>
          </div>
          <h1 class="hero-title">
            Arabic Rage<br/>
            <span class="gradient-text">as a Service.</span>
          </h1>
          <p class="hero-desc">
            Because sometimes English just doesn't capture the <em>exact</em> level of disappointment.
            Get random Arabic insults, sarcasm, and dramatic expressions — with memes. Obviously.
          </p>
          <div class="hero-actions">
            <a href="#playground" class="btn btn-primary">Try it Now 💥</a>
            <a href="#api" class="btn btn-ghost">API Docs →</a>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-num">50+</span>
              <span class="stat-label">Phrases</span>
            </div>
            <div class="stat-divider" />
            <div class="stat">
              <span class="stat-num">∞</span>
              <span class="stat-label">Feelings Hurt</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Playground ─── -->
    <section id="playground" class="playground">
      <div class="container">
        <div class="section-header animate-fade-in-up">
          <h2 class="section-title">🎮 Playground</h2>
          <p class="section-desc">Pick your poison. We mean category.</p>
        </div>

        <!-- Controls -->
        <div class="controls animate-fade-in-up delay-100">
          <div class="control-group">
            <label class="control-label">Intensity</label>
            <div class="btn-group">
              <button
                v-for="lvl in ['all', 'mild', 'medium', 'savage']"
                :key="lvl"
                class="btn btn-ghost"
                :class="{ active: selectedLevel === (lvl === 'all' ? '' : lvl) }"
                @click="selectedLevel = lvl === 'all' ? '' : lvl"
              >
                {{ lvlEmoji(lvl) }} {{ lvl }}
              </button>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-row animate-fade-in-up delay-200">
          <button
            class="btn btn-primary btn-lg"
            :disabled="loading"
            @click="fetchRandom({ level: selectedLevel })"
          >
            <span v-if="loading" class="spinner" />
            <span v-else>🎲 Give me تباً</span>
          </button>
          <button
            class="btn btn-ghost btn-lg"
            :disabled="loading"
            @click="fetchRoast(selectedLevel || 'savage')"
          >
            🔥 Roast me
          </button>
        </div>

        <!-- Error State -->
        <div v-if="error" class="error-card animate-fade-in-up">
          <span class="error-icon">💔</span>
          <p>{{ error }}</p>
        </div>

        <!-- Result Card -->
        <Transition name="phrase-transition" mode="out-in">
          <div
            v-if="data"
            :key="shakeKey"
            class="result-card animate-fade-in-up"
          >
            <!-- Arabic Phrase -->
            <div class="result-phrase arabic animate-shake">
              {{ data.phrase }}
            </div>

            <!-- Translation -->
            <div class="result-translation">
              "{{ data.translation }}"
            </div>

            <!-- Meme -->
            <div class="meme-wrapper">
              <img
                :src="data.meme_url"
                :key="data.meme_url"
                alt="Reaction meme"
                class="meme-img animate-fade-in"
                @error="handleImgError"
              />
              <div class="meme-overlay">
                <span>📸 Meme of the moment</span>
              </div>
            </div>

            <!-- Share hint -->
            <div class="result-footer">
              <button class="btn btn-ghost btn-sm" @click="copyPhrase">
                {{ copied ? '✅ Copied!' : '📋 Copy phrase' }}
              </button>
              <span class="result-footer-hint">Hit the button again for more chaos 💥</span>
            </div>
          </div>
        </Transition>

        <!-- Empty state -->
        <div v-if="!data && !loading && !error" class="empty-state animate-float">
          <div class="empty-icon">💥</div>
          <p>Click the button. You know you want to.</p>
        </div>
      </div>
    </section>

    <!-- ─── API Docs ─── -->
    <section id="api" class="api-docs">
      <div class="container">
        <div class="section-header animate-fade-in-up">
          <h2 class="section-title">📡 API Reference</h2>
          <p class="section-desc">Simple REST. No auth. Just vibes (and rate limits).</p>
        </div>

        <div class="endpoints-grid">
          <div v-for="endpoint in apiEndpoints" :key="endpoint.path" class="endpoint-card card animate-fade-in-up">
            <div class="endpoint-header">
              <span class="method-badge">GET</span>
              <code class="endpoint-path">{{ endpoint.path }}</code>
            </div>
            <p class="endpoint-desc">{{ endpoint.desc }}</p>
            <div v-if="endpoint.params?.length" class="endpoint-params">
              <div v-for="param in endpoint.params" :key="param.name" class="param-row">
                <code class="param-name">?{{ param.name }}</code>
                <span class="param-desc">{{ param.desc }}</span>
              </div>
            </div>
            <div class="code-block">{{ endpoint.example }}</div>
          </div>
        </div>

        <!-- Base URL note -->
        <div class="api-note card animate-fade-in-up">
          <div class="api-note-header">
            <span>🌐</span>
            <strong>Base URL</strong>
          </div>
          <div class="code-block">https://your-domain.pages.dev</div>
          <p class="api-note-text">
            Self-host it. It's free. It's open source. Share the تباً with the world.
          </p>
        </div>
      </div>
    </section>

    <!-- ─── Footer ─── -->
    <footer class="footer">
      <div class="container">
        <div class="footer-inner">
          <div class="footer-logo">
            <span>💥</span>
            <span>TaaS – Tabban as a Service</span>
          </div>
          <p class="footer-text">
            Made with ❤️ and a lot of تباً.<br/>
            <a href="https://github.com/ismail9k/tabban" target="_blank" class="footer-link">Contribute on GitHub</a>
          </p>
          <p class="footer-disclaimer">
            No feelings were permanently harmed in the making of this API. Probably.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { getPhrases, randomPick } from '~~/server/utils/phrases';

useHead({
  title: 'TaaS – Tabban as a Service 💥',
})

const { data, loading, error, shakeKey, fetchRandom, fetchRoast } = useTabban()

// Controls state
const selectedLevel = ref('')
const copied = ref(false)


function lvlEmoji(lvl: string) {
  return { all: '🌈', mild: '😊', medium: '😬', savage: '💀' }[lvl] ?? '❓'
}

async function copyPhrase() {
  if (!data.value) return
  await navigator.clipboard.writeText(`${data.value.phrase}\n"${data.value.translation}"`)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

function handleImgError(e: Event) {
  // Replace broken meme with a placeholder
  const img = e.target as HTMLImageElement
  img.src = '/memes/batman-bitch-slap.png'
}

const apiEndpoints = [
  {
    path: '/api/tabban',
    desc: 'Returns a random Arabic phrase + meme. The foundation of this whole operation.',
    params: [
      { name: 'level', desc: 'mild | medium | savage' },
    ],
    example: `GET /api/tabban

${JSON.stringify(randomPick(getPhrases()), null, 2)}`,
  },
  {
    path: '/api/health',
    desc: 'Check if the server is alive. It is. Mostly.',
    params: [],
    example: `GET /api/health

{
  "status": "ok",
  "service": "Tabban-as-a-Service (TaaS)",
  "version": "1.0.0",
  "message": "💥 Server is alive.",
  "motto": "تباً – Since forever."
}`,
  },
]
</script>

<style scoped>
/* ─── Page Layout ─── */
.page {
  position: relative;
  z-index: 1;
}

/* ─── Header ─── */
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

/* ─── Hero ─── */
.hero {
  padding: 100px 0 80px;
  text-align: center;
}

.hero-inner {
  max-width: 700px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(255, 56, 96, 0.1);
  border: 1px solid rgba(255, 56, 96, 0.3);
  border-radius: 100px;
  font-size: 0.8rem;
  color: var(--accent);
  margin-bottom: 24px;
  font-weight: 600;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

.hero-desc {
  font-size: 1.15rem;
  color: var(--text-muted);
  margin-bottom: 36px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 48px;
  flex-wrap: wrap;
}

.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
}

.stat { text-align: center; }

.stat-num {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border);
}

/* ─── Sections ─── */
.playground, .api-docs {
  padding: 80px 0;
}

.playground {
  border-top: 1px solid var(--border);
}

.api-docs {
  border-top: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.01);
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.section-desc {
  color: var(--text-muted);
  font-size: 1.05rem;
}

/* ─── Controls ─── */
.controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.control-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  font-weight: 600;
  min-width: 72px;
}

.btn-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* ─── Action row ─── */
.action-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.btn-lg {
  padding: 16px 32px;
  font-size: 1.05rem;
}

/* ─── Error ─── */
.error-card {
  background: rgba(255, 56, 96, 0.08);
  border: 1px solid rgba(255, 56, 96, 0.25);
  border-radius: var(--radius);
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ff6b6b;
  margin-bottom: 24px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.error-icon { font-size: 1.5rem; }

/* ─── Result Card ─── */
.result-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 36px;
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
}

.result-badges {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.result-phrase {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  line-height: 1.3;
  margin-bottom: 16px;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.result-translation {
  font-size: 1.1rem;
  color: var(--text-muted);
  font-style: italic;
  margin-bottom: 32px;
}

.meme-wrapper {
  position: relative;
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin-bottom: 24px;
  background: var(--bg);
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.meme-img {
  width: 100%;
  max-height: 360px;
  object-fit: contain;
  border-radius: var(--radius-sm);
  display: block;
}

.meme-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 16px;
  background: linear-gradient(transparent, rgba(0,0,0,0.5));
  font-size: 0.75rem;
  color: rgba(255,255,255,0.6);
  text-align: left;
}

.result-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.result-footer-hint {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* ─── Empty State ─── */
.empty-state {
  text-align: center;
  padding: 60px 24px;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 16px;
  display: block;
}

/* ─── API Docs ─── */
.endpoints-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 32px;
}

@media (max-width: 700px) {
  .endpoints-grid { grid-template-columns: 1fr; }
  .hero-stats { gap: 16px; }
  .logo-sub { display: none; }
  .nav a:first-child { display: none; }
}

.endpoint-card {
  padding: 24px;
}

.endpoint-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.method-badge {
  background: rgba(80, 200, 120, 0.15);
  color: #50c878;
  border: 1px solid rgba(80, 200, 120, 0.3);
  padding: 3px 9px;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.endpoint-path {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: var(--accent);
}

.endpoint-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 16px;
  line-height: 1.6;
}

.endpoint-params {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.param-row {
  display: flex;
  gap: 10px;
  font-size: 0.82rem;
  align-items: baseline;
}

.param-name {
  color: var(--accent-3);
  font-family: monospace;
  white-space: nowrap;
}

.param-desc { color: var(--text-muted); }

.api-note {
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
  text-align: center;
}

.api-note-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 1rem;
  justify-content: center;
}

.api-note-text {
  margin-top: 12px;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
}

/* ─── Footer ─── */
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

/* ─── Transitions ─── */
.phrase-transition-enter-active {
  animation: fadeInUp 0.5s ease;
}

.phrase-transition-leave-active {
  animation: fadeInUp 0.3s ease reverse;
}

/* ─── Animations from global ─── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-slide-in-down { animation: slideInDown 0.5s ease; }
.animate-fade-in-up { animation: fadeInUp 0.6s ease both; }
.animate-fade-in { animation: fadeIn 0.4s ease; }
.animate-shake { animation: shake 0.5s ease-in-out; }
.animate-float { animation: float 3s ease-in-out infinite; }

@keyframes slideInDown {
  from { opacity: 0; transform: translateY(-15px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
  20%, 40%, 60%, 80% { transform: translateX(6px); }
}
</style>
