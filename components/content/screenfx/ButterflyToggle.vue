<template>
  <div class="icon-container bg-accent-100 flex flex-col items-center justify-center space-x-3 rounded-lg p-4">
    <div
      class="icon-box hover:bg-accent-200 transform cursor-pointer rounded-full p-3 transition-transform hover:scale-125"
      @click="toggleAmiSwarm"
    >
      <icon
        name="emojione:butterfly"
        title="Kind Butterflies"
        :active="fxStore.showAmiSwarm"
        :class="{ glow: fxStore.showAmiSwarm }"
        class="h-12 w-12 md:h-8 md:w-8"
      />
    </div>
    <div v-if="fxStore.showAmiSwarm">
      <ami-butterfly v-for="i in butterflyCount" :key="i" :style="{ '--animation-delay': i * 0.01 + 's' }" />
    </div>

    <!-- Moved the label below the icon -->
    <div v-if="!fxStore.showAmiSwarm" class="label-container text-default mt-2 text-xl font-bold"></div>
    <div v-else class="label-container text-default mt-2 text-xl font-bold">We're free!</div>
  </div>
</template>

<script setup lang="ts">
import { useScreenStore } from '../../../stores/screenStore';

const fxStore = useScreenStore();

const toggleAmiSwarm = () => fxStore.toggleAmiSwarm();

const butterflyCount = 20;
</script>
<style>
.icon-box {
  border-radius: 50%;
}

.glow {
  animation: glow 1s ease-in-out infinite alternate;
  border-radius: 50%;
  /* Add this line to apply the delay */
  animation-delay: var(--animation-delay, 0s);
}

@keyframes glow {
  from {
    box-shadow: 0 0 5px #ffcc00, 0 0 10px #ffcc00, 0 0 15px #ffcc00, 0 0 20px #ffcc00;
  }
  to {
    box-shadow: 0 0 10px #ffaa00, 0 0 20px #ffaa00, 0 0 30px #ffaa00, 0 0 40px #ffaa00;
  }
}

.label-container {
  font-size: 1rem;
  display: flex;
  align-items: center;
  color: bg-accent-100; /* Adjust color to fit your design */
}

.arrow {
  margin-right: 5px;
  font-weight: bold;
}
</style>
