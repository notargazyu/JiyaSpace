<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import GitHubIcon from '@/bits/icons/GitHubIcon.vue'
import InstagramIcon from '@/bits/icons/InstagramIcon.vue'
import FacebookIcon from '@/bits/icons/FacebookIcon.vue'
import ArrowUpIcon from '@/bits/icons/ArrowUpIcon.vue'

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
        <p class="copyright-text">&copy; {{ new Date().getFullYear() }} JiyaSpace.</p>
      </div>
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
.footer-left,
.footer-right {
  display: flex;
  align-items: center;
  gap: 1rem;
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
</style>
