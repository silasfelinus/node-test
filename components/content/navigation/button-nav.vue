<template>
  <nav class="bg-base w-full p-4 transition-all duration-500 ease-in-out">
    <div class="mt-2 flex flex-wrap justify-center space-x-2">
      <div v-for="page in pagesByTag('home')" :key="page._id" class="m-2">
        <NuxtLink
          :to="page._path"
          class="btn btn-accent text-default transform rounded-full px-3 py-1 shadow-lg transition-transform hover:scale-110"
        >
          <icon
            :name="page.icon"
            class="icon-effect transform transition-transform ease-in-out hover:scale-110 hover:shadow-lg"
          />
          {{ page.title }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePageStore } from '@/stores/pageStore';

const pageStore = usePageStore();

const pagesByTag = (tag: string) => {
  return pageStore.pages.filter((page: any) => page.tags?.includes(tag));
};
</script>
