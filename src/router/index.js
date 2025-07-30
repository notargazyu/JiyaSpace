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
      name: 'playlists',
      component: () => import('@/pages/PlaylistsPage.vue'),
    },
    {
      path: '/playlist/:id',
      name: 'playlist-detail',
      component: () => import('@/pages/SongsPage.vue'),
    },
    {
      path: '/sky-clock',
      name: 'sky-clock',
      component: () => import('@/pages/SkyClockPage.vue'),
    },
    // Rute "Catch-all" BARU untuk halaman 404
    // Ini harus selalu menjadi yang terakhir di dalam daftar
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/NotFoundPage.vue'),
    },
  ],
})

export default router
