<template>
    <div class="p-6 bg-white rounded-md shadow-md mx-auto my-8">
      <form @submit.prevent="submitOrder" class="space-y-6">
        <!-- Email and Newsletter Subscription -->
        <div>
          <h2 class="text-2xl font-bold mb-4">Contact</h2>
          <label for="email" class="block">
            Email <span class="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 block w-full px-3 py-2 border-[1px] border-zinc-400 outline-none focus:border-zinc-600 rounded-md shadow-sm"
            required
          />
          <div class="flex items-center mt-2">
            <input type="checkbox" id="newsletter" v-model="newsletter" class="mr-2" />
            <label for="newsletter" class="text-sm">Email me with news and offers</label>
          </div>
        </div>
  
        <!-- Delivery Section -->
        <h2 class="text-2xl font-bold mb-4">Delivery</h2>
  
        <div>
          <label for="country" class="block text-sm font-medium">Country/Region</label>
          <input
            type="text"
            id="country"
            v-model="country"
            value="Pakistan"
            readonly
            class="mt-1 block w-full px-3 py-2 border-[1px] border-zinc-400 outline-none focus:border-zinc-600 rounded-md shadow-sm"
          />
        </div>
  
        <div class="flex space-x-4">
          <div class="flex-1">
            <label for="firstName" class="block text-sm font-medium">
              First Name <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              v-model="firstName"
              class="mt-1 block w-full px-3 py-2 border-[1px] border-zinc-400 outline-none focus:border-zinc-600 rounded-md shadow-sm"
              required
            />
          </div>
          <div class="flex-1">
            <label for="lastName" class="block text-sm font-medium">
              Last Name <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              v-model="lastName"
              class="mt-1 block w-full px-3 py-2 border-[1px] border-zinc-400 outline-none focus:border-zinc-600 rounded-md shadow-sm"
              required
            />
          </div>
        </div>
  
        <div>
          <label for="address" class="block text-sm font-medium">Complete Address <span class="text-red-500">*</span></label>
          <input
            type="text"
            id="address"
            v-model="address"
            class="mt-1 block w-full px-3 py-2 border-[1px] border-zinc-400 outline-none focus:border-zinc-600 rounded-md shadow-sm"
            required
          />
        </div>
  
        <div class="flex space-x-4">
          <div class="flex-1">
            <label for="city" class="block text-sm font-medium">
              City <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              v-model="city"
              class="mt-1 block w-full px-3 py-2 border-[1px] border-zinc-400 outline-none focus:border-zinc-600 rounded-md shadow-sm"
              required
            />
          </div>
          <div class="flex-1">
            <label for="postalCode" class="block text-sm font-medium">
              Postal Code <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="postalCode"
              v-model="postalCode"
              class="mt-1 block w-full px-3 py-2 border-[1px] border-zinc-400 outline-none focus:border-zinc-600 rounded-md shadow-sm"
              required
            />
          </div>
        </div>
  
        <div>
          <label for="phoneNumber" class="block text-sm font-medium">
            Mobile Number <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="phoneNumber"
            v-model="phoneNumber"
            class="mt-1 block w-full px-3 py-2 border-[1px] border-zinc-400 outline-none focus:border-zinc-600 rounded-md shadow-sm"
            required
            @input="validatePhoneNumber"
            maxlength="11"
            minlength="11"
          />
          <p v-if="phoneNumberError" class="text-red-500 text-sm">{{ phoneNumberError }}</p>
        </div>
  
        <!-- Payment Section -->
        <h2 class="text-2xl font-bold mb-4">Payment</h2>
        <div class="">
          <p class="text-sm text-gray-600 mb-4">All transactions are secured and encrypted</p>
          <label for="paymentMethod" class="block text-sm font-medium">Payment Method</label>
          <input
            type="text"
            id="paymentMethod"
            v-model="paymentMethod"
            value="Cash on Delivery (COD)"
            readonly
            class="mt-1 block w-full px-3 py-2 border-[1px] outline-none focus:border-zinc-600 rounded-md shadow-sm"
          />
        </div>
  
        <!-- Order Summary -->
        <div class="mt-6 border-t pt-6">
          <h2 class="text-2xl font-bold mb-4">Order Summary</h2>
          <div class="flex justify-between text-sm font-medium mb-2">
            <span>Total Amount:</span>
            <span>Rs. {{ totalAmount }}</span>
          </div>
          <div class="flex justify-between text-sm font-medium mb-2">
            <span>Shipping Cost:</span>
            <span>Rs. {{ shippingCost }}</span>
          </div>
          <div class="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>Rs. {{ totalAmountWithShipping }}</span>
          </div>
        </div>
  
        <!-- Complete Order Button -->
        <Button name="Complete Order" type="submit"/>
      </form>
      <!-- Spinner -->
      <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
        <div class="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-zinc-700 rounded-full animate-spin"></div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, computed, watch } from 'vue';
import Button from '../button/Button.vue';
import { useCartStore } from '@/store/cart.js';
import { db } from '@/firebase/firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const cartItems = ref(cartStore.getCartItems());

const isLoading = ref(false)
const router = useRouter();

const email = ref('');
const newsletter = ref(false);
const firstName = ref('');
const lastName = ref('');
const address = ref('');
const city = ref('');
const postalCode = ref('');
const phoneNumber = ref('');
const phoneNumberError = ref('');
const country = ref('Pakistan');
const paymentMethod = ref('Cash on Delivery (COD)');
const shippingCost = ref(220);  // Example shipping cost

// Watch for changes in the cart store
watch(() => cartStore.products, (newProducts) => {
    cartItems.value = newProducts;
});


// Calculate the total cost of items in the cart
const totalAmount = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.price * item.quantity); // Assuming each item has a price and quantity
  }, 0);
});

// Calculate the total amount including shipping
const totalAmountWithShipping = computed(() => {
  return totalAmount.value + shippingCost.value;
});

const validatePhoneNumber = () => {
  const phoneRegex = /^[0-9]{11}$/;
  if (!phoneRegex.test(phoneNumber.value)) {
    phoneNumberError.value = 'Invalid phone number';
  } else {
    phoneNumberError.value = '';
  }
};

const submitOrder = async () => {
  if (!phoneNumberError.value) {
    try {
      isLoading.value = true; // Start loading

      // Prepare order data
      const orderData = {
        email: email.value,
        newsletter: newsletter.value,
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        postalCode: postalCode.value,
        phoneNumber: phoneNumber.value,
        paymentMethod: paymentMethod.value,
        totalAmount: totalAmountWithShipping.value,
        timestamp: new Date(), // Optional: add a timestamp
        items: cartItems.value.map(item => ({
          id:item.id,
          name: item.name,
          size: item.size,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imgUrl // Include image URL if available
        }))
      };

      // Add a new order to the "orders" collection
      await addDoc(collection(db, "orders"), orderData);

      // Clear the form fields and cart
      email.value = '';
      newsletter.value = false;
      firstName.value = '';
      lastName.value = '';
      address.value = '';
      city.value = '';
      postalCode.value = '';
      phoneNumber.value = '';

      cartStore.clearCart(); // Assuming there's a method in your store to clear the cart

      alert('Order successfully submitted! Please check your email.');
      router.push('/thank-you');

    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      isLoading.value = false; // End loading
    }
  } else {
    console.error('Invalid phone number');
  }
};


</script>

  
  <style scoped>
  /* Scoped styles can be added here */
  </style>
  