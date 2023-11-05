<template>
  <div>
    <h2 class="mb-4 text-xl font-bold">Locked Milestones</h2>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="milestone in lockedMilestones"
        :key="milestone.id"
        class="card bg-base-200 relative rounded-2xl p-4 transition duration-300 ease-in-out"
      >
        <div class="text-center">
          <!-- Milestone Icon -->
          <icon :name="milestone.icon" class="mb-2 text-6xl" />
          <!-- Milestone Label -->
          <div class="text-xl font-bold text-gray-700">{{ milestone.label }}</div>
          <!-- Subtle Hint -->
          <div v-if="milestone.subtleHint" class="text-sm text-gray-500">
            {{ milestone.subtleHint }}
          </div>
          <!-- Question Mark Icon for Directions -->
          <div class="z-6 absolute right-2 top-2">
            <nuxt-link :to="milestone.pageHint || '#'">
              <icon name="ph:question-bold" class="text-2xl text-blue-500" />
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMilestoneStore } from '@/stores/milestoneStore';
import { useUserStore } from '@/stores/userStore';

const milestoneStore = useMilestoneStore();
const userStore = useUserStore();
const milestones = computed(() => milestoneStore.milestones);
const userMilestones = computed(() => userStore.milestones);

const lockedMilestones = computed(() => {
  return milestones.value.filter((milestone) => !userMilestones.value?.includes(milestone.id));
});
</script>
