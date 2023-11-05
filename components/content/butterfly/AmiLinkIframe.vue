<template>
  <div class="flex items-center">
    <SiteLogo />
    <button v-if="!isLoading" class="btn btn-primary ml-4" @click="showIframe">AMI's Fundraiser!</button>
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center">
      <div class="border-primary-500 h-32 w-32 animate-spin rounded-full border-b-2 border-t-2"></div>
    </div>
    <iframe v-if="iframeVisible" :src="iframeSrc" class="iframe-class" />
  </div>
</template>

<script setup>
const isLoading = ref(false);
const iframeVisible = ref(false);
const iframeSrc = ref('');

const showIframe = () => {
  isLoading.value = true;
  setTimeout(() => {
    iframeSrc.value = 'https://www.againstmalaria.com/amibot';
    iframeVisible.value = true;
    isLoading.value = false;
  }, 2000);
};
</script>

<style>
.iframe-class {
  width: 100%;
  height: 600px;
  border: none;
}
</style>
