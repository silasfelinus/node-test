<template>
  <div class="icon-container bg-accent-100 flex items-center justify-center space-x-3 rounded-lg p-4">
    <butterfly-toggle />
    <div
      class="icon-box hover:bg-accent-200 transform cursor-pointer rounded-full p-3 transition-transform hover:scale-125"
      @click="toggleRainEffect"
    >
      <icon
        name="twemoji:cloud-with-rain"
        title="Kind Weather"
        :active="fxStore.showRainEffect"
        :class="{ glow: fxStore.showRainEffect }"
        class="h-6 w-6 md:h-8 md:w-8"
      />
    </div>
    <div
      class="icon-box hover:bg-accent-200 transform cursor-pointer rounded-full p-3 transition-transform hover:scale-125"
      @click="toggleSoapBubbles"
    >
      <icon
        name="icon-park:soap-bubble"
        title="Kind Bubbles"
        :active="fxStore.showSoapBubbles"
        :class="{ glow: fxStore.showSoapBubbles }"
        class="h-6 w-6 md:h-8 md:w-8"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScreenStore } from '../../../stores/screenStore';

const fxStore = useScreenStore();

const toggleRainEffect = () => fxStore.toggleRainEffect();
const toggleSoapBubbles = () => fxStore.toggleSoapBubbles();
</script>
<style scoped>
.icon-box {
  /* existing styles... */
  border-radius: 50%;
}

.glow {
  animation: glow 1s ease-in-out infinite alternate;
  border-radius: 50%;
}

@keyframes glow {
  from {
    box-shadow: 0 0 5px #ffcc00, 0 0 10px #ffcc00, 0 0 15px #ffcc00, 0 0 20px #ffcc00;
  }
  to {
    box-shadow: 0 0 10px #ffaa00, 0 0 20px #ffaa00, 0 0 30px #ffaa00, 0 0 40px #ffaa00;
  }
}
</style>
