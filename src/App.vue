<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/nav-bar.vue'
</script>

<template>
  <Navbar />
  <main class="w-full">
    <RouterView />
  </main>
</template>
