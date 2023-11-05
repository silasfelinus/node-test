<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import axios from 'axios';
import { useBotStore, type Bot } from '../../../stores/botStore';

interface Message {
  role: string;
  content: string;
}

const botStore = useBotStore();
const currentBot = computed<Bot | null>(() => botStore.currentBot);
const message = ref('');
const response = ref(null);
const messages = ref<Message[]>([]);
const isLoading = ref(false);

let userKey: string | null = null;

onMounted(() => {
  userKey = localStorage.getItem('user_openai_key');
});

watchEffect(() => {
  if (currentBot.value && currentBot.value.prompt) {
    message.value = currentBot.value.prompt;
  }
});

const sendMessage = async () => {
  isLoading.value = true;
  messages.value.push({ role: 'user', content: message.value });
  try {
    const res = await axios.post(
      '/api/botcafe/chat',
      {
        model: 'gpt-3.5-turbo',
        messages,
        userKey,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    messages.value = [...messages.value, { role: 'assistant', content: res.data.choices[0].message.content }];
    response.value = res.data.choices[0].message.content;
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const sendReply = async (updatedMessages: Message[]) => {
  try {
    messages.value = updatedMessages;
    message.value = updatedMessages[updatedMessages.length - 1].content;
    await sendMessage();
  } catch (err) {
    console.error(err);
  }
};
</script>
<template>
  <div class="container flex flex-col items-center justify-center bg-gray-100 p-4" :data-theme="currentBot?.theme">
    <div v-if="currentBot" class="avatar-container w-full max-w-3xl rounded-lg bg-white p-4 shadow-lg">
      <div class="flex flex-col items-center md:flex-row">
        <img
          :src="currentBot.avatarImage"
          alt="Bot Avatar"
          class="avatar-img border-theme rounded-full border-4 shadow-md md:w-1/4"
        />
        <div class="flex-1 p-4 text-center md:text-left">
          <h1 class="text-theme text-3xl font-bold">{{ currentBot.name }}</h1>
          <p class="text-xl">{{ currentBot.subtitle }}</p>
          <div class="card">{{ currentBot.description }}</div>
          <div class="user-intro rounded-md bg-gray-200 p-2 shadow-inner">
            <p class="text-lg">{{ currentBot.userIntro }}</p>
          </div>
        </div>
      </div>
      <div class="message-container border-theme mt-4 border-t-2">
        <div class="prompt-area rounded-md bg-gray-200 p-4 shadow-inner">
          <textarea
            v-model="message"
            rows="5"
            class="message-input border-theme w-full rounded-md border-2 p-2"
          ></textarea>
          <button class="submit-button btn btn-primary mt-2" :disabled="isLoading" @click="sendMessage">
            Send Message
          </button>
        </div>

        <!-- Loading animation -->
        <div v-if="isLoading" class="loader mt-2 flex justify-center">
          <div class="border-accent-900 h-8 w-8 animate-spin rounded-full border-b-2 border-t-2"></div>
        </div>

        <div v-if="response" class="response-container mt-4 rounded-md bg-gray-100 p-4 shadow-md">
          <h2>Response:</h2>
          <div class="response-card border-theme rounded-md border-2 bg-white p-4 shadow-lg">
            <ResponseCard :messages="messages" :send-message="sendReply" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar-img {
  max-width: 100%;
  height: auto;
}

.user-intro {
  border: 2px solid #ccc;
  margin-top: 10px;
}

.prompt-area {
  border: 2px solid #ccc;
  background-color: #f9f9f9;
}

.message-input {
  border: 2px solid #ccc;
  resize: none; /* Disables resizing of the textarea */
}

.submit-button {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.loader div {
  border-color: #f3f3f3;
  border-right-color: #4a90e2;
}

.response-container {
  border-top: 2px solid #ccc;
}
</style>
