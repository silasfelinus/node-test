<template>
  <div class="bg-base-400 flex items-center justify-center">
    <!-- Button to Toggle Popup -->
    <button v-if="!showPopup" class="bg-primary m-4 rounded-2xl border p-4 text-white" @click="togglePopup">
      <icon :name="milestone?.icon || 'default-icon'" class="h-16 w-16" />
    </button>

    <!-- Popup Content -->
    <div v-if="showPopup" class="bg-base-200 z-50 m-2 flex items-center justify-center rounded-2xl border p-2">
      <div class="bg-base-400 relative m-6 rounded-2xl p-6 text-center">
        <h2 class="mb-4 text-2xl font-semibold">Congratulations, {{ userStore.username }}!</h2>
        <div v-if="milestone?.icon">
          <icon :name="milestone.icon" class="mx-auto mb-4 h-16 w-16" />
          <p class="text-xl font-medium">🌟 You earned the {{ milestone.label }} milestone! 🌟</p>
          <p class="my-4">{{ milestone.message }}</p>
          <div class="karma-award flex flex-col items-center">
            <p class="text-lg font-semibold">Bonus: +{{ milestone.karma }}</p>
            <p class="text-lg">You Found 1 Jellybean!</p>
            <icon name="tdesign:bean" class="text-accent m-2 h-16 w-16 p-2" />
          </div>
          <button class="bg-primary mt-4 rounded-2xl border px-4 py-2 text-white" @click="closePopup">
            Yay! (Close)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useMilestoneStore, type Milestone } from '@/stores/milestoneStore';
import { errorHandler } from '@/server/api/utils/error';
import { useConfetti } from '@/utils/useConfetti';

const props = defineProps<{ id: number }>();
const { triggerConfetti } = useConfetti();
const userStore = useUserStore();
const milestoneStore = useMilestoneStore();
const milestone = ref<Milestone | null>(null);

const fetchMilestoneById = async (id: number) => {
  try {
    const result = await milestoneStore.fetchMilestoneById(id);
    if (result.success && result.data) {
      milestone.value = result.data;
    } else {
      throw new Error(result.message || 'Data is undefined');
    }
  } catch (error: any) {
    const { message } = errorHandler({ error });
    console.error('Failed to fetch milestone', message);
  }
};

const showPopup = ref(false);

const togglePopup = () => {
  showPopup.value = !showPopup.value;
};

const closePopup = () => {
  showPopup.value = false;
};

const validateMilestoneRecord = async () => {
  try {
    if (milestone.value && milestoneStore.hasMilestone(userStore.userId, milestone.value.id)) {
      console.log('Milestone already rewarded, closing popup.');
      showPopup.value = false; // Close the popup if milestone already rewarded
      return 'success';
    }
    if (milestone.value) {
      triggerConfetti();
      const result = await milestoneStore.recordMilestone(userStore.userId, milestone.value.id);
      if (result.success) {
        console.log('Successfully validated milestone', result);
      } else {
        throw new Error(result.message);
      }
    }
  } catch (error: any) {
    const { message } = errorHandler({ error });
    console.error('Failed to validate milestone', message);
  }
};

const validateUserRecord = async () => {
  try {
    const result = await userStore.updateKarmaAndMana();
    if (result.success) {
      console.log('Successfully validated user', result);
    } else {
      throw new Error(result.message);
    }
  } catch (error: any) {
    const { message } = errorHandler({ error });
    console.error('Failed to validate user record', message);
  }
};

onMounted(async () => {
  await fetchMilestoneById(props.id || 10);
  showPopup.value = true;
  if (userStore.userId !== 0) {
    await Promise.all([validateMilestoneRecord(), validateUserRecord()]);
  }
});
</script>
