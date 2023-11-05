<template>
  <div class="bg-base-200 flex flex-col items-center rounded-2xl p-4">
    <h1 class="text-primary mb-4 text-3xl font-bold">Kind Robots</h1>
    <div v-if="isLoggedIn" class="text-info mb-4 text-lg">
      You are already logged in. Would you like to
      <a href="/dashboard" class="text-accent">go to the dashboard</a> or
      <a href="#" class="text-warning" @click="userStore.logout">log out</a>?
    </div>
    <form class="w-full max-w-sm space-y-4" @submit.prevent="register">
      <div v-if="step === 1">
        <h1 class="text-primary mb-4 text-4xl font-bold">Pick a Cool Username</h1>
        <div class="relative mb-4">
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            required
            class="bg-base-200 placeholder-base-300 w-full rounded border p-2 text-4xl"
            aria-label="Username"
            autocomplete="username"
            @input="checkUsernameAvailability"
          />
          <p v-if="usernameWarning" class="text-warning absolute bottom-1 right-2 text-xs">Username already exists</p>
        </div>
        <button
          v-if="username && !usernameWarning"
          type="button"
          class="bg-primary text-base-100 hover:bg-primary-dark w-full rounded p-2 text-lg transition duration-300"
          @click="goToStep(2)"
        >
          That's my name!
        </button>
      </div>
      <div v-if="step === 2">
        <h2 class="text-primary mb-2 text-2xl font-semibold">Welcome, {{ username }}!</h2>
        <button type="button" class="text-md mb-4" @click="goToStep(1)">I want a different username</button>
        <p class="mb-2 text-lg">Optional details:</p>
        <div class="group relative mb-4">
          <input
            v-model="email"
            type="email"
            placeholder="Email (optional)"
            class="bg-base-200 placeholder-base-300 w-full rounded border p-2 text-lg"
            aria-label="Email"
            autocomplete="email"
          />
        </div>
        <div class="group relative mb-4">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password (keep it blank if you prefer)"
            class="bg-base-200 placeholder-base-300 w-full rounded border p-2 text-lg"
            aria-label="Password"
            autocomplete="new-password"
            @input="validatePassword"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <icon
              name="tabler:eye"
              :class="
                showPassword
                  ? 'text-base-300 hover:text-warning cursor-pointer'
                  : 'text-base-300 hover:text-success cursor-pointer'
              "
              title="Show/Hide Password"
              @click="togglePasswordVisibility"
            />
          </div>
          <p v-if="passwordError" class="text-warning absolute bottom-1 right-2 text-xs">
            {{ passwordError }}
          </p>
        </div>
        <div v-if="firstPasswordValid" class="group relative mb-4">
          <input
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Confirm Password"
            class="bg-base-200 placeholder-base-300 w-full rounded border p-2 text-lg"
            aria-label="Confirm Password"
            autocomplete="new-password"
            @input="validateConfirmPassword"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <icon
              :name="showConfirmPassword ? 'tabler:eye-off' : 'tabler:eye'"
              :class="
                showConfirmPassword
                  ? 'text-base-300 hover:text-warning cursor-pointer'
                  : 'text-base-300 hover:text-success cursor-pointer'
              "
              :title="showConfirmPassword ? 'Hide Password' : 'Show Password'"
              @click="toggleConfirmPasswordVisibility"
            />
          </div>
        </div>
        <div v-if="status" class="text-info bg-info-light my-2 rounded px-4 py-2 text-lg">
          <icon name="tabler:info-circle" class="mr-2" />
          {{ status }}
        </div>
        <div v-if="error" class="text-warning bg-warning-light my-2 rounded px-4 py-2 text-lg">
          <icon name="tabler:alert-triangle" class="mr-2" />
          {{ error }}
        </div>
        <button
          type="submit"
          :disabled="!isFormValid || isLoading"
          class="bg-primary text-base-100 hover:bg-primary-dark w-full rounded p-2 text-lg transition duration-300"
        >
          <span v-if="isLoading">Registering...</span>
          <span v-else>Register</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useUserStore } from '../../../stores/userStore';
import { errorHandler } from '../../../server/api/utils/error';

const userStore = useUserStore();
userStore.initializeUser();

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const usernameWarning = ref(false);
const status = ref('');
const error = ref('');
const isLoading = ref(false);
const statusMessage = ref('');

const showPassword = ref(false);
const passwordError = ref('');
const step = ref(1);
const showConfirmPassword = ref(false);
const isPasswordValid = computed(() => {
  return password.value && !passwordError.value;
});
const firstPasswordValid = ref(false);

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = '';
    firstPasswordValid.value = false;
    return;
  }

  const minLength = /^.{8,}$/;
  const hasNumber = /\d/;
  const hasLetter = /[a-zA-Z]/;

  if (!minLength.test(password.value)) {
    passwordError.value = 'At least 8 characters';
    firstPasswordValid.value = false;
  } else if (!hasNumber.test(password.value)) {
    passwordError.value = 'Include at least one number';
    firstPasswordValid.value = false;
  } else if (!hasLetter.test(password.value)) {
    passwordError.value = 'Include at least one letter';
    firstPasswordValid.value = false;
  } else {
    passwordError.value = '';
    firstPasswordValid.value = true;
  }
};

const validateConfirmPassword = () => {
  if (password.value && password.value !== confirmPassword.value) {
    passwordError.value = 'Passwords do not match';
  } else {
    passwordError.value = '';
  }
};

const welcomeMessage = ref('');

const checkUsernameAvailability = async () => {
  try {
    const usernames = await userStore.getUsernames();
    usernameWarning.value = usernames.includes(username.value);
    if (usernameWarning.value) {
      error.value = `Username "${username.value}" already exists.`;
    } else {
      error.value = '';
    }
  } catch (e: any) {
    const { message } = errorHandler(e);
    error.value = message;
  }
};

const goToStep = (nextStep: number) => {
  if (nextStep === 2) {
    welcomeMessage.value = `Welcome, ${username.value}!`;
  }
  step.value = nextStep;
};

const isFormValid = computed(() => {
  return (
    username.value &&
    !usernameWarning.value &&
    (step.value === 1 || ((!password.value || !passwordError.value) && password.value === confirmPassword.value))
  );
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const isLoggedIn = computed(() => userStore.isLoggedIn);

const clearExistingUserData = () => {
  localStorage.removeItem('api_key');
  localStorage.removeItem('token');
};

const register = async () => {
  if (!isFormValid.value) return;

  isLoading.value = true;
  statusMessage.value = 'Registering user...';
  try {
    clearExistingUserData();

    const userData = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    const response = await userStore.register(userData);
    if (response.success) {
      statusMessage.value = 'Welcome to Kind Robots!';
      status.value = 'Welcome to Kind Robots!';

      // Automatically log the user in
      try {
        const loginData: { username: string; password?: string } = { username: username.value };
        if (password.value) {
          loginData.password = password.value;
        }
        await userStore.login(loginData);
      } catch (loginError) {
        // Handle login error (if any)
        const { message } = errorHandler({ error: loginError });
        error.value = message;
      }
    } else {
      status.value = '';
      error.value = 'Registration failed. Please try again.';
    }
  } catch (e) {
    const { message } = errorHandler({ error: e });
    error.value = message;
  }
  isLoading.value = false;
};
</script>

<style scoped>
.bg-primary-dark {
  background-color: var(--color-primary-dark);
}
</style>
