<template>
  <div class="giftshop-container bg-base-200 flex flex-col rounded-2xl p-4">
    <!-- Header Section -->
    <div class="giftshop-header mb-4 text-lg font-bold">Welcome to the Gift Shop!</div>

    <!-- Product Gallery -->
    <div class="product-gallery mb-4">
      <product-gallery />
    </div>

    <!-- Toggle Shopping Cart Button -->
    <button class="toggle-cart bg-primary rounded px-2 py-1 text-lg" @click="toggleCart">
      {{ showCart ? 'Hide Cart' : 'Show Cart' }}
    </button>

    <!-- Shopping Cart -->
    <div v-if="showCart" class="shopping-cart">
      <shopping-cart />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useCartStore } from '@/stores/cartStore';
import { useCustomerStore } from '@/stores/customerStore';
import { generateSillyName } from '@/utils/useRandomName';

// Initialize stores
const userStore = useUserStore();
const cartStore = useCartStore();
const customerStore = useCustomerStore();

// State for toggling the cart
const showCart = ref(false);

// Function to toggle cart visibility
const toggleCart = () => {
  showCart.value = !showCart.value;
};
const initStores = async () => {
  try {
    if (userStore.userId === 0) {
      const newUserResponse = await userStore.register({ username: generateSillyName() });

      if (newUserResponse?.success && newUserResponse?.user?.id) {
        const newUserId = newUserResponse.user.id;

        const newCustomerResponse = await customerStore.createCustomer({ userId: newUserId });

        if (newCustomerResponse?.success && newCustomerResponse?.customerId) {
          const newCustomerId = newCustomerResponse.customerId;

          const newCartResponse = await cartStore.createCart(newCustomerId);

          if (newCartResponse?.success && newCartResponse?.cartId) {
            const newCartId = newCartResponse.cartId;

            localStorage.setItem('userId', newUserId.toString());
            localStorage.setItem('cartId', newCartId.toString());
          }
        }
      }
    } else {
      const existingCustomerResponse = await customerStore.fetchCustomerByUserId(userStore.userId);

      if (!existingCustomerResponse?.success || !existingCustomerResponse?.customerId) {
        const newCustomerResponse = await customerStore.createCustomer({ userId: userStore.userId });

        if (newCustomerResponse?.success && newCustomerResponse?.customerId) {
          const newCustomerId = newCustomerResponse.customerId;

          const newCartResponse = await cartStore.createCart(newCustomerId);

          if (newCartResponse?.success && newCartResponse?.cartId) {
            const newCartId = newCartResponse.cartId;

            localStorage.setItem('cartId', newCartId.toString());
          }
        }
      }
    }
  } catch (error: any) {
    console.error(`Initialization Error: ${error.message}`);
  }
};

initStores();
</script>
