<template>
  <header class="bg-base-400 border-accent relative m-2 flex flex-col items-center rounded-2xl border-8 p-2">
    <div class="flex w-full items-center justify-between">
      <home-link />
      <layout-selector class="relative" />
      <h1 class="text-default text-4xl font-bold">Welcome to Kind Robots</h1>
      <theme-toggle />
      <butterfly-toggle class="mr-2" />
    </div>

    <div
      class="bg-secondary border-accent relative m-2 flex w-full flex-col items-center justify-center rounded-2xl border-8 p-2"
    >
      <h1 v-if="page.title" class="text-default text-4xl font-bold">Location: {{ page.title }}</h1>
      <h1 v-else class="text-default text-4xl font-bold">Location: 🌀 Loading...</h1>
      <h2 v-if="page.subtitle" class="text-default text-2xl">
        {{ page.subtitle }}
      </h2>
      <h2 v-else class="text-accent text-2xl">🌈 Fetching details...</h2>
    </div>

    <div class="relative m-2 flex w-full items-center justify-center">
      <screen-fx />
    </div>
  </header>
</template>

<script setup lang="ts">
const { page } = useContent();
useContentHead(page);
</script>

<style scoped>
/* Flip card transition */
.flip-card-enter-active,
.flip-card-leave-active {
  transition: transform 1s;
}
.flip-card-enter,
.flip-card-leave-to {
  transform: rotateY(180deg);
}
</style>
