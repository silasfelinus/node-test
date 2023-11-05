<template>
  <div :class="['bg-base-200 relative rounded-2xl p-2', { 'h-32': isMinimized }]">
    <button v-if="!isMinimized" class="absolute left-1 top-1 z-10" @click.stop="toggleMinimize">
      <icon name="game-icons:expand" class="text-lg" />
    </button>
    <span class="absolute right-2 top-2">Role: {{ user?.Role || 'Guest' }}</span>

    <div v-if="!isMinimized">
      <h1 class="ml-6 text-2xl font-semibold">User Dashboard</h1>
      <div class="relative flex items-center justify-center">
        <user-avatar />
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
          <h2 class="bg-base-200 border-accent rounded-2xl border p-2 pb-1 pt-1 text-lg font-semibold">
            {{ user?.username || 'Kind Guest' }}
          </h2>
        </div>
      </div>
      <div class="m-2 flex items-center space-x-4">
        <div>
          <p class="m-2 mt-4 p-1 pb-0 text-lg font-medium">
            Welcome, {{ user?.username || 'Guest' }}
            <span v-if="!isLoggedIn" class="ml-2 text-sm text-gray-500">(Not logged in)</span>
          </p>
          <div class="mt-2 flex space-x-4">
            <div class="flex items-center space-x-2">
              <icon name="tdesign:bean" class="text-lg" />
              <span>Jellybeans: {{ user?.mana || 0 }}</span>
            </div>
          </div>
        </div>
        <div v-if="isLoggedIn">
          <button class="bg-warning rounded-lg p-2 text-lg text-white" @click="logout">Logout</button>
        </div>
        <div v-else>
          <button class="bg-primary rounded-lg p-2 text-lg text-white" @click="showLogin = true">Login</button>
        </div>
      </div>
      <login-form v-if="showLogin" @close="showLogin = false" />
      <div class="flex flex-row">
        <theme-toggle class="flex flex-row" />
      </div>
    </div>

    <div v-else class="flex h-full flex-row items-center justify-between">
      <div
        class="flex cursor-pointer flex-row items-center space-x-2"
        @click.stop="isMinimized ? toggleMinimize() : null"
      >
        <user-avatar class="h-12 w-12" />
        <span>{{ user?.username || 'Kind Guest' }}</span>
      </div>
      <div class="flex flex-row items-center space-x-4">
        <div class="flex items-center space-x-2">
          <icon name="tdesign:bean" class="text-2xl" />
          <span>{{ user?.mana || 0 }}</span>
        </div>
        <button
          :class="['rounded-lg text-lg text-white', isLoggedIn ? 'bg-warning' : 'bg-primary']"
          @click.stop="handleButtonClick"
        >
          {{ isLoggedIn ? 'Logout' : 'Login' }}
        </button>
        <theme-toggle class="flex flex-row" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const user = computed(() => userStore.user);
const isLoggedIn = computed(() => userStore.isLoggedIn);

const showLogin = ref(false);
const isMinimized = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value;
};

watch(isLoggedIn, (newValue) => {
  if (newValue) {
    showLogin.value = false;
  }
});

const handleButtonClick = () => {
  if (isLoggedIn.value) {
    logout();
  } else {
    showLogin.value = true;
    if (isMinimized.value) {
      toggleMinimize();
    }
  }
};

const logout = async () => {
  try {
    isLoading.value = true;
    await userStore.logout();
  } catch (error: any) {
    errorMessage.value = 'Failed to logout. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>
