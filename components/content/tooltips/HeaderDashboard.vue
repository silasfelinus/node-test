<template>
  <header class="bg-base-200 flex items-center justify-between p-1">
    <!-- Left Section -->
    <div class="flex w-full flex-col items-center md:w-auto md:flex-row">
      <div class="flex-shrink-0">
        <avatar-image :size="avatarSize" class="m-2 rounded-2xl" />
      </div>
      <div class="flex w-full flex-col items-center md:w-auto">
        <room-title class="w-full border-b text-center text-lg font-semibold" />
        <h2 v-if="page.subtitle" class="text-center text-sm italic text-gray-500">
          {{ page.subtitle }}
        </h2>
      </div>
    </div>
    <!-- Right Section -->
    <div class="flex w-auto flex-wrap items-center justify-center space-x-2">
      <jellybean-count />
      <login-button />
      <theme-toggle />
      <butterfly-toggle />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore';
const { page } = useContent();
const userStore = useUserStore();
const username = computed(() => userStore.username);
const user = computed(() => userStore.user);

const avatarSize = 'small';
</script>
