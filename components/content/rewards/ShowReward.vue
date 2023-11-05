<template>
  <div class="bg-base-200 modal rounded p-4 shadow-lg">
    <!-- Reward Details -->
    <icon :name="reward.icon" class="mb-2 text-6xl" />
    <h2 class="mb-2 text-xl">{{ reward.text }}</h2>
    <p class="text-lg text-gray-600">{{ reward.power }}</p>
    <p class="text-sm text-gray-400">Rarity: {{ reward.rarity }}</p>

    <!-- Edit Reward Form -->
    <transition name="fade" mode="out-in">
      <EditReward v-if="showEditReward" :reward="reward" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  reward: {
    icon: string;
    text: string;
    power: string;
    rarity: number;
  };
}>();

const showEditReward = ref(false);
</script>
