<template>
  <div
    class="bg-base-200 relative flex flex-col items-center rounded-2xl transition-all"
    :class="{
      'transition-duration-300 h-[10vh]': !isExtended,
      'transition-duration-300 h-[40vh]': isExtended,
    }"
  >
    <!-- Toggle Button -->
    <div
      class="duration-600 absolute bottom-0 right-0 z-50 m-4 -translate-x-1/3 transform cursor-pointer rounded-2xl p-2 shadow-lg transition ease-in-out"
      @click.stop="toggleExtend"
    >
      <icon
        :name="isExtended ? 'line-md:chevron-small-double-down' : 'line-md:chevron-small-double-up'"
        class="text-default h-6 w-6"
      />
    </div>

    <!-- Highlight Pages -->
    <div
      class="bg-secondary pointer-events-none z-50 flex flex-col rounded-2xl border text-center text-2xl font-extrabold tracking-wider shadow-lg"
    >
      Highlight Gallery
    </div>
    <div class="m-1 mb-1 flex w-full flex-wrap justify-center space-x-2 pb-5">
      <NuxtLink
        v-for="page in highlightPages"
        :key="page._id"
        :to="page._path"
        class="bg-primary group relative mb-2 flex flex-col items-center space-x-2 rounded-2xl border p-2 transition-colors"
        @mouseover="isHovered = page._id"
        @mouseleave="isHovered = null"
        @click="handleLinkClick"
      >
        <!-- Tooltip -->
        <popup-description
          v-if="isHovered === page._id"
          :icon="page.icon"
          :description="page.description"
          :is-hovered="isHovered === page._id"
        />
        <!-- Compact View -->
        <div v-if="!isExtended" class="flex flex-row items-center space-x-2">
          <icon :name="page.icon" class="text-3xl" />
          <div class="bg-base-200 rounded-2xl border p-2 text-lg font-bold">
            {{ page.title }}
          </div>
        </div>

        <!-- Extended View -->
        <div v-if="isExtended" class="m-1 flex flex-col items-center space-y-2">
          <div class="bg-secondary h-24 w-24 rounded-lg border">
            <img :src="`/images/${page.image}`" alt="Page Image" class="h-full w-full object-cover" />
          </div>
          <!-- You are here indicator -->
          <div
            v-if="page._path === $route.path"
            class="bg-secondary m-1 flex items-center rounded-2xl border p-1 text-xl"
          >
            You are here <icon name="line-md:download-outline-loop" class="mr-2 text-lg" />
          </div>
          <div class="flex flex-col items-start">
            <div class="bg-base-200 m-1 rounded-2xl border p-2 text-lg font-bold">
              {{ page.title }}
            </div>
            <popup-description
              v-if="isHovered === page._id"
              :icon="page.icon"
              :description="page.description"
              :is-hovered="isHovered === page._id"
            />
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Support and Construction Nav (Displayed only when extended) -->
    <div v-if="isExtended" class="bg-base-200 mt-4 flex w-full flex-col items-center space-y-4 rounded-2xl p-2">
      <support-nav />
      <construction-nav />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { usePageStore } from '@/stores/pageStore';
import { useFooterStore } from '@/stores/footerStore';

const pageStore = usePageStore();
const footerStore = useFooterStore();

const isHovered = ref(null);

const toggleExtend = () => {
  footerStore.toggleIsExtended();
};

const isExtended = computed(() => footerStore.isExtended);

const handleLinkClick = () => {
  if (isExtended.value) {
    toggleExtend();
  }
};

const highlightPages = computed(() => pageStore.highlightPages);
</script>
