<!-- RoomMeta.vue -->
<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Image -->
    <div class="m-1 flex items-center justify-center">
      <img :src="'/images/' + page.image" alt="Main Image" class="medium rounded-2xl border shadow-md" />
    </div>
    <!-- Title and Subtitle -->
    <div class="flex flex-col items-center justify-center">
      <room-title class="m-2 text-lg font-semibold" />
      <h2 class="text-md font-medium">{{ page.subtitle }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
const { page } = useContent();
</script>
