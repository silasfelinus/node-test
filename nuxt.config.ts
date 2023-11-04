import { defineNuxtConfig } from "nuxt/config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  content: {
    documentDriven: true
  },
  devtools: { enabled: false },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/eslint-module',  '@pinia/nuxt', 'nuxt-icon'],

})
