<script setup>
// Script kosong untuk kompatibilitas
</script>
<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="6" y="8" width="2" height="8">
      <animate
        attributeName="height"
        values="8;16;8"
        begin="0s"
        dur="1s"
        repeatCount="indefinite"
      />
      <animate attributeName="y" values="8;4;8" begin="0s" dur="1s" repeatCount="indefinite" />
    </rect>
    <rect x="11" y="8" width="2" height="8">
      <animate
        attributeName="height"
        values="8;16;8"
        begin="0.2s"
        dur="1s"
        repeatCount="indefinite"
      />
      <animate attributeName="y" values="8;4;8" begin="0.2s" dur="1s" repeatCount="indefinite" />
    </rect>
    <rect x="16" y="8" width="2" height="8">
      <animate
        attributeName="height"
        values="8;16;8"
        begin="0.4s"
        dur="1s"
        repeatCount="indefinite"
      />
      <animate attributeName="y" values="8;4;8" begin="0.4s" dur="1s" repeatCount="indefinite" />
    </rect>
  </svg>
</template>
