<template>
  <div class="relative flex items-center justify-center">
    <!-- Mature Content Toggle -->
    <div
      v-if="userRole !== 'CHILD'"
      :class="[
        'm-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all ease-in-out hover:scale-110 hover:shadow-lg md:h-16 md:w-16',
        { 'bg-accent': isMatureToggled },
      ]"
      @click="toggleMature"
      @mouseover="showMatureTooltip = true"
      @mouseleave="showMatureTooltip = false"
    >
      <icon :name="'emojione-monotone:lipstick'" :title="'Toggle Mature Content'" class="h-full w-full" />
      <div
        v-show="showMatureTooltip"
        class="bg-base-200 absolute left-1/2 top-0 z-50 mt-[-20px] -translate-x-1/2 -translate-y-full transform rounded-2xl border p-2 text-sm"
      >
        Toggle Mature Content
      </div>
      <div
        v-if="showMaturePopup"
        class="bg-base-200 absolute bottom-0 left-1/2 z-50 mb-[-20px] -translate-x-1/2 translate-y-full transform rounded-2xl border p-2 text-sm transition-opacity duration-1000 ease-in-out"
      >
        Mature Content {{ isMatureToggled ? 'Enabled' : 'Disabled' }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFilterStore } from '@/stores/filterStore';
import { useUserStore } from '@/stores/userStore';

const filterStore = useFilterStore();
const userStore = useUserStore();

const userRole = userStore.role;
const isMatureToggled = computed(() => filterStore.showMature);

const showMatureTooltip = ref(false);
const showMaturePopup = ref(false);

const toggleMature = () => {
  filterStore.toggleMature();
  showMaturePopup.value = true;
  setTimeout(() => {
    showMaturePopup.value = false;
  }, 2000);
};
</script>
