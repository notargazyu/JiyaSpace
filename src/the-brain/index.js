import { defineStore } from 'pinia'
import { useDarkMode } from '../magic/useDarkMode'

// defineStore butuh ID unik, kita pakai 'theme'
export const useThemeStore = defineStore('theme', () => {
  // Panggil 'otak'-nya dari composable
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  // State dan Action ini yang akan kita gunakan di komponen
  return {
    isDarkMode,
    toggleDarkMode,
  }
})
