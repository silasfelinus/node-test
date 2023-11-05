<template>
  <div class="bg-base-200 rounded-2xl border p-4 text-lg">
    <h1 class="mb-4 text-2xl">Art-Maker</h1>

    <!-- Prompt Input -->
    <div class="mt-4">
      <input v-model="prompt" placeholder="Enter your art prompt" class="w-full rounded-2xl p-2 text-lg" />
    </div>

    <!-- Generate Art Button -->
    <button class="bg-primary hover:bg-primary-dark mt-4 w-full rounded-2xl p-2 text-white" @click="generateArt">
      Generate Art
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const prompt = ref('');

const generateArt = async () => {
  try {
    const response = await fetch('/api/art/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt.value,
        username: 'silasfelinus',
        galleryName: 'cafefred',
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Art generated:', data);
    } else {
      console.error('Failed to generate art:', await response.text());
    }
  } catch (error: any) {
    console.error('Error generating art:', error);
  }
};
</script>
