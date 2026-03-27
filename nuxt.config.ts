// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  css: ['~/assets/css/main.css'],

  nitro: {
    preset: "cloudflare_module",

    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    }
  },

  app: {
    head: {
      title: 'TaaS – Tabban as a Service 💥',
      meta: [
        { name: 'description', content: 'The world\'s most unnecessary yet essential API for Arabic rage phrases. Get your daily dose of تباً.' },
        { name: 'og:title', content: 'TaaS – Tabban as a Service' },
        { name: 'og:description', content: 'Random Arabic rage/sarcastic phrases + memes. Because someone had to build this.' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Space+Grotesk:wght@400;500;600;700&display=swap' },
      ],
    },
  },

  modules: ["nitro-cloudflare-dev"]
})