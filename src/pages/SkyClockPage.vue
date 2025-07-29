<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import CardBox from '@/bits/the-usual/CardBox.vue'

// --- LOGIKA BARU YANG LEBIH AKURAT (berdasarkan file event-data.js) ---

// Data event diadaptasi, lokasi dihapus, dan warna ditambahkan
const skyEvents = ref([
  { name: 'Geyser', period: 120, offset: 5, duration: 10, color: '#3498db' },
  { name: "Grandma's Dinner", period: 120, offset: 35, duration: 10, color: '#e67e22' },
  { name: 'Turtle', period: 120, offset: 50, duration: 10, color: '#2ecc71' },
  {
    name: 'Dreams Skater',
    period: 120,
    offset: 60,
    duration: 10,
    days: [5, 6, 7],
    color: '#9b59b6',
  }, // Jumat, Sabtu, Minggu
])

const currentTime = ref(new Date())
let timerInterval = null

onMounted(() => {
  timerInterval = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timerInterval)
})

// Fungsi untuk mendapatkan waktu Sky (PST/UTC-7)
const getSkyTime = (date) => {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000
  return new Date(utc - 3600000 * 7) // UTC-7
}

// Fungsi untuk memformat sisa waktu menjadi HH:MM:SS
const formatTime = (seconds) => {
  if (seconds < 0) seconds = 0
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const eventTimers = computed(() => {
  const now = getSkyTime(currentTime.value)
  const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay() // Minggu = 7
  const minutesToday = now.getHours() * 60 + now.getMinutes()

  return skyEvents.value
    .filter((event) => !event.days || event.days.includes(dayOfWeek)) // Filter event berdasarkan hari
    .map((event) => {
      const totalMinutesInCycle = event.period
      const minutesIntoCurrentCycle =
        (minutesToday - event.offset + totalMinutesInCycle) % totalMinutesInCycle

      const minutesUntilNext = totalMinutesInCycle - minutesIntoCurrentCycle
      const secondsUntilNext = minutesUntilNext * 60 - now.getSeconds()

      const isActive = minutesUntilNext > totalMinutesInCycle - event.duration

      let status, countdown, progress

      if (isActive) {
        status = 'Active'
        const secondsRemaining =
          event.duration * 60 -
          (minutesIntoCurrentCycle - (totalMinutesInCycle - event.duration)) * 60 -
          now.getSeconds()
        countdown = formatTime(secondsRemaining)
        progress = (1 - secondsRemaining / (event.duration * 60)) * 100
      } else {
        status = 'Upcoming'
        countdown = formatTime(secondsUntilNext)
        const minutesSinceEnd = minutesIntoCurrentCycle
        progress = (minutesSinceEnd / (totalMinutesInCycle - event.duration)) * 100
      }

      return { ...event, status, countdown, progress }
    })
    .sort((a, b) => a.countdown.localeCompare(b.countdown)) // Urutkan berdasarkan waktu terdekat
})
</script>

<template>
  <div>
    <h1 class="page-title">Sky Clock</h1>
    <p class="page-subtitle">Real-time event timers for Sky: Children of the Light.</p>
    <div class="events-list">
      <CardBox
        v-for="(event, index) in eventTimers"
        :key="event.name"
        class="animated-card event-card"
        :class="{ 'is-active': event.status === 'Active' }"
        :style="{ animationDelay: `${index * 100}ms`, '--event-color': event.color }"
      >
        <div class="event-item">
          <div class="event-info">
            <!-- Teks lokasi sudah dihapus -->
            <h2 class="event-name">{{ event.name }}</h2>
          </div>
          <div class="event-timer">
            <p class="event-status">{{ event.status }}</p>
            <p class="countdown-time">{{ event.countdown }}</p>
          </div>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: `${event.progress}%` }"></div>
        </div>
      </CardBox>
    </div>
  </div>
</template>

<style scoped>
.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.page-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-top: 0;
  margin-bottom: 2.5rem;
}
.animated-card {
  animation: fadeIn 0.6s ease-out both;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-card {
  padding: 1.25rem 1.5rem;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  /* Gunakan variabel CSS untuk warna event */
  border-left: 5px solid transparent;
}

.event-card.is-active {
  border-left-color: var(--event-color);
  box-shadow: 0 0 15px var(--accent-soft);
}

.event-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* Penyesuaian untuk tampilan yang lebih minimalis */
.event-info {
  line-height: 1.2;
}

.event-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
}

.event-timer {
  text-align: right;
  flex-shrink: 0; /* Mencegah timer mengecil */
}

.event-status {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-secondary);
  margin: 0;
  text-transform: uppercase;
}

.event-card.is-active .event-status {
  color: var(--event-color);
}

.countdown-time {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
  margin: 0;
}

.progress-bar-container {
  width: 100%;
  height: 8px;
  background-color: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: var(--text-secondary);
  border-radius: 4px;
  transition: width 1s linear;
}

.event-card.is-active .progress-bar {
  /* Gunakan warna event untuk progress bar saat aktif */
  background-color: var(--event-color);
}
</style>
