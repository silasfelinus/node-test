<template>
  <header :class="isCompact ? 'bg-base-200 m-1 flex flex-row items-center' : 'bg-base-200 m-1 flex flex-col'">
    <!-- User Info -->
    <user-avatar
      :size="isCompact ? 'small' : 'large'"
      class="md:max-w-xs lg:max-w-sm xl:max-w-md"
      @click="toggleMinimize"
    />

    <div v-if="!isCompact" class="flex w-full flex-col">
      <!-- Username, Jellybeans, Logout -->
      <div class="flex items-center space-x-4">
        <span class="text-lg md:text-xl">
          {{ user?.username || 'Kind Guest' }}
        </span>
        <span class="hidden md:inline-block">{{ jellybeans }}/ 9 Jellybeans Discovered</span>
        <button v-if="isLoggedIn" class="md:text-md text-sm text-gray-500" @click.stop="handleButtonClick">
          Logout
        </button>
      </div>
      <!-- Theme and Butterfly Toggle -->
      <div class="flex items-center space-x-4">
        <theme-toggle />
        <butterfly-toggle />
      </div>
    </div>
    <div v-else class="flex items-center space-x-4">
      <span class="text-lg md:text-xl">
        {{ user?.username || 'Kind Guest' }}
      </span>
      <button v-if="isLoggedIn" class="md:text-md text-sm text-gray-500" @click.stop="handleButtonClick">Logout</button>
      <theme-toggle />
      <butterfly-toggle />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { errorHandler } from '@/server/api/utils/error';
import { useToggleStore, ToggleableScreens, ScreenState } from '@/stores/toggleStore';

const userStore = useUserStore();
const jellybeans = computed(() => userStore.mana);
const user = computed(() => userStore.user);
const isLoggedIn = computed(() => userStore.isLoggedIn);

const toggleStore = useToggleStore();
const isCompact = ref(toggleStore.getScreenState(ToggleableScreens.USER_DASHBOARD) === ScreenState.COMPACT);

onMounted(() => {
  toggleStore.loadFromLocalStorage();
  isCompact.value = toggleStore.getScreenState(ToggleableScreens.USER_DASHBOARD) === ScreenState.COMPACT;
});

const toggleMinimize = () => {
  isCompact.value = !isCompact.value;
  const newState = isCompact.value ? ScreenState.COMPACT : ScreenState.FULL;
  toggleStore.setScreenState(ToggleableScreens.USER_DASHBOARD, newState);
};

const handleButtonClick = async () => {
  if (isLoggedIn.value) {
    try {
      await userStore.logout();
    } catch (error: any) {
      const errorResponse = errorHandler({
        error,
        message: 'Failed to logout. Please try again.',
      });
    }
  } else {
    // Handle login popup or redirect
  }
};
</script>
