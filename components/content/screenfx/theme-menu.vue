<template>
  <div class="theme-toggle bg-base-200 m-2 flex h-screen w-screen flex-col items-center rounded-2xl border p-2 text-lg">
    <div class="mb-2 w-full text-center text-2xl font-bold">Choose Theme:</div>
    <milestone-reward v-if="themeChanged" :id="9"></milestone-reward>
    <div class="theme-list grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(theme, index) in themeStore.themes"
        :key="index"
        class="theme-item flex cursor-pointer items-center justify-center rounded-lg p-2"
        :class="theme === themeStore.currentTheme ? 'ring-accent ring-2' : ''"
        @click="themeStore.changeTheme(theme)"
      >
        <div class="w-full text-center text-lg">{{ theme }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useThemeStore } from '../../../stores/themeStore';

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.initTheme();
});

const themeChanged = computed(() => themeStore.firstThemeChanged);
</script>
