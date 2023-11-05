<template>
  <div class="bg-base relative z-10 flex h-screen flex-col items-center overflow-auto p-2">
    <div
      class="from-base to-base pointer-events-none absolute inset-0 z-10 bg-gradient-to-t via-transparent opacity-30"
    ></div>
    <div class="mx-2 my-2">
      <transition-group name="list" tag="div" class="space-y-2">
        <div
          v-for="bot in bots"
          :id="`bot-${bot.id}`"
          :key="bot.id"
          :style="{ backgroundColor: bot.theme || 'defaultColor' }"
          class="flex w-full cursor-pointer flex-col items-center justify-between transition-colors duration-200 ease-in-out"
          :class="{
            'bg-accent text-secondary': currentBot && currentBot.id === bot.id,
            'bg-primary': !currentBot || currentBot.id !== bot.id,
          }"
          @click="setCurrentBot(bot)"
        >
          <div :data-theme="bot.theme" class="m-1 rounded-lg">
            <avatar-image />
            <div class="bg-primary text-dark bg-opacity-80 p-2">
              <!-- Modified line -->
              <h2 class="mt-1 text-center text-xl font-semibold">{{ bot.name }}</h2>
              <p class="mt-1 text-center">{{ bot.description }}</p>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useBotStore, Bot } from '@/stores/botStore';

const botsStore = useBotStore();
const bots = computed(() => botsStore.bots);

const currentBot = computed(() => botsStore.currentBot);

onMounted(async () => {
  if (!bots.value) {
    await fetchBots();
  }
});

const fetchBots = async () => {
  try {
    const response = await fetch('/api/bots');
    const data = await response.json();
    botsStore.addBots(data);
    if (!currentBot.value && data.length > 0) {
      botsStore.getBotById(data[0].id);
    }
  } catch (error) {
    console.error(error);
  }
};

const setCurrentBot = (bot: Bot) => {
  botsStore.getBotById(bot.id);
};

watch(
  () => currentBot.value,
  (newCurrentBot, oldCurrentBot) => {
    if (newCurrentBot) {
      const id = newCurrentBot.id;
      const botElement = document.getElementById(`bot-${id}`);
      botElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },
);
</script>
