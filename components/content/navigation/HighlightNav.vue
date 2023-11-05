<template>
  <div
    class="bg-base-200 relative flex flex-col items-center overflow-visible rounded-2xl border p-2"
    :class="{ 'h-[10vh]': !isExtended, 'h-[25vh]': isExtended }"
  >
    <!-- Toggle Button -->
    <div
      class="duration-600 bg-base-400 absolute left-1/2 top-4 -translate-x-1/2 transform cursor-pointer rounded-2xl border p-2 shadow-lg transition ease-in-out"
      @click.stop="toggleExtend"
    >
      <icon
        :name="isExtended ? 'line-md:chevron-small-double-down' : 'line-md:chevron-small-double-up'"
        class="text-default h-6 w-6"
      />
    </div>

    <!-- Highlight Pages -->
    <div class="flex flex-wrap justify-center space-x-2 overflow-x-auto pb-10">
      <NuxtLink
        v-for="page in highlightPages"
        :key="page._id"
        :to="page._path"
        class="bg-primary group relative flex flex-col items-center space-x-2 rounded-2xl border p-2 transition-colors"
        @mouseover="hoveredPage = page._id"
        @mouseleave="hoveredPage = null"
      >
        <!-- Compact View -->
        <div v-if="!isExtended" class="flex flex-row items-center space-x-2">
          <icon :name="page.icon" class="text-3xl" />
          <div class="bg-base-200 rounded-2xl border p-2 text-lg font-bold">
            {{ page.title }}
          </div>
        </div>

        <!-- Tooltip -->
        <div
          v-if="!isExtended && hoveredPage === page._id"
          class="bg-base-200 absolute -top-32 left-1/2 z-10 mb-1 flex -translate-x-1/2 transform items-center space-x-4 rounded-2xl border p-2 shadow-lg"
        >
          <div class="bg-secondary h-24 w-24 overflow-hidden rounded-lg border">
            <img :src="`/images/${page.image}`" alt="Page Image" class="h-full w-full object-cover" />
          </div>
          <div class="bg-base-200 rounded-2xl border p-2 text-sm">
            {{ page.description }}
          </div>
        </div>

        <!-- Extended View -->
        <div v-if="isExtended" class="flex flex-col items-center space-y-2">
          <div class="bg-secondary h-24 w-24 overflow-hidden rounded-lg border">
            <img :src="`/images/${page.image}`" alt="Page Image" class="h-full w-full object-cover" />
          </div>
          <div class="bg-base-200 rounded-2xl border p-2 text-lg font-bold">
            {{ page.title }}
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Support and Construction Nav (Displayed only when extended) -->
    <div v-if="isExtended" class="bg-base-200 mt-4 flex flex-col items-center space-y-4 rounded-2xl p-2">
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

const hoveredPage = ref(null);
const isHovered = ref(false);
const isExtended = computed(() => footerStore.isExtended);

const toggleExtend = () => {
  footerStore.toggleIsExtended();
};

const highlightPages = computed(() => pageStore.highlightPages);
</script>
