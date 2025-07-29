import { ref, watchEffect } from 'vue'

export function useDarkMode() {
  // Cek tema dari localStorage, atau dari preferensi OS, atau default ke light
  const isDarkMode = ref(
    localStorage.getItem('theme') === 'dark' ||
      (localStorage.getItem('theme') === null &&
        window.matchMedia('(prefers-color-scheme: dark)').matches),
  )

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
  }

  // watchEffect akan berjalan setiap kali isDarkMode berubah
  watchEffect(() => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark-mode')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark-mode')
      localStorage.setItem('theme', 'light')
    }
  })

  return {
    isDarkMode,
    toggleDarkMode,
  }
}
