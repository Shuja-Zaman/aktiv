<template>
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Logo & Description -->
          <div class="flex flex-col items-center md:items-start">
            <img src="/src/assets/logo/image.png" alt="Aktiv-Fits" class="w-32 mb-4" />
            <p class="text-gray-400 text-sm">
              The best place to find premium clothing. Shop now and stay active!
            </p>
          </div>
  
          <!-- Navigation Links -->
          <div class="flex flex-col sm:items-start md:items-center md:items-start">
            <ul class="space-y-2">
              <li>
                <RouterLink to="/shop" class="hover:text-gray-300">Shop</RouterLink>
              </li>
              <li>
                <RouterLink to="/" class="hover:text-gray-300">About Us</RouterLink>
              </li>
              <li>
                <RouterLink to="/contact" class="hover:text-gray-300">Contact Us</RouterLink>
              </li>
              <li>
                <RouterLink to="/" class="hover:text-gray-300">Privacy Policy</RouterLink>
              </li>
            </ul>
          </div>
  
          <!-- Contact Information -->
          <div class="flex flex-col items-center md:items-start">
            <h4 class="text-lg font-semibold mb-4">Contact Us</h4>
            <p class="text-gray-400 text-sm mb-2">
              Email: <a href="mailto:aktiv.store.fits@gmail.com" class="hover:text-gray-300">aktiv.store.fits@gmail.com</a>
            </p>
            <p class="text-gray-400 text-sm mb-2">
              Phone/Whatsapp <a href="tel:+03390252521" class="hover:text-gray-300">+03390252521</a>
            </p>
            <div class="flex space-x-4 mt-4 items-center">
              <a href="https://instagram.com" target="_blank" class="text-gray-400 hover:text-gray-300">
                <img src="/src/assets/icons/instagram.svg" class="h-6 w-6" alt="">
              </a>
              <a href="https://linkedin.com" target="_blank" class="text-gray-400 hover:text-gray-300">
                <img src="/src/assets/icons/linkedin.svg" class="h-7 w-7" alt="">
              </a>
              <!-- Add more social media icons as needed -->
            </div>
          </div>
        </div>
  
        <!-- Footer Bottom -->
        <div class="mt-8 border-t border-gray-700 pt-4 text-center">
          <p class="text-gray-400 text-sm">
            &copy; {{ new Date().getFullYear() }} Aktiv-Fits. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  