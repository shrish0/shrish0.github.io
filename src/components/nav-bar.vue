<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { SECTIONS } from '@/utils/constants'
import profileData from '@/data/profile.json'
import { scrollToSection } from '@/utils/HelperMethod'
import IconSun from '@/assets/images/icon-sun.svg?component'
import IconMoon from '@/assets/images/icon-moon.svg?component'

const isScrolled = ref(false)
const isDark = ref(true)

const checkScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.remove('light')
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)

  // Check saved theme
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light') {
    isDark.value = false
    document.documentElement.classList.add('light')
  } else {
    document.documentElement.classList.add('dark')
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})

const navLinks = [
  { name: 'Home', id: SECTIONS.HOME },
  { name: 'About', id: SECTIONS.ABOUT },
  { name: 'Experience', id: SECTIONS.EXPERIENCE },
  { name: 'Contact', id: SECTIONS.CONTACT },
]
</script>

<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent"
    :class="[
      isScrolled
        ? 'bg-background/80 backdrop-blur-md border-white/5 py-3 shadow-lg'
        : 'bg-transparent py-5',
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <a
        href="#"
        @click.prevent="scrollToSection(SECTIONS.HOME)"
        class="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
      >
        {{ profileData.name }}
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
          <IconSun v-if="!isDark" class="h-5 w-5" />
          <!-- Moon Icon -->
          <IconMoon v-else class="h-5 w-5" />
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
