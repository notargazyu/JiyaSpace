import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/notes',
      name: 'notes',
      component: () => import('@/pages/NotesPage.vue'),
    },
    {
      path: '/songs',
      name: 'songs',
      component: () => import('@/pages/SongsPage.vue'),
    },
    // Rute BARU untuk Sky Clock
    {
      path: '/sky-clock',
      name: 'sky-clock',
      component: () => import('@/pages/SkyClockPage.vue'),
    },
  ],
})

export default router
