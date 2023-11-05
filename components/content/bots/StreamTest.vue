<template>
  <div class="bg-base-200 container mx-auto rounded-2xl p-2">
    <!-- Bot Avatar and Details -->
    <div v-if="currentBot" class="avatar-container m-2 w-full rounded-lg">
      <!-- Bot Avatar and Details -->
      <div class="bg-base-200 m-2 flex-grow rounded-2xl border p-2">
        <bot-carousel2 />
        <div class="flex-1 text-center">
          <h1 class="text-3xl font-bold">{{ currentBot.name ?? 'Unknown Bot' }}</h1>
          <p class="text-xl">{{ currentBot.subtitle ?? 'Subtitle' }}</p>
          <div class="card mt-2">{{ currentBot.description ?? 'Description' }}</div>
        </div>
      </div>
    </div>

    <!-- Message Interaction Area -->
    <div class="message-container bg-base-200 rounded-2xl p-1">
      <!-- New Message Prompt -->
      <div class="prompt-area rounded-2xl p-2">
        <label for="newMessage" class="mb-2 block font-bold">
          <div v-if="currentBot" class="user-intro m-2 rounded-2xl p-2">
            <p class="text-lg">{{ currentBot.userIntro ?? 'User Intro' }}</p>
          </div>
        </label>
        <textarea
          id="newMessage"
          v-model="message"
          rows="5"
          class="message-input w-full resize-none rounded-md border-2 p-2"
          placeholder="Type your message..."
          @keyup.enter="sendMessage"
        ></textarea>
        <button class="submit-button btn btn-primary mt-2" :disabled="isLoading" @click="sendMessage">
          Send Message
        </button>
        <milestone-reward v-if="shouldShowMilestoneCheck" :id="4"></milestone-reward>
      </div>

      <!-- Loading Indicator -->
      <div v-if="isLoading" class="loader mt-2 flex justify-center">
        <ami-butterfly />
      </div>

      <!-- Conversations -->
      <div
        v-for="(conversation, index) in conversations"
        :key="index"
        class="response-container relative m-2 flex flex-col items-start rounded-md bg-white p-4 shadow-md"
        @click="activeConversationIndex = index"
      >
        <div
          v-for="(msg, msgIndex) in conversation"
          :key="msgIndex"
          :class="{ 'flex-row-reverse': msg.role === 'user' }"
          class="flex items-center"
        >
          <ResponseEntry
            :role="msg.role"
            :content="msg.content"
            :avatar-image="msg.avatarImage ?? '/images/kindtitle.webp'"
            :bot-name="msg.botName ?? 'Kind Robot'"
            :subtitle="msg.subtitle ?? 'Your friendly neighborhood AI'"
          />
        </div>
        <!-- Reaction Buttons -->
        <div class="reaction-buttons mt-2 flex space-x-2">
          <button
            class="hover:bg-gray-200"
            :class="{ 'bg-primary': isReactionActive(index, 'liked') }"
            @click="toggleReaction(index, 'liked')"
          >
            👍
          </button>
          <div v-if="showPopup[index]?.liked" class="popup">Response Liked <icon name="like" class="icon-class" /></div>

          <button
            class="hover:bg-gray-200"
            :class="{ 'bg-primary': isReactionActive(index, 'hated') }"
            @click="toggleReaction(index, 'hated')"
          >
            👎
          </button>
          <div v-if="showPopup[index]?.hated" class="popup">Response hated <icon name="hate" class="icon-class" /></div>
          <button
            class="hover:bg-gray-200"
            :class="{ 'bg-primary': isReactionActive(index, 'loved') }"
            @click="toggleReaction(index, 'loved')"
          >
            ❤️
          </button>
          <div v-if="showPopup[index]?.loved" class="popup">Favorited <icon name="❤️" class="icon-class" /></div>
          <button
            class="hover:bg-gray-200"
            :class="{ 'bg-primary': isReactionActive(index, 'flagged') }"
            @click="toggleReaction(index, 'flagged')"
          >
            🚩
          </button>
          <div v-if="showPopup[index]?.flagged" class="popup">Flagged <icon name="🚩" class="icon-class" /></div>
        </div>
        <div
          v-if="activeConversationIndex !== null && activeConversationIndex === index"
          class="mt-2 flex items-center"
        >
          <textarea
            v-model="replyMessage"
            type="text"
            rows="3"
            placeholder="Continue conversation..."
            class="flex-grow resize-y rounded-md border-2 p-2 text-lg"
            @keyup.enter="continueConversation(index)"
          />
          <button class="btn btn-primary ml-2" :disabled="isReplyLoading" @click="continueConversation(index)">
            Reply
          </button>
          <div v-if="isReplyLoading" class="loader ml-2 mt-2 flex justify-center">
            <ami-butterfly />
          </div>
        </div>
        <button class="absolute right-2 top-2 text-red-500 hover:text-red-700" @click.stop="deleteConversation(index)">
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useBotStore, type Bot } from '../../../stores/botStore';
import { useUserStore } from '@/stores/userStore';
import { errorHandler } from '@/server/api/utils/error';
import { useChatStore, type ChatExchange } from '@/stores/chatStore';

const shouldShowMilestoneCheck = ref(false);
let userKey: string | null = null;

onMounted(() => {
  userKey = localStorage.getItem('user_openai_key');
});

interface Message {
  role: 'user' | 'assistant';
  content: string;
  avatarImage?: string;
  botName?: string;
  subtitle?: string;
}

interface Conversation extends Array<Message> {}
const conversations = ref<Conversation[]>([]);
const activeConversationIndex = ref<number | null>(null);
const botStore = useBotStore();
const userStore = useUserStore();
const chatStore = useChatStore();
const currentBot = computed<Bot | null>(() => botStore.currentBot);
const message = ref('');
const replyMessage = ref('');
const isLoading = ref(false);
const error = ref<string | null>(null);
const userImage = computed(() => userStore.user?.avatarImage);
const isReplyLoading = ref(false);

// Usage
const userId = computed(() => userStore.userId || 0);
const botId = computed(() => botStore.currentBot?.id || 0);
const botName = computed(() => botStore.currentBot?.name || '');
const username = computed(() => userStore.username);
const showPopup = ref<{ [key: number]: { [key: string]: boolean } }>({});

// Function to convert a conversation to ChatExchange

// Function to convert a conversation to ChatExchange
function convertToChatExchange(
  conversation: Message[],
  userId: number,
  botId: number,
  botName: string,
  username: string,
): ChatExchange {
  const userPrompt = conversation.find((msg) => msg.role === 'user')?.content ?? '';
  const botResponse = conversation.find((msg) => msg.role === 'assistant')?.content ?? '';

  return {
    id: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    botId,
    botName,
    userId,
    username,
    userPrompt,
    botResponse,
    liked: null,
    hated: null,
    loved: null,
    flagged: null,
    previousEntryId: 0,
  };
}

type ReactionType = 'liked' | 'hated' | 'loved' | 'flagged';

const isReactionActive = (index: number, reactionType: ReactionType) => {
  const currentExchange = chatStore.getExchangeById(index) as ChatExchange;
  return currentExchange?.[reactionType];
};

// Watch for changes in conversations and update ChatExchange
watchEffect(() => {
  if (conversations.value.length > 0) {
    const lastConversation = conversations.value[conversations.value.length - 1];
    const lastExchange = convertToChatExchange(
      lastConversation,
      userId.value,
      botId.value,
      botName.value,
      username.value,
    );
    chatStore.addOrUpdateExchange(lastExchange);
  }
});

const sendMessage = async () => {
  isLoading.value = true;
  try {
    const fullMessage = currentBot.value?.userIntro ? `${currentBot.value.userIntro} ${message.value}` : message.value;
    shouldShowMilestoneCheck.value = true;
    const res = await axios.post(
      '/api/botcafe/chat',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: fullMessage }],
        stream: false,
        user_openai_key: userKey,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    conversations.value.push([
      {
        role: 'user',
        content: message.value,
        avatarImage: userStore.user?.avatarImage ?? undefined,
      },

      {
        role: 'assistant',
        content: res.data.choices[0].message.content,
        avatarImage: currentBot.value?.avatarImage,
        botName: currentBot.value?.name,
        subtitle: currentBot.value?.subtitle,
      },
    ]);
    message.value = '';
  } catch (err) {
    console.error(err);
    error.value = 'Failed to send the message. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

const toggleReaction = (index: number, reactionType: 'liked' | 'hated' | 'loved' | 'flagged') => {
  const currentExchange = convertToChatExchange(
    conversations.value[index],
    userId.value,
    botId.value,
    botName.value,
    username.value,
  );
  if (currentExchange && currentExchange.id) {
    // Check for id
    const currentReactionState = currentExchange[reactionType] ?? false;
    chatStore.addReaction(currentExchange.id, { [reactionType]: !currentReactionState });
  }
  // Show popup
  if (!showPopup.value[index]) {
    showPopup.value[index] = {};
  }
  showPopup.value[index][reactionType] = true;

  // Hide popup after 2 seconds
  setTimeout(() => {
    showPopup.value[index][reactionType] = false;
  }, 2000);
};

const continueConversation = async (index: number) => {
  isReplyLoading.value = true;
  try {
    // Remove unexpected properties from each message
    const sanitizedMessages = conversations.value[index].map(({ avatarImage, botName, subtitle, ...rest }) => rest);

    const fullMessage = currentBot.value?.userIntro
      ? `${currentBot.value.userIntro} ${replyMessage.value}`
      : replyMessage.value;

    // Add the new user message
    sanitizedMessages.push({ role: 'user', content: fullMessage });

    const res = await axios.post('/api/botcafe/chat', {
      model: 'gpt-3.5-turbo',
      messages: sanitizedMessages,
      stream: false,
    });
    conversations.value[index].push({ role: 'user', content: replyMessage.value });
    conversations.value[index].push({
      role: 'assistant',
      content: res.data.choices[0].message.content,
    });
    replyMessage.value = '';
  } catch (err) {
    console.error(err);
  }
  isReplyLoading.value = false;
};
watchEffect(() => {
  if (conversations.value.length > 0) {
    const lastConversation = conversations.value[conversations.value.length - 1];
    const lastExchange = convertToChatExchange(
      lastConversation,
      userId.value,
      botId.value,
      botName.value,
      username.value,
    );
    chatStore.addOrUpdateExchange(lastExchange);
  }
});

watchEffect(() => {
  if (currentBot.value && currentBot.value.prompt) {
    message.value = currentBot.value.prompt;
  }
});
const deleteConversation = (index: number) => {
  conversations.value.splice(index, 1);
  activeConversationIndex.value = null; // Reset the active conversation index after deletion
};
</script>
<style>
.popup {
  position: absolute;
  top: 0;
  right: 0;
  background-color: bg-info;
  padding: 4px;
  border-radius: rounded-2xl;
  font-size: text-lg;
}
</style>
