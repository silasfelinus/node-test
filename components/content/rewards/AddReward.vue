<template>
  <div class="bg-base-200 rounded p-4">
    <h2 class="mb-2 text-xl">Add New Reward</h2>
    <form @submit.prevent="addReward">
      <!-- Icon Selection -->
      <div class="mb-2">
        <label for="icon" class="block text-sm font-medium text-gray-600">Icon</label>
        <select v-model="newReward.icon" required class="bg-base-200 rounded p-2">
          <option v-for="(name, label) in iconMap" :key="label" :value="name">{{ label }} - {{ name }}</option>
        </select>
      </div>
      <!-- Link to Game Icons set -->
      <a href="https://icon-sets.iconify.design/game-icons/" target="_blank" rel="noopener noreferrer">
        Explore more icons
      </a>
      <div class="mb-2">
        <label for="icon" class="block text-sm font-medium text-gray-600">Icon</label>
        <input id="icon" v-model="newReward.icon" placeholder="🌟" required class="bg-base-200 rounded p-2" />
      </div>
      <div class="mb-2">
        <label for="text" class="block text-sm font-medium text-gray-600">Text</label>
        <input id="text" v-model="newReward.text" placeholder="Reward Text" required class="bg-base-200 rounded p-2" />
      </div>
      <div class="mb-2">
        <label for="power" class="block text-sm font-medium text-gray-600">Power</label>
        <input
          id="power"
          v-model="newReward.power"
          placeholder="Reward Power"
          required
          class="bg-base-200 rounded p-2"
        />
      </div>
      <div class="mb-2">
        <label for="rarity" class="block text-sm font-medium text-gray-600">Rarity</label>
        <input id="rarity" v-model="newReward.rarity" type="number" placeholder="50" class="bg-base-200 rounded p-2" />
      </div>
      <button type="submit" class="bg-primary text-default rounded p-2">Add Reward</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRewardStore } from '@/stores/rewardStore';
import iconMap from '@/training/iconMap';

const rewardStore = useRewardStore();
const newReward = ref({
  icon: '',
  text: '',
  power: '',
  rarity: 50,
});

const addReward = async () => {
  await rewardStore.createReward(newReward.value);
  newReward.value = {
    icon: '',
    text: '',
    power: '',
    rarity: 50,
  };
};
</script>
