<template>
  <div class="z-50 flex h-36 w-36 items-center">
    <!-- Welcome Message -->
    <div class="flex cursor-pointer items-center" @click="toggleVisibility">
      <img v-if="store.avatarImage" :src="store.avatarImage" class="mr-2 h-8 w-8 rounded-full" alt="Avatar" />
      <icon name="tabler:home" class="text-2xl" />
      <span class="ml-2">{{ welcomeMessage }}</span>
      <NuxtLink v-if="isLoggedIn && store.role === 'admin'" to="/admin" class="ml-2 underline">Admin</NuxtLink>
      <NuxtLink v-if="isLoggedIn" to="/dashboard" class="ml-2 underline">Dashboard</NuxtLink>
    </div>

    <!-- Login Dropdown -->
    <div
      v-if="isVisible && !isLoggedIn"
      class="flex flex-col items-center rounded-2xl p-4 shadow-lg transition-all duration-300"
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

          <button class="bg-warning text-default rounded px-3 py-1" @click="handleLogout">Logout</button>
        </div>
      </div>

      <!-- Login Form -->
      <form v-else class="z-50 space-y-4" :autocomplete="stayLoggedIn ? 'on' : 'off'" @submit.prevent="handleLogin">
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

<style scoped>
.group:hover .float-tooltip {
  visibility: visible;
  opacity: 1;
}

.text-base-200 {
  font-size: 1.25rem;
}

/* Adding some stylish upgrades */
.bg-base-200 {
  transition: background-color 0.3s ease;
}

.bg-base-200:hover {
  background-color: var(--bg-base-400);
}

.text-accent {
  transition: color 0.3s ease;
}

.text-accent:hover {
  color: var(--text-accent-hover);
}

/* Styling for the buttons */
button {
  transition: background-color 0.3s ease, color 0.3s ease;
}

button:hover {
  background-color: var(--bg-button-hover);
  color: var(--text-button-hover);
}
</style>
