<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import resumeData from '../../public/resume.json'
import type { CustomField } from '@/utils/types'

const isScrolled = ref(false)
const githubUrl = resumeData.basics.customFields.find((f: CustomField) => f.icon === 'github-logo' || f.text === 'shrish0')?.link || 'https://github.com/shrish0'
const linkedinUrl = resumeData.basics.customFields.find((f: CustomField) => f.icon === 'linkedin-logo' || f.text === 'shrish')?.link || 'https://linkedin.com/in/shrish0'
const isDark = ref(true)

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

const checkScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const handleNavClick = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
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
</script>

<template>
  <nav
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="[isScrolled ? 'bg-surface/80 backdrop-blur-xl shadow-[0_0_40px_rgba(143,245,255,0.06)] py-4' : 'bg-transparent py-6']"
  >
    <div class="flex justify-between items-center px-8 max-w-7xl mx-auto font-headline tracking-tight">
      <a href="#" @click.prevent="handleNavClick('home')" class="text-2xl font-bold tracking-tighter text-primary uppercase">ARCHITECT_OS</a>

      <div class="hidden md:flex items-center gap-8 text-label font-bold">
        <a class="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" @click.prevent="handleNavClick('intelligence')">Intelligence</a>
        <a class="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" @click.prevent="handleNavClick('projects')">Projects</a>
        <a class="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" @click.prevent="handleNavClick('timeline')">Timeline</a>
        <a class="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" @click.prevent="handleNavClick('systems')">Systems Achievements</a>
      </div>

      <div class="flex items-center gap-4 md:gap-6">
        <!-- Theme Toggle -->
        <button @click="toggleTheme" class="p-2 rounded-full hover:bg-surface-container/50 text-on-surface-variant hover:text-primary transition-all duration-300 hidden sm:flex items-center justify-center">
          <span class="material-symbols-outlined text-[20px]">{{ isDark ? 'dark_mode' : 'light_mode' }}</span>
        </button>

        <a :href="githubUrl" target="_blank" class="hidden sm:flex items-center group cursor-pointer" title="GitHub">
          <span class="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">terminal</span>
        </a>

        <a :href="linkedinUrl" target="_blank" class="flex items-center group inline-block">
          <button class="bg-primary text-surface px-6 py-2 rounded-lg font-bold group-hover:scale-105 transition-all shadow-[0_0_20px_rgba(143,245,255,0.3)] cursor-pointer">
            Connect
          </button>
        </a>
      </div>
    </div>
  </nav>
</template>
