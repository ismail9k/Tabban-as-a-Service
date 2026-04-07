
<script setup lang="ts">
import { getPhrases, randomPick } from '~~/server/utils/phrases';

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

<template>
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
        <div class="code-block">https://tabban.lol/</div>
        <p class="api-note-text">
          Self-host it. It's free. It's open source. Share the تباً with the world.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.api-docs {
  padding: 80px 0;
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

.endpoints-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 32px;
}

@media (max-width: 700px) {
  .endpoints-grid { grid-template-columns: 1fr; }
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

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up { animation: fadeInUp 0.6s ease both; }
</style>
