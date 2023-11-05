<template>
  <div class="bg-base relative flex h-screen flex-col items-center overflow-auto">
    <div
      class="from-base to-base pointer-events-none absolute inset-0 z-10 bg-gradient-to-t via-transparent opacity-30"
    ></div>
    <h1 class="mt-8 text-center text-3xl font-semibold">Welcome to Kind Robots</h1>
    <div class="mx-auto mt-24 max-w-4xl">
      <div class="carousel carousel-vertical rounded-box h-96">
        <div
          v-for="bot in bots"
          :id="`bot-${bot.id}`"
          :key="bot.id"
          class="carousel-item h-full cursor-pointer transition-colors duration-200 ease-in-out"
          :class="{
            'bg-accent text-default': currentBot?.id === bot.id,
            'bg-primary': currentBot?.id !== bot.id,
          }"
          @click="setCurrentBot(bot.id)"
        >
          <img :src="bot.avatarImage ?? undefined" class="w-full rounded-lg object-cover" />
        </div>
      </div>
      <div v-if="currentBot" class="text-dark mt-4 text-center text-2xl font-semibold">
        {{ currentBot.name }}
        <p class="text-dark mt-2 text-center text-xl">{{ currentBot.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useBotStore } from '../../../stores/botStore';

const botStore = useBotStore();
const bots = computed(() => botStore.bots);
const currentBot = computed(() => botStore.currentBot);

const setCurrentBot = (botId: number) => {
  botStore.getBotById(botId);
};

onMounted(async () => {
  if (bots.value.length === 0) {
    await botStore.loadStore();
  }
});

watch(
  () => currentBot.value,
  (newBot) => {
    if (newBot) {
      const carousel = document.querySelector('.carousel') as HTMLElement;
      const botElement = document.getElementById(`bot-${newBot.id}`) as HTMLElement;
      if (carousel && botElement) {
        const carouselRect = carousel.getBoundingClientRect();
        const botElementRect = botElement.getBoundingClientRect();
        const offset = botElementRect.top - carouselRect.top;
        carousel.scrollTop = offset - (carousel.clientHeight - botElement.clientHeight) / 2;
      }
    }
  },
);
</script>
