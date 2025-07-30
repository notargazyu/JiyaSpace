<script setup>
import { ref } from 'vue'
import CardBox from '@/bits/the-usual/CardBox.vue'
import PinIcon from '@/bits/icons/PinIcon.vue'
import GitHubIcon from '@/bits/icons/GitHubIcon.vue'
import InstagramIcon from '@/bits/icons/InstagramIcon.vue'
import FacebookIcon from '@/bits/icons/FacebookIcon.vue'

const skills = ref([
  { name: 'Tidur 8 jam', level: 95 },
  { name: 'Nonton series maraton', level: 80 },
  { name: 'Makan Indomie tengah malam', level: 99 },
  { name: 'Overthinking', level: 75 },
])
const pinnedNote = ref('invest in yourself, it pays off.')
const favoriteQuote = ref({
  text: 'The best error message is the one that never appears.',
  author: 'Thomas Fuchs',
})
// Hapus Netlify dari data techStack
const techStack = ref([
  { name: 'Vue.js', logo: 'https://vuejs.org/images/logo.png' },
  { name: 'Vite', logo: 'https://vitejs.dev/logo.svg' },
  { name: 'Node.js', logo: 'https://nodejs.org/static/images/logo.svg' },
])
const socialLinks = ref([
  { name: 'GitHub', url: 'https://github.com', icon: GitHubIcon },
  { name: 'Instagram', url: 'https://instagram.com', icon: InstagramIcon },
  { name: 'Facebook', url: 'https://facebook.com', icon: FacebookIcon },
])
</script>

<template>
  <div class="page-grid">
    <CardBox class="animated-card welcome-card">
      <div class="home-container">
        <h1 class="title">Digital Sanctuary.</h1>
        <p class="subtitle">
          A place to dump my thoughts, favorite tunes, and other random stuff I build.
        </p>
      </div>
    </CardBox>
    <CardBox class="animated-card" style="animation-delay: 100ms">
      <h2 class="section-title">Pinned Note</h2>
      <div class="note-like">
        <PinIcon class="icon" />
        <p>{{ pinnedNote }}</p>
      </div>
    </CardBox>
    <CardBox class="animated-card" style="animation-delay: 200ms">
      <h2 class="section-title">Quote of the Day</h2>
      <blockquote class="quote-block">
        <p class="quote-text">“{{ favoriteQuote.text }}”</p>
        <cite class="quote-author">— {{ favoriteQuote.author }}</cite>
      </blockquote>
    </CardBox>
    <CardBox class="animated-card skills-card" style="animation-delay: 300ms">
      <h2 class="section-title">My Pro-Level Skills</h2>
      <ul class="skills-list">
        <li v-for="skill in skills" :key="skill.name" class="skill-item">
          <span class="skill-name">{{ skill.name }}</span>
          <div class="skill-bar-container">
            <div class="skill-bar" :style="{ width: `${skill.level}%` }"></div>
          </div>
        </li>
      </ul>
    </CardBox>
    <CardBox class="animated-card" style="animation-delay: 400ms">
      <h2 class="section-title">My Tech Stack</h2>
      <div class="tech-stack-grid">
        <!-- Hapus teks di bawah ikon -->
        <div v-for="tech in techStack" :key="tech.name" class="tech-item">
          <img :src="tech.logo" :alt="tech.name" class="tech-logo" />
        </div>
      </div>
    </CardBox>
    <CardBox class="animated-card" style="animation-delay: 500ms">
      <h2 class="section-title">Find me on</h2>
      <div class="social-links-grid">
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.url"
          target="_blank"
          class="social-link"
        >
          <component :is="link.icon" class="icon" />
          <span>{{ link.name }}</span>
        </a>
      </div>
    </CardBox>
  </div>
</template>

<style scoped>
.page-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
.welcome-card,
.skills-card {
  grid-column: 1 / -1;
}
.animated-card {
  animation: fadeIn 0.6s ease-out both;
}
.home-container {
  text-align: left;
}
.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
}
.subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
}
.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--text-primary);
}
.icon {
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
  flex-shrink: 0;
}
.note-like {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--accent-soft);
  padding: 1rem;
  border-radius: 12px;
}
.note-like p {
  margin: 0;
  font-style: italic;
  color: var(--text-secondary);
}
.skills-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.skill-name {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: block;
}
.skill-bar-container {
  width: 100%;
  height: 10px;
  background-color: var(--bg);
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}
.skill-bar {
  height: 100%;
  background-color: var(--accent);
  border-radius: 5px;
}
.quote-block {
  margin: 0;
}
.quote-text {
  font-size: 1.2rem;
  font-style: italic;
  margin: 0 0 1rem 0;
  border-left: 3px solid var(--accent);
  padding-left: 1rem;
}
.quote-author {
  display: block;
  text-align: right;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* === PERBAIKAN DI SINI === */
.tech-stack-grid {
  display: flex; /* Ganti ke flexbox untuk baris sederhana */
  align-items: center;
  gap: 1.5rem; /* Jarak antar ikon */
}
.tech-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  transition: transform 0.3s ease;
}
.tech-logo:hover {
  transform: scale(1.15);
}
/* === AKHIR PERBAIKAN === */

.social-links-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--bg);
  border: 1px solid var(--border-color);
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
  transition: all 0.3s ease;
}
.social-link:hover {
  background-color: var(--accent);
  color: white;
  border-color: var(--accent);
  transform: translateY(-3px);
}
.social-link:hover .icon {
  color: white;
}
</style>
