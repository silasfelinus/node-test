<template>
  <div class="bg-base-200 flex min-h-screen flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:mx-auto sm:max-w-xl">
      <div class="absolute inset-0 transform rounded-3xl bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg"></div>
      <div class="relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
        <div class="mx-auto max-w-md">
          <div class="flex w-full flex-col">
            <label class="mb-2 font-bold text-gray-700" for="bot-selector">Select a Bot:</label>
            <select
              id="bot-selector"
              v-model="selectedBot"
              class="form-select mt-1 block w-full rounded-2xl"
              @change="handleChange"
            >
              <option disabled value="">Please select a bot</option>
              <option v-for="bot in bots" :key="bot.id" :value="bot.id">
                {{ bot.name }}
              </option>
            </select>
            <div v-if="currentBot" class="mt-4 text-blue-500">
              <p>Active bot: {{ currentBot.name }}</p>
            </div>
            <!-- Card display -->
            <div v-if="currentBot" class="mt-4 rounded-lg bg-gray-100 p-4 shadow-md">
              <img :src="currentBot.avatarImage" alt="Bot Avatar" class="mx-auto h-24 w-24 rounded-full" />
              <h3 class="mt-4 text-center text-2xl">{{ currentBot.name }}</h3>
              <p class="mt-2 text-center">{{ currentBot.description }}</p>
            </div>
            <div v-else>
              <title-image />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useBotStore } from '../../../stores/botStore';

const botStore = useBotStore();
const selectedBot = ref('');
const bots = computed(() => botStore.bots);
const currentBot = computed(() => botStore.currentBot);

onMounted(async () => {
  try {
    await botStore.loadStore();
  } catch (err) {
    console.error('Failed to load store', err);
  }
});

const handleChange = async () => {
  await botStore.getBotById(Number(selectedBot.value));
};

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
