<template>
  <div class="effect-container">
    <component :is="activeComponent.component" v-for="activeComponent in activeComponents" :key="activeComponent.id" />
  </div>
  <div class="relative">
    <!-- Global Tooltip -->
    <div
      v-if="!hoveredEffect"
      class="text-default pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-full transform whitespace-nowrap rounded-sm bg-opacity-75 p-1 text-4xl font-bold"
    ></div>
    <div class="flex flex-wrap items-center justify-center space-x-4 space-y-4">
      <!-- Invisible First Icon -->
      <div class="relative flex flex-col items-center space-y-2 opacity-0 md:flex-row md:space-x-4 md:space-y-0">
        <div class="flex flex-col items-center space-y-2"></div>
      </div>
      <!-- Visible Icons -->
      <div
        v-for="effect in effects"
        :key="effect.id"
        class="relative flex flex-col items-center space-y-2 md:flex-row md:space-x-4 md:space-y-0"
      >
        <!-- Individual Tooltip -->
        <div
          v-if="hoveredEffect === effect.id"
          class="text-default pointer-events-none absolute left-1/2 top-0 z-10 mt-[-60px] -translate-x-1/2 transform whitespace-nowrap rounded-xl bg-opacity-75 p-1 text-xl font-bold"
        >
          {{ effect.tooltip }}
        </div>

        <!-- Icon and Label Container -->
        <div class="flex flex-col items-center space-y-2">
          <div
            class="hover:bg-accent flex transform cursor-pointer items-center justify-center rounded-full p-3 transition-transform hover:scale-125"
            :class="{ 'bg-accent': effect.isActive, 'bg-transluscent': !effect.isActive }"
            @click="toggleEffect(effect.id)"
            @mouseover="hoveredEffect = effect.id"
            @mouseout="hoveredEffect = null"
          >
            <icon
              :name="effect.icon"
              :title="effect.label"
              :active="effect.isActive"
              :class="{ glow: effect.isActive }"
              class="text-default h-8 w-8 fill-current md:h-12 md:w-12"
            />
          </div>

          <!-- Label or Reveal -->
          <div class="text-default text-center text-xl">
            {{ effect.isActive ? effect.reveal : effect.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, resolveComponent } from 'vue';

type ComponentMapType = {
  [key: string]: ReturnType<typeof resolveComponent>;
};

const componentsMap: ComponentMapType = {
  'bubble-effect': resolveComponent('LazyBubbleEffect'),
  'fizzy-bubbles': resolveComponent('LazyFizzyBubbles'),
  'rain-effect': resolveComponent('LazyRainEffect'),
  'talking-butterflies': resolveComponent('LazyTalkingButterflies'),
};

const effects = ref([
  {
    id: 'fizzy-bubbles',
    label: 'Fizzy Lifting',
    icon: 'mdi:bottle-soda-classic-outline',
    tooltip: 'Float away with fizzy bubbles 🍾',
    reveal: 'Carbonation!',
    isActive: false,
  },
  {
    id: 'bubble-effect',
    label: 'Bubble Fiesta',
    icon: 'game-icons:bubbles',
    tooltip: 'rainbow clown bubbles 🌈',
    reveal: 'Bubble Overload!',
    isActive: false,
  },
  {
    id: 'rain-effect',
    label: 'Rainmaker',
    icon: 'line-md:paint-drop-twotone',
    tooltip: `Rain doesn't have to be sad`,
    route: 'Summon a rainstorm 🌧️',
    reveal: 'Just a drizzle',
    isActive: false,
  },
  {
    id: 'talking-butterflies',
    label: 'Butterfly Scouts',
    icon: 'ph:butterfly-light',
    tooltip: 'Release AMI 🦋',
    reveal: 'Happy butterflies',
    route: '/fundraiser',
    isActive: false,
  },
]);

const hoveredEffect = ref<string | null>(null);
const toggleEffect = (effectId: string) => {
  const effect = effects.value.find((e) => e.id === effectId);
  if (effect) {
    effect.isActive = !effect.isActive;
  }
};

// Computed property to get all active components
const activeComponents = computed(() => {
  return effects.value
    .filter((effect) => effect.isActive)
    .map((effect) => ({
      id: effect.id,
      component: componentsMap[effect.id],
    }));
});
</script>
<style scoped>
/* Glow animation */
@keyframes glow {
  0%,
  100% {
    @apply shadow-sm;
  }
  50% {
    @apply shadow-2xl;
  }
}

.glow {
  animation: glow 1.5s infinite;
}
</style>
