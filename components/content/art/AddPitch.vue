<template>
  <!-- Container -->
  <div class="bg-base-200 flex flex-col items-center justify-center rounded-2xl border">
    <!-- Add Pitch Button -->
    <button class="bg-primary m-2 rounded-2xl border p-4 text-white" @click="showForm = !showForm">
      <icon name="typcn:plus" class="text-4xl" />
    </button>
    <p class="m-4 text-lg font-semibold">Click to Add a New Pitch</p>

    <!-- Add Pitch Form -->
    <div v-if="showForm" class="m-2 mb-6 flex w-full max-w-md flex-col rounded-xl border bg-white p-4">
      <h2 class="m-4 p-2 text-2xl font-bold">Create Your Pitch</h2>
      <p class="m-4p-2 text-sm text-gray-600">Craft your pitch to inspire and challenge other artists. 🎨</p>

      <!-- Form Fields -->
      <input v-model="newPitch.title" placeholder="Title" class="mb-2 rounded border p-2" />
      <textarea v-model="newPitch.pitch" placeholder="Pitch" class="mb-2 rounded border p-2"></textarea>
      <input v-model="newPitch.designer" placeholder="Designer" class="mb-2 rounded border p-2" />

      <!-- Checkboxes -->
      <label class="mb-2 inline-flex items-center">
        <input v-model="newPitch.isMature" type="checkbox" class="mr-2" />
        Allow mature content
      </label>

      <!-- Submit Button -->
      <button class="bg-primary rounded p-2 text-white" @click="createPitch">Submit Pitch</button>
    </div>
    <div v-if="message" :class="messageType === 'success' ? 'text-green-500' : 'text-red-500'">
      {{ message }}
    </div>
    <milestone-reward v-if="shouldShowMilestoneCheck" :id="1"></milestone-reward>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePitchStore } from '@/stores/pitchStore';
import { useUserStore } from '@/stores/userStore';
import { errorHandler } from '@/server/api/utils/error';

const pitchStore = usePitchStore();
const userStore = useUserStore();
const shouldShowMilestoneCheck = ref(false);
const message = ref<string | null>(null);
const messageType = ref<'success' | 'error' | null>(null);

const showForm = ref(false);
const newPitch = ref({
  title: '',
  pitch: '',
  flavorText: '',
  designer: '',
  userId: userStore.userId,
  isMature: false,
  isOrphan: false,
  isPublic: true,
});

const createPitch = async () => {
  try {
    const result = await pitchStore.createPitch(newPitch.value);
    if (result.success) {
      messageType.value = 'success';
      message.value = 'Pitch successfully created!';
      shouldShowMilestoneCheck.value = true;
      newPitch.value = {
        title: '',
        pitch: '',
        flavorText: '',
        designer: '',
        userId: userStore.userId,
        isMature: false,
        isOrphan: true,
        isPublic: true,
      };
    } else {
      messageType.value = 'error';
      message.value = result.message || 'Something went wrong!';
    }

    if (message.value) {
      setTimeout(() => {
        message.value = null;
        messageType.value = null;
      }, 3000);
    }
  } catch (error: any) {
    const handledError = errorHandler(error);
    messageType.value = 'error';
    message.value = handledError.message;
    console.error('Error creating pitch:', handledError.message);
  }
};
</script>
