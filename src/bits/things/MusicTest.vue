<script setup>
import { ref } from 'vue';

// Pastikan Howler ada di window
const { Howl } = window;

const status = ref('Menunggu tes...');
const testSoundUrl = 'https://storage.googleapis.com/starthinker-ui-misc-assets/starlight-muse-clip.mp3';

const runTest = () => {
  status.value = 'Memulai tes...';
  
  if (!Howl) {
    status.value = 'ERROR: Howler.js tidak ditemukan!';
    console.error(status.value);
    return;
  }

  console.log('Membuat instance Howl baru...');
  const sound = new Howl({
    src: [testSoundUrl],
    html5: true,
    onplay: () => {
      status.value = 'BERHASIL! Audio sedang diputar.';
      console.log(status.value);
    },
    onloaderror: (id, err) => {
      status.value = `ERROR: Gagal memuat audio. Cek console.`;
      console.error(status.value, err);
    },
    onplayerror: (id, err) => {
      status.value = `ERROR: Gagal memutar audio. Cek console.`;
      console.error(status.value, err);
    }
  });

  console.log('Mencoba memanggil .play()...');
  sound.play();
};
</script>

<template>
  <div class="test-container">
    <h2>Tes Pemutar Audio Fundamental</h2>
    <p>Tes ini akan mengisolasi masalah dengan mencoba memutar suara secara langsung menggunakan Howler.js.</p>
    <button @click="runTest" class="test-button">Jalankan Tes Audio</button>
    <div class="status-box">
      <strong>Status:</strong> {{ status }}
    </div>
    <p>Setelah menekan tombol, periksa status di atas dan buka Console (F12) untuk melihat log detail.</p>
  </div>
</template>

<style scoped>
.test-container {
  border: 2px dashed var(--accent);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
}
.test-button {
  background-color: var(--accent);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.test-button:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}
.status-box {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}
</style>
