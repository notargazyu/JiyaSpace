<script setup>
import { ref, onMounted } from 'vue'
import { useThemeStore } from '@/the-brain/theme.js'
import { useMusicStore } from '@/the-brain/music.js'
import CloseIcon from '@/bits/icons/CloseIcon.vue'
import SunIcon from '@/bits/icons/SunIcon.vue'
import MoonIcon from '@/bits/icons/MoonIcon.vue'
import PlayIcon from '@/bits/icons/PlayIcon.vue'
import PauseIcon from '@/bits/icons/PauseIcon.vue'

defineProps({
  navLinks: Array,
})

const emit = defineEmits(['close'])
const themeStore = useThemeStore()
const musicStore = useMusicStore()

const presetColors = ['#0d6efd', '#d63384', '#198754', '#fd7e14', '#6f42c1']

const isVisible = ref(false)
onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true
  })
})

const handleClose = () => {
  isVisible.value = false
  setTimeout(() => {
    emit('close')
  }, 300)
}
</script>

<template>
  <div class="mobile-nav-wrapper is-visible">
    <div class="overlay" :class="{ 'is-visible': isVisible }" @click="handleClose"></div>
    <aside class="sidebar" :class="{ 'is-visible': isVisible }">
      <div class="sidebar-header">
        <h3>Menu</h3>
        <button @click="handleClose" class="close-button" aria-label="Close menu">
          <CloseIcon />
        </button>
      </div>
      <nav class="sidebar-nav">
        <div v-for="link in navLinks" :key="link.text">
          <RouterLink v-if="link.to" :to="link.to" class="nav-link" @click="handleClose">{{
            link.text
          }}</RouterLink>
          <div v-if="link.children" class="nav-group">
            <span class="group-title">{{ link.text }}</span>
            <RouterLink
              v-for="child in link.children"
              :key="child.text"
              :to="child.to"
              class="nav-link sub-link"
              @click="handleClose"
            >
              {{ child.text }}
            </RouterLink>
          </div>
        </div>
      </nav>
      <div class="controls-section">
        <div class="now-playing" v-if="musicStore.currentTrack">
          <img :src="musicStore.currentTrack.albumArt" class="album-art" />
          <div class="song-details">
            <p class="song-title">{{ musicStore.currentTrack.title }}</p>
            <p class="song-artist">{{ musicStore.currentTrack.artist }}</p>
          </div>
          <button @click="musicStore.togglePlay" class="play-pause-button">
            <PauseIcon v-if="musicStore.isPlaying" />
            <PlayIcon v-else />
          </button>
        </div>
        <div class="theme-controls">
          <div class="color-picker">
            <h4 class="control-title">Accent</h4>
            <div class="color-swatches">
              <button
                v-for="color in presetColors"
                :key="color"
                class="swatch"
                :style="{ backgroundColor: color }"
                :class="{ active: themeStore.accentColor === color }"
                @click="themeStore.setAccentColor(color)"
              ></button>
            </div>
          </div>
          <div class="dark-mode-toggle">
            <h4 class="control-title">Mode</h4>
            <button @click="themeStore.toggleDarkMode" class="toggle-button">
              <SunIcon v-if="themeStore.isDarkMode" />
              <MoonIcon v-else />
            </button>
          </div>
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
.overlay.is-visible {
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
.sidebar.is-visible {
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
.controls-section {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}
.now-playing {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: var(--bg);
  border-radius: 12px;
  margin-bottom: 1.5rem;
}
.album-art {
  width: 40px;
  height: 40px;
  border-radius: 6px;
}
.song-details {
  flex-grow: 1;
  min-width: 0;
}
.song-title {
  font-weight: 700;
  font-size: 0.9rem;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.song-artist {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin: 0;
}
.play-pause-button {
  background: none;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}
.play-pause-button svg {
  width: 16px;
  height: 16px;
}
.theme-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.control-title {
  margin: 0 0 0.5rem 0;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
}
.color-swatches {
  display: flex;
  gap: 0.5rem;
}
.swatch {
  width: 24px;
  height: 24px;
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
}
.toggle-button {
  background-color: var(--bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.5rem;
  color: var(--text-primary);
  display: flex;
}
</style>
