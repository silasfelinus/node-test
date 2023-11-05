<template>
  <div class="bg-base-200 rounded p-4">
    <h2 class="mb-2 text-xl">Edit Reward</h2>
    <form @submit.prevent="editReward">
      <!-- Form Fields -->
      <div v-for="field in formFields" :key="field.id" class="mb-2">
        <label :for="field.id" class="block text-sm font-medium text-gray-600">{{ field.label }}</label>
        <input
          :id="field.id"
          v-model="editedReward[field.id as keyof typeof editedReward]"
          :required="field.required"
          :type="field.type || 'text'"
          class="bg-base-200 rounded p-2"
        />
      </div>
      <button type="submit" class="bg-primary text-default rounded p-2">Update Reward</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type Reward, useRewardStore } from '@/stores/rewardStore'; // Import the Reward type

const rewardStore = useRewardStore();
const editedReward = ref<Partial<Reward>>({}); // Define the type for editedReward

// Form fields definition for better reusability and maintainability
const formFields = [
  { id: 'icon', label: 'Icon', required: true },
  { id: 'text', label: 'Text', required: true },
  { id: 'power', label: 'Power', required: true },
  { id: 'rarity', label: 'Rarity', type: 'number' },
];

const setRewardToEdit = (reward: Reward) => {
  // Add type for reward
  editedReward.value = { ...reward };
};

const editReward = async () => {
  if (editedReward.value.id) {
    await rewardStore.updateRewardById(editedReward.value.id, editedReward.value);
  }
};
</script>
