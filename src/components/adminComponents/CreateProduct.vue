<template>
    <div class="p-5 max-w-md mx-auto bg-[#f9f9f9] rounded-lg shadow-lg">
      <h2 class="text-2xl font-extrabold mb-6">Add New Product</h2>
      
      <form @submit.prevent="addProduct" class="space-y-6">
        <!-- Product Name -->
        <div class="space-y-2">
          <label for="name" class="block text-md kanit-medium text-gray-700">Product Name</label>
          <input
            v-model="name"
            id="name"
            type="text"
            class="block kanit-thin w-full px-3 py-2 border border-zinc-400 rounded-md shadow-sm focus:border-zinc-600 focus:outline-none"
            placeholder="Enter product name"
            required
          />
        </div>
  
        <!-- Product Description -->
        <div class="space-y-2">
          <label for="description" class="block text-md kanit-medium text-gray-700">Description</label>
          <textarea
            v-model="description"
            id="description"
            class="block kanit-thin w-full px-3 py-2 border border-zinc-400 rounded-md shadow-sm focus:border-zinc-600 focus:outline-none"
            placeholder="Enter product description"
            required
          />
        </div>
  
        <!-- Product Price -->
        <div class="space-y-2">
          <label for="price" class="block text-md kanit-medium text-gray-700">Price</label>
          <input
            v-model="price"
            id="price"
            type="number"
            class="block kanit-thin w-full px-3 py-2 border border-zinc-400 rounded-md shadow-sm focus:border-zinc-600 focus:outline-none"
            placeholder="Enter product price"
            required
          />
        </div>
  
        <!-- Product Size -->
        <div class="space-y-2">
          <label for="size" class="block text-md kanit-medium text-gray-700">Size</label>
          <input
            v-model="size"
            id="size"
            type="text"
            class="block kanit-thin w-full px-3 py-2 border border-zinc-400 rounded-md shadow-sm focus:border-zinc-600 focus:outline-none"
            placeholder="Enter product size"
          />
        </div>
  
        <!-- Product Image -->
        <div class="space-y-2">
          <label for="image" class="block text-md kanit-medium text-gray-700">Product Image</label>
          <input
            @change="handleImageUpload"
            id="image"
            type="file"
            class="block kanit-thin w-full px-3 py-2 border border-zinc-400 rounded-md shadow-sm focus:border-zinc-600 focus:outline-none"
            accept="image/*"
          />
        </div>
  
        <!-- Category Selection -->
        <div class="space-y-2">
          <label for="category" class="block text-md kanit-medium text-gray-700">Category</label>
          <select
            v-model="selectedCategory"
            id="category"
            class="block kanit-thin w-full px-3 py-2 border border-zinc-400 rounded-md shadow-sm focus:border-zinc-600 focus:outline-none"
            required
          >
            <option value="" disabled>Select a category</option>
            <option v-for="category in categories" :key="category.id" :value="category.ref">
              {{ category.name }}
            </option>
          </select>
        </div>
  
        <!-- Submit Button -->
        <Button name="Add" type="submit"/>
      </form>
  
      <div v-if="loading" class="mt-4 text-center text-gray-600">Adding product...</div>
      <div v-if="error" class="mt-4 text-center text-red-600">Error: {{ error }}</div>
      <div v-if="success" class="mt-4 text-center text-green-600">Product added successfully!</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { collection, addDoc, getDocs } from 'firebase/firestore';
  import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { db } from '@/firebase/firebase.js';
  import Button from '../button/Button.vue';
  
  const name = ref('');
  const description = ref('');
  const price = ref(0);
  const size = ref('');
  const selectedCategory = ref('');
  const imageFile = ref(null);
  const imageUrl = ref('');
  const loading = ref(false);
  const error = ref('');
  const success = ref(false);
  const categories = ref([]);
  
  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      categories.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        ref: doc.ref,
      }));
    } catch (err) {
      error.value = 'Failed to fetch categories';
    }
  };
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      imageFile.value = file;
    }
  };
  
  const uploadImage = async () => {
    if (imageFile.value) {
      const storage = getStorage();
      const imageRef = storageRef(storage, `images/${imageFile.value.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile.value);
      imageUrl.value = await getDownloadURL(snapshot.ref);
    }
  };
  
  const addProduct = async () => {
    if (!name.value.trim() || !description.value.trim() || !selectedCategory.value) {
      error.value = 'All fields are required';
      return;
    }
  
    loading.value = true;
    error.value = '';
    success.value = false;
  
    try {
      // Upload the image and get the URL
      await uploadImage();
  
      await addDoc(collection(db, 'products'), {
        name: name.value.trim(),
        description: description.value.trim(),
        price: Number(price.value),
        size: size.value.trim(),
        categoryId: selectedCategory.value,
        imageUrl: imageUrl.value, // Store the image URL in Firestore
      });
  
      success.value = true;
      name.value = '';
      description.value = '';
      price.value = 0;
      size.value = '';
      selectedCategory.value = '';
      imageFile.value = null;
      imageUrl.value = '';
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    fetchCategories();
  });
  </script>
  
  <style scoped>
  /* Additional styles if needed */
  </style>
  