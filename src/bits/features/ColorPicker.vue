<script setup>
import { useThemeStore } from '@/the-brain/theme.js'

const themeStore = useThemeStore()

// Daftar warna preset yang bisa dipilih
const presetColors = [
  '#0d6efd', // Biru (Default)
  '#d63384', // Pink
  '#198754', // Hijau
  '#fd7e14', // Oranye
  '#6f42c1', // Ungu
]
</script>

<template>
  <div class="color-picker-panel">
    <h3 class="panel-title">Accent Color</h3>
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
</template>

<style scoped>
.color-picker-panel {
  position: fixed;
  bottom: 6rem; /* Posisikan di atas footer */
  right: 1.5rem;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 8px 30px var(--shadow);
  z-index: 100;
}
.panel-title {
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
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
