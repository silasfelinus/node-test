<template>
  <div class="bg-base-400 text-default m-6 flex items-center rounded-2xl border p-4 shadow-md">
    <!-- Butterfly Container -->
    <div class="h-10 w-10 flex-none">
      <icon name="icon-park-twotone:butterfly" class="h-full w-full text-2xl" />
    </div>
    <!-- Text Container -->
    <div class="ml-4 flex-grow">
      <span class="flex items-center font-semibold">
        <icon name="mdi:chat" class="text-default mr-2 text-2xl" />
        <span class="text-default text-xl">{{ streamedText }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps<{
  tooltip: string;
}>();

const streamedText = ref('');
let index = 0;
let timer: number;

const startStreaming = () => {
  timer = window.setInterval(() => {
    if (index < props.tooltip.length) {
      streamedText.value += props.tooltip[index];
      index++;
    } else {
      clearInterval(timer);
    }
  }, 100); // Adjust the speed as needed
};

onMounted(() => {
  startStreaming();
});

watch(
  () => props.tooltip,
  () => {
    clearInterval(timer);
    streamedText.value = '';
    index = 0;
    startStreaming();
  },
);
</script>

<style scoped>
.tooltip-container {
  background-color: var(--bg-base-400);
  color: var(--bg-primary);
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
