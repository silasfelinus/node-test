<template>
  <div class="bg-base-200 relative m-4 rounded-2xl p-4">
    <!-- View Toggle -->
    <div class="absolute right-4 top-4 z-50 flex space-x-2">
      <icon name="grommet-icons:grid" class="cursor-pointer text-2xl" @click="setView('fourRow')" />
      <icon name="ion:grid-outline" class="cursor-pointer text-2xl" @click="setView('twoRow')" />
      <icon name="bi:fullscreen" class="cursor-pointer text-2xl" @click="setView('single')" />
    </div>

    <!-- User Navigation View -->
    <div class="flex flex-wrap">
      <nuxt-link v-for="item in userNavigation" :key="item.path" :to="item.path" :class="itemClass">
        <!-- Wrap each item in a transition -->
        <transition name="fade" mode="out-in">
          <!-- Item Layout -->
          <div
            v-show="true"
            class="hover:bg-accent relative flex cursor-pointer flex-col items-center rounded-2xl p-4 transition"
          >
            <div class="relative flex-grow">
              <img :src="item.image" alt="" class="h-[70%] w-full rounded-2xl border object-cover" />
              <div
                v-if="view === 'single'"
                class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white opacity-0 transition-opacity hover:opacity-100"
              >
                <div>
                  <div class="text-lg font-bold">{{ item.title }}</div>
                  <div class="text-sm">{{ item.description }}</div>
                </div>
              </div>
            </div>
            <div v-if="view !== 'single'" class="mt-2 text-lg font-bold">{{ item.title }}</div>
            <button class="bg-primary hover:bg-secondary mt-2 rounded px-4 py-1 transition">Go</button>
          </div>
        </transition>
      </nuxt-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { userNavigation } from '@/training/userNavigation';

const view = ref('twoRow');
const itemClass = ref('w-1/2 p-4');

// Load saved view from local storage
onMounted(() => {
  const savedView = window.localStorage.getItem('view');
  if (savedView) {
    view.value = savedView;
  }
});

const setView = (newView: string) => {
  view.value = newView;
  window.localStorage.setItem('view', newView);
};

watch(view, (newView) => {
  if (newView === 'twoRow') {
    itemClass.value = 'w-1/2 p-4';
  } else if (newView === 'fourRow') {
    itemClass.value = 'w-1/4 p-4';
  } else if (newView === 'single') {
    itemClass.value = 'w-full p-4';
  }
});
</script>

<style scoped>
.icon {
  width: 24px;
  height: 24px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.flex-grow {
  flex-grow: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
