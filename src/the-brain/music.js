import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import songsData from '@/db/songs.json'

// Pemeriksaan Kritis: Pastikan Howler.js sudah dimuat
if (!window.Howl) {
  console.error('!!! KESALAHAN FATAL: Howler.js tidak ditemukan. Periksa file index.html Anda.')
}
const { Howl } = window

export const useMusicStore = defineStore('music', () => {
  // STATE
  const playlist = ref(songsData)
  const currentTrackIndex = ref(0)
  const isPlaying = ref(false)
  const sound = ref(null)
  const currentTime = ref(0)
  const duration = ref(0)
  let seekInterval = null

  // GETTERS
  const currentTrack = computed(() => playlist.value[currentTrackIndex.value])
  const progress = computed(() => {
    if (duration.value === 0) return 0
    return (currentTime.value / duration.value) * 100
  })

  // ACTIONS
  function selectTrack(index) {
    if (sound.value) {
      sound.value.stop()
      clearInterval(seekInterval)
    }

    currentTrackIndex.value = index
    const track = currentTrack.value

    sound.value = new Howl({
      src: [track.audioSrc],
      html5: true,
      onplay: () => {
        isPlaying.value = true
        duration.value = sound.value.duration()
        seekInterval = setInterval(() => {
          currentTime.value = sound.value.seek()
        }, 250)
      },
      onpause: () => {
        isPlaying.value = false
        clearInterval(seekInterval)
      },
      onend: () => {
        isPlaying.value = false
        clearInterval(seekInterval)
      },
      onstop: () => {
        isPlaying.value = false
        currentTime.value = 0
        clearInterval(seekInterval)
      },
      onloaderror: (id, err) => {
        console.error('[Howler] Gagal memuat audio:', err)
      },
      onplayerror: (id, err) => {
        console.error('[Howler] Gagal memutar audio:', err)
      },
    })

    sound.value.play()
  }

  function togglePlay() {
    if (!sound.value) {
      selectTrack(currentTrackIndex.value)
      return
    }
    if (isPlaying.value) {
      sound.value.pause()
    } else {
      sound.value.play()
    }
  }

  return {
    playlist,
    currentTrackIndex,
    isPlaying,
    currentTrack,
    progress,
    selectTrack,
    togglePlay,
  }
})
