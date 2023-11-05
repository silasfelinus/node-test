<template>
  <!-- Main container -->
  <div class="bg-base-200 m-1 flex flex-col items-center p-1">
    <bot-selector />
    <!-- Display bot details if a bot is selected -->
    <div v-if="currentBot" :data-theme="currentBot.theme" class="bg-base-200 w-full rounded-2xl">
      <!-- Bot name and ID -->
      <div class="m-4 flex items-center justify-between">
        <h1 class="text-3xl font-bold">{{ currentBot.name }}</h1>
        <span class="text-sm text-gray-600">Bot ID#{{ currentBot.id - 1 }} / Meet Them All!</span>
      </div>

      <stream-test />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'; // Import computed
import { useBotStore } from '../../../stores/botStore';

const botStore = useBotStore();
const currentBot = computed(() => botStore.currentBot);
</script>

<style>
.animate-typing {
  overflow: hidden;
  white-space: nowrap;
  border-right: 0.15em solid transparent;
  animation: typing 2s steps(30, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: inherit;
  }
}
</style>
