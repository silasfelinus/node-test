<template>
  <div class="flex space-x-6">
    <!-- Always show Galaxy Link -->
    <NuxtLink
      :to="randomHighlightPage._path"
      class="bg-base-200 hover:glow-animation flex flex-col items-center justify-center rounded-2xl text-center hover:scale-110"
    >
      <div class="flex flex-grow items-center space-x-2">
        <icon name="game-icons:galaxy" class="icon-effect" />
      </div>
    </NuxtLink>

    <!-- Show Home icon only if NOT home -->
    <NuxtLink
      v-if="!isHomePage"
      to="/"
      class="bg-base-200 hover:glow-animation flex items-center justify-center rounded-2xl text-center hover:scale-110"
    >
      <icon name="line-md:home-md-twotone" class="icon-effect" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePageStore } from '@/stores/pageStore';

const pageStore = usePageStore();
const { page } = useContent();
const isHomePage = computed(() => {
  return page.value ? page.value._path === '/' || page.value.path === '/' : false;
});

const randomHighlightPage = computed(() => {
  return pageStore.highlightPages[Math.floor(Math.random() * pageStore.highlightPages.length)] || {};
});
</script>

<style scoped>
.icon-effect {
  @apply h-6 w-6 cursor-pointer transition-shadow md:h-16 md:w-16;
}

@keyframes glow {
  0% {
    box-shadow: 0 0 5px #fff;
  }
  50% {
    box-shadow: 0 0 20px #fff, 0 0 30px #ff73fd;
  }
  100% {
    box-shadow: 0 0 5px #fff;
  }
}

.glow-animation:hover {
  animation: glow 1.5s infinite;
}
</style>
