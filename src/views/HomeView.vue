<template>
  <div class="kanit-thin">
    <!-- main section -->
    <div class="h-[70vh] md:h-[85vh] flex items-center main p-7">
      <div class="w-full">
        <h1 class=" text-4xl md:text-5xl lg:text-6xl kanit-extrabold lg:text-left text-center bg-clip-text text-transparent bg-gradient-to-br from-lime-400 to-lime-800">Empower Your <br/> Every Move
          <span class="text-zinc-600 italic font-light text-xl block mt-2 md:mt-4">with aktiv-fits</span>
        </h1>
        <RouterLink to="/shop" class="text-center block lg:inline">
          <Button name="Shop now" class=" w-max my-4 md:my-5 w-full md:w-max text-lg md:text-xl" />
        </RouterLink>
      </div>
    </div>

    <hr class="border-b-[1px] border-b-zinc-300 border-zinc-100">

    <!-- tag line section -->
    <div class="my-[3rem] md:my-[5rem]">
      <p class="text-lg md:text-2xl text-center">
        Your preference is our <strong class="kanit-medium text-lg md:text-2xl">Priority</strong>, always
      </p>
    </div>

    <!-- introducing section -->
<div class="my-[5rem] md:my-[10rem] h-auto md:h-[60vh] flex flex-col md:flex-row justify-center items-center gap-8 md:gap-14">
  <!-- image section -->
  <div class="relative">
    <img class="shadow-xl shadow-zinc-600 w-full" src="https://radstore.pk/cdn/shop/files/DSC08683_280x.jpg?v=1723276098" alt="">
    <img class=" md:absolute md:shadow-xl md:shadow-zinc-500 md:right-48 md:bottom-28 md:w-auto w-[120px] absolute bottom-10 right-0 -z-10" src="https://radstore.pk/cdn/shop/files/DSC08715_180x.jpg?v=1723275962" alt="">
    <img class=" md:absolute md:shadow-xl md:shadow-zinc-500 md:right-52 md:-bottom-10 md:w-auto w-[80px] absolute bottom-0 right-2 -z-10" src="https://radstore.pk/cdn/shop/files/DSC08677_100x.jpg?v=1723275474" alt="">
  </div>
  <!-- text section -->
  <div class="text-center md:text-left">
    <p>
      Introducing Brand New <strong>"Aktiv-Wear"</strong> <br> <span class="capitalize kanit-medium text-2xl md:text-3xl">all over <span class="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-lime-700">Pakistan</span>.</span>
    </p>
    <p>
      Check our Shirts, Trousers, Hoodies and more.
    </p>
    <RouterLink to="/shop">
      <Button name="Visit" class="my-4 md:my-5 text-lg md:text-xl w-full md:w-max" />
    </RouterLink>
  </div>
</div>


    <!-- featured products section -->
    <div class="p-7">
      <h1 class="text-center kanit-extrabold text-4xl md:text-5xl">Featured</h1>
      <div v-if="!loading && !error" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-[3rem] md:mt-[5rem]">
        <ProductCard
          v-for="product in products.slice(0,4)"
          :key="product.id"
          :id="product.id"
          :image="product.imageUrl"
          :name="product.name"
          :price="product.price"
          :size="product.size"
          :category="product.categoryName"
        />
      </div>
      <RouterLink class="text-center block" to="/shop">
        <Button name="View All" class="w-max my-[3rem] md:my-[4rem] text-lg md:text-xl w-full md:w-max mx-auto" />
      </RouterLink>
    </div>

    <!-- why aktiv-fits -->
    <div class="my-[5rem] md:my-[10rem] flex flex-col md:flex-row justify-center items-center gap-8 md:gap-14">
      <!-- image section -->
      <div class="relative w-full md:w-1/2">
        <img class=" shadow-2xl shadow-zinc-600 h-auto w-full " src="https://radstore.pk/cdn/shop/files/File0702_square_d9d6de80-9230-4ff1-ba12-5761f2a716c0_750x.jpg?v=1613737436" alt="">
      </div>
      <!-- text section -->
      <div class="text-center md:text-left p-7">
        <p class="text-lg md:text-2xl font-extralight">A Journey</p>
        <p class="kanit-extrabold text-3xl md:text-5xl">
          WHY AKTIV-FITS
        </p>
        <p class="w-full md:w-[30rem] mt-4 md:mt-6">
          In a sea of online stores, what truly distinguishes Aktiv is our commitment to you. We believe that lasting relationships are built on trust, quality, and care. That’s why we pour our passion into every detail, ensuring that our products speak for themselves and that you always feel valued.
        </p>
        <RouterLink to="/shop">
          <Button name="Shop Now" class="my-4 md:my-5 text-lg md:text-xl w-full w-max" />
        </RouterLink>
      </div>
    </div>

  </div>
</template>

<script setup>
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase.js';
import { ref, onMounted } from 'vue';
import Button from '@/components/button/Button.vue';
import { RouterLink } from 'vue-router';
import ProductCard from '../components/product/productCard.vue';

const loading = ref(true);
const error = ref(null);
const products = ref([]);

// Fetch all products from Firestore
const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    products.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (err) {
    error.value = err.message || 'Failed to fetch products';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProducts);
</script>

<style scoped>
</style>
