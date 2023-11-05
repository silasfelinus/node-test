<template>
  <div class="min-x-200 min-y-100 bg-base-200 m-2 rounded-2xl border p-2">
    <h3 class="text-lg font-bold">{{ idea.title }}</h3>
    <p class="text-base">{{ idea.example }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  idea: {
    type: Object,
    default: () => ({
      title: 'Shocking Idea',
      example: 'Hilarious Example',
    }),
  },
});
</script>
