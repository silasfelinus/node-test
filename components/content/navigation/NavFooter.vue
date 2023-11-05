<template>
  <footer
    class="relative m-2 flex flex-col items-center p-0"
    :class="{ 'min-h-56': !isExtended, 'h-auto': isExtended }"
  >
    <nav class="bg-primary flex w-auto flex-col items-center rounded-2xl border p-2">
      <!-- Highlight Section -->
      <div class="flex flex-nowrap justify-center space-x-2 overflow-x-auto pb-10">
        <div
          v-for="page in pagesByTagAndSort('home', 'highlight')"
          :key="page._id"
          class="group relative m-1 flex-shrink-0"
        >
          <NuxtLink :to="page._path" class="text-md group flex flex-col items-center px-1 py-1 shadow-lg">
            <div
              class="bg-base-200 group-hover:border-secondary flex items-center justify-center overflow-hidden rounded-2xl border p-2 transition-colors"
            >
              <img :src="`/images/${page.image}`" alt="Page Image" class="h-24 w-24 rounded-2xl object-cover" />
            </div>
            <div class="mt-1 p-1 text-center">
              {{ page.title }}
              <div v-if="page._path === $route.path" class="text-md bg-secondary m-1 rounded-2xl border p-1">
                <icon name="line-md:download-outline-loop" class="text-lg" />
                You are here
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Icon and Text Sections (Displayed only when extended) -->
      <div v-if="isExtended" class="order-last mt-4 rounded-2xl p-2">
        <div class="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
          <div
            v-for="page in [...pagesByTagAndSort('home', 'icon'), ...pagesByTagAndSort('home', 'text')]"
            :key="page._id"
            class="group relative m-2"
          >
            <NuxtLink
              :to="page._path"
              class="bg-secondary hover:bg-accent group flex items-center justify-center space-x-2 rounded-2xl p-2 text-center transition-colors duration-300"
            >
              <div v-if="page.icon" class="text-3xl">
                <icon :name="page.icon" />
              </div>
              <div class="p-1 text-lg">
                {{ page.title }}
                <div v-if="page._path === $route.path" class="text-md text-secondary mt-1 rounded-full border p-1">
                  <icon name="line-md:download-outline-loop" class="text-lg" />
                  You are here
                </div>
              </div>
            </NuxtLink>
            <div v-if="page.underConstruction" class="bg-warning mt-1 rounded-2xl p-1 text-center text-xs">
              Under Construction
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div
      class="duration-600 bg-base-400 absolute bottom-4 left-1/2 -translate-x-1/2 transform cursor-pointer rounded-2xl border p-2 shadow-lg transition ease-in-out"
      @click.stop="toggleExtend"
    >
      <icon
        :name="isExtended ? 'line-md:chevron-small-double-down' : 'line-md:chevron-small-double-up'"
        class="text-default h-6 w-6"
      />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { usePageStore } from '@/stores/pageStore';

const isExtended = ref(false);

const toggleExtend = () => {
  isExtended.value = !isExtended.value;
};
const pageStore = usePageStore();

const pagesByTagAndSort = (tag: string, sort: string) => {
  return pageStore.pages.filter((page: any) => page.tags?.includes(tag) && page.sort === sort);
};
</script>
