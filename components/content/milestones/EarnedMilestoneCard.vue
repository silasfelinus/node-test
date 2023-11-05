<template>
  <!-- Achieved Milestone Card -->
  <div
    class="card bg-base-200 hover:bg-accent-dark relative m-2 rounded-2xl border p-4 transition duration-300 ease-in-out hover:shadow-xl"
  >
    <!-- Star Icon for Achieved Milestones -->
    <div class="z-6 absolute right-2 top-2">
      <icon name="ph:star-bold" class="text-4xl text-yellow-400" />
    </div>
    <div class="text-center">
      <!-- Milestone Icon -->
      <icon :name="milestone.icon" class="mb-2 text-9xl md:h-16 md:w-16" />
      <!-- Milestone Label -->
      <div class="text-2xl font-bold">
        <a v-if="milestone.pageHint" :href="milestone.pageHint" class="hover:underline">
          {{ milestone.label }}
        </a>
        <template v-else>{{ milestone.label }}</template>
      </div>
      <!-- Subtle Hint -->
      <div class="text-md mb-2">
        {{ milestone.subtleHint }}
      </div>
      <!-- Tooltip -->
      <div class="text-md italic">
        {{ milestone.tooltip }}
      </div>
      <!-- Earned Date -->
      <div class="text-xs">
        Earned on:
        {{
          acquiredAt
            ? new Date(acquiredAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'Unknown'
        }}
      </div>
      <!-- Karma Points -->
      <div class="text-xs">Karma: +{{ milestone.karma }}</div>
      <!-- Jellybean Award -->
      <div>
        <div class="text-lg">You discovered 1 Jellybean!</div>
        <icon name="tdesign:bean" class="text-9xl" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Milestone } from '@/stores/milestoneStore';

// Define props and destructure them
const props = defineProps<{
  milestone: Milestone;
  acquiredAt: string | null;
}>();
const { milestone } = props;
</script>
