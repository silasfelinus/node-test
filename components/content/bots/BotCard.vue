<template>
  <div class="bot-card bg-base-200 flex rounded-2xl p-4">
    <img :src="bot.avatarImage" alt="Bot Avatar" class="h-16 w-16 rounded-full" />
    <div class="ml-4">
      <h2 class="text-lg font-bold">{{ bot.name }}</h2>
      <p class="text-sm">{{ bot.subtitle }}</p>
      <p class="text-accent text-xs">{{ bot.personality }}</p>
      <button class="bg-primary mt-2 rounded px-2 py-1 text-white" @click="selectBot">Chat</button>
    </div>
  </div>
</template>

<script setup>
import { useBotStore } from '@/stores/botStore';

const botStore = useBotStore();
const bot = computed(() => botStore.currentBot);
</script>
