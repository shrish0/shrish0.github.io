<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import profileData from '@/data/profile.json';

const isScrolled = ref(false);
const isDark = ref(true);

const checkScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    localStorage.setItem('theme', 'light');
  }
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
  
  // Check saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    isDark.value = false;
    document.documentElement.classList.add('light');
  } else {
    document.documentElement.classList.add('dark');
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});

const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Experience', id: 'experience' },
  { name: 'Contact', id: 'contact' },
];
</script>

<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent"
    :class="[
      isScrolled 
        ? 'bg-background/80 backdrop-blur-md border-white/5 py-3 shadow-lg' 
        : 'bg-transparent py-5'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <a 
        href="#" 
        @click.prevent="scrollToSection('home')" 
        class="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
      >
        {{ profileData.initials }}
      </a>

      <!-- Desktop Links -->
      <ul class="hidden md:flex gap-8 items-center">
        <li v-for="link in navLinks" :key="link.name">
          <a
            :href="`#${link.id}`"
            @click.prevent="scrollToSection(link.id)"
            class="text-sm font-medium text-text-mute hover:text-primary transition-colors hover:shadow-primary/50"
          >
            {{ link.name }}
          </a>
        </li>
      </ul>

      <div class="hidden md:flex items-center gap-4">
        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-full hover:bg-white/10 text-heading transition-colors"
          title="Toggle Theme"
        >
          <!-- Sun Icon -->
          <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <!-- Moon Icon -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <!-- Resume Button -->
        <a
          href="/Resume.pdf"
          target="_blank"
          class="px-5 py-2 text-xs font-semibold rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-heading"
        >
          Resume
        </a>
      </div>
    </div>
  </nav>
</template>
