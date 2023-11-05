<template>
  <div class="flex flex-wrap justify-center">
    <!-- Always show Random Link -->
    <NuxtLink
      :to="randomHighlightPage._path"
      class="group flex flex-col items-center justify-center rounded-2xl text-center transition-all ease-in-out hover:scale-110"
    >
      <icon
        name="game-icons:galaxy"
        :title="'Go to Random Highlight Page'"
        class="h-20 w-20 transform cursor-pointer transition-transform ease-in-out hover:scale-110"
      />
      <div class="m-1 text-lg opacity-0 transition-opacity group-hover:opacity-100">
        {{ randomLinkText }}
      </div>
    </NuxtLink>

    <!-- Show Home icon only if NOT home -->
    <NuxtLink
      v-if="!isHomePage"
      to="/"
      class="group flex flex-col items-center justify-center rounded-2xl text-center transition-all ease-in-out hover:scale-110"
    >
      <icon
        name="line-md:home-md-twotone"
        :title="'Home'"
        class="h-20 w-20 transform cursor-pointer transition-transform ease-in-out hover:scale-110"
      />
      <div class="m-2 text-lg opacity-0 transition-opacity group-hover:opacity-100">
        {{ homeLinkText }}
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePageStore } from '@/stores/pageStore';

const { page } = useContent();
const pageStore = usePageStore();

const isHomePage = computed(() => {
  return page.value ? page.value._path === '/' || page.value.path === '/' : false;
});

const randomHighlightPage = computed(() => {
  return pageStore.highlightPages[Math.floor(Math.random() * pageStore.highlightPages.length)] || {};
});

const randomLinkTexts = ['Randomizer', 'Teleport me somewhere else!', 'Show me another page'];
const homeLinkTexts = ['Our Colorful HomeScreen', 'Take me home...', 'Home Sweet Home', 'Visual Table of Contents'];

const randomLinkText = randomLinkTexts[Math.floor(Math.random() * randomLinkTexts.length)];
const homeLinkText = homeLinkTexts[Math.floor(Math.random() * homeLinkTexts.length)];
</script>

<style scoped></style>
