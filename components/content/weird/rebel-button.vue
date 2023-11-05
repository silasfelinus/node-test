<template>
  <div class="hero bg-base-200 m-2 flex h-full w-full flex-col items-center justify-center rounded-2xl border">
    <div
      class="flex h-full w-full flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0"
    >
      <!-- Left Section -->
      <div class="m-2 flex w-full flex-col items-center space-y-4 p-2 md:w-1/3">
        <div class="bg-base-200 rounded-lg p-4 shadow-lg">
          <click-leaderboard class="m-2 rounded-2xl p-2" />
        </div>
        <transition name="slide-fade-slow">
          <div v-if="state.topScore >= 100" class="bg-base-200 rounded-lg p-4 shadow-lg">
            <milestone-reward v-if="state.pressCount >= 100" :id="6"></milestone-reward>
          </div>
        </transition>
        <transition name="slide-fade">
          <div
            v-if="state.topScore >= 20 && state.pressCount >= 1"
            class="bg-accent m-2 rounded-lg border p-4 shadow-lg"
          >
            <h2 class="text-xl">Last Milestone</h2>
            <p class="text-lg">{{ state.lastMilestone }}</p>
          </div>
        </transition>
        <transition name="slide-fade-slow">
          <div
            v-if="state.topScore >= 21 && state.pressCount >= 1"
            class="bg-base-200 m-2 rounded-lg border p-4 shadow-lg"
          >
            <p class="text-lg">Previous message: {{ state.previousMessage }}</p>
          </div>
        </transition>
      </div>

      <!-- Center Section -->
      <div class="flex w-full flex-col items-center space-y-4 md:w-1/3">
        <div
          ref="buttonRef"
          :class="`button flex h-60 w-full items-center justify-center rounded-lg border p-2 text-2xl font-bold shadow-lg transition ${
            state.pressed ? 'bg-accent text-default' : 'bg-primary text-default'
          }`"
          @click="pressedButton"
        >
          {{ state.buttonText }}
        </div>
        <div v-if="state.pressed" class="text-center">
          <button class="mb-4 rounded-lg p-2 text-blue-500" @click="openResetPopup">Reset</button>
          <p class="text-lg">Button has been pressed {{ state.pressCount }} times.</p>
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex w-full flex-col items-center space-y-4 md:w-1/3">
        <transition name="slide-fade">
          <div
            v-if="state.showLeaderboard && state.topScore >= 10"
            class="bg-accent m-2 rounded-lg border p-4 shadow-lg"
          >
            <h2 class="mb-2 text-2xl">Leaderboard</h2>
            <p class="text-lg">Top Score: {{ state.topScore }}</p>
          </div>
        </transition>
        <transition name="slide-fade-slow">
          <div v-if="state.topScore >= 30" class="bg-base-200 m-2 rounded-lg border p-4 shadow-lg">
            <!-- Butterfly Toggle Component -->
            You've unlocked our mascot AMI - The Anti-Malaria Intelligence. AMI's job is to flutter around (for now),
            but eventually she'll help raise funds to fight malaria.
            <butterfly-toggle />
          </div>
        </transition>
        <transition name="slide-fade-slow">
          <div v-if="state.topScore >= 40" class="bg-base-200 m-2 rounded-lg border p-4 shadow-lg">
            <!-- Theme Select -->
            Feel free to change the theme!
            <theme-toggle />
          </div>
        </transition>
      </div>
    </div>
    <!-- Reset Popup -->
    <transition name="slide-fade">
      <div
        v-if="state.showResetPopup"
        class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
        @click.self="state.showResetPopup = false"
      >
        <div class="rounded-lg bg-white p-4">
          <p>Are you sure you want to reset the leaderboard?</p>
          <div class="mt-4 flex justify-end space-x-4">
            <button class="rounded-lg bg-red-500 px-4 py-2 text-white" @click="state.showResetPopup = false">
              Cancel
            </button>
            <button class="rounded-lg bg-green-500 px-4 py-2 text-white" @click="reset">Confirm</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import confetti from 'canvas-confetti';
import responses from '../../../assets/buttonResponses';
import milestones from '../../../assets/buttonMilestones';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const username = computed(userStore.username);
const state = reactive({
  pressed: false,
  pressCount: 0,
  topScore: 0,
  buttonText: 'Do Not Press this Button',
  showLeaderboard: true,
  showResetPopup: false,
  resetConfirmed: false,
  previousMessage: '',
  lastMilestone: '',
});
const shouldShowMilestoneCheck = ref(false);
const buttonRef = ref(null);

onMounted(() => {
  // Fetch the leaderboard if the user is logged in
  if (userStore.isLoggedIn) {
    // Fetch the user's click record from the store
    const userClickRecord = userStore.clickRecord;

    // Fetch the locally stored high score
    const localHighScore = parseInt(localStorage.getItem('topScore')) || 0;

    // Set both to the higher number
    const highestScore = Math.max(userClickRecord, localHighScore);
    state.topScore = highestScore;
    localStorage.setItem('Local TopScore', highestScore.toString());

    state.topScore = parseInt(localStorage.getItem('topScore')) || 0;
  }
});

watch(
  () => userStore.isLoggedIn,
  (newVal, oldVal) => {
    if (newVal !== oldVal && newVal === true) {
      // User has just logged in
      const userClickRecord = userStore.clickRecord;
      const localHighScore = parseInt(localStorage.getItem('topScore')) || 0;
      const highestScore = Math.max(userClickRecord, localHighScore);
    }
  },
);
const pressedButton = () => {
  state.pressed = true;
  state.pressCount++;

  const tempMessage = state.buttonText; // Store the current message temporarily

  // Update the top score immediately on every click
  if (state.pressCount > state.topScore) {
    state.topScore = state.pressCount;
  }

  // Save to localStorage every 10 clicks to optimize performance
  if (state.pressCount % 10 === 0) {
    localStorage.setItem('topScore', state.topScore);
    submitTopScore();
  }

  let isMilestone = false;

  milestones.forEach((milestone) => {
    if (state.pressCount === milestone.count) {
      state.buttonText = milestone.message;
      state.lastMilestone = milestone.message; // Store the last milestone message
      triggerConfetti();
      isMilestone = true;
    }
  });

  if (!isMilestone) {
    state.buttonText = responses[Math.floor(Math.random() * responses.length)];
  }

  state.previousMessage = tempMessage; // Set the previous message after updating the buttonText
};
const submitTopScore = async () => {
  const updateStatus = await userStore.updateClickRecord(state.topScore);
  if (updateStatus === 'Updated') {
    // Refresh the leaderboard
    await userStore.fetchHighClickScores();
  }
};
const triggerConfetti = () => {
  const { top, left, width, height } = buttonRef.value.getBoundingClientRect();
  confetti({
    particleCount: 100 + state.pressCount * 10,
    spread: 70,
    origin: { y: top / window.innerHeight, x: (left + width / 2) / window.innerWidth },
  });
};

const openResetPopup = () => {
  state.showResetPopup = true;
};

const reset = () => {
  state.pressed = false;
  state.buttonText = 'Do Not Press this Button';
  state.pressCount = 0;
  state.topScore = 0;
  localStorage.removeItem('topScore');
  state.showResetPopup = false;
};
</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 1s;
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
.slide-fade-slow-enter-active,
.slide-fade-slow-leave-active {
  transition: opacity 2s;
}
.slide-fade-slow-enter,
.slide-fade-slow-leave-to {
  opacity: 0;
}
</style>
