<template>
  <div>
    <div class="mb-4">
      <input id="adminCheckbox" v-model="showAdmin" type="checkbox" />
      <label for="adminCheckbox" class="ml-2">Show Admin Pages</label>
    </div>
    <div class="mb-4">
      <label for="layoutToggle" class="mr-2">Layout:</label>
      <select id="layoutToggle" v-model="layout">
        <option value="full">Full</option>
        <option value="badge">Badge</option>
      </select>
    </div>
    <div class="bg-base relative flex h-screen flex-col items-center overflow-auto p-8">
      <div
        class="from-base to-base pointer-events-none absolute inset-0 z-10 bg-gradient-to-t via-transparent opacity-30"
      ></div>
      <div class="mx-auto mt-24 max-w-4xl">
        <div class="carousel carousel-vertical rounded-box h-96">
          <div v-for="page in filteredPages" :key="page._id" class="group relative mt-4">
            <NuxtLink :to="page._path">
              <div @mouseover="handleMouseover(page)" @mouseout="handleMouseout">
                <img
                  v-if="page.image && layout === 'full'"
                  :src="`/images/${page.image}`"
                  alt="Page Image"
                  class="image-carousel mx-auto h-auto w-full rounded-md object-cover"
                />
                <img
                  v-else-if="page.image && layout === 'badge'"
                  :src="`/images/${page.image}`"
                  alt="Page Image"
                  class="mx-auto h-24 w-24 rounded-full object-cover"
                />
              </div>
              <div
                v-if="tooltipContent"
                class="text-default absolute top-0 mt-2 hidden translate-y-full transform rounded-lg bg-black px-3 py-2 text-center text-sm opacity-75 group-hover:block md:text-base"
              >
                {{ tooltipContent }}
              </div>
              <div class="mt-2 text-center text-sm md:text-base">{{ page.title }}</div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useContentStore } from '../../../stores/contentStore';
import { useStatusStore, StatusType } from '../../../stores/statusStore';

interface Page {
  _id: string;
  _path: string;
  image?: string;
  title: string;
  subtitle?: string;
  folder?: string;
  admin?: boolean;
  tooltip?: string;
}

const contentStore = useContentStore();
const statusStore = useStatusStore();
const showAdmin = ref(false);
const layout = ref('full'); // 'full' or 'badge'
const tooltipContent = ref(''); // Tooltip content

const filteredPages = computed((): Page[] => {
  if (!contentStore.pages) return [];
  const pages = contentStore.pages.filter((page: Page) => !(!showAdmin.value && page.admin));
  return pages;
});

const handleMouseover = (page: Page) => {
  tooltipContent.value = page.subtitle ? `'${page.subtitle}'` : '';
  if (page.tooltip) {
    tooltipContent.value += ` ${page.tooltip}`;
    statusStore.setStatus(StatusType.INFO, page.tooltip);
  }
};

const handleMouseout = () => {
  tooltipContent.value = '';
  statusStore.clearStatus();
};
</script>

<style scoped>
.bg-light-gray {
  background-color: #f6f6f6;
}

.image-carousel {
  object-fit: cover;
  height: 60vh; /* Increase/decrease this value to show more/less of the top and bottom */
}
</style>
