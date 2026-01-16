<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="portfolio-app">
    <RouterView />
  </div>
</template>

<style scoped>
.portfolio-app {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}
</style>
