<template>
  <div class="text-center">
    <h1 v-if="page && page.title" class="m-1 inline-block rounded-2xl border p-1 text-2xl shadow-lg">
      The {{ page.title }} Room
    </h1>
    <h1 v-else class="m-1 inline-block rounded-2xl border p-1 text-2xl shadow-lg">🌈 Fetching details...</h1>
  </div>
</template>

<script setup lang="ts">
const { page } = useContent();
</script>
