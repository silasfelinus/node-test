<template>
  <div
    class="relative flex h-20 w-20 flex-col items-center justify-center"
    @mouseover="showText = true"
    @mouseleave="showText = false"
  >
    <button class="transform transition-transform duration-200 hover:scale-110 focus:outline-none" @click="toggleInfo">
      <icon :name="toggleIcon" class="h-16 w-16 text-6xl opacity-80" />
    </button>
    <p
      v-if="showText"
      class="pointer-events-none absolute bottom-0 text-sm opacity-100 transition-opacity duration-300"
    >
      {{ tooltipText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePageStore } from '@/stores/pageStore';

const pageStore = usePageStore();
const showText = ref(false);

const toggleInfo = () => {
  pageStore.toggleInfo();
};

const toggleIcon = computed(() => {
  return pageStore.showInfo ? 'mdi:chat-outline' : 'carbon:chat-off';
});

const tooltipText = computed(() => {
  return pageStore.showInfo ? 'Hide Info' : 'Show Info';
});
</script>
