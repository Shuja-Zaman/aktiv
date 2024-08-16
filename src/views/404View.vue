<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 class="text-9xl font-bold text-gray-900">404</h1>
      <p class="text-2xl text-gray-600 mt-4">Page Not Found</p>
      <p class="text-gray-500 mt-2">Sorry, the page you are looking for does not exist.</p>
      <router-link 
        to="/" 
        class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition">
        Go Home
      </router-link>
    </div>
  </template>
  
  <script setup>
  // No specific logic needed for this simple page
  </script>
  
  <style scoped>
  /* Scoped styles to customize further if needed */
  </style>
  