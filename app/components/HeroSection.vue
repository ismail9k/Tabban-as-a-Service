<template>
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
</template>

<style scoped>
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

@media (max-width: 700px) {
  .hero-stats { gap: 16px; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up { animation: fadeInUp 0.6s ease both; }
</style>
