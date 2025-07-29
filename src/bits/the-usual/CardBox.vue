<script setup>
// Script ini sengaja dikosongkan
</script>

<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px; /* Sudut yang lebih bulat */
  padding: 1.5rem 2rem;
  box-shadow: 0 4px 15px var(--shadow);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px var(--shadow);
  border-color: var(--accent);
}
</style>
