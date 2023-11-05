<template>
  <div class="relative m-1 flex flex-wrap justify-center space-x-2">
    <NuxtLink
      v-for="page in supportPages"
      :key="page._id"
      :to="page._path"
      class="hover:bg-accent bg-primary group relative m-1 flex w-72 flex-row items-center space-x-2 rounded-2xl border p-2 transition-colors"
      @mouseover="isHovered = page._id"
      @mouseleave="isHovered = null"
      @click="handleLinkClick"
    >
      <div class="bg-secondary h-24 w-24 overflow-hidden rounded-lg border">
        <img :src="`/images/${page.image}`" alt="Page Image" class="h-full w-full object-cover" />
      </div>
      <!-- You are here indicator -->
      <div v-if="page._path === $route.path" class="bg-secondary m-2 flex items-center rounded-2xl border p-1 text-xl">
        You are here <icon name="line-md:download-outline-loop" class="m-2 text-lg" />
      </div>
      <div class="flex flex-col items-start">
        <div class="bg-base-200 rounded-2xl border p-2 text-lg font-bold">
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

const pageStore = usePageStore();
const footerStore = useFooterStore();

const isHovered = ref(null);
const supportPages = computed(() => {
  return pageStore.pagesByTagAndSort('home', 'icon');
});

const handleLinkClick = () => {
  if (footerStore.isExtended) {
    footerStore.toggleIsExtended();
  }
};
</script>
