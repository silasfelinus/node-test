<template>
  <NuxtLink
    :to="page._path"
    class="hover:bg-accent group relative flex flex-col items-center rounded-2xl text-center transition-colors"
    :class="{ 'flex-row items-start': isExtended && isHighlight }"
  >
    <div
      v-if="isHighlight && page.image"
      :class="[
        'relative m-2 overflow-hidden rounded-2xl',
        { 'h-24 w-24': !isExtended, 'h-40 w-40 shadow-lg': isExtended },
      ]"
    >
      <img :src="`/images/${page.image}`" alt="Page Image" class="h-full w-full object-cover" />
    </div>
    <div class="relative flex flex-col items-center">
      <div
        class="bg-secondary group-hover:bg-accent flex items-center space-x-2 rounded-2xl border border-solid p-2 transition-colors"
      >
        <div v-if="page.icon" class="text-3xl group-hover:text-4xl">
          <icon :name="page.icon" />
        </div>
        <div class="text-lg">
          {{ page.title }}
        </div>
      </div>
      <div v-if="page._path === currentPath" class="bg-accent mt-1 rounded-2xl border p-1 text-xl">
        <icon name="line-md:download-outline-loop" class="text-lg" />
        You are here
      </div>
    </div>
    <div
      v-if="isExtended"
      class="bg-base-200 absolute left-1/2 z-10 hidden -translate-x-1/2 transform rounded-lg p-2 group-hover:block"
      :class="{ 'top-0 -translate-y-full': !isHighlight, 'top-1/4 -translate-y-1/2': isHighlight }"
    >
      <div v-if="!isHighlight && page.image" class="mb-2">
        <img :src="`/images/${page.image}`" alt="Page Image" class="h-24 w-24 rounded-lg object-cover" />
      </div>
      {{ page.description }}
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const { page, currentPath, isHighlight, isExtended } = defineProps<{
  page: {
    _path: string;
    title: string;
    icon?: string;
    image?: string;
    underConstruction?: boolean;
    description?: string;
  };
  currentPath: string;
  isHighlight?: boolean;
  isExtended?: boolean;
}>();
</script>
