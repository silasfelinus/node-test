<template>
  <div class="bg-light-gray w-full p-2">
    <div class="flex flex-wrap justify-center">
      <div
        v-for="page in pages"
        :key="page._id"
        class="flex w-full items-center justify-center p-2 sm:w-1/2 lg:w-1/3 xl:w-1/4"
      >
        <NuxtLink
          :to="page._path"
          class="group relative flex w-full flex-col items-center p-2 text-center"
          @click="clicked = page._id"
        >
          <div
            :class="[
              'relative h-24 w-24 rounded-full transition-all duration-500 ease-in-out md:h-32 md:w-32',
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
            <div
              class="bg-primary absolute z-10 rounded p-2 text-xs opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 md:text-sm"
              style="
                bottom: 100%;
                left: 50%;
                transform: translate(-50%, -10%);
                pointer-events: none;
                transition: opacity 0.2s ease-in-out;
              "
            >
              {{ page.description }}
            </div>
          </div>
          <div
            class="mt-2 text-sm transition-colors duration-500 ease-in-out hover:text-blue-600 md:text-base"
            :style="clicked === page._id ? 'font-weight: bold; color: green;' : ''"
          >
            {{ page.title }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const clicked = ref<string | null>(null);

const { find } = queryContent()
  .where({ $not: { _path: '/' } })
  .sort({ _id: 1 });
const { data: pages } = await useAsyncData('pages-list', find);
</script>
