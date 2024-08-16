<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from './components/ui/Footer.vue';
import Navbar from './components/ui/Navbar.vue';
import Headline from './components/ui/Headline.vue';


</script>

<template>
  <div>
    <Headline/>
    <Navbar/>
      <RouterView />
    <Footer/>
  </div>
</template>

<style scoped>

</style>
