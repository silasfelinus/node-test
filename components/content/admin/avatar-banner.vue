<template>
  <div class="z-50 flex h-36 w-36 items-center">
    <!-- Welcome Message -->
    <div class="flex cursor-pointer flex-col items-start" @click="toggleVisibility">
      <img v-if="store.avatarImage" :src="store.avatarImage" class="mb-2 h-8 w-8 rounded-full" alt="Avatar" />
      <span class="text-base-200 mb-1 text-lg">{{ welcomeMessage }}</span>
      <NuxtLink v-if="isLoggedIn" to="/dashboard" class="text-accent text-sm underline"> Dashboard </NuxtLink>
      <NuxtLink v-if="isLoggedIn && store.role === 'admin'" to="/admin" class="text-accent mt-1 text-sm underline">
        Admin
      </NuxtLink>
    </div>

    <!-- Icon to Toggle Login -->
    <div class="ml-4">
      <icon name="tabler:user" class="text-base-200 cursor-pointer text-2xl" @click="toggleVisibility" />
    </div>

    <!-- Login Dropdown -->
    <div
      v-if="isVisible"
      class="bg-base-200 absolute left-0 top-36 flex flex-col items-center rounded-2xl p-4 shadow-lg transition-all duration-300"
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
      <form v-else class="z-50 space-y-4" :autocomplete="stayLoggedIn ? 'on' : 'off'" @submit.prevent="handleLogin">
        <div>
          <label for="login" class="mb-1 block text-sm">Login:</label>
          <input
            id="login"
            v-model="login"
            type="text"
            autocomplete="username"
            class="w-full rounded border p-2"
            required
          />
        </div>
        <div>
          <label for="password" class="mb-1 block text-sm">Password:</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            class="w-full rounded border p-2"
            required
          />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <input id="stayLoggedIn" v-model="stayLoggedIn" type="checkbox" class="mr-2" />
            <label for="stayLoggedIn" class="text-sm">Stay Logged in</label>
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
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { errorHandler } from '@/server/api/utils/error';

const store = useUserStore();
const login = ref('');
const password = ref('');
const isVisible = ref(false);
const errorMessage = ref('');
const isLoggedIn = computed(() => store.isLoggedIn);
const stayLoggedIn = ref(true);

const welcomeMessage = computed(() => {
  return isLoggedIn.value ? `Hello, ${store.username} 🎉` : 'Welcome, Kind Guest';
});

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};

const handleLogin = async () => {
  errorMessage.value = '';
  try {
    const result = await store.login({ username: login.value, password: password.value });
    if (result.success) {
      if (stayLoggedIn.value) {
        localStorage.setItem('user', JSON.stringify({ username: login.value }));
      }
    } else {
      errorMessage.value = result.message;
    }
  } catch (error: any) {
    errorMessage.value = errorHandler(error).message;
  }
};

const handleLogout = () => {
  store.logout();
  if (!stayLoggedIn.value) {
    localStorage.removeItem('user');
  }
};

onMounted(() => {
  // Retrieve user data from localStorage and update the store
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
  if (storedUser && storedUser.username !== 'Kind Guest') {
    store.setUser(storedUser);
  }
});
</script>
