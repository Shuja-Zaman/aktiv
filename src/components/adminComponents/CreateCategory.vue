<template>
    <div class="p-5 max-w-md mx-auto bg-[#f9f9f9] rounded-lg shadow-lg">
      <h2 class="text-2xl font-extrabold mb-6">Add New Category</h2>
      
      <form @submit.prevent="addCategory" class="space-y-6">
        <div class="space-y-2">
          <label for="name" class="block text-md kanit-medium text-gray-700">Category Name</label>
          <input
            v-model="categoryName"
            id="name"
            type="text"
            class="block kanit-thin w-full px-3 py-2 border border-zinc-400 rounded-md shadow-sm focus:border-zinc-600 focus:outline-none"
            placeholder="Enter category name"
            required
          />
        </div>
        
        <Button name="Add" type="submit"/>
      </form>
  
      <div v-if="loading" class="mt-4 text-center text-gray-600">Adding category...</div>
      <div v-if="error" class="mt-4 text-center text-red-600">Error: {{ error }}</div>
      <div v-if="success" class="mt-4 text-center text-green-600">Category added successfully!</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { collection, addDoc } from 'firebase/firestore';
  import { db } from '@/firebase/firebase.js';
  import Button from '../button/Button.vue';

  const categoryName = ref('');
  const loading = ref(false);
  const error = ref('');
  const success = ref(false);
  
  const addCategory = async () => {
    if (!categoryName.value.trim()) {
      error.value = 'Category name is required';
      return;
    }
  
    loading.value = true;
    error.value = '';
    success.value = false;
  
    try {
      await addDoc(collection(db, 'categories'), {
        name: categoryName.value.trim(),
      });
      success.value = true;
      categoryName.value = '';
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  /* Additional styles if needed */
  </style>
  