<template>
  <div class="theme-selector flex flex-col items-center">
    <div class="flex w-full flex-row items-center justify-center space-x-2">
      <button
        ref="buttonRef"
        tabindex="0"
        aria-haspopup="true"
        aria-label="Change theme"
        class="theme-btn border-accent focus:ring-accent transform rounded-full border p-2 text-lg transition-all duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring"
        @click="toggleMenu"
      >
        theme: {{ themeStore.currentTheme }}
      </button>
    </div>
    <transition name="theme-menu-fade">
      <div
        v-show="open"
        :style="modalPosition"
        class="theme-menu bg-base-200 z-10 m-1 flex w-full flex-wrap justify-center rounded-2xl border p-2 transition-opacity duration-200"
      >
        <button
          v-for="(theme, index) in themeStore.themes"
          :key="index"
          class="theme-item flex flex-grow cursor-pointer items-center justify-center rounded-lg p-2"
          :class="theme === themeStore.currentTheme ? 'ring-accent ring-2' : ''"
          role="menuitem"
          tabindex="0"
          @click="themeStore.changeTheme(theme)"
        >
          {{ theme }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useThemeStore } from '../../../stores/themeStore';

const themeStore = useThemeStore();
const buttonRef = ref(null);
const open = ref(false);

const modalPosition = computed(() => {
  if (!buttonRef.value) return {};

  const rect = buttonRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  const topSpace = rect.top;
  const bottomSpace = windowHeight - rect.bottom;
  const leftSpace = rect.left;
  const rightSpace = windowWidth - rect.right;

  return {
    top: bottomSpace > topSpace ? 'auto' : '0',
    bottom: bottomSpace > topSpace ? '0' : 'auto',
    left: rightSpace > leftSpace ? 'auto' : '0',
    right: rightSpace > leftSpace ? '0' : 'auto',
  };
});

const toggleMenu = () => {
  open.value = !open.value;
};

const closeMenu = (e) => {
  if (buttonRef.value && !buttonRef.value.contains(e.target)) {
    open.value = false;
  }
};

onMounted(() => {
  themeStore.initTheme();
  window.addEventListener('click', closeMenu);
});

onUnmounted(() => {
  window.removeEventListener('click', closeMenu);
});
</script>
