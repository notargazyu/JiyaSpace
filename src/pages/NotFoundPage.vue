<script setup>
// Script ini sengaja dikosongkan
</script>

<template>
  <div class="not-found-container">
    <div class="content">
      <h1 class="status-code">404</h1>
      <h2 class="title">Page Not Found</h2>
      <p class="description">
        Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
      </p>
      <RouterLink to="/" class="home-button"> Go back home </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 60vh;
}
.content {
  animation: fadeIn 0.6s ease-out;
}
.status-code {
  font-size: 6rem;
  font-weight: 700;
  color: var(--accent);
  margin: 0;
  line-height: 1;
}
.title {
  font-size: 1.75rem;
  margin: 1rem 0;
  color: var(--text-primary);
}
.description {
  color: var(--text-secondary);
  max-width: 400px;
  margin: 0 auto 2rem auto;
}
.home-button {
  background-color: var(--accent);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;
}
.home-button:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
}
</style>
