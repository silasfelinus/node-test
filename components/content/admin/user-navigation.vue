<template>
  <div class="bg-base-200 relative m-4 rounded-2xl p-4">
    <div class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform rounded-full p-1 shadow-lg">
      <div class="z-50 flex space-x-2">
        <!-- New Icon for showing the Site Map -->
        <icon name="bi:map" class="cursor-pointer text-2xl" @click="toggleSiteMap" />
        <!-- Existing icons -->
        <icon name="grommet-icons:grid" class="cursor-pointer text-2xl" @click="setView('fourRow')" />
        <icon name="mdi:view-dashboard-outline" class="cursor-pointer text-2xl" @click="setView('threeRow')" />
        <icon name="ion:grid-outline" class="cursor-pointer text-2xl" @click="setView('twoRow')" />
        <icon name="bi:fullscreen" class="cursor-pointer text-2xl" @click="setView('single')" />
      </div>
    </div>

    <!-- Site Map View -->
    <div v-if="isSiteMap">
      <site-map />
    </div>

    <!-- Original User Navigation View -->
    <div v-else class="flex flex-wrap">
      <nuxt-link v-for="item in userNavigation" :key="item.path" :to="item.path" :class="itemClass">
        <div class="bg-base-200 hover:bg-accent flex cursor-pointer flex-col items-center rounded-2xl p-4 transition">
          <img :src="item.image" alt="" class="mb-2 rounded-2xl border" />
          <div class="mb-2 text-lg font-bold">{{ item.title }}</div>
          <div class="mb-2 text-sm">{{ item.description }}</div>
          <button class="bg-primary hover:bg-secondary rounded px-4 py-1 transition">Go</button>
        </div>
      </nuxt-link>
    </div>
    <!-- Add the slot section here -->
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { userNavigation } from '@/training/userNavigation';

const isSiteMap = ref(false); // State to control whether the site map is displayed or not

const toggleSiteMap = () => {
  isSiteMap.value = !isSiteMap.value;
};

const view = ref('twoRow'); // Default view

onMounted(() => {
  const savedView = window.localStorage.getItem('view');
  if (savedView) {
    view.value = savedView;
  }
});

const setView = (newView: string) => {
  isSiteMap.value = false; // Hide the site map when another view is selected
  view.value = newView;
  window.localStorage.setItem('view', newView);
};

const itemClass = ref('w-1/2 p-4');
watch(view, (newView) => {
  if (newView === 'twoRow') {
    itemClass.value = 'w-1/2 p-4';
  } else if (newView === 'fourRow') {
    itemClass.value = 'w-1/4 p-4';
  } else if (newView === 'single') {
    itemClass.value = 'w-full p-4';
  } else {
    itemClass.value = 'w-1/3 p-4';
  }
});
</script>

<style scoped>
.icon {
  width: 24px;
  height: 24px;
}
</style>
