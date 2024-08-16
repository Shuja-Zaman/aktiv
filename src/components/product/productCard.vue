<template>
    <RouterLink :to="`/product/${props.id}`" class="bg-white block border border-gray-200 rounded-lg overflow-hidden shadow-md">
      <div class="relative overflow-hidden">
        <img :src="props.image" :alt="props.name" class="hover:scale-105 transition-all duration-300 w-full h-[17rem] object-cover" />
      </div>
      <div class="p-4 flex flex-col justify-around h-48">
        <div>
          <h3 class="text-xl capitalize kanit-medium">{{ props.name }}</h3>
          <p>Rs. {{ props.price }}</p>
            <div class="flex gap-2 my-2" v-if="sizeArray && sizeArray.length">
              <p class="border-[1px] py-1 px-2 rounded-sm bg-zinc-200" v-for="size in sizeArray" :key="size">{{ size }}</p>
            </div>
        </div>
        <Button name="Buy now" />

      </div>
    </RouterLink>
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue';
  import Button from '../button/Button.vue';
  import { RouterLink } from 'vue-router';

  // Define props with types
  const props = defineProps({
    id: String,
    image: String,
    name: String,
    price: Number,
    size: String
  });
  
  // Split the size string into an array
const sizeArray = computed(() => props.size ? props.size.split(',').map(s => s.trim()) : []);


  </script>
  
  <style scoped>
  /* Scoped styles are omitted since we're using Tailwind CSS classes directly */
  </style>
  