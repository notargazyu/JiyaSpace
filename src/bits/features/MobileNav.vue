<script setup>
import { useThemeStore } from '@/the-brain/theme.js'

// Menerima props dari parent (App.vue)
// 'const props =' dihapus karena tidak digunakan di dalam script
defineProps({
  isOpen: Boolean,
  navLinks: Array,
})

// Mendefinisikan event untuk dikirim ke parent
const emit = defineEmits(['close'])

const themeStore = useThemeStore()
const presetColors = ['#0d6efd', '#d63384', '#198754', '#fd7e14', '#6f42c1']
</script>

<template>
  <div class="mobile-nav-wrapper" :class="{ 'is-open': isOpen }">
    <!-- Overlay gelap di belakang menu -->
    <div class="overlay" @click="emit('close')"></div>

    <!-- Panel menu yang meluncur -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h3>Menu</h3>
        <button @click="emit('close')" class="close-button" aria-label="Close menu">
          <CloseIcon />
        </button>
      </div>
      <nav class="sidebar-nav">
        <div v-for="link in navLinks" :key="link.text">
          <!-- Jika item adalah link biasa -->
          <RouterLink v-if="link.to" :to="link.to" class="nav-link" @click="emit('close')">{{
            link.text
          }}</RouterLink>

          <!-- Jika item adalah dropdown -->
          <div v-if="link.children" class="nav-group">
            <span class="group-title">{{ link.text }}</span>
            <RouterLink
              v-for="child in link.children"
              :key="child.text"
              :to="child.to"
              class="nav-link sub-link"
              @click="emit('close')"
            >
              {{ child.text }}
            </RouterLink>
          </div>
        </div>
      </nav>

      <!-- Pemilih Warna, sekarang di dalam menu samping -->
      <div class="color-picker-section">
        <h3 class="section-title">Accent Color</h3>
        <div class="color-swatches">
          <button
            v-for="color in presetColors"
            :key="color"
            class="swatch"
            :style="{ backgroundColor: color }"
            :class="{ active: themeStore.accentColor === color }"
            @click="themeStore.setAccentColor(color)"
            :aria-label="`Set color to ${color}`"
          ></button>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.mobile-nav-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  pointer-events: none; /* Tidak bisa diklik saat tertutup */
}
.mobile-nav-wrapper.is-open {
  pointer-events: auto; /* Bisa diklik saat terbuka */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.mobile-nav-wrapper.is-open .overlay {
  opacity: 1;
}

.sidebar {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  max-width: 80vw;
  height: 100%;
  background-color: var(--card-bg);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  box-sizing: border-box;
}
.mobile-nav-wrapper.is-open .sidebar {
  transform: translateX(0);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.sidebar-header h3 {
  margin: 0;
  font-size: 1.5rem;
}
.close-button {
  background: none;
  border: none;
  padding: 0.5rem;
  color: var(--text-secondary);
  cursor: pointer;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.nav-link {
  display: block;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
  transition: background-color 0.2s ease;
}
.nav-link:hover {
  background-color: var(--accent-soft);
}
.nav-group {
  margin-top: 1rem;
}
.group-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
  display: block;
}
.sub-link {
  padding-left: 2rem;
}

.color-picker-section {
  margin-top: auto; /* Mendorong ke bawah */
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}
.section-title {
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  font-weight: 700;
}
.color-swatches {
  display: flex;
  gap: 0.75rem;
}
.swatch {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s ease;
}
.swatch:hover {
  transform: scale(1.1);
}
.swatch.active {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent);
}
</style>
