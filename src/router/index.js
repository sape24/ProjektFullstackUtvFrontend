import { createRouter, createWebHistory } from 'vue-router'
import loginView from '@/views/loginView.vue'
import registerView from '@/views/registerView.vue'
import productsView from '@/views/productsView.vue'
import myAccountView from '@/views/myAccountView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: loginView,
    },
    {
      path: '/register',
      name: 'register',
      component: registerView,
    },
    {
      path: '/products',
      name: 'products',
      component: productsView,
    },
    {
      path: '/myaccount',
      name: 'myaccount',
      component: myAccountView,
    },
  ],
})

export default router
