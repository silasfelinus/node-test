<template>
  <transition name="fade-slide">
    <div v-if="show" class="message-card" :class="[bgClass, 'z-10 flex items-center space-x-2 rounded-lg border p-1']">
      <button class="absolute right-0 top-0 m-1 text-sm" @click="$emit('remove-card')">X</button>

      <img :src="imageSrc" :alt="altText" class="h-10 w-10 rounded-full" />
      <div>
        <div class="text-xs font-semibold">{{ username }}</div>
        <div class="text-md">{{ message }}</div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const { show, bgClass, imageSrc, altText, username, message } = defineProps<{
  show: boolean;
  bgClass: string;
  imageSrc: string;
  altText: string;
  username: string;
  message: string;
}>();
const emit = defineEmits(['remove-card']);
const removeCard = () => {
  emit('remove-card');
};
</script>
