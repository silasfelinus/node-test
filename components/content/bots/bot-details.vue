<template>
  <div
    class="border-secondary bg-primary text-base-content grid h-auto grid-cols-1 items-start gap-4 rounded-lg border-2 border-solid p-4 opacity-90 shadow-lg lg:h-screen lg:grid-cols-2"
  >
    <div v-if="currentBot" class="col-span-full flex flex-col lg:col-span-1">
      <div class="card bg-base-200 text-base-content flex-grow overflow-auto shadow-xl">
        <div class="flex flex-col items-stretch lg:flex-row">
          <avatar-image />
        </div>
        <div class="card-body flex-grow overflow-auto">
          <h1 class="card-title mb-4 text-5xl font-semibold">{{ currentBot.name }}</h1>
          <p class="mt-4 text-2xl">{{ currentBot.description }}</p>
          <div class="w-40">
            <label for="n-selection" class="block text-sm font-medium text-gray-700">Variations:</label>
          </div>
        </div>
        <div class="mt-4">
          <temperature-slider />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useBotStore } from '../../../stores/botStore';

const botsStore = useBotStore();
const currentBot = computed(() => botsStore.currentBot);
const bots = computed(() => botsStore.bots);
</script>
