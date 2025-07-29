import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // STATE: Mengelola mode gelap dan warna aksen
  const isDarkMode = ref(localStorage.getItem('theme-mode') === 'dark' || false)
  const accentColor = ref(localStorage.getItem('theme-accent') || '#0d6efd') // Default ke biru

  // ACTIONS: Fungsi untuk mengubah state
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
  }

  const setAccentColor = (color) => {
    accentColor.value = color
  }

  // EFEK: Secara otomatis menyimpan perubahan ke localStorage dan menerapkan ke website
  watchEffect(() => {
    // Terapkan mode gelap/terang
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark-mode')
      localStorage.setItem('theme-mode', 'dark')
    } else {
      document.documentElement.classList.remove('dark-mode')
      localStorage.setItem('theme-mode', 'light')
    }

    // Terapkan warna aksen
    document.documentElement.style.setProperty('--accent', accentColor.value)
    // Kita juga bisa membuat versi soft secara otomatis
    document.documentElement.style.setProperty('--accent-soft', `${accentColor.value}1a`) // Menambahkan transparansi
    localStorage.setItem('theme-accent', accentColor.value)
  })

  return { isDarkMode, accentColor, toggleDarkMode, setAccentColor }
})
