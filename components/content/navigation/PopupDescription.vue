<template>
  <div
    v-show="isHovered"
    class="bg-base-200 absolute left-1/2 top-0 z-50 mt-[-20px] flex -translate-x-1/2 -translate-y-full transform items-center space-x-2 rounded-2xl border p-2"
    :class="{ 'flex-row': !streaming, 'flex-col': streaming }"
    style="z-index: 1000"
  >
    <div v-if="image" class="h-24 w-24 overflow-hidden rounded-2xl border">
      <img :src="`/images/${image}`" alt="Image" class="h-full w-full object-cover" />
    </div>
    <div class="text-3xl">
      <icon :name="icon" />
    </div>
    <div class="rounded-2xl border p-2 text-sm">
      {{ description }}
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  image = '',
  icon = 'line-md:information',
  description = 'A New Page from Kind Robots',
  streaming = false,
  isHovered,
} = defineProps<{
  image?: string;
  icon?: string;
  description?: string;
  streaming?: boolean;
  isHovered: boolean;
}>();
</script>
