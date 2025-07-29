<script setup>
import { ref } from 'vue'
import { useThemeStore } from '@/the-brain'
import { useMusicStore } from '@/the-brain/music.js'
import SunIcon from '@/bits/icons/SunIcon.vue'
import MoonIcon from '@/bits/icons/MoonIcon.vue'
import PlayIcon from '@/bits/icons/PlayIcon.vue'
import PauseIcon from '@/bits/icons/PauseIcon.vue'
import MenuIcon from '@/bits/icons/MenuIcon.vue'
import avatarUrl from '@/stuff/avatar.png'

const themeStore = useThemeStore()
const musicStore = useMusicStore()
const status = ref('Crafting digital experiences')

// Data navigasi dipindahkan ke App.vue, tapi kita bisa menyimpannya di sini juga jika diperlukan
const navLinks = ref([
  { text: 'Notes', to: '/notes' },
  { text: 'Music', to: '/songs' },
  {
    text: 'Games',
    children: [{ text: 'Sky Clock', to: '/sky-clock' }],
  },
])

const openDropdown = ref(null)
const emit = defineEmits(['open-mobile-nav'])
</script>

<template>
  <header class="main-header">
    <div class="header-content">
      <div class="left-section">
        <RouterLink to="/" class="profile-info">
          <img :src="avatarUrl" alt="Jiya's Avatar" class="avatar" />
          <div class="text-info">
            <span class="name">Jiya</span>
            <span class="status">{{ status }}</span>
          </div>
        </RouterLink>

        <div class="mini-player" v-if="musicStore.currentTrack">
          <div class="divider"></div>
          <img
            :src="musicStore.currentTrack.albumArt"
            :alt="musicStore.currentTrack.title"
            class="mini-album-art"
            onerror="this.onerror=null;this.src='https://placehold.co/40x40/1e1e1e/e9ecef?text=Err';"
          />
          <div class="mini-song-details">
            <p class="mini-song-title">{{ musicStore.currentTrack.title }}</p>
            <p class="mini-song-artist">{{ musicStore.currentTrack.artist }}</p>
            <div class="progress-bar-container">
              <div class="progress-bar" :style="{ width: `${musicStore.progress}%` }"></div>
            </div>
          </div>
          <button @click="musicStore.togglePlay" class="mini-play-pause" aria-label="Play/Pause">
            <PauseIcon v-if="musicStore.isPlaying" />
            <PlayIcon v-else />
          </button>
        </div>
      </div>

      <!-- Navigasi Desktop (akan disembunyikan di HP) -->
      <nav class="desktop-navigation">
        <div
          v-for="link in navLinks"
          :key="link.text"
          class="nav-item"
          @mouseenter="openDropdown = link.children ? link.text : null"
          @mouseleave="openDropdown = null"
        >
          <RouterLink v-if="link.to" :to="link.to" class="nav-link">{{ link.text }}</RouterLink>
          <span v-if="link.children" class="nav-link has-dropdown">{{ link.text }}</span>
          <transition name="dropdown-fade">
            <div v-if="link.children && openDropdown === link.text" class="dropdown-menu">
              <RouterLink
                v-for="child in link.children"
                :key="child.text"
                :to="child.to"
                class="dropdown-item"
              >
                {{ child.text }}
              </RouterLink>
            </div>
          </transition>
        </div>
        <button
          @click="themeStore.toggleDarkMode"
          class="theme-toggle"
          aria-label="Toggle dark mode"
        >
          <SunIcon v-if="themeStore.isDarkMode" />
          <MoonIcon v-else />
        </button>
      </nav>

      <!-- Tombol Menu Mobile (hanya muncul di HP) -->
      <div class="mobile-controls">
        <button @click="emit('open-mobile-nav')" class="menu-button" aria-label="Open menu">
          <MenuIcon />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* ... style lama tidak berubah ... */
.main-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--bg);
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.3s ease;
}
.header-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
}
.profile-info {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  min-width: 0;
}
.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  object-fit: cover;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}
.profile-info:hover .avatar {
  transform: scale(1.1) rotate(10deg);
}
.text-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}
.status {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mini-player {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.divider {
  width: 1px;
  height: 30px;
  background-color: var(--border-color);
}
.mini-album-art {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}
.mini-song-details {
  width: 120px;
}
.mini-song-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mini-song-artist {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin: 0.1rem 0 0.3rem 0;
}
.mini-play-pause {
  background: none;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}
.mini-play-pause:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.mini-play-pause svg {
  width: 16px;
  height: 16px;
}
.progress-bar-container {
  width: 100%;
  height: 4px;
  background-color: var(--border-color);
  border-radius: 2px;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background-color: var(--accent);
  border-radius: 2px;
  transition: width 0.25s linear;
}

/* === STYLE BARU UNTUK NAVIGASI RESPONSIVE === */
.desktop-navigation {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.nav-item {
  position: relative;
}
.nav-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: block;
}
.nav-link.has-dropdown {
  cursor: default;
}
.nav-item:hover .nav-link {
  color: var(--text-primary);
  background-color: var(--accent-soft);
}
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  transition: all 0.3s ease;
  margin-left: 0.5rem;
}
.theme-toggle:hover {
  color: var(--text-primary);
  background-color: var(--accent-soft);
  transform: scale(1.1);
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 8px 25px var(--shadow);
  padding: 0.5rem;
  min-width: 160px;
  z-index: 20;
}
.dropdown-item {
  display: block;
  padding: 0.5rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}
.dropdown-item:hover {
  background-color: var(--accent-soft);
  color: var(--text-primary);
}
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.mobile-controls {
  display: none;
} /* Sembunyikan di desktop */
.menu-button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  transition: all 0.3s ease;
}
.menu-button:hover {
  color: var(--text-primary);
  background-color: var(--accent-soft);
}

/* Titik di mana layout berubah */
@media (max-width: 768px) {
  .desktop-navigation {
    display: none;
  } /* Sembunyikan nav desktop di HP */
  .mobile-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  } /* Tampilkan kontrol mobile di HP */
  .mini-player {
    display: none;
  } /* Sembunyikan mini player di HP agar header tidak terlalu ramai */
  .status {
    max-width: 100px;
  } /* Batasi lebar status agar tidak mendorong layout */
}
</style>
