<template>
  <div class="product-card bg-base-200 flex flex-col rounded-2xl p-4">
    <div class="product-header mb-2 flex items-center justify-between">
      <div class="product-title text-lg font-bold">
        {{ product.title }}
      </div>
      <div class="product-price text-info">{{ product.costInPennies }} Pennies</div>
    </div>
    <div class="product-info">
      <div class="product-category text-accent text-sm">Category: {{ product.category }}</div>
      <div class="product-flavor text-warning text-sm">
        {{ product.flavorText }}
      </div>
      <div class="product-description text-info text-sm">
        {{ product.description }}
      </div>
    </div>
    <div class="product-actions mt-2 flex items-center">
      <button class="bg-primary rounded px-2 py-1 text-lg" @click="addToCart(product.id)">Add to Cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import { type Product } from '@/stores/productStore';

const props = defineProps<{
  product: Product;
}>();

const { product } = props;
const cartStore = useCartStore();
const cartId = computed(() => cartStore.carts[0]?.id); // Added optional chaining

const addToCart = (productId: number) => {
  if (cartId.value) {
    // Added a check for cartId
    cartStore.addItem(productId, cartId.value);
  }
};
</script>
