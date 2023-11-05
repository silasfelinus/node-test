<template>
  <div class="flex h-screen items-center justify-center">
    <div
      class="aspect-w-1 aspect-h-1 relative overflow-hidden rounded-full bg-white shadow"
      :style="eyeballStyle"
      @mousemove="handleMouseMove"
      @click="blink"
    >
      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full transition-transform duration-500"
        :style="irisStyle"
      >
        <div
          class="absolute left-1/2 top-1/2 h-2/5 w-2/5 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black"
        ></div>
      </div>

      <!-- Upper eyelid -->
      <div class="absolute w-full bg-white" :style="upperEyelidStyle"></div>
      <!-- Lower eyelid -->
      <div class="absolute bottom-0 w-full bg-white" :style="lowerEyelidStyle"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

// Initialization
const eyeballSize = Math.floor(Math.random() * 100) + 50;
const irisSize = eyeballSize * 0.6;
const irisColor = ref(generateRandomColor());
const eyeElement = ref(null);
const mouseX = ref(0);
const mouseY = ref(0);
const upperEyelidY = ref(0);
const lowerEyelidY = ref(0);
let currentBehavior = ''; // trackMouse or moveRandomly

const eyeballStyle = ref({
  width: `${eyeballSize}px`,
  height: `${eyeballSize}px`,
});

const irisStyle = computed(() => ({
  width: `${irisSize}px`,
  height: `${irisSize}px`,
  backgroundColor: irisColor.value,
  transform: irisPosition.value,
  transition: 'transform 0.5s',
}));

const upperEyelidStyle = computed(() => ({
  height: `${upperEyelidY.value}px`,
  transition: 'height 0.15s',
}));

const lowerEyelidStyle = computed(() => ({
  height: `${lowerEyelidY.value}px`,
  transition: 'height 0.15s',
}));

// Utility Functions
function generateRandomColor() {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256,
  )})`;
}
function setNextBlink() {
  const randomDuration = Math.random() * 5000 + 2000; // Between 2 to 7 seconds
  setTimeout(() => {
    currentBehavior = ''; // Reset behavior on blink
    blink();
  }, randomDuration);
}
// Additional reactive property
const irisTranslation = ref(`translate(0px, 0px)`);
// Change irisTranslation to store x and y values
const randomIrisPosition = ref({ x: 0, y: 0 });

function moveRandomlyAfterBlink() {
  if (currentBehavior !== 'moveRandomly') {
    return;
  }

  const randomX = (Math.random() - 0.5) * (eyeballSize / 4);
  const randomY = (Math.random() - 0.5) * (eyeballSize / 4);
  randomIrisPosition.value = { x: randomX, y: randomY };

  const randomDuration = Math.random() * 2000 + 500;
  setTimeout(moveRandomlyAfterBlink, randomDuration);
}

const irisPosition = computed(() => {
  if (!eyeElement.value) {
    return `translate(0px, 0px)`;
  }

  if (currentBehavior === 'moveRandomly') {
    return `translate(${randomIrisPosition.value.x}px, ${randomIrisPosition.value.y}px)`;
  }

  const rect = eyeElement.value.getBoundingClientRect();
  const eyeCenterX = rect.left + rect.width / 2;
  const eyeCenterY = rect.top + rect.height / 2;

  const dx = mouseX.value - eyeCenterX;
  const dy = mouseY.value - eyeCenterY;
  const dist = Math.min(eyeballSize / 4, Math.hypot(dx, dy) / 15);

  const angle = Math.atan2(dy, dx);
  const x = Math.cos(angle) * dist;
  const y = Math.sin(angle) * dist;

  return `translate(${x}px, ${y}px)`;
});

function getRandomIrisPosition() {
  const randomX = (Math.random() - 0.5) * (eyeballSize / 4);
  const randomY = (Math.random() - 0.5) * (eyeballSize / 4);
  return `translate(${randomX}px, ${randomY}px)`;
}

function blink() {
  upperEyelidY.value = eyeballSize / 2;
  lowerEyelidY.value = eyeballSize / 2;
  setTimeout(() => {
    openEye();

    // Decide behavior after blink
    if (Math.random() < 0.5) {
      currentBehavior = 'moveRandomly';
      moveRandomlyAfterBlink();
    } else {
      currentBehavior = 'trackMouse';
    }

    // Schedule next blink
    setNextBlink();
  }, 150);
}

function openEye() {
  upperEyelidY.value = 0;
  lowerEyelidY.value = 0;
}

const handleMouseMove = (e) => {
  if (currentBehavior === 'moveRandomly') {
    return; // Don't move with the mouse if the current behavior is set to move randomly
  }

  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
};

// Lifecycle Hooks
onMounted(() => {
  eyeElement.value = document.querySelector('.bg-white.rounded-full');

  if (typeof window !== 'undefined') {
    mouseX.value = window.innerWidth / 2;
    mouseY.value = window.innerHeight / 2;

    window.addEventListener('mousemove', handleMouseMove);

    // Schedule initial blink
    setNextBlink();
  }
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', handleMouseMove);
  }
});
</script>
