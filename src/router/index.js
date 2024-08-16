import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress';
import ShopView from '@/views/ShopView.vue';
import ProductView from '@/views/ProductView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path:'/contact',
      name:'Contact',
      component: ()=> import('../views/ContactView.vue')
    },
    {
      path:'/shop',
      name:'Shop',
      component:ShopView
    },
    {
      path:'/product/:id',
      name:'Product',
      component:ProductView
    },
    {
      path:'/cart',
      name:'Cart',
      component:()=> import('../views/CartView.vue')
    },
    {
      path:'/thank-you',
      name:'Thank You',
      component: ()=>import('../views/ThankView.vue')
    },
    {
      path:'/user/admin',
      name:'Admin',
      component: ()=>import('../views/admin/AdminHome.vue'),
    },
    {
      path: '/:pathMatch(.*)*', // Catch-all route
      name:"Not Found",
      component:()=>import('../views/404View.vue')
    }
  ]
})

router.beforeEach(() => {
  NProgress.start(); // Start the progress bar on route change
});

router.afterEach(() => {
  NProgress.done(); // Complete the progress bar after route change
});

export default router;
