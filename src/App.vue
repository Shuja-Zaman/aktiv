<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from './components/ui/Footer.vue';
import Navbar from './components/ui/Navbar.vue';

</script>

<template>
  <div>
    <Navbar/>
      <RouterView />
    <Footer/>
  </div>
</template>

<style scoped>

</style>
