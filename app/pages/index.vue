<script setup lang="ts">
import { getPhrases, randomPick, getRandomMeme } from '~~/server/utils/phrases';

const ogPhrase = randomPick(getPhrases());
// getRandomMeme() can return GIFs; /api/og falls back internally, but passing
// a non-GIF keeps the og:image URL honest about which meme will be shown.
let ogMeme = getRandomMeme();
while (ogMeme.endsWith('.gif')) { ogMeme = getRandomMeme(); }
const requestUrl = useRequestURL();
const ogImageUrl = `${requestUrl.origin}/api/og`
  + `?phrase=${encodeURIComponent(ogPhrase.text)}`
  + `&translation=${encodeURIComponent(ogPhrase.translation)}`
  + `&meme=${encodeURIComponent(ogMeme)}`

useHead({
  title: 'TaaS – Tabban as a Service',
  meta: [
    { property: 'og:title', content: `${ogPhrase.text} – "${ogPhrase.translation}"` },
    { property: 'og:description', content: 'Random Arabic rage/sarcastic phrases + memes. Because someone had to build this.' },
    { property: 'og:image', content: ogImageUrl },
    { name: 'twitter:title', content: `${ogPhrase.text} – "${ogPhrase.translation}"` },
    { name: 'twitter:image', content: ogImageUrl },
  ],
})
</script>

<template>
  <div class="page">
    <AppHeader />
    <HeroSection />
    <PlaygroundSection />
    <ApiDocsSection />
    <AppFooter />
  </div>
</template>

<style scoped>
.page {
  position: relative;
  z-index: 1;
}
</style>
