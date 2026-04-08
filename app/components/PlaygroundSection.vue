<script setup lang="ts">
const { data, loading, error, shakeKey, fetchRandom, fetchRoast } = useTabban()

const selectedLevel = ref('')
const copied = ref(false)

function playFuuuuh() {
  const audio = new Audio('/fuuuuh.mp3')
  audio.volume = 0.1
  audio.play()
}

function handleFetchRandom() {
  fetchRandom({ level: selectedLevel.value })
  playFuuuuh()
}

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
  const img = e.target as HTMLImageElement
  img.src = '/memes/batman-bitch-slap.png'
}
</script>

<template>
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
          @click="handleFetchRandom"
        >
          <span v-if="loading" class="spinner" />
          <span v-else>🎲 Give me تباً</span>
        </button>
        <button
          class="btn btn-ghost btn-lg"
          :disabled="true"
          @click="fetchRoast(selectedLevel || 'savage')"
        >
          🔥 Roast me (coming soon)
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
            <div class="result-footer-actions">
              <button class="btn btn-ghost btn-sm" @click="copyPhrase">
                {{ copied ? '✅ Copied!' : '📋 Copy phrase' }}
              </button>
              <a
                v-if="data"
                :href="`/api/og?phrase=${encodeURIComponent(data.phrase)}&translation=${encodeURIComponent(data.translation)}&meme=${encodeURIComponent(data.meme_url)}`"
                download="tabban.png"
                class="btn btn-ghost btn-sm"
              >
                ⬇ Download image
              </a>
            </div>
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
</template>

<style scoped>
.playground {
  padding: 80px 0;
  border-top: 1px solid var(--border);
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

.btn-sm {
  padding: 8px 14px;
  font-size: 0.85rem;
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

.result-footer-actions {
  display: flex;
  gap: 8px;
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

/* ─── Transitions ─── */
.phrase-transition-enter-active {
  animation: fadeInUp 0.5s ease;
}

.phrase-transition-leave-active {
  animation: fadeInUp 0.3s ease reverse;
}

/* ─── Animations ─── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
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

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-fade-in-up { animation: fadeInUp 0.6s ease both; }
.animate-fade-in { animation: fadeIn 0.4s ease; }
.animate-shake { animation: shake 0.5s ease-in-out; }
.animate-float { animation: float 3s ease-in-out infinite; }
</style>
