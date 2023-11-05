<template>
  <div class="relative flex h-screen w-screen flex-col">
    <!-- Toggle Navigation Button -->
    <button class="absolute left-3 top-[10vh] z-50" @click="toggleNav">
      <icon name="fluent:row-triple-20-filled" class="text-2xl" />
    </button>

    <!-- Header Dashboard -->
    <div class="flex w-full shadow-lg">
      <header-dashboard />
    </div>

    <!-- Messages Area (tutorial-cards) -->
    <div>
      <dotti-cards />
    </div>
    <smart-links />

    <div class="flex flex-grow">
      <!-- User Navigation -->
      <div
        :class="{
          'w-[50%]': isNavVisible && isLargeScreen,
          hidden: !isNavVisible || !isLargeScreen,
          'w-full': isNavVisible && !isLargeScreen,
        }"
        class="duration-600 bg-base-200 h-full flex-none overflow-y-auto rounded-lg shadow-lg transition-all ease-in-out"
        @click.stop
      >
        <navigation-trimmed class="m-1 rounded-2xl p-1" />
      </div>

      <!-- Main Slot -->
      <div class="h-full flex-grow overflow-y-auto rounded-lg bg-gray-100 shadow-lg" @click="closeNav">
        <div class="h-full w-full rounded border border-gray-300">
          <slot class="bg-grey-200 m-1 rounded-2xl p-1" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isNavVisible = ref(false);
const isLargeScreen = ref(false);

const toggleNav = () => {
  isNavVisible.value = !isNavVisible.value;
};

const closeNav = () => {
  isNavVisible.value = false;
};

const handleResize = () => {
  isLargeScreen.value = window.innerWidth > 1024;
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
