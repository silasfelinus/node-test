<template>
  <div class="bg-base-200 flex flex-col items-center rounded-lg p-8 shadow-lg">
    <!-- Minimized Avatar -->
    <div
      v-if="minimized"
      class="bg-accent relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full"
      @click="toggleMinimize"
    >
      <img
        :src="page.image ? `/images/${page.image}` : '/images/default-image.webp'"
        alt="Chat Avatar"
        class="h-14 w-14 rounded-full"
      />
      <!-- Ripple Effect -->
      <div class="ripple bg-primary opacity-50"></div>
    </div>

    <!-- Chat Window -->
    <div v-else class="bg-secondary border-accent mt-4 w-full rounded-lg border-4 p-4">
      <h3 class="text-primary mb-2 text-lg font-semibold">Silas Says...</h3>

      <!-- Text Container -->
      <div class="streaming-container bg-base rounded-lg p-4">
        <div class="streaming-text text-info text-base">
          {{ streamingText || 'Hey there, welcome to KindRobots!' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

// Initialize reactive variables
const streamingText = ref('');
const minimized = ref(false);

// Get the page content
const { page } = useContent();

// Function to toggle minimize state
const toggleMinimize = () => {
  minimized.value = !minimized.value;
  localStorage.setItem('tooltipMinimized', minimized.value.toString());
};
let interval: NodeJS.Timeout | null = null;
// Function to stream text
const streamText = (text: string) => {
  // Clear any existing interval
  if (interval) {
    clearTimeout(interval);
  }

  streamingText.value = ''; // Reset the streaming text
  let index = 0;
  let speed = 50; // Default speed

  const appendChar = () => {
    if (index < text.length) {
      streamingText.value += text.charAt(index);
      if (text.charAt(index) === '.' || text.charAt(index) === ',') {
        speed = 500;
      } else {
        speed = 50;
      }
      index++;
      interval = setTimeout(appendChar, speed);
    } else {
      clearTimeout(interval as NodeJS.Timeout);
    }
  };

  appendChar();
};
// Lifecycle hooks and watchers
onMounted(() => {
  minimized.value = localStorage.getItem('tooltipMinimized') === 'true';
  streamText(page.tooltip || 'Hey there, welcome to KindRobots!');
});

watch(
  () => page.tooltip,
  (newTooltip) => {
    streamText(newTooltip || 'Hey there, welcome to KindRobots!');
  },
);
</script>

<style scoped>
.ripple {
  position: absolute;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: ripple-animation 1.5s infinite;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes ripple-animation {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 200%;
    height: 200%;
    opacity: 0;
  }
}
</style>
