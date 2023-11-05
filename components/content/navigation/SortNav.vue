<template>
  <nav class="bg-base-200 w-full rounded-2xl border p-2 transition-all duration-500 ease-in-out">
    <div class="m-2 flex flex-wrap justify-center space-x-2">
      <div v-for="page in pagesByTagAndSort('home', 'highlight')" :key="page._id" class="group relative m-2">
        <NuxtLink
          :to="page._path"
          class="flex transform flex-col items-center px-4 py-2 transition-transform hover:scale-110"
          @mouseover="isHovered = page._id"
          @mouseleave="isHovered = null"
        >
          <img :src="`/images/${page.image}`" alt="Page Image" class="h-24 w-24 rounded-lg object-cover" />
          <div class="mt-2">{{ page.title }}</div>
          <div v-if="page.underConstruction" class="bg-info mt-1 rounded-full px-2 py-0.5 text-xs">
            Under Development
          </div>
        </NuxtLink>
        <popup-description
          v-if="isHovered === page._id"
          :icon="page.icon"
          :description="page.description"
          :is-hovered="isHovered === page._id"
        />
      </div>
    </div>
    <div class="mt-2 flex flex-wrap justify-center space-x-2">
      <div v-for="page in pagesByTagAndSort('home', 'icon')" :key="page._id" class="group relative m-2">
        <NuxtLink
          :to="page._path"
          class="btn btn-accent flex transform items-center space-x-2 rounded-full p-2 transition-transform hover:scale-110"
        >
          <icon :name="page.icon" class="group-hover:text-accent h-6 w-6 transition-colors duration-300" />
          {{ page.title }}
        </NuxtLink>
        <popup-description
          v-if="isHovered === page._id"
          :icon="page.icon"
          :description="page.description"
          :is-hovered="isHovered === page._id"
        />
        <div v-if="page.underConstruction" class="bg-info text-md mt-1 rounded-full px-2 py-0.5">Under Development</div>
      </div>
    </div>
    <div class="mt-2 flex flex-wrap justify-center space-x-2">
      <div v-for="page in pagesByTagAndSort('home', 'text')" :key="page._id" class="group relative m-2">
        <NuxtLink :to="page._path" class="transform p-2 transition-transform hover:scale-110">
          {{ page.title }}
        </NuxtLink>
        <popup-description
          v-if="isHovered === page._id"
          :icon="page.icon"
          :description="page.description"
          :is-hovered="isHovered === page._id"
        />
        <div v-if="page.underConstruction" class="bg-info mt-1 rounded-full px-2 py-0.5 text-xs">Under Development</div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePageStore } from '@/stores/pageStore';
const isHovered = ref(null);

const pageStore = usePageStore();

const pagesByTagAndSort = (tag: string, sort: string) => {
  return pageStore.pages.filter((page: any) => page.tags?.includes(tag) && page.sort === sort);
};
</script>
