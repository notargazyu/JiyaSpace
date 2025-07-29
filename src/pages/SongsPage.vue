<script setup>
import { ref } from 'vue'
import CardBox from '@/bits/the-usual/CardBox.vue'
import { useMusicStore } from '@/the-brain/music.js'
import NowPlayingIcon from '@/bits/icons/NowPlayingIcon.vue' // Impor ikon baru

const musicStore = useMusicStore()
const songs = ref(musicStore.playlist)

const handlePlaySong = (index) => {
  musicStore.selectTrack(index)
}
</script>

<template>
  <div>
    <h1 class="page-title">Playlist</h1>
    <p class="page-subtitle">A curated list of tracks for every mood and moment.</p>
    <div class="songs-grid">
      <div
        v-for="(song, index) in songs"
        :key="song.id"
        class="song-card-wrapper"
        :class="{
          'is-playing': musicStore.currentTrackIndex === index && musicStore.isPlaying,
          'is-paused': musicStore.currentTrackIndex === index && !musicStore.isPlaying,
        }"
        :style="{ animationDelay: `${index * 100}ms` }"
        @click="handlePlaySong(index)"
      >
        <CardBox class="song-card">
          <div class="album-art-container">
            <img
              :src="song.albumArt"
              :alt="`Album art for ${song.title}`"
              class="album-art"
              onerror="this.onerror=null;this.src='https://placehold.co/300x300/1e1e1e/e9ecef?text=Error';"
            />
            <!-- Ikon "Now Playing" yang muncul saat lagu diputar -->
            <div class="overlay">
              <NowPlayingIcon class="now-playing-icon" />
            </div>
          </div>
          <div class="song-info">
            <h3 class="song-title">{{ song.title }}</h3>
            <p class="song-artist">{{ song.artist }}</p>
          </div>
        </CardBox>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ... style lama tidak berubah ... */
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
.songs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}
.song-card-wrapper {
  animation: fadeIn 0.6s ease-out both;
  cursor: pointer;
}
.song-card {
  padding: 0;
  overflow: hidden;
}
.album-art-container {
  position: relative;
  padding-bottom: 100%;
}
.album-art {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.song-card:hover .album-art {
  transform: scale(1.1);
}
.song-info {
  padding: 1rem;
}
.song-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
}
.song-artist {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0.25rem 0 0 0;
}

/* === STYLE BARU UNTUK INDIKATOR "NOW PLAYING" === */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.now-playing-icon {
  width: 48px;
  height: 48px;
  color: white;
}
.song-card-wrapper.is-playing .overlay {
  opacity: 1;
}
.song-card-wrapper.is-playing .album-art {
  transform: scale(1.1);
}
</style>
