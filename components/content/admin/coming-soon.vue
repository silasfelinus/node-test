<template>
  <div class="bg-base-200 grid grid-cols-1 gap-6 rounded-2xl p-4 shadow-lg md:grid-cols-2">
    <div
      v-for="(feature, index) in comingSoon"
      :key="index"
      class="bg-secondary flex transform items-center justify-center rounded-2xl p-4 shadow-md transition-transform hover:scale-105"
    >
      <div class="text-center">
        <span class="bg-primary block rounded-lg p-2 text-lg font-semibold text-white">
          {{ feature }}
        </span>
        <span class="mt-2 block text-base text-gray-700">Coming Soon</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const comingSoon = [
  'Chat with AMI',
  'Make Art',
  'Edit User Data',
  'Critique Art',
  'Shopping Cart',
  'Achievements',
  'User Feed',
  'New Post',
  'Art Gallery',
  'Prompt Gallery',
  'Chatrooms',
  'Project Manager',
];
</script>
