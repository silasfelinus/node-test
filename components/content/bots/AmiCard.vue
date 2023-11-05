<template>
  <div
    class="card relative max-w-sm cursor-pointer overflow-hidden rounded shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl"
  >
    <img
      class="avatar absolute right-0 top-0 mr-4 mt-4 h-16 w-16 rounded-full border-2 border-white"
      :src="avatar"
      alt="Avatar"
    />
    <img class="w-full" :src="image" alt="AMIbot" />
    <div class="content px-6 py-4">
      <div class="title mb-2 text-2xl font-bold">{{ title }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    default: '/images/amibot/amibot1.webp',
  },
  title: {
    type: String,
    default: 'AmiCard',
  },
  avatar: {
    type: String,
    default: '/images/acrocats/PXL_20220903_023602144.jpg',
  },
});
</script>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 20px;
}

.avatar {
  border: 2px solid #ffffff;
}

.content {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 5px;
}
</style>
