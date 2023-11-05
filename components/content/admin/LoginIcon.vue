<template>
  <div class="flex h-36 w-36 items-center">
    <WelcomeMessage />
    <icon name="tabler:user" class="text-base-200 ml-2 cursor-pointer text-2xl" @click="toggleVisibility" />
    <LoginWindow v-if="isVisible" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref(false);

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};
</script>
