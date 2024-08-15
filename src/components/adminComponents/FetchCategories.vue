<template>
    <div class="category-list">
      <h2 class="text-2xl font-bold mb-4">Categories</h2>
      <div v-if="loading" class="text-gray-500">Loading categories...</div>
      <div v-if="error" class="text-red-500">Error: {{ error }}</div>
      <div v-if="categories.length === 0 && !loading" class="text-gray-500">No categories available.</div>
      <div v-if="categories.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="category in categories" :key="category.id" class="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
          <h3 class="text-lg font-bold">{{ category.name }}</h3>
          <button 
            @click="deleteCategory(category.id)" 
            class="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            :disabled="deletingCategoryId === category.id"
          >
            <span v-if="deletingCategoryId === category.id">Deleting...</span>
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
  
  const categories = ref([]);
  const loading = ref(false);
  const error = ref('');
  const deletingCategoryId = ref(null); // Track the ID of the category being deleted
  
  const fetchCategories = async () => {
    loading.value = true;
    error.value = '';
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      categories.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  
  const deleteCategory = async (categoryId) => {
    deletingCategoryId.value = categoryId; // Set the deleting state for this category
    try {
      await deleteDoc(doc(db, 'categories', categoryId));
      categories.value = categories.value.filter(category => category.id !== categoryId);
    } catch (err) {
      error.value = 'Failed to delete category: ' + err.message;
    } finally {
      deletingCategoryId.value = null; // Reset the deleting state
    }
  };
  
  onMounted(() => {
    fetchCategories();
  });
  </script>
  
  <style scoped>
  .category-list {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  </style>
  