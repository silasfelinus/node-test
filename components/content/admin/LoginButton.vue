<template>
  <div class="flex items-center">
    <!-- Button column -->
    <div class="ml-4">
      <div v-if="isLoggedIn">
        <div class="hidden lg:inline">Salutations,</div>
        {{ username }}!
        <button class="b rounded-lg p-2 text-sm text-white" @click="logout">logout</button>
      </div>
      <div v-else>
        <button class="bg-primary rounded-lg p-2 text-lg text-white" @click="showLogin = true">Login</button>
      </div>
    </div>
  </div>
  <login-form v-if="showLogin" @close="showLogin = false" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const user = computed(() => userStore.user);
const isLoggedIn = computed(() => userStore.isLoggedIn);
const isLoading = ref(false);
const errorMessage = ref('');

const showLogin = ref(false);

const username = computed(() => user.value?.username || 'Kind Guest');

watch(isLoggedIn, (newValue) => {
  if (newValue) {
    showLogin.value = false;
  }
});

const logout = async () => {
  try {
    isLoading.value = true;
    await userStore.logout();
  } catch (error: any) {
    errorMessage.value = 'Failed to logout. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>
