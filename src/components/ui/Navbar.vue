<template>
  <div class="navbar p-8 flex justify-between items-center border-b-[1px] border-zinc-300 relative">
    <!-- Display screen -->
    <div class="left-0 hidden md:flex items-center gap-14">
      <RouterLink to="/" class="">
        <img src="/src/assets/logo/brand.png" class="h-10" alt="Aktiv-fits">
      </RouterLink>
      <div class="items space-x-4 kanit-thin">
        <RouterLink
          class="item hover:border-b-2 py-[38px] px-5"
          v-for="item in navItems"
          :to="item.path"
          :key="item.index"
        >
          {{ item.name }} 
        </RouterLink>
      </div>
      
    </div>

    <div class="hidden md:flex gap-2 right space-x-2">
      <RouterLink to="/cart" class="">
        <img src="/src/assets/icons/cart.svg" class="h-10" alt="Aktiv-fits">
      </RouterLink>
      <button v-if="!currentUser" @click="signInWithGoogle"
        class="flex gap-2 items-center rounded-md py-1.5 px-4 border-[1px] hover:bg-zinc-600 hover:text-white transition-all duration-300"
      >
      <img src="/src/assets/icons/google.svg" alt="Aktiv-Fits" class="h-6" />
        Sign in 
      </button>
      <div v-else class="relative">
        <button @click="toggleDropdown" class="rounded-full bg-gray-200 text-black p-2">
          {{ userInitials }}
        </button>
        <div v-if="dropdownVisible" class="bg-zinc-100 hover:bg-zinc-200 absolute right-0 mt-2 py-2 rounded-md shadow-xl z-20">
          <button @click="signOut" class="block w-full text-md text-left kanit-thin px-7 py-2 ">
            Logout
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile screen -->
    <div class="block md:hidden">
      <RouterLink to="/" @click="toggleMenu">
        <img src="/src/assets/logo/brand.png" class="h-12" alt="Aktiv-fits">
      </RouterLink>
    </div>
    <div class="flex md:hidden items-center">
      <RouterLink class="mx-2" to="/cart">
        <img src="/src/assets/icons/cart.svg" alt="Aktiv-Fits" class="h-8" />
      </RouterLink>
      <button @click="toggleMenu" class="p-2">
        <svg v-if="!show" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
        <svg v-if="show" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <transition name="slide-left">
    <div
      v-if="show"
      class="border-t-[1px] border-zinc-300 kanit-medium left-0 top-24 bg-transparent backdrop-blur-[20px] w-full dropdown absolute h-screen p-3 z-50 space-y-3">
      <RouterLink
        class="bg-transparent item text-xl"
        @click="toggleMenu"
        v-for="item in navItems"
        :to="item.path"
        :key="item.index"
      >
        {{ item.name }}
        <hr class="my-4 border-t-[1px] bg-white border-zinc-400"/>
      </RouterLink>

      <!-- Display user info or sign-in button on mobile -->
      <button v-if="!currentUser" @click="signInWithGoogle"
        class="flex gap-2 items-center rounded-md py-1.5 px-4 border-[1px] hover:bg-zinc-600 hover:text-white transition-all duration-300">
      <img src="/src/assets/icons/google.svg" alt="Aktiv-Fits" class="h-6" />
        Sign in 
      </button>
      <div v-else class="flex flex-col items-center">
        <p class="text-lg mb-2 kanit-thin">{{ currentUser.displayName }}</p>
        <button @click="signOut" class="w-full py-2 px-4 bg-red-500 text-white rounded">
          Logout
        </button>
      </div>
    </div>
  </transition>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import Button from '../button/Button.vue';
import { auth, provider } from '@/firebase/firebase.js';
import { signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase.js';

const navItems = ref([
  { name: 'Shirts', path: '/shop' },
  { name: 'T-Shirts', path: '/shop' },
  { name: 'Trousers', path: '/shop' },
  { name: 'Shorts', path: '/shop' },
  
]);

const show = ref(false);
const currentUser = ref(null);
const dropdownVisible = ref(false);

const toggleMenu = () => {
  show.value = !show.value;
};

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const userInitials = computed(() => {
  if (currentUser.value && currentUser.value.displayName) {
    const names = currentUser.value.displayName.split(' ');
    return names.map(name => name[0]).join('');
  }
  return '';
});

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const loginTime = new Date().getTime(); // Current time in milliseconds
    localStorage.setItem('loginTime', loginTime);
    localStorage.setItem('email',user.email);

    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName
    });

    currentUser.value = {
      displayName: user.displayName,
      email: user.email
    };

  } catch (error) {
    console.error('Error during sign in:', error);
  }
};

const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    currentUser.value = null;
    dropdownVisible.value = false;
    localStorage.removeItem('loginTime');
    localStorage.removeItem('email');
  } catch (error) {
    console.error('Error during sign out:', error);
  }
};

const checkSession = () => {
  const loginTime = parseInt(localStorage.getItem('loginTime'), 10);
  const currentTime = new Date().getTime();
  const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

  if (loginTime && (currentTime - loginTime > twoDaysInMillis)) {
    signOut();
  }
};

onMounted(() => {
  checkSession();

  auth.onAuthStateChanged(user => {
    if (user) {
      currentUser.value = {
        displayName: user.displayName,
        email: user.email
      };
    } else {
      currentUser.value = null;
    }
  });
});
</script>

<style scoped>
/* Add any additional styles here */
.slide-left-enter-active, .slide-left-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter, .slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-left-enter-to, .slide-left-leave {
  transform: translateX(0%);
}
</style>
