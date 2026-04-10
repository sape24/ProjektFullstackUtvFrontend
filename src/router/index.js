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
      meta: { requiresAuth: true },
    },
    {
      path: '/myaccount',
      name: 'myaccount',
      component: myAccountView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/')
  } else {
    next()
  }
})

export default router
