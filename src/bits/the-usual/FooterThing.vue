<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import GitHubIcon from '@/bits/icons/GitHubIcon.vue'
import InstagramIcon from '@/bits/icons/InstagramIcon.vue'
import FacebookIcon from '@/bits/icons/FacebookIcon.vue'
import ArrowUpIcon from '@/bits/icons/ArrowUpIcon.vue'
import PaletteIcon from '@/bits/icons/PaletteIcon.vue' // Impor ikon baru

// Definisikan event yang akan dikirim ke parent
const emit = defineEmits(['toggle-color-picker'])

const socialLinks = ref([
  { name: 'GitHub', url: 'https://github.com', icon: GitHubIcon },
  { name: 'Instagram', url: 'https://instagram.com', icon: InstagramIcon },
  { name: 'Facebook', url: 'https://facebook.com', icon: FacebookIcon },
])

const isScrolled = ref(false)
const handleScroll = () => {
  isScrolled.value = window.scrollY > 200
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-left">
        <!-- Tombol BARU untuk membuka color picker -->
        <button
          @click="emit('toggle-color-picker')"
          class="icon-button"
          aria-label="Change accent color"
        >
          <PaletteIcon />
        </button>
      </div>

      <p class="copyright-text">&copy; {{ new Date().getFullYear() }} JiyaSpace.</p>

      <div class="footer-right">
        <div class="social-links">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            class="social-icon"
            :aria-label="link.name"
          >
            <component :is="link.icon" />
          </a>
        </div>
        <transition name="fade">
          <button
            v-if="isScrolled"
            @click="scrollToTop"
            class="back-to-top"
            aria-label="Back to top"
          >
            <ArrowUpIcon />
          </button>
        </transition>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* ... style lama ... */
.site-footer {
  padding: 2rem 1rem;
  border-top: 1px solid var(--border-color);
  transition: border-color 0.3s;
}
.footer-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.copyright-text {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* === PERUBAHAN & STYLE BARU === */
.footer-left,
.footer-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.icon-button {
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  transition: all 0.3s ease;
}
.icon-button:hover {
  color: var(--text-primary);
  background-color: var(--accent-soft);
}
.icon-button svg {
  width: 22px;
  height: 22px;
}

.social-links {
  display: flex;
  gap: 0.5rem;
}
.social-icon {
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.social-icon:hover {
  color: var(--text-primary);
  background-color: var(--accent-soft);
}
.social-icon svg {
  width: 22px;
  height: 22px;
  display: block;
}

.back-to-top {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px var(--shadow);
}
.back-to-top:hover {
  background-color: var(--accent);
  color: var(--card-bg);
  border-color: var(--accent);
  transform: translateY(-3px) scale(1.05);
}
.back-to-top svg {
  width: 20px;
  height: 20px;
}

/* === PENAMBAHAN MEDIA QUERY UNTUK TAMPILAN HP === */
@media (max-width: 640px) {
  .footer-content {
    flex-direction: column; /* Ubah tata letak menjadi vertikal */
    gap: 1.5rem; /* Tambah jarak vertikal */
  }

  .copyright-text {
    order: 2; /* Pindahkan teks copyright ke tengah */
  }

  .footer-left {
    order: 3; /* Pindahkan tombol color picker ke bawah */
  }

  .footer-right {
    order: 1; /* Pindahkan social media ke paling atas */
  }
}
</style>
