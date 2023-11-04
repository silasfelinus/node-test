import { defineNuxtConfig } from "nuxt/config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  content: {
    documentDriven: true
  },
  devtools: { enabled: false },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/eslint-module',  '@pinia/nuxt', 'nuxt-icon', 'daisyui'],
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
  }

})
