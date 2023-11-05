<template>
  <div class="mx-auto flex w-full max-w-md flex-col items-center rounded-2xl p-4 shadow-lg transition-all duration-300">
    <!-- Loading State -->
    <div v-if="store.loading" class="text-info text-center">
      <icon name="tabler:loader" class="mb-2 animate-spin text-lg" />
      <div>Loading, please wait...</div>
    </div>
    <!-- Login Form -->
    <form
      v-if="!store.isLoggedIn"
      class="w-full space-y-4"
      :autocomplete="store.stayLoggedIn ? 'on' : 'off'"
      @submit.prevent="handleLogin"
    >
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
        <label for="password" class="mb-1 block text-sm">Password (optional):</label>
        <input
          id="password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          class="w-full rounded border p-2"
        />
        <div class="group-hover:float-tooltip absolute bottom-2 right-2 text-xs text-gray-500">Password (optional)</div>
      </div>

      <div class="flex items-center justify-between">
        <div>
          <input id="stayLoggedIn" v-model="store.stayLoggedIn" type="checkbox" class="mr-2" />
          <label for="stayLoggedIn" class="text-sm">Stay Logged in</label>
        </div>
        <button type="submit" class="bg-info text-default rounded px-3 py-1">Login</button>
      </div>
      <div class="mt-2 text-center">
        <NuxtLink to="/register" class="text-accent underline">Register</NuxtLink>
      </div>
    </form>

    <!-- Error Message -->
    <div v-if="errorMessage" class="text-warning mt-2 w-full text-center">
      {{ errorMessage }}
      <div v-if="userNotFound">
        <div class="mt-2">
          <button class="text-accent underline">
            <NuxtLink to="/register" class="text-accent underline">Register</NuxtLink>
          </button>
          or
          <button class="text-accent underline" @click="handleRetryLogin">Try a different login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { errorHandler } from '@/server/api/utils/error';

const store = useUserStore();
const login = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoggedIn = computed(() => store.isLoggedIn);

const userNotFound = ref(false);

const handleLogin = async () => {
  errorMessage.value = '';
  userNotFound.value = false;
  try {
    const credentials: { username: string; password?: string } = { username: login.value };
    if (password.value) {
      credentials.password = password.value;
    }
    const result = await store.login(credentials);
    if (result.success && store.stayLoggedIn) {
      store.setStayLoggedIn(true);
    } else {
      errorMessage.value = result.message;
      if (result.message.includes('User not found')) {
        userNotFound.value = true;
      }
    }
  } catch (error: any) {
    errorMessage.value = errorHandler(error).message;
  }
};

const handleRetryLogin = () => {
  // Clear the login field to allow the user to try a different login
  login.value = '';
  password.value = '';
  errorMessage.value = '';
  userNotFound.value = false;
};
</script>

<style scoped>
.group:hover .float-tooltip {
  visibility: visible;
  opacity: 1;
}

/* Adding some stylish upgrades */
.bg-base-200 {
  transition: background-color 0.3s ease;
}

.bg-base-200:hover {
  background-color: var(--bg-base-300);
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
