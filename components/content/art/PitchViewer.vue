<template>
  <div class="hover:bg-accent cursor-pointer rounded-lg border p-4" @click="selectPitch">
    <h3>{{ pitch.title }}</h3>
    <p>{{ pitch.pitch }}</p>
  </div>
</template>

<script setup lang="ts">
import { usePitchStore, type Pitch } from '@/stores/pitchStore';

const props = defineProps<{
  pitch: Pitch;
}>();

const pitchStore = usePitchStore();

const selectPitch = () => {
  pitchStore.selectPitch(props.pitch.id);
};
</script>
