<template>
  <div class="rounded bg-white p-4 shadow">
    <h2 class="mb-4 text-lg font-bold">Gallery Management</h2>

    <div class="mb-4">
      <input v-model="newGallery.name" type="text" placeholder="Gallery name" class="input input-bordered" />
    </div>

    <button class="btn btn-primary" @click="addGallery">Add Gallery</button>

    <div class="mt-6 grid gap-4">
      <div v-for="gallery in galleries" :key="gallery.id" class="card bordered">
        <div class="card-body">
          <h2 class="card-title">{{ gallery.name }}</h2>

          <div class="card-actions">
            <button class="btn btn-ghost btn-xs rounded-btn" @click="deleteGallery(gallery.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGalleryStore } from '../../../stores/galleryStore';
import { useErrorStore } from '../../../stores/errorStore';
import { useStatusStore } from '../../../stores/statusStore';

const errorStore = useErrorStore();
const statusStore = useStatusStore();
const galleryStore = useGalleryStore();
const newGallery = ref({ name: '' });

const galleries = galleryStore.$state.galleries;

const addGallery = async () => {
  try {
    await galleryStore.addGallery(newGallery.value);
    newGallery.value.name = '';
    statusStore.addStatus({ message: 'Gallery added successfully', type: 'success' });
  } catch (error) {
    errorStore.addError(error);
  }
};

const deleteGallery = async (id) => {
  try {
    await galleryStore.deleteGallery(id);
    statusStore.addStatus({ message: 'Gallery deleted successfully', type: 'success' });
  } catch (error) {
    errorStore.addError(error);
  }
};
</script>

<style scoped>
.rounded-btn {
  border-radius: 9999px;
}
</style>
