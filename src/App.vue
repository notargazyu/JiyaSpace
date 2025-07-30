<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import HeaderThing from '@/bits/the-usual/HeaderThing.vue'
import FooterThing from '@/bits/the-usual/FooterThing.vue'
import MobileNav from '@/bits/features/MobileNav.vue'
import { useThemeStore } from '@/the-brain/theme.js'

useThemeStore()

const isMobileNavOpen = ref(false)

const navLinks = ref([
  { text: 'Notes', to: '/notes' },
  { text: 'Music', to: '/songs' },
  {
    text: 'Games',
    children: [{ text: 'Sky Clock', to: '/sky-clock' }],
  },
])
</script>

<template>
  <div class="app-wrapper">
    <HeaderThing @open-mobile-nav="isMobileNavOpen = true" />
    <main class="main-content-area">
      <RouterView v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <FooterThing />
    <MobileNav v-if="isMobileNavOpen" :nav-links="navLinks" @close="isMobileNavOpen = false" />
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content-area {
  flex-grow: 1;
  max-width: 800px;
  width: 100%;
  margin: 2.5rem auto;
  padding: 0 1rem;
  box-sizing: border-box;
}
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>
