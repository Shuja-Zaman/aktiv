<template>
    <div class="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 kanit-thin">
      <div class="max-w-2xl mx-auto">
        <!-- Header Section -->
        <header class="text-center mb-12">
          <p class="text-gray-600">
            We'd love to hear from you! Fill out the form below or reach us at our contact details.
          </p>
        </header>
  
        <!-- Contact Form Section -->
        <section class="bg-white shadow-md rounded-lg p-8">
          <form @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <!-- Name Field -->
              <div>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="Name"
                  class="p-2 mt-1 block w-full border-[1px] border-zinc-400 rounded-md shadow-sm sm:text-sm focus:border-zinc-700 focus:outline-none"
                  required
                />
              </div>
  
              <!-- Email Field -->
              <div>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="Email"
                  class="p-2 mt-1 block w-full border-[1px] border-zinc-400 rounded-md shadow-sm sm:text-sm focus:border-zinc-700 focus:outline-none"
                  required
                />
              </div>
            </div>
  
            <!-- Message Field -->
            <div class="mt-6">
              <textarea
                id="message"
                v-model="form.message"
                rows="6"
                placeholder="Message"
                class="p-2 mt-1 block w-full border-[1px] border-zinc-400 rounded-md shadow-sm sm:text-sm focus:border-zinc-700 focus:outline-none"
                required
              ></textarea>
            </div>
  
            <!-- Submit Button -->
            <div class="mt-6 flex justify-end">
              

              <Button  type="submit" name="Send Message"/>
            </div>
          </form>
  
          <!-- Success Message -->
          <div v-if="messageSent" class="mt-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
            Message sent successfully!
          </div>
        </section>
      </div>
  
      <!-- Spinner -->
      <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
        <div class="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-zinc-700 rounded-full animate-spin"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { db } from '@/firebase/firebase.js';
  import { addDoc, collection } from 'firebase/firestore';
  import Button from '@/components/button/Button.vue';

  const form = ref({
    name: '',
    email: '',
    message: '',
  });
  
  const isLoading = ref(false);
  const messageSent = ref(false);
  
  const handleSubmit = async () => {
    isLoading.value = true;
    try {
      // Save form data to Firestore
      const docRef = await addDoc(collection(db, 'messages'), {
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
      });
  
      // Set success message
      messageSent.value = true;
  
      // Reset the form after submission
      form.value = {
        name: '',
        email: '',
        message: '',
      };
    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      isLoading.value = false;
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  