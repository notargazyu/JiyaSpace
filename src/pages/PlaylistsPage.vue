<script setup>
// Impor langsung dan gunakan di template, ini lebih bersih
import { playlists } from '@/db/data.js'
</script>

<template>
  <div>
    <h1 class="page-title">Music</h1>
    <p class="page-subtitle">Your personal collection of playlists.</p>
    <div class="playlists-grid">
      <RouterLink
        v-for="(playlist, index) in playlists"
        :key="playlist.id"
        :to="`/playlist/${playlist.id}`"
        class="playlist-card-link"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="playlist-card">
          <img
            :src="playlist.coverArt"
            :alt="`Cover for ${playlist.name}`"
            class="playlist-cover"
            onerror="this.onerror=null;this.src='https://placehold.co/300x300/1e1e1e/e9ecef?text=Error';"
          />
          <div class="playlist-info">
            <h3 class="playlist-name">{{ playlist.name }}</h3>
            <p class="playlist-song-count">{{ playlist.songs.length }} songs</p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* Style tidak berubah */
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
.playlists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}
.playlist-card-link {
  text-decoration: none;
  animation: fadeIn 0.6s ease-out both;
}
.playlist-card {
  background-color: var(--card-bg);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}
.playlist-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px var(--shadow);
}
.playlist-cover {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}
.playlist-info {
  padding: 1rem;
}
.playlist-name {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
}
.playlist-song-count {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0.25rem 0 0 0;
}
</style>
