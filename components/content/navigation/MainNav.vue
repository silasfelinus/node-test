<template>
  <div
    class="bg-base-200 relative flex flex-wrap justify-center space-x-2 overflow-y-auto rounded-2xl border p-2 pb-10"
    style="overflow: visible; z-index: 0"
  >
    <div class="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 transform items-center space-x-2">
      <div class="text-info border-accent rounded-full border-b-2 px-4 text-center text-lg font-semibold">
        Highlight Rooms
      </div>
      <icon name="line-md:highlight" class="text-info text-2xl" />
    </div>
    <NuxtLink
      v-for="page in highlightPages"
      :key="page._id"
      :to="page._path"
      class="hover:bg-accent bg-primary group relative flex flex-row items-center space-x-2 rounded-2xl border p-2 transition-colors"
    >
      <div class="bg-secondary h-24 w-24 overflow-hidden rounded-lg border">
        <img :src="`/images/${page.image}`" alt="Page Image" class="h-full w-full object-cover" />
      </div>
      <div class="flex flex-col items-start" @mouseover="isHovered = page._id" @mouseleave="isHovered = null">
        <div class="bg-base-200 rounded-2xl border p-2 text-lg font-bold">
          {{ page.title }}
        </div>
        <popup-description
          v-if="isHovered === page._id"
          :image="page.image"
          :description="page.description"
          :is-hovered="isHovered === page._id"
        />
      </div>
      <div v-if="page._path === $route.path" class="absolute right-2 top-2">
        <icon name="line-md:location" class="text-info" />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { usePageStore } from '~/stores/pageStore';

const pageStore = usePageStore();

const isHovered = ref(null);
const highlightPages = computed(() => {
  return pageStore.highlightPages;
});
</script>
