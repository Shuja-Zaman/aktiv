<template>
  <div class="p-5  min-h-screen flex">
    <div class="border-r-[1px] pr-2 w-[25%]">
        <Message/>
    </div>
    <div class="w-[50%] pl-5 border-r-[1px] pr-2">
        <Order />
    </div>
    <div class="w-[25%] pl-5">
        <CreateCategory/>
        <CreateProduct class="mt-3"/>
    </div>
  </div>
  <div class="flex">  
    <FetchProducts class="border-r-[1px]"/>
    <FetchCategories/>
  </div>
</template>

<script setup>
import CreateCategory from '@/components/adminComponents/CreateCategory.vue';
import CreateProduct from '@/components/adminComponents/CreateProduct.vue';
import Message from '@/components/adminComponents/Message.vue';
import Order from '@/components/adminComponents/Order.vue';
import FetchProducts from '@/components/adminComponents/FetchProducts.vue';
import FetchCategories from '@/components/adminComponents/FetchCategories.vue';

</script>

<style>

</style>