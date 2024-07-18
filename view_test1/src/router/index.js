import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CiccioView from '../views/CiccioView.vue'
import FarmerView from '../views/FarmerView.vue'
import FarmView from '@/views/FarmView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/ciccio',
      name: 'ciccio',
      component: CiccioView
    },
    {
      path: '/farmer',
      name: 'farmer',
      component: FarmerView
    },
    {
      path: '/farm',
      name: 'farm',
      component: FarmView
    }
  ]
})

export default router
