<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import profileData from '@/data/profile.json'
import type { InformationCardType } from '@/utils/constants'
import experienceData from '@/data/experience.json'
import projectsData from '@/data/projects.json'
import skillsData from '@/data/skills.json'
import resumeData from '@/data/resume.json'

import ModalComponent from '@/components/modal-component.vue'
import SkillItem from '@/components/skill-item.vue'
import InformationCard from '@/components/information-card.vue'

const textToType = profileData.typewriterText
const displayedText = ref('')
const isTyping = ref(true)
const isAtBottom = ref(false)
const showBio = ref(false)
const slicedBioData = ref()

// Modal State
const showSkillModal = ref(false)
const showEducationModal = ref(false)
const showAwardsModal = ref(false)
const modalTitle = ref('')

type Skill = {
  name: string
  colorClass: string
}

const modalSkills = ref<Skill[]>([])

const openSkillModal = (type: InformationCardType) => {
  if (type === 'languages') {
    modalTitle.value = 'Languages'
    modalSkills.value = skillsData.languages
  } else {
    modalTitle.value = 'Frameworks & Tools'
    modalSkills.value = skillsData.frameworks
  }
  showSkillModal.value = true
}

const typeText = async () => {
  // Initial pause
  await new Promise((r) => setTimeout(r, 500))
  displayedText.value = ''
  isTyping.value = true

  for (let i = 0; i < textToType.length; i++) {
    displayedText.value += textToType[i]
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  isTyping.value = false
}

setInterval(() => {
  typeText()
}, 5000)

const checkScrollPosition = () => {
  const scrollPosition = window.scrollY + window.innerHeight
  const bottomPosition = document.documentElement.scrollHeight
  // Consider we are at bottom if within 50px
  isAtBottom.value = scrollPosition >= bottomPosition - 50
}

const handleScrollAction = () => {
  if (isAtBottom.value) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }
}

watch(
  showBio,
  () => {
    if (showBio.value) {
      slicedBioData.value = profileData.bio
    } else {
      slicedBioData.value = profileData.bio.slice(0, 150) + '...'
    }
  },
  { immediate: true },
)

onMounted(() => {
  typeText()
  window.addEventListener('scroll', checkScrollPosition)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScrollPosition)
})
</script>

<template>
  <main class="relative bg-background overflow-hidden transition-colors duration-300">
    <!-- Background Elements -->
    <div class="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div
        class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"
      ></div>
      <div
        class="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"
      ></div>
    </div>

    <!-- Scroll Action Button -->
    <button
      @click="handleScrollAction"
      class="fixed bottom-10 right-10 z-50 p-4 rounded-full bg-primary/10 border border-primary/20 text-primary shadow-lg backdrop-blur-sm hover:bg-primary hover:text-white transition-all duration-300 group"
      :class="{ 'animate-bounce': !isAtBottom }"
      :title="isAtBottom ? 'Scroll to Top' : 'Scroll Down'"
    >
      <svg
        class="w-6 h-6 transition-transform duration-500"
        :class="{ 'rotate-180': isAtBottom }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        ></path>
      </svg>
    </button>

    <!-- Hero Section -->
    <section
      id="home"
      class="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-6"
    >
      <div class="space-y-6 max-w-4xl">
        <div
          class="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4"
        >
          {{ profileData.status }}
        </div>

        <h1 class="text-5xl md:text-7xl font-bold tracking-tight text-heading">
          <span class="block min-h-[1.2em]">
            {{ displayedText
            }}<span
              class="animate-blink inline-block w-1.5 h-[0.8em] align-middle bg-primary ml-1"
              :class="{ 'opacity-0': !isTyping }"
            ></span>
          </span>
        </h1>

        <h2 class="text-xl md:text-3xl font-light text-text-mute">
          {{ profileData.role }}
        </h2>

        <p class="text-lg text-text/80 max-w-2xl mx-auto leading-relaxed dark:text-white/80">
          {{ profileData.bio }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <a
            href="#experience"
            class="px-8 py-3.5 rounded-full bg-primary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all"
          >
            See My Work
          </a>
          <a
            :href="profileData.resumeUrl"
            target="_blank"
            rel="noopener"
            class="px-8 py-3.5 rounded-full border border-primary/30 bg-primary/5 text-primary font-semibold hover:bg-primary hover:text-white transition-all"
          >
            View Resume
          </a>
          <a
            :href="`mailto:${profileData.email}`"
            class="px-8 py-3.5 rounded-full border border-white/10 bg-white/5 text-heading font-semibold hover:bg-white/10 hover:border-white/20 transition-all"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="relative z-10 py-32 px-6">
      <div class="max-w-6xl mx-auto">
        <h3 class="text-sm font-bold tracking-wider text-primary uppercase mb-2">About Me</h3>
        <h4 class="text-3xl md:text-4xl font-bold text-heading mb-12">
          Building scalable <span class="text-primary">backend systems</span>.
        </h4>

        <div class="grid md:grid-cols-2 gap-16 items-start">
          <div class="relative group h-full flex items-center justify-center">
            <div
              class="absolute inset-0 bg-gradient-to-tr from-primary to-purple-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"
            ></div>
            <div
              class="relative bg-background-soft border border-white/5 rounded-2xl p-8 shadow-2xl space-y-4"
            >
              <p class="text-lg leading-relaxed text-text">
                {{ slicedBioData }}
              </p>
              <button class="text-primary font-medium hover:underline" @click="showBio = !showBio">
                {{ showBio ? 'Show Less' : 'Read More' }}
              </button>
            </div>
          </div>

          <div class="space-y-6">
            <h5 class="text-xl font-bold text-heading">Skills & Education</h5>

            <!-- Skill Categories Buttons -->
            <div class="grid grid-cols-2 gap-4">
              <button
                @click="openSkillModal('languages')"
                class="p-4 rounded-xl bg-background-soft border border-white/5 hover:border-primary/50 text-left transition-all hover:-translate-y-1 group"
              >
                <div class="text-3xl mb-2">💻</div>
                <div class="font-bold text-heading">Languages</div>
                <div class="text-xs text-text-mute mt-1">JS, TS, C#, etc.</div>
              </button>

              <button
                @click="openSkillModal('frameworks')"
                class="p-4 rounded-xl bg-background-soft border border-white/5 hover:border-primary/50 text-left transition-all hover:-translate-y-1 group"
              >
                <div class="text-3xl mb-2">⚛️</div>
                <div class="font-bold text-heading">Frameworks</div>
                <div class="text-xs text-text-mute mt-1">FastAPI, Django, .NET</div>
              </button>
            </div>

            <!-- Education & Achievements Cards -->
            <div class="grid grid-cols-2 gap-4 mt-4">
              <InformationCard
                :title="profileData.education.title"
                :subtitle="profileData.education.degree"
                :details="[profileData.education.year, profileData.education.grade]"
                class="cursor-pointer"
                @click="showEducationModal = true"
              />

              <InformationCard
                title="Achievements"
                :subtitle="profileData.achievements?.[0]?.title || ''"
                :details="[
                  profileData.achievements?.[0]?.count || '',
                  profileData.achievements?.[0]?.level || '',
                ]"
                class="cursor-pointer"
                @click="showAwardsModal = true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Modal -->
    <ModalComponent :show="showSkillModal" :title="modalTitle" @close="showSkillModal = false">
      <SkillItem :skills="modalSkills" />
    </ModalComponent>

    <!-- Education Modal -->
    <ModalComponent
      :show="showEducationModal"
      title="Education History"
      @close="showEducationModal = false"
    >
      <div class="space-y-4">
        <div
          v-for="edu in resumeData.sections.education.items"
          :key="edu.id"
          class="p-6 rounded-xl bg-background border border-white/5"
        >
          <h4 class="text-xl font-bold text-heading mb-1">{{ edu.school }}</h4>
          <p class="text-primary font-medium mb-2">{{ edu.area || edu.period }}</p>
          <div
            class="text-text/80 text-sm prose dark:prose-invert max-w-none"
            v-html="edu.description"
          ></div>
        </div>
      </div>
    </ModalComponent>

    <!-- Awards Modal -->
    <ModalComponent
      :show="showAwardsModal"
      title="Achievements & Awards"
      @close="showAwardsModal = false"
    >
      <div class="space-y-4">
        <div
          v-for="award in resumeData.sections.awards.items"
          :key="award.id"
          class="p-6 rounded-xl bg-background border border-white/5"
        >
          <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
            <h4 class="text-xl font-bold text-heading">{{ award.title }}</h4>
            <span class="text-xs font-mono text-text-mute">{{ award.date }}</span>
          </div>
          <div
            class="text-text/80 text-sm prose dark:prose-invert max-w-none"
            v-html="award.description"
          ></div>
          <a
            v-if="award.website?.url"
            :href="award.website.url"
            target="_blank"
            class="inline-block mt-3 text-primary text-xs hover:underline"
          >
            Proof/Link ↗
          </a>
        </div>
      </div>
    </ModalComponent>

    <!-- Experience Section -->
    <section id="experience" class="relative z-10 py-32 px-6 bg-background-soft/30">
      <div class="max-w-5xl mx-auto">
        <h3 class="text-sm font-bold tracking-wider text-primary uppercase mb-16 text-center">
          Professional Experience
        </h3>

        <div class="space-y-12">
          <div
            v-for="job in experienceData"
            :key="job.id"
            class="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors group dark:text-white/80"
          >
            <div
              class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:bg-primary transition-colors"
            ></div>

            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h4 class="text-xl font-bold text-heading">{{ job.role }}</h4>
              <span class="text-sm font-mono text-text-mute">{{ job.period }}</span>
            </div>
            <h5 class="text-base text-lg font-medium text-text-mute mb-4">{{ job.company }}</h5>

            <p v-if="job.summary" class="text-text/80 mb-4" v-html="job.summary"></p>
            <ul class="list-disc list-inside space-y-2 text-text/80 marker:text-primary">
              <li v-for="(point, index) in job.highlights" :key="index" v-html="point"></li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="relative z-10 py-32 px-6">
      <div class="max-w-6xl mx-auto">
        <h3 class="text-sm font-bold tracking-wider text-primary uppercase mb-12 text-center">
          Featured Projects
        </h3>

        <div class="grid md:grid-cols-2 gap-8">
          <div
            v-for="project in projectsData"
            :key="project.id"
            class="group relative rounded-2xl overflow-hidden bg-background-soft border border-white/5 hover:border-primary/50 transition-all hover:-translate-y-1"
          >
            <div class="p-8">
              <h4 class="text-xl font-bold text-heading mb-2">{{ project.title }}</h4>
              <p class="text-sm text-primary mb-4">{{ project.subtitle }}</p>
              <p class="text-text/80 mb-6" v-html="project.description"></p>
              <div class="flex flex-wrap gap-2 text-xs font-mono text-text-mute">
                <span v-for="tag in project.tags" :key="tag" class="px-2 py-1 rounded bg-white/5">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Contact Section -->
    <section id="contact" class="relative z-10 py-32 px-6 text-center">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-heading mb-8">Ready to collaborate?</h2>
        <p class="text-xl text-text-mute mb-12">
          I'm currently based in Noida, India and open to opportunities.
        </p>
        <div class="flex justify-center gap-6">
          <a
            :href="`mailto:${profileData.email}`"
            class="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-heading text-background font-bold text-lg hover:scale-105 transition-transform"
          >
            Email Me
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </a>
          <a
            :href="profileData.linkedin"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-10 py-4 rounded-full border border-white/10 bg-background-soft text-heading font-bold text-lg hover:bg-white/5 transition-colors"
          >
            LinkedIn
          </a>
          <a
            :href="profileData.github"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-10 py-4 rounded-full border border-white/10 bg-background-soft text-heading font-bold text-lg hover:bg-white/5 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="py-8 text-center text-sm text-text-mute border-t border-white/5 bg-background-soft/20 backdrop-blur-sm"
    >
      <p>&copy; 2026 Shrish Gupta. Built with Vue 3 & Tailwind.</p>
    </footer>
  </main>
</template>
