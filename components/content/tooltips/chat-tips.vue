<template>
  <div v-if="shouldDisplayTooltip" class="m-4 grid grid-cols-1 gap-4 rounded-2xl p-2 text-xl md:grid-cols-4">
    <!-- Tips Area -->
    <div v-if="page.tooltip || page.amitip" class="flex flex-col items-center justify-center gap-4 md:flex-row">
      <!-- Silas Section -->
      <div v-if="page.tooltip" class="bg-base-200 flex flex-col items-center rounded-2xl p-4">
        <img src="/images/silasfelinus.webp" alt="Silas" class="mb-2 h-16 w-16 rounded-full" />
        <div class="mb-2 rounded-2xl border text-sm">silasfelinus</div>
        <div class="flex flex-col overflow-auto">
          {{ page.tooltip }}
        </div>
      </div>

      <!-- AMI Section -->
      <div v-if="page.amitip" class="bg-base-200 flex flex-col items-center rounded-2xl p-4">
        <img src="/images/amibotsquare1.webp" alt="AMI" class="mb-2 h-16 w-16 rounded-full" />
        <div class="mb-2 rounded-2xl border text-sm">AMIbot</div>
        <div class="flex flex-col overflow-auto">
          {{ page.amitip }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePageStore } from '@/stores/pageStore';

const { page } = useContent();
const pageStore = usePageStore();

const shouldDisplayTooltip = computed(() => {
  if (pageStore.showInfo) {
    return pageStore.showInfo;
  }
  return pageStore.showTooltip && (page.tooltip || page.amitip);
});
</script>

<style>
.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
