import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { playlists as allPlaylists } from '@/db/data.js'

const { Howl } = window

export const useMusicStore = defineStore('music', () => {
  const currentPlaylist = ref([])
  const currentTrackIndex = ref(0)
  const isPlaying = ref(false)
  const sound = ref(null)
  const currentTime = ref(0)
  const duration = ref(0)
  let seekInterval = null

  const currentTrack = computed(() => currentPlaylist.value[currentTrackIndex.value])
  const progress = computed(() => {
    if (duration.value === 0) return 0
    return (currentTime.value / duration.value) * 100
  })

  function loadPlaylist(playlist) {
    currentPlaylist.value = playlist
  }

  function selectTrack(index) {
    if (sound.value) {
      sound.value.stop()
      clearInterval(seekInterval)
    }
    currentTrackIndex.value = index
    const track = currentTrack.value
    if (!track) return

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
      onloaderror: (id, err) => console.error('Howler load error:', err),
      onplayerror: (id, err) => console.error('Howler play error:', err),
    })
    sound.value.play()
  }

  function togglePlay() {
    if (!sound.value) {
      if (currentPlaylist.value.length > 0) selectTrack(0)
      return
    }
    if (isPlaying.value) {
      sound.value.pause()
    } else {
      sound.value.play()
    }
  }

  return {
    playlist: currentPlaylist,
    currentTrackIndex,
    isPlaying,
    currentTrack,
    progress,
    loadPlaylist,
    selectTrack,
    togglePlay,
  }
})
