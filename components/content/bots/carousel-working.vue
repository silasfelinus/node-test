<template>
  <div class="bg-base relative flex h-screen flex-col items-center overflow-auto p-8">
    <div
      class="from-base to-base pointer-events-none absolute inset-0 z-10 bg-gradient-to-t via-transparent opacity-30"
    ></div>
    <div class="mx-auto mt-24 max-w-4xl">
      <div class="carousel carousel-vertical rounded-box h-96">
        <div
          v-for="bot in bots"
          :key="bot.id"
          class="carousel-item h-full cursor-pointer transition-colors duration-200 ease-in-out"
          :class="{
            'bg-accent text-default animate-pulse': currentBot && currentBot.id === bot.id,
            'bg-primary': !currentBot || currentBot.id !== bot.id,
          }"
          @click="setCurrentBot(bot)"
        >
          <img :src="bot.avatarImage ?? undefined" alt="Bot Avatar" class="h-full w-full rounded-lg object-cover" />
          <div :data-theme="bot.theme" class="bg-primary text-default bg-opacity-70 p-2">
            <h2 class="text-dark mt-4 text-center text-2xl font-semibold">{{ bot.name }}</h2>
            <p class="text-dark mt-2 text-center text-xl">{{ bot.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useBotStore, type Bot } from '../../../stores/botStore';

const botStore = useBotStore();
const bots = computed(() => botStore.bots);
const currentBot = computed(() => botStore.currentBot);

const setCurrentBot = (bot: Bot): void => {
  try {
    botStore.getBotById(bot.id);
  } catch (error) {
    console.error('Failed to set current bot', error);
  }
};

watch(
  () => currentBot.value,
  (newCurrentBot: Bot | null) => {
    if (newCurrentBot) {
      const id = newCurrentBot.id;
      const botElement = document.getElementById(`bot-${id}`);
      botElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },
);
</script>
