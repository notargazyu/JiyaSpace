<script setup>
// 'ref' sudah tidak diperlukan dan dihapus
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMusicStore } from '@/the-brain/music.js'
// PERBAIKAN: Impor dari file data.js yang benar
import { playlists } from '@/db/data.js'
import PlayIcon from '@/bits/icons/PlayIcon.vue'
// 'PauseIcon' sudah tidak diperlukan dan dihapus
import NowPlayingIcon from '@/bits/icons/NowPlayingIcon.vue'

const route = useRoute()
const musicStore = useMusicStore()

// Temukan playlist yang sesuai berdasarkan ID dari URL
const playlist = computed(() => {
  // Gunakan 'playlists' yang diimpor dari data.js
  return playlists.find((p) => p.id === route.params.id)
})

const handlePlaySong = (songIndex) => {
  // Pertama, pastikan store menggunakan playlist yang benar
  musicStore.loadPlaylist(playlist.value.songs)

  // Jika lagu yang diklik adalah lagu yang sedang diputar, panggil togglePlay
  if (musicStore.currentTrackIndex === songIndex && musicStore.playlist === playlist.value.songs) {
    musicStore.togglePlay()
  } else {
    // Jika lagu yang diklik adalah lagu baru, panggil selectTrack
    musicStore.selectTrack(songIndex)
  }
}
</script>

<template>
  <div v-if="playlist">
    <div class="playlist-header">
      <img
        :src="playlist.coverArt"
        :alt="`Cover for ${playlist.name}`"
        class="header-cover-art"
        onerror="this.onerror=null;this.src='https://placehold.co/200x200/1e1e1e/e9ecef?text=Error';"
      />
      <div class="header-info">
        <p class="header-type">Playlist</p>
        <h1 class="header-title">{{ playlist.name }}</h1>
        <p class="header-description">{{ playlist.description }}</p>
      </div>
    </div>

    <div class="songs-list">
      <div
        v-for="(song, index) in playlist.songs"
        :key="song.id"
        class="song-list-item"
        :class="{ 'is-playing': musicStore.currentTrack?.id === song.id && musicStore.isPlaying }"
        @click="handlePlaySong(index)"
      >
        <div class="song-number-or-icon">
          <!-- PERBAIKAN: v.if diubah menjadi v-if -->
          <NowPlayingIcon v-if="musicStore.currentTrack?.id === song.id && musicStore.isPlaying" />
          <PlayIcon v-else class="play-icon" />
          <span class="song-number">{{ index + 1 }}</span>
        </div>
        <div class="list-song-info">
          <p class="list-song-title">{{ song.title }}</p>
          <p class="list-song-artist">{{ song.artist }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Playlist not found.</p>
  </div>
</template>

<style scoped>
/* Style tidak berubah */
.playlist-header {
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}
.header-cover-art {
  width: 200px;
  height: 200px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 8px 25px var(--shadow);
}
.header-type {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 0 0.5rem 0;
}
.header-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
}
.header-description {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-top: 1rem;
}
.songs-list {
  display: flex;
  flex-direction: column;
}
.song-list-item {
  display: grid;
  grid-template-columns: 50px 1fr;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.song-list-item:hover {
  background-color: var(--accent-soft);
}
.song-list-item.is-playing {
  background-color: var(--accent-soft);
}
.song-number-or-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--text-secondary);
}
.play-icon {
  display: none;
  color: var(--text-primary);
}
.song-list-item:hover .song-number {
  display: none;
}
.song-list-item:hover .play-icon {
  display: block;
}
.song-list-item.is-playing .song-number,
.song-list-item.is-playing .play-icon {
  display: none;
}
.song-list-item.is-playing .song-number-or-icon > svg {
  display: block;
  color: var(--accent);
}
.list-song-info {
  min-width: 0;
}
.list-song-title {
  font-weight: 500;
  margin: 0;
  color: var(--text-primary);
}
.list-song-artist {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0.25rem 0 0 0;
}
@media (max-width: 768px) {
  .playlist-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .header-title {
    font-size: 2rem;
  }
}
</style>
