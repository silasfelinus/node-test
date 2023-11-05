<template>
  <header class="bg-primary relative flex items-center justify-between rounded-2xl border p-2">
    <home-link />
    <layout-selector class="relative" />
    <!-- Butterfly Toggle -->
    <div class="m-2 flex items-center justify-center">
      <butterfly-toggle />
    </div>
    <!-- Title and Subtitle -->
    <h1 class="text-default text-4xl font-bold">Kind Robots</h1>
    <div class="relative m-2 flex flex-col items-center justify-center p-2">
      <!-- Conditional rendering for title -->
      <h1 v-if="page.subtitle" class="text-default text-4xl font-bold">{{ page.subtitle }}</h1>
      <h1 v-else class="text-default text-4xl font-bold">Location: 🌀 Loading...</h1>
    </div>
    <!-- Theme Selector -->
    <div class="relative flex items-center justify-center">
      <theme-toggle />
    </div>

    <!-- Screen FX -->
    <div class="relative flex items-center justify-center">
      <screen-fx />
    </div>
  </header>
</template>

<script setup lang="ts">
// Your existing script setup
const { page } = useContent();
useContentHead(page);
</script>
