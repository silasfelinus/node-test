<template>
  <div class="bg-primary flex w-full flex-col items-center rounded-2xl p-4">
    <div class="grid w-full grid-cols-2 gap-4 rounded-2xl md:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="page in pages"
        :key="page._id"
        class="drag-card my-4 flex flex-col items-center justify-center rounded-2xl"
      >
        <div class="bg-base-200 rounded-2xl border-4 p-2 shadow-md transition-shadow duration-300 hover:shadow-lg">
          <NuxtLink :to="page._path" class="flex flex-col items-center justify-center" @click="clicked = page._id">
            <div
              :class="[
                'h-20 w-20 rounded-full transition-all duration-500 ease-in-out sm:h-24 sm:w-24 md:h-32 md:w-32',
                clicked === page._id ? 'scale-110' : '',
                'hover:scale-105 hover:shadow-lg',
              ]"
            >
              <img
                v-if="page.image"
                :src="`/images/${page.image}`"
                alt="Page Image"
                class="h-full w-full rounded-full object-cover"
              />
            </div>
            <div
              class="hover:text-accent mt-2 text-xs transition-colors duration-500 ease-in-out sm:text-sm md:text-base"
              :style="clicked === page._id ? 'font-weight: bold; color: green;' : ''"
            >
              {{ page.title }}
            </div>
            <div class="text-xxs mt-1 text-gray-600 sm:text-xs md:text-sm">
              {{ page.description }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// TypeScript code remains the same
import { ref } from 'vue';

const clicked = ref<string | null>(null);

const { find } = queryContent()
  .where({ $not: { _path: '/' } })
  .sort({ _id: 1 });
const { data: pages } = await useAsyncData('pages-list', find);
</script>

<style scoped>
.bg-light-gray {
  background-color: #f6f6f6;
}
.drag-card {
  cursor: grab;
}
</style>
