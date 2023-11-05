<template>
  <!-- Chat Toggle Container -->
  <div class="flex items-center justify-center">
    <!-- Chat Toggle Button -->
    <button
      :class="[
        'm-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all ease-in-out hover:scale-110 hover:shadow-lg md:h-16 md:w-16',
        { 'bg-accent': isChatVisible },
      ]"
      @click="toggleChat"
    >
      <!-- Chat Icon -->
      <icon
        :name="isChatVisible ? 'mdi:chat' : 'mdi:chat-off'"
        :title="isChatVisible ? 'Hide Chat' : 'Show Chat'"
        class="h-full w-full"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFilterStore } from '@/stores/filterStore';

const filterStore = useFilterStore();

// Computed property to get the current state of the chat visibility
const isChatVisible = computed(() => filterStore.showChat);

// Function to toggle the chat visibility
const toggleChat = () => {
  filterStore.toggleChat();
};
</script>
