<template>
  <div class="art-prompts bg-base-200 m-4 flex flex-col rounded-2xl border p-4 text-lg">
    <h1>Art Prompts</h1>

    <!-- Fetch Button -->
    <button @click="fetchArtPrompts">Fetch Art Prompts</button>

    <!-- Add New Prompt (Visible to Admins) -->
    <div v-if="userRole === 'admin'" class="input-section">
      <input v-model="newPrompt" placeholder="New Prompt" class="input-styling" />
      <button :disabled="!isValidPrompt" class="add-button" @click="addNewPrompt">Add Prompt</button>
    </div>

    <!-- List of Prompts -->
    <ul>
      <li v-for="prompt in artPrompts" :key="prompt.id">
        {{ prompt.prompt }}
        <button @click="selectPrompt(prompt)">Select</button>

        <!-- Edit and Delete (Visible to Admins) -->
        <span v-if="userRole === 'ADMIN' && userStore.isLoggedIn">
          <button class="bg-base-200 m-2 flex rounded-2xl border p-2" @click="startEditingPrompt(prompt)">Edit</button>
          <button class="bg-base-200 m-2 flex rounded-2xl border p-2" @click="deletePrompt(prompt.id)">Delete</button>
        </span>
      </li>
    </ul>

    <!-- Display Selected Prompt -->
    <div v-if="activePrompt">
      <h2>Selected Prompt: {{ activePrompt.prompt }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePromptStore, type ArtPrompt } from '@/stores/promptStore';
import { useUserStore } from '@/stores/userStore';

const promptStore = usePromptStore();
const { fetchArtPrompts, selectPrompt, artPrompts, activePrompt, createArtPrompt, deleteArtPrompt } = promptStore;

const userStore = useUserStore();

// User role (this should come from your user management logic)
const userRole = userStore.role;
// New prompt input
const newPrompt = ref('');

const editingPrompt = ref<ArtPrompt | null>(null);

// Start editing a prompt
const startEditingPrompt = (prompt: ArtPrompt) => {
  editingPrompt.value = prompt;
  newPrompt.value = prompt.prompt;
};

// Edit a prompt
const editPrompt = () => {
  if (editingPrompt.value && isValidPrompt.value) {
    promptStore.editArtPrompt(editingPrompt.value.id, newPrompt.value.trim());
    newPrompt.value = '';
    editingPrompt.value = null;
  }
};
// Fetch art prompts when the component is mounted
onMounted(() => {
  fetchArtPrompts();
});

// Validation for new prompt
const isValidPrompt = computed(() => {
  return newPrompt.value.trim().length > 0;
});

// Add a new prompt
const addNewPrompt = () => {
  if (isValidPrompt.value) {
    createArtPrompt(newPrompt.value.trim());
    newPrompt.value = '';
  }
};

// Delete a prompt
const deletePrompt = (id: number) => {
  deleteArtPrompt(id);
};
</script>
<style scoped>
.input-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.input-styling {
  font-size: 1.5rem;
  padding: 10px;
  border-radius: 12px;
  border: 2px solid bg-primary;
  width: 100%;
}

.add-button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 1.2rem;
  border-radius: 12px;
  background-color: bg-accent;
  color: white;
  cursor: pointer;
}

.add-button:disabled {
  background-color: bg-warning;
  cursor: not-allowed;
}
</style>
