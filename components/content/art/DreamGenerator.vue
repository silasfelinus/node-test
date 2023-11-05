<template>
  <div class="bg-base-200 rounded-2xl p-8 text-lg">
    <h1 class="mb-4 text-2xl">Dream-Generator</h1>

    <!-- Random Dream as Prompt -->
    <div class="mt-4">
      <button class="bg-accent rounded-2xl p-2 text-white" @click="getRandomDream">Get Random Dream</button>
      <p v-if="randomDream">{{ randomDream }}</p>
    </div>

    <!-- Prompt Input -->
    <div class="mt-4">
      <input v-model="prompt" placeholder="Enter your art prompt" class="w-full rounded-2xl p-2 text-lg" />
    </div>

    <!-- Generate Art Button -->
    <button
      :disabled="isLoading"
      class="bg-primary hover:bg-primary-dark mt-4 w-full rounded-2xl p-2 text-white"
      @click="generateArt"
    >
      Generate Dream
    </button>

    <!-- Loading State -->
    <div v-if="isLoading" class="mt-4 flex flex-col items-center">
      <p>{{ loadingMessage }}</p>
      <div class="loader mt-2 flex justify-center">
        <ami-butterfly />
      </div>
    </div>
    <!-- Add this line where you want to display the milestone-check -->
    <milestone-reward v-if="shouldShowMilestoneCheck" :id="11"></milestone-reward>

    <!-- Display Created Art -->
    <div v-for="art in createdArts" :key="art.id" class="mt-4">
      <art-card :art="art" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDreamStore } from '@/stores/dreamStore';
import { errorHandler } from '@/server/api/utils/error';
import { useUserStore } from '@/stores/userStore';
import { useLoadStore } from '@/stores/loadStore';
import { useArtStore, Art } from '@/stores/artStore';

// Load stores
const dreamStore = useDreamStore();
const userStore = useUserStore();
const loadStore = useLoadStore();
const artStore = useArtStore();
const shouldShowMilestoneCheck = ref(false);
// Art Prompt text
const prompt = ref('');
const flavorText = ref('');
const username = computed(() => userStore.username);

// Art Prompt Ids
const userId = computed(() => userStore.userId);

const isLoading = ref(false);
const createdArts = ref<Art[]>([]); // Array to store created art
const randomDream = ref<string | null>(null);
const loadingMessage = ref<string | null>(null);

const getLoadingMessage = () => {
  loadingMessage.value = loadStore.randomLoadMessage();
};

const getRandomDream = () => {
  randomDream.value = dreamStore.randomDream();
  prompt.value = randomDream.value;
};

const generateArt = async () => {
  getLoadingMessage();
  isLoading.value = true;
  try {
    const response = await fetch('/api/art/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt.value,
        userName: username.value,
        galleryName: 'cafefred',
        pitchId: 6,
        title: 'dreamscapes',
        isMature: false,
        isPublic: true,
        isOrphan: true,
        flavorText: flavorText.value,
        userId: userId.value,
        galleryId: 21,
        channelName: 'dreamscapes',
      }),
    });

    if (response.ok) {
      const data = await response.json();
      createdArts.value.unshift(data.newArt as Art);
      shouldShowMilestoneCheck.value = true;
      console.log('Art generated:', createdArts);
    } else {
      const errorText = await response.text();
      const handledError = errorHandler(new Error(errorText));
      console.error('Failed to generate dream:', handledError.message);
    }
  } catch (error: any) {
    const handledError = errorHandler(error);
    console.error('Error generating art:', handledError.message);
  } finally {
    isLoading.value = false;
  }
};
</script>
