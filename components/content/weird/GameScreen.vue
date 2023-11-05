<template>
  <div class="bg-base-200 text-base-content flex h-screen flex-col">
    <div class="m-4">
      <label for="prompt" class="text-lg font-bold">Prompt:</label>
      <textarea id="prompt" v-model="prompt" class="textarea textarea-bordered h-20 w-full"></textarea>
    </div>

    <div class="m-4 flex justify-around">
      <select v-model="color" class="select select-bordered w-40">
        <option disabled="disabled" selected="selected">Color</option>
        <option v-for="(option, index) in colors" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
      <select v-model="model" class="select select-bordered w-40">
        <option disabled="disabled" selected="selected">Model</option>
        <option v-for="(option, index) in models" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
      <select v-model="location" class="select select-bordered w-40">
        <option disabled="disabled" selected="selected">Location</option>
        <option v-for="(option, index) in locations" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
      <select v-model="embedding" class="select select-bordered w-40">
        <option disabled="disabled" selected="selected">Embedding</option>
        <option v-for="(option, index) in embeddings" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <div class="m-4 flex justify-center">
      <button class="btn btn-primary btn-lg" @click="makeArt">Make Art</button>
    </div>

    <div class="m-4 flex flex-row justify-around">
      <div class="card bordered w-1/2 p-4">
        <!-- Chat history/response -->
        <p v-for="(message, index) in chatHistory" :key="index">
          {{ message }}
        </p>
      </div>
      <div class="card bordered w-1/2 p-4">
        <div class="card-body">
          <!-- Image response -->
          <img :src="imageResponse" alt="Art" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// State
const prompt = ref('');
const color = ref(null);
const model = ref(null);
const location = ref(null);
const embedding = ref(null);
const imageResponse = ref(null);
const chatHistory = ref([]);

// Fetch wildcard data
const { data: colors } = useFetch('/content/wildcard/color.md');
const { data: models } = useFetch('/content/wildcard/model.md');
const { data: locations } = useFetch('/content/wildcard/location.md');
const { data: embeddings } = useFetch('/content/wildcard/embedding.md');

// Make Art method
const makeArt = async () => {
  const response = await $fetch('https://cafefred.cafepurr.com', {
    method: 'POST',
    body: JSON.stringify({
      prompt: prompt.value,
      color: color.value,
      model: model.value,
      location: location.value,
      embedding: embedding.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Update chat history and image response
  chatHistory.value.push(response.chat);
  imageResponse.value = response.image;
};
</script>
