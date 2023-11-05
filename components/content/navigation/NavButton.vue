<template>
  <div
    class="group flex items-center space-x-2 rounded-2xl border border-solid"
    :class="{ 'hover:bg-accent transition-colors': isExtended }"
  >
    <div class="flex items-center space-x-2 rounded-2xl p-2" :class="underConstruction ? 'bg-warning' : 'bg-secondary'">
      <div v-if="icon && !underConstruction" class="text-3xl group-hover:text-4xl">
        <icon :name="icon" />
      </div>
      <div class="text-lg">
        {{ title }}
      </div>
    </div>
    <div v-if="isCurrentPage" class="text-md text-info ml-2">
      <icon name="line-md:download-outline-loop" class="text-lg" />
      You are here
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  title = 'Mysterious Portal',
  icon = 'line-md:magic-stick',
  isCurrentPage = false,
  underConstruction = false,
  isExtended = false,
} = defineProps<{
  title?: string;
  icon?: string;
  isCurrentPage?: boolean;
  underConstruction?: boolean;
  isExtended?: boolean;
}>();
</script>
