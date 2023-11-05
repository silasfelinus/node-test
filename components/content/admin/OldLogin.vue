<template>
  <div class="relative flex h-36 w-36 items-center">
    <!-- Login Icon and Label -->
    <div class="flex cursor-pointer items-center" @click="toggleVisibility">
      <icon name="tabler:login" class="text-base-200 text-2xl" title="Toggle Login" />
      <span class="text-base-200 ml-2">Login</span>
    </div>

    <!-- Login Dropdown -->
    <div
      v-if="isVisible"
      class="bg-base-200 absolute left-1/2 top-4 -translate-x-1/2 transform rounded-2xl p-4 shadow-lg transition-all duration-300"
    >
      <!-- Loading State -->
      <div v-if="store.loading" class="text-info text-center">
        <icon name="tabler:loader" class="mb-2 animate-spin text-lg" />
        <div>Loading, please wait...</div>
      </div>

      <!-- Success Screen -->
      <div v-else-if="isLoggedIn" class="text-center">
        <div class="mb-4">
          <span class="text-lg font-semibold">Hello, {{ store.username }} 🎉</span>
        </div>
        <button class="bg-warning text-default rounded px-3 py-1" @click="handleLogout">Logout</button>
      </div>

      <!-- Login Form -->
      <form v-else class="space-y-4" :autocomplete="savePassword ? 'on' : 'off'" @submit.prevent="handleLogin">
        <div class="group relative mb-2">
          <label for="login" class="mb-1 block text-sm">Login:</label>
          <input
            id="login"
            v-model="login"
            type="text"
            autocomplete="username"
            class="w-full rounded border p-2"
            required
          />
          <div class="group-hover:float-tooltip absolute bottom-2 right-2 text-xs text-gray-500">Login</div>
        </div>
        <div class="group relative mb-2">
          <label for="password" class="mb-1 block text-sm">Password:</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            class="w-full rounded border p-2"
            required
          />
          <div class="group-hover:float-tooltip absolute bottom-2 right-2 text-xs text-gray-500">Password</div>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <input id="savePassword" v-model="savePassword" type="checkbox" class="mr-2" />
            <label for="savePassword" class="text-sm">Save Password</label>
          </div>
          <button type="submit" class="bg-info text-default rounded px-3 py-1">Login</button>
        </div>
        <div class="mt-2 text-center">
          <NuxtLink to="/register" class="text-accent underline">Register</NuxtLink>
        </div>
      </form>

      <!-- Error Message -->
      <div v-if="errorMessage" class="text-warning mt-2">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { errorHandler } from '@/server/api/utils/error';

const store = useUserStore();
const login = ref('');
const password = ref('');
const savePassword = ref(true);
const isVisible = ref(true);
const errorMessage = ref('');
const isLoggedIn = ref(store.username !== null && store.username !== 'Kind Guest'); // Set based on the store data

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};

const handleLogin = async () => {
  errorMessage.value = '';
  try {
    const result = await store.login({ username: login.value, password: password.value });
    if (result.success) {
      isLoggedIn.value = true;
    } else {
      errorMessage.value = result.message;
    }
  } catch (error: any) {
    errorMessage.value = errorHandler(error).message;
  }
};

const handleLogout = () => {
  store.logout();
  isLoggedIn.value = false;
};
onMounted(() => {
  // Retrieve user data from localStorage and update the store
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
  if (storedUser && storedUser.username !== 'Kind Guest') {
    store.setUser(storedUser);
    isLoggedIn.value = true;
  }

  if (process.client) {
    window.addEventListener('login-success', (event: any) => {
      localStorage.setItem('user', JSON.stringify(event.detail.user));
      isLoggedIn.value = true;
    });
  }
});
</script>

<style scoped>
.float-tooltip {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}
.group:hover .float-tooltip {
  visibility: visible;
  opacity: 1;
}

/* Styling for the login label */
.text-base-200 {
  font-size: 1.25rem;
}
</style>
