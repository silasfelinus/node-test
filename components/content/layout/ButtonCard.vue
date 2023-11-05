<template>
  <div
    class="flex cursor-pointer flex-col items-center justify-center rounded-lg p-4"
    :class="cardColor"
    @click="handleClick"
  >
    <div v-if="label" class="mb-2 text-lg font-semibold">{{ label }}</div>
    <div class="flex items-center justify-center">
      <img v-if="image" :src="image" class="mr-2 h-16 w-16" />
      <div>{{ description }}</div>
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  colorId: {
    type: Number,
    default: 1,
  },
  label: {
    type: String,
    default: '',
  },
});

const cardColor = computed(() => {
  const baseColors = ['bg-accent', 'bg-secondary', 'bg-accent', 'bg-warning'];
  return baseColors[props.colorId - 1] || baseColors[0];
});

const handleClick = () => {
  emit('click');
};
</script>
