<template>
    <div class="product-list-container">
      <h2 class="text-2xl font-bold mb-4">Products</h2>
      <div v-if="loading" class="text-gray-500">Loading products...</div>
      <div v-if="error" class="text-red-500">Error: {{ error }}</div>
      <div v-if="products.length === 0 && !loading" class="text-gray-500">No products available.</div>
      <div v-if="products.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="product in products" :key="product.id" class="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
          <img :src="product.imageUrl" :alt="product.name" class="w-full h-48 object-cover mb-4" />
          <h3 class="text-lg font-bold">{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p>{{ product.size }}</p>
          <p class="font-semibold">Rs. {{ product.price }}</p>
          <button 
            @click="deleteProduct(product.id)" 
            class="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            :disabled="deletingProductId === product.id"
          >
            <span v-if="deletingProductId === product.id">Deleting...</span>
            <span v-else>Delete</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
  import { db } from '@/firebase/firebase.js'; // Adjust this path to your firebase config
  
  const products = ref([]);
  const loading = ref(false);
  const error = ref('');
  const deletingProductId = ref(null); // To track the ID of the product being deleted
  
  const fetchProducts = async () => {
    loading.value = true;
    error.value = '';
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      products.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  
  const deleteProduct = async (productId) => {
    deletingProductId.value = productId; // Set the deleting state for this product
    try {
      await deleteDoc(doc(db, 'products', productId));
      products.value = products.value.filter(product => product.id !== productId);
    } catch (err) {
      error.value = 'Failed to delete product: ' + err.message;
    } finally {
      deletingProductId.value = null; // Reset the deleting state
    }
  };
  
  onMounted(() => {
    fetchProducts();
  });
  </script>
  
  <style scoped>
  .product-list-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    height: 100vh; /* Make the container full height */
    overflow-y: auto; /* Enable vertical scrolling */
  }
  </style>
  