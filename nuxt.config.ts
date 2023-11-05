// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon'],
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  content: {
    documentDriven: true,
  },
  devtools: { enabled: false },
});
