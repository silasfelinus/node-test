<template>
  <div class="bg-base-200 relative flex h-screen flex-col items-center overflow-auto rounded-2xl p-2">
    <div class="m-4 mx-auto max-w-4xl">
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
          <img :src="bot.avatarImage ?? undefined" class="h-full w-full rounded-lg object-cover" />
        </div>
      </div>
      <div v-if="currentBot" class="text-dark mt-4 text-center text-2xl font-semibold">
        <div class="card bg-info w-fit rounded-2xl">
          {{ currentBot.name }}
        </div>
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
  (newCurrentBot) => {
    if (newCurrentBot) {
      const id = newCurrentBot.id;
      const botElement = document.getElementById(`bot-${id}`);
      botElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },
);
</script>

<style>
.carousel {
  scroll-behavior: smooth;
  overflow-y: hidden;
}

.carousel-item {
  margin-bottom: 20px;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
