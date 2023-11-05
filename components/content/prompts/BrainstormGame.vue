<template>
  <div class="bg-base-200 m-2 flex flex-col items-center rounded-2xl border p-2">
    <h1 class="mb-4 text-3xl font-bold">Brainstorm Café</h1>
    <img :src="pageImage" alt="Brainstorming" class="mb-4 h-40 w-40 rounded-full" />
    <p class="mb-4 text-lg">
      Welcome to the Brainstorm Café! Click the button below to get some fresh, creative ideas.
    </p>
    <button class="bg-primary m-4 rounded-full p-4 text-lg text-white" :disabled="isLoading" @click="fetchBrainstorm">
      Get New Ideas
    </button>
    <milestone-reward v-if="shouldShowMilestoneCheck" :id="2"></milestone-reward>
    <div
      v-if="isLoading"
      class="loader mb-4 h-16 w-16 rounded-full border-8 border-t-8 border-gray-200 ease-linear"
    ></div>
    <transition-group name="list" tag="div" class="flex flex-wrap justify-center">
      <div v-for="idea in allIdeas" :key="idea.title" class="m-2">
        <BrainstormCard :idea="idea" @click="handleCardClick(idea)" />
      </div>
    </transition-group>
    <div v-if="errorMessage" class="bg-warning rounded-full p-4 text-white">
      <icon name="error" class="text-lg" /> {{ errorMessage }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { errorHandler } from '../../../server/api/utils/error';
import { sampleIdeas } from '@/training/sampleIdeas';

interface Idea {
  title: string;
  example: string;
}

const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const pageImage = '/images/avatars/brain1.webp';
const shouldShowMilestoneCheck = ref(false);

const getRandomIdeas = (count: number) => {
  const shuffled = [...sampleIdeas].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
// Initialize allIdeas with 5 random pre-generated ideas
const allIdeas = ref<Idea[]>(getRandomIdeas(5));

const fetchBrainstorm = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  try {
    const response = await fetch('/api/botcafe/brainstorm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'five more original brainstorms' }],
      }),
    });
    shouldShowMilestoneCheck.value = true;

    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const newIdeas: Idea[] = parseIdeasFromAPI(data.choices[0].message.content);
      if (newIdeas.length > 0) {
        allIdeas.value = [...newIdeas, ...allIdeas.value];
      } else {
        throw new Error('No new ideas generated');
      }
    } else {
      throw new Error('Invalid API response');
    }
  } catch (error: any) {
    const { message } = errorHandler(error);
    errorMessage.value = message;
    console.error('Error fetching brainstorm:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleCardClick = (idea: Idea) => {
  console.log('Card clicked:', idea);
};

const parseIdeasFromAPI = (rawContent: string) => {
  const lines = rawContent.split('\n');
  const ideasList = lines.filter((line: string) => /^\d+\./.test(line));
  return ideasList.map((item: string) => {
    const cleanItem = item.replace(/^\d+\.\s/, '');
    const [title, example] = cleanItem.split(' - ');
    return { title, example } as Idea;
  });
};
</script>

<style scoped>
.loader {
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.card-style {
  background-color: var(--bg-secondary);
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card-style:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
