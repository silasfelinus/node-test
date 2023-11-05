<template>
  <div class="min-h-screen bg-gray-200 p-5">
    <div v-if="error" class="my-10 text-center text-red-500">An error occurred: {{ error }}</div>
    <div class="my-5 text-center">
      <button
        class="refresh-btn rounded px-8 py-2 transition-colors duration-300 hover:bg-red-500"
        @click="refreshImages"
      >
        Refresh Images
      </button>
    </div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="gallery in galleries" :key="gallery.id" class="gallery-card rounded bg-white p-4 shadow-lg">
        <div class="flip-container">
          <div class="flip-content" :style="{ transform: computeTransform(gallery) }">
            <!-- Front -->
            <div class="flipper-front">
              <img
                :src="gallery.currentImage"
                alt="Image from {{ gallery.name }}"
                class="gallery-img w-full"
                @click="refreshSingleGallery(gallery)"
              />
            </div>
            <!-- Back -->
            <div class="flipper-back">
              <img
                :src="gallery.nextImage"
                alt="Next image from {{ gallery.name }}"
                class="gallery-img w-full"
                @click="refreshSingleGallery(gallery)"
              />
            </div>
          </div>
        </div>
        <!-- Gallery Name and Description -->
        <h2 class="mt-3 text-xl font-semibold">{{ gallery.name }}</h2>
        <p class="mt-1 text-sm text-gray-600">{{ gallery.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const galleries = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('/api/galleries');
    if (response.data.success) {
      galleries.value = response.data.Galleries;
      galleries.value.forEach((gallery) => {
        gallery.currentImage = getRandomImage(gallery);
        gallery.isFlipped = false; // Initialize the flip state
      });
    } else {
      error.value = 'Failed to fetch data.';
    }
  } catch (err) {
    error.value = err.message;
  }
});

const getRandomImage = (gallery) => {
  if (!gallery.imagePaths) return '';
  const images = gallery.imagePaths.split(',').map((filename) => `/images/${gallery.name}/${filename.trim()}`);
  return images[Math.floor(Math.random() * images.length)];
};
const refreshImages = () => {
  galleries.value.forEach((gallery) => {
    gallery.nextImage = getRandomImage(gallery);

    // Trigger the flip
    gallery.isFlipped = !gallery.isFlipped;

    // Determine the appropriate timeout based on the flip direction
    const timeoutDuration = gallery.isFlipped ? 300 : 150; // Adjusted timeout for right-left flip

    // Halfway through the flip, change the image
    setTimeout(() => {
      gallery.currentImage = gallery.nextImage;
    }, timeoutDuration);
  });
};
const computeTransform = (gallery) => {
  return gallery.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
};

const refreshSingleGallery = (gallery) => {
  gallery.currentImage = getRandomImage(gallery);
};
</script>

<style>
/* Flip Animation */
.flip-container {
  perspective: 1000px;
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
}

.flip-content {
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: absolute;
  width: 100%;
  height: 100%;
}

.flipper-front,
.flipper-back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.flipper-front {
  transform: rotateY(0deg);
}

.flipper-back {
  transform: rotateY(180deg);
}

.refresh-btn {
  background-color: #f09819;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>
