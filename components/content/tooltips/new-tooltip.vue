<script setup lang="ts">
const { page } = useContent();
</script>

<template>
  <streaming-tooltip
    v-if="page.tooltip && page.amitip"
    :tooltip="page.tooltip"
    :amitip="page.amitip"
    class="h-full w-full overflow-visible"
  />
</template>
