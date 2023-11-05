<template>
  <div v-if="pitch" class="bg-base-200 flex flex-col items-center rounded-2xl p-4 hover:shadow-lg">
    <!-- Avatar Image -->
    <img :src="avatarImage" alt="Avatar" class="mb-2 h-16 w-16 rounded-full" />

    <!-- Title -->
    <div class="mb-2 text-lg font-semibold">{{ pitch.title }}</div>

    <!-- Pitch Description -->
    <div class="mb-2 text-sm text-gray-500">{{ pitch.pitch }}</div>

    <!-- Flavor Text -->
    <div class="mb-2 text-xs text-gray-400">{{ pitch.flavorText }}</div>

    <!-- Designer Tooltip -->
    <div class="relative">
      <div class="cursor-pointer text-sm text-gray-500" @mouseover="showTooltip" @mouseleave="hideTooltip">
        {{ pitch.designer }}
      </div>
      <div v-if="tooltipVisible" class="bg-base-100 absolute left-0 top-full rounded p-1 text-xs">
        {{ pitch.designer }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type Pitch, usePitchStore } from '@/stores/pitchStore';

const pitchStore = usePitchStore();

const {
  pitch = {
    title: 'Presto-Chango',
    pitch: 'Here today, gone tomorrow',
    flavorText: 'Now you see me...',
    designer: 'Harriet Whodunnit',
  },
} = defineProps<{
  pitch?: Pitch;
}>();
const avatarImage = '/images/kindtitle.webp';
const pitchArt = pitchStore.getArtForPitch;
const tooltipVisible = ref(false);

const showTooltip = () => {
  tooltipVisible.value = true;
};

const hideTooltip = () => {
  tooltipVisible.value = false;
};
</script>
