<script setup>
import { ref, watch, onMounted } from 'vue'
import CardBox from '@/bits/the-usual/CardBox.vue'
import TrashIcon from '@/bits/icons/TrashIcon.vue' // Ikon baru untuk hapus

// Data awal jika tidak ada data di localStorage
const initialNotes = [
  { id: 1, date: '2025-07-28', content: 'Ini adalah catatan pertamaku! Bisa dihapus.' },
]

const notes = ref([])
const newNoteContent = ref('')

// Saat komponen dimuat, coba ambil data dari localStorage
onMounted(() => {
  const savedNotes = localStorage.getItem('jiya-notes')
  notes.value = savedNotes ? JSON.parse(savedNotes) : initialNotes
})

// Setiap kali 'notes' berubah, simpan ke localStorage
watch(
  notes,
  (newNotes) => {
    localStorage.setItem('jiya-notes', JSON.stringify(newNotes))
  },
  { deep: true },
)

const addNote = () => {
  if (newNoteContent.value.trim() === '') return

  const newNote = {
    id: Date.now(),
    date: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
    content: newNoteContent.value,
  }
  notes.value.unshift(newNote) // Tambahkan ke paling atas
  newNoteContent.value = '' // Kosongkan input
}

const deleteNote = (noteId) => {
  notes.value = notes.value.filter((note) => note.id !== noteId)
}
</script>

<template>
  <div>
    <h1 class="page-title">Notes</h1>
    <p class="page-subtitle">
      A simple notepad. Your notes are saved automatically in this browser.
    </p>

    <!-- Form untuk menambah catatan baru -->
    <CardBox class="add-note-card">
      <form @submit.prevent="addNote" class="add-note-form">
        <input
          type="text"
          v-model="newNoteContent"
          placeholder="Tulis sesuatu..."
          class="note-input"
        />
        <button type="submit" class="add-button">Add Note</button>
      </form>
    </CardBox>

    <!-- Daftar catatan -->
    <div class="notes-list">
      <transition-group name="list">
        <div v-for="note in notes" :key="note.id" class="note-item">
          <CardBox>
            <p class="note-content">{{ note.content }}</p>
            <div class="note-footer">
              <p class="note-date">{{ note.date }}</p>
              <button @click="deleteNote(note.id)" class="delete-button" aria-label="Delete note">
                <TrashIcon />
              </button>
            </div>
          </CardBox>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
/* ... style lama ... */
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

/* === STYLE BARU UNTUK FORM & DAFTAR === */
.add-note-card {
  margin-bottom: 2rem;
}
.add-note-form {
  display: flex;
  gap: 1rem;
}
.note-input {
  flex-grow: 1;
  background-color: var(--bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: var(--text-primary);
  font-family: var(--font-primary);
}
.note-input:focus {
  outline: none;
  border-color: var(--accent);
}
.add-button {
  background-color: var(--accent);
  color: white;
  border: none;
  padding: 0 1.5rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: filter 0.2s ease;
}
.add-button:hover {
  filter: brightness(1.1);
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.note-content {
  margin: 0 0 1.5rem 0;
  font-size: 1rem;
  color: var(--text-primary);
  line-height: 1.7;
}
.note-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.note-date {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}
.delete-button {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  transition: all 0.2s ease;
}
.delete-button:hover {
  color: #e74c3c; /* Warna merah untuk hapus */
  background-color: rgba(231, 76, 60, 0.1);
}

/* Animasi untuk daftar */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
