<template>
  <div class="m-10 flex flex-wrap justify-center space-x-2 rounded-2xl p-1">
    <NuxtLink
      v-for="page in highlightPages"
      :key="page._id"
      :to="page._path"
      class="hover:bg-accent bg-base-200 group relative flex w-72 flex-row items-center space-x-2 rounded-2xl border p-2 transition-colors"
      @mouseover="isHovered = page._id"
      @mouseleave="isHovered = null"
    >
      <div class="bg-secondary h-24 w-24 overflow-hidden rounded-lg border">
        <img :src="`/images/${page.image}`" alt="Page Image" class="h-full w-full object-cover" />
      </div>
      <div class="flex w-full flex-col items-start justify-between">
        <div class="bg-base-200 rounded-2xl border p-2 text-lg font-bold">
          {{ page.title }}
        </div>
        <div v-if="page._path === $route.path" class="bg-accent m-1 flex items-center rounded-2xl border p-1 text-xl">
          You are here <icon name="line-md:download-outline-loop" class="m-1 text-lg" />
        </div>
        <popup-description
          v-if="isHovered === page._id"
          :icon="page.icon"
          :description="page.description"
          :is-hovered="isHovered === page._id"
        />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { usePageStore } from '@/stores/pageStore';

const pageStore = usePageStore();

const isHovered = ref(null);
const highlightPages = computed(() => {
  return pageStore.highlightPages;
});
</script>
