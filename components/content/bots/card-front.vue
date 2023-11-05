<script setup lang="ts">
import { computed, ref } from 'vue';
import { useBotStore } from '../../../stores/botStore';

const botsStore = useBotStore();
const currentBot = computed(() => botsStore.currentBot);
const bots = computed(() => botsStore.bots);
const toggled = ref(false);
</script>
<template>
  <div
    class="card-front bg-base-200 text-base-content my-4 grid h-auto grid-rows-4 items-start gap-4 rounded-lg border-2 border-solid border-gray-300 p-4 opacity-90 shadow-lg lg:h-screen"
  >
    <div v-if="currentBot" class="row-span-full flex flex-col items-center space-y-4 lg:row-span-1">
      <div class="card bg-base-200 text-base-content w-full flex-grow overflow-auto shadow-xl">
        <div class="flex flex-col items-center p-4">
          <avatar-image class="mb-4 h-64 w-64 rounded-full object-cover" />
          <h1 class="card-title mb-2 text-4xl font-semibold">{{ currentBot.name }}</h1>
          <p class="mt-2 text-xl">{{ currentBot.description }}</p>
          <div class="w-40">
            <label for="n-selection" class="block text-sm font-medium text-gray-700"
              >Select Number of Iterations:</label
            >
          </div>

          <div class="mt-4">
            <div class="mt-4">
              <temperature-slider />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-front {
  perspective: 1000px;
}

.card-front .v-enter-active,
.card-front .v-leave-active {
  transition: transform 0.6s;
}

.card-front .v-enter,
.card-front .v-leave-to {
  transform: rotateY(180deg);
}
</style>
