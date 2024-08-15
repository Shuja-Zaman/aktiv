<template>
    <div class="p-5 min-h-screen bg-slate-100">
        <!-- Loading Spinner -->
        <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
            <div class="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-zinc-700 rounded-full animate-spin"></div>
        </div>

        <!-- Cart Content -->
        <div v-else>
            <!-- Empty Cart Message -->
            <div v-if="cartItems.length === 0" class="text-center py-10">
                <p class="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</p>
                <p class="text-gray-500 mb-6 kanit-thin">It looks like you haven't added anything to your cart yet.</p>
                <router-link to="/shop" class="py-2 rounded">
                    <Button name="Continue Shopping" class="md:w-1/2 sm:w-[75%]"/>
                </router-link>
            </div>

            <!-- Cart Items -->
            <div v-else>
                <h1 class="text-3xl font-bold mb-6">Your Cart</h1>
                <div class="grid grid-cols-1 gap-6">
                    <CartCard v-for="item in cartItems" :key="`${item.id}-${item.size}`" :item="item" />
                </div>
                <div class="mx-auto lg:w-1/2 sm:w-full">
                    <Button name="Checkout" class="p-2 mt-10 text-xl" @click="toggleCheckout"/>
    
                    <CheckoutCard v-if="showCheckout" />
                </div>
            </div>


        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useCartStore } from '@/store/cart.js';
import CartCard from '../components/cart/CartCard.vue';
import Button from '@/components/button/Button.vue';
import CheckoutCard from '@/components/checkout/CheckoutCard.vue';

const cartStore = useCartStore();
const loading = ref(true);
const cartItems = ref(cartStore.getCartItems());

const showCheckout = ref(false);

const toggleCheckout = ()=>{
    showCheckout.value = !showCheckout.value;
}

// Watch for changes in the cart store
watch(() => cartStore.products, (newProducts) => {
    cartItems.value = newProducts;
});

onMounted(() => {
    loading.value = false;
});
</script>

<style scoped>
/* Scoped styles are omitted since we're using Tailwind CSS classes directly */
</style>
