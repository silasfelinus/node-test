<template>
  <div class="relative flex items-center">
    <!-- Links Container -->
    <div class="flex w-full items-center justify-center">
      <!-- Previous Link -->
      <NuxtLink v-if="prev" :to="prev._path" class="nav-icon group flex flex-col items-center justify-center">
        <icon name="typcn:arrow-back-outline" size="48" class="hover:scale-125" />
        <div class="nav-text group-hover:show-text">
          {{ prev.title }}
        </div>
      </NuxtLink>
      <!-- Random Link -->
      <NuxtLink :to="randomHighlightPage._path" class="nav-icon group flex-col items-center justify-center">
        <icon name="game-icons:galaxy" class="h-12 w-12 hover:scale-125 md:h-20 md:w-20" />
        <div class="nav-text group-hover:show-text">
          {{ randomLinkText }}
        </div>
      </NuxtLink>
      <!-- Home Link -->
      <NuxtLink v-if="!isHomePage" to="/" class="nav-icon group flex-col items-center justify-center">
        <icon name="line-md:home-md-twotone" class="h-12 w-12 hover:scale-125 md:h-20 md:w-20" />
        <div class="nav-text group-hover:show-text">
          {{ homeLinkText }}
        </div>
      </NuxtLink>
      <!-- Next Link -->
      <NuxtLink v-if="next" :to="next._path" class="nav-icon group flex flex-col items-center justify-center">
        <icon name="typcn:arrow-forward-outline" class="m-2 h-12 w-12 hover:scale-125 md:h-20 md:w-20" />
        <div class="nav-text group-hover:show-text">
          {{ next.title }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePageStore } from '@/stores/pageStore';

const { prev, next, page } = useContent();
const pageStore = usePageStore();

const isHomePage = computed(() => {
  return page.value ? page.value._path === '/' || page.value.path === '/' : false;
});

const randomHighlightPage = computed(
  () => pageStore.highlightPages[Math.floor(Math.random() * pageStore.highlightPages.length)] || {},
);

const randomLinkTexts = ['Randomizer', 'Teleport!', 'Something else'];
const homeLinkTexts = ['HomeScreen', 'Take me home...', 'Home', 'Visual Contents'];

const randomLinkText = randomLinkTexts[Math.floor(Math.random() * randomLinkTexts.length)];
const homeLinkText = homeLinkTexts[Math.floor(Math.random() * homeLinkTexts.length)];
</script>

<style scoped>
.nav-icon {
  @apply flex text-center transition-all ease-in-out;
  justify-content: center;
  align-items: center;
}

.nav-text {
  @apply text-lg opacity-0 transition-opacity group-hover:opacity-100;
}
</style>
