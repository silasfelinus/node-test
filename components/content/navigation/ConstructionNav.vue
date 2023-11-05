<template>
  <div class="relative mb-1 flex flex-wrap justify-center space-x-2">
    <!-- Under Construction Section -->
    <div
      class="bg-secondary mb-2 flex items-center justify-center rounded-2xl border px-1 text-2xl font-extrabold shadow-lg"
    >
      Under Construction
      <icon name="line-md:construction" class="ml-2 text-2xl" />
    </div>

    <!-- Links -->
    <NuxtLink
      v-for="page in underConstructionPages"
      :key="page._id"
      :to="page._path"
      class="hover:bg-accent bg-warning group relative mb-4 flex w-64 flex-row items-center space-x-2 rounded-2xl border transition-colors"
      @mouseover="isHovered = page._id"
      @mouseleave="isHovered = null"
      @click="handleLinkClick"
    >
      <!-- Image -->
      <div class="min-w-20 bg-secondary h-20 w-20 overflow-hidden rounded-lg border">
        <img :src="`/images/${page.image}`" alt="Page Image" class="h-full w-full object-cover" />
      </div>
      <!-- You are here indicator -->
      <div v-if="page._path === $route.path" class="bg-secondary m-1 flex items-center rounded-2xl border p-1 text-xl">
        You are here <icon name="line-md:download-outline-loop" class="mr-2 text-lg" />
      </div>
      <!-- Page Title and Popup -->
      <div class="flex flex-col items-start">
        <div class="bg-base-200 rounded-2xl border px-2 text-lg font-bold">
          {{ page.title }}
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
import { usePageStore } from '~/stores/pageStore';
import { useFooterStore } from '~/stores/footerStore';

const footerStore = useFooterStore();

const handleLinkClick = () => {
  if (footerStore.isExtended) {
    footerStore.toggleIsExtended();
  }
};
const pageStore = usePageStore();

const isHovered = ref(null);
const underConstructionPages = computed(() => {
  return pageStore.pagesUnderConstruction;
});
</script>
