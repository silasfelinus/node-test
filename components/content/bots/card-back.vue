<template>
  <div
    class="bg-base-200 border-accent m-4 flex flex-col items-center justify-center rounded-md border-2 p-4 shadow-md"
  >
    <!-- Avatar Image -->
    <avatar-image class="mb-4 h-1/3 w-1/3 rounded-full object-cover" />
    <!-- Bot Information -->
    <div class="text-center">
      <h2 class="mb-2 text-xl font-bold">{{ currentBot ? currentBot.name : 'Loading...' }}</h2>
      <p class="mb-2 text-sm">{{ currentBot ? currentBot.userIntro : 'Loading...' }}</p>
    </div>
    <bot-collectible />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBotStore } from '../../../stores/botStore';

const botsStore = useBotStore();
const currentBot = computed(() => botsStore.currentBot);
</script>

<style scoped>
.card-container {
  position: relative;
  border: 2px solid var(--bg-accent);
  padding: 20px;
  margin: 20px;
}

.theme-triangle {
  position: absolute;
  right: 0;
  top: 0;
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid var(--bg-base);
}

.avatar img {
  width: 100%;
  height: auto;
}

.description-container {
  background: #fff;
  border-radius: 25px;
  padding: 20px;
  margin-top: 20px;
}
</style>
