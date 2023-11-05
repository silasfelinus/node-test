<template>
  <div class="flex items-center justify-center">
    <img class="h-32 w-32 justify-center object-contain" src="/images/amilogo.webp" alt="Site Logo" />
    <button v-if="!isLoading" class="btn btn-primary ml-4" @click="openExternalLink">AMI's Fundraiser!</button>
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center">
      <div class="border-primary-500 h-32 w-32 animate-spin rounded-full border-b-2 border-t-2"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isLoading = ref(false);

const openExternalLink = () => {
  isLoading.value = true;
  setTimeout(() => {
    window.open('https://www.againstmalaria.com/amibot', '_blank');
    isLoading.value = false;
  }, 2000);
};
</script>
