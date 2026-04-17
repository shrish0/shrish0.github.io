<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import resumeData from '../../public/resume.json'
import type { ScrollModuleDirectionType } from '@/utils/types'
import { profilePhotoLink } from '@/utils/constants'
import AiChatPanel from '@/components/ai-chat-panel.vue'
import TechnicalModal from '@/components/technical-modal.vue'

// --- Typewriter Effect & Hero Data ---
const name = resumeData.basics.name
const headlineText = resumeData.basics.headline
const displayedText = ref('')
const isTyping = ref(true)

let typewriterInterval: ReturnType<typeof setInterval>
const typeText = async () => {
  await new Promise(r => setTimeout(r, 500))
  displayedText.value = ''
  isTyping.value = true
  for (let i = 0; i < headlineText.length; i++) {
    displayedText.value += headlineText[i]
    await new Promise(resolve => setTimeout(resolve, 50))
  }
  isTyping.value = false
}

onMounted(() => {
  typeText()
  typewriterInterval = setInterval(typeText, 8000)
})

onUnmounted(() => {
  clearInterval(typewriterInterval)
})

// --- Skills Data ---
const showSkillModal = ref(false)
const showChatPanel = ref(false)
const activeSkill = ref({})

const getTechIcon = (name: string) => {
  const key = name.toLowerCase()
  
  if (key.includes('backend')) return 'dns' // Server racks
  if (key.includes('frontend')) return 'web' // Web browser window
  if (key.includes('language')) return 'terminal' // Code terminal
  if (key.includes('database') || key.includes('caching')) return 'database' // Database cylinders
  if (key.includes('tool') || key.includes('practice')) return 'handyman' // Wrench/gear
  if (key.includes('cloud') || key.includes('devops')) return 'cloud'
  if (key.includes('framework')) return 'extension'

  return 'settings_input_component' // default
}

const skillsList = computed(() => {
  const styles = [
    { bg: 'bg-primary/20', text: 'text-primary', groupBg: 'group-hover:bg-primary' },
    { bg: 'bg-secondary/20', text: 'text-secondary', groupBg: 'group-hover:bg-secondary' },
    { bg: 'bg-primary-container/20', text: 'text-primary-container', groupBg: 'group-hover:bg-primary-container' },
    { bg: 'bg-secondary-container/20', text: 'text-secondary-container', groupBg: 'group-hover:bg-secondary-container' },
  ]
  
  return resumeData.sections.skills.items.filter(s => !s.hidden).map((skill, index) => {
    const iconStr = getTechIcon(skill.name)
    const style = styles[index % styles.length]
    return {
      name: skill.name,
      proficiency: skill.proficiency,
      level: skill.level,
      status: 'Optimal',
      icon: iconStr,
      style: style,
      config: {
        title: skill.name,
        efficiency: `Level ${skill.level}`,
        overhead: 'Low',
        description: `Core competencies in ${skill.name}.`,
        bullets: skill.proficiency.split('|').map(s => s.trim()),
        icon: iconStr,
        level: skill.level
      }
    }
  })
})

const openSkillModule = (config: any) => {
  activeSkill.value = config
  showSkillModal.value = true
}

const modulesContainer = ref<HTMLElement | null>(null)
const scrollModules = (direction: ScrollModuleDirectionType) => {
  if (modulesContainer.value) {
    const scrollAmount = 350
    modulesContainer.value.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }
}

// --- Projects Data ---
const projectsList = computed(() => {
  return resumeData.sections.projects.items.filter(p => !p.hidden)
})

// --- Experience Data ---
const experienceList = computed(() => {
  return resumeData.sections.experience.items.filter(e => !e.hidden)
})

const getColors = (index: number) => {
  const colors = ['primary', 'secondary', 'tertiary']
  return colors[index % colors.length]
}

const toggleChatPanel = () => {
  showChatPanel.value = !showChatPanel.value
}

const closeChatPanel = () => {
  showChatPanel.value = false
}

const githubUrl =
  resumeData.basics.customFields.find(f => f.icon === 'github-logo' || f.icon === 'GitHub' || f.text === 'shrish0')?.link || ''
const linkedinUrl =
  resumeData.basics.customFields.find(f => f.icon === 'linkedin-logo' || f.icon === 'LinkedIn' || f.text === 'shrish')?.link || ''
const visibleSkills = computed(() => resumeData.sections.skills.items.filter(skill => !skill.hidden).map(skill => skill.proficiency))
const summaryText = resumeData.summary.content.replace(/<[^>]*>/g, '').trim()
</script>

<template>
  <main class="relative bg-surface text-on-surface pt-32 overflow-hidden min-h-screen">
    <!-- Hero Section -->
    <section id="home" class="max-w-7xl mx-auto px-8 mb-32 flex flex-col md:flex-row items-center gap-16 relative">
      <div class="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
      <div class="flex-1 z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest border border-primary/20 mb-6 group cursor-pointer hover:border-primary transition-colors">
          <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span class="text-xs font-label uppercase tracking-widest text-primary">System initialization: ONLINE</span>
        </div>
        <h1 class="text-6xl md:text-8xl font-headline font-bold text-on-surface tracking-tighter mb-4 leading-tight">
           <span class="text-primary text-glow">{{ name.toUpperCase() }}</span>
        </h1>
        <h2 class="text-2xl md:text-3xl font-headline text-on-surface-variant tracking-tight mb-6 min-h-[40px]">
          {{ displayedText }}<span class="inline-block w-1 h-[1em] bg-primary ml-1 animate-blink" :class="{ 'opacity-0': !isTyping }"></span>
        </h2>
        <div class="text-xl text-on-surface-variant max-w-xl mb-8 leading-relaxed font-body" v-html="resumeData.summary.content"></div>
        <div class="flex flex-wrap gap-4">
          <a :href="resumeData.basics.customFields.find(f => f.icon === 'GitHub' || f.text === 'shrish0')?.link" target="_blank" class="px-8 py-4 aurora-glow text-surface font-bold rounded-xl hover:shadow-[0_0_30px_rgba(143,245,255,0.4)] transition-all cursor-pointer">
            Access GitHub
          </a>
          <a href="/Resume.pdf" target="_blank" class="px-8 py-4 glass-panel text-primary font-bold rounded-xl hover:bg-surface-container-high transition-all cursor-pointer">
            View Resume
          </a>
        </div>
      </div>
      <div class="flex-1 relative hidden md:block">
        <div class="relative z-10 w-full aspect-square rounded-3xl overflow-hidden glass-panel p-4 hover:ambient-glow transition-shadow duration-500">
           <!-- Placeholder or actual image -->
          <div class="w-full h-full bg-surface-container-highest rounded-2xl flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden relative group">
             <div class="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
             <img :src="profilePhotoLink" alt="Profile photo" class="w-full h-full object-cover">
          </div>
        </div>
        <!-- Decorative Elements -->
        <div class="absolute -bottom-8 -right-8 w-48 h-48 border-r-2 border-b-2 border-primary/30 rounded-br-3xl"></div>
        <div class="absolute -top-8 -left-8 w-24 h-24 border-l-2 border-t-2 border-secondary/30 rounded-tl-3xl"></div>
      </div>
    </section>

    <!-- Core Intelligence (Skills) -->
    <section id="intelligence" class="max-w-7xl mx-auto px-8 mb-48">
      <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 class="text-label text-primary font-bold tracking-widest uppercase mb-4">Core Intelligence</h2>
          <h3 class="text-4xl md:text-5xl font-headline font-bold text-on-surface">Technical Modules</h3>
        </div>
        <p class="text-on-surface-variant max-w-sm text-left md:text-right font-body">
          Expertise in computational logic, microservices, and distributed systems.
        </p>
      </div>

      <div class="relative group/slider">
        <button @click="scrollModules('left')" class="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-panel hidden md:flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-surface-container-high border border-primary/20">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        
        <div ref="modulesContainer" class="flex overflow-x-auto gap-6 py-10 -my-10 px-4 -mx-4 snap-x snap-mandatory scroll-smooth" style="scrollbar-width: none;">
          <div v-for="skill in skillsList" :key="skill.name" @click="openSkillModule(skill.config)" class="glass-panel p-8 rounded-xl cursor-pointer hover:scale-[1.03] relative z-0 hover:z-10 transition-all border-primary/5 hover:ambient-glow min-w-[280px] md:min-w-[320px] snap-center shrink-0 group">
            <div class="w-12 h-12 flex items-center justify-center rounded-lg mb-6 transition-colors group-hover:text-surface" :class="[skill.style?.bg, skill.style?.text, skill.style?.groupBg]">
              <span class="material-symbols-outlined">{{ skill.icon }}</span>
            </div>
            <h4 class="text-xl font-headline font-bold mb-3">{{ skill.name }}</h4>
            <p class="text-sm text-on-surface-variant font-body mb-6 truncate" :title="skill.proficiency">{{ skill.proficiency }}</p>
            <div class="text-xs font-label tracking-widest uppercase opacity-80" :class="skill.style?.text">Level: {{ skill.level }} / 5</div>
          </div>
        </div>

        <button @click="scrollModules('right')" class="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-panel hidden md:flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-surface-container-high border border-primary/20">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </section>

    <!-- Deployed Blueprints (Projects) -->
    <section id="projects" class="mb-48">
      <div class="max-w-7xl mx-auto px-8 mb-16">
        <h2 class="text-label text-primary font-bold tracking-widest uppercase mb-4">Deployed Blueprints</h2>
        <h3 class="text-4xl md:text-5xl font-headline font-bold text-on-surface">Mission Log</h3>
      </div>
      
      <div class="space-y-32">
        <div v-for="(project, index) in projectsList" :key="project.id" class="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
          
          <template v-if="index % 2 === 0">
            <div class="w-full lg:w-3/5 px-8 lg:px-0 lg:pl-32 order-2 lg:order-1">
              <div class="glass-panel p-8 lg:p-12 rounded-3xl lg:rounded-r-none border-r-0 relative z-10 hover:ambient-glow transition-shadow duration-500">
                <span class="text-primary font-label text-xs tracking-widest mb-4 block">PROJECT_0{{ index + 1 }}</span>
                <h4 class="text-3xl lg:text-4xl font-headline font-bold mb-6">{{ project.name }}</h4>
                <div class="text-on-surface-variant text-base lg:text-lg leading-relaxed mb-8 font-body prose-ul:list-disc prose-ul:ml-5" v-html="project.description"></div>
                
                <a v-if="project.website?.url" :href="project.website.url" target="_blank" class="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all cursor-pointer inline-flex">
                  ACCESS REPOSITORY <span class="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </div>
            <div class="w-full lg:w-2/3 order-1 lg:order-2 px-8 lg:px-0">
              <div class="aspect-video lg:aspect-auto lg:h-[500px] rounded-3xl lg:rounded-l-3xl overflow-hidden relative group border border-primary/20 bg-surface-container">
                <!-- Fallback abstract matrix/code image for projects -->
                <img alt="Project Overview" class="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop" />
                <div class="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-transparent"></div>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="w-full lg:w-2/3 px-8 lg:px-0">
              <div class="aspect-video lg:aspect-auto lg:h-[500px] rounded-3xl lg:rounded-r-3xl overflow-hidden relative group border border-secondary/20 bg-surface-container">
                <img alt="Project Overview" class="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" />
                <div class="absolute inset-0 bg-gradient-to-l from-surface via-transparent to-transparent"></div>
              </div>
            </div>
            <div class="w-full lg:w-3/5 px-8 lg:px-0 lg:pr-32">
              <div class="glass-panel p-8 lg:p-12 rounded-3xl lg:rounded-l-none border-l-0 relative z-10 hover:ambient-glow transition-shadow duration-500 border-secondary/20">
                <span class="text-secondary font-label text-xs tracking-widest mb-4 block">PROJECT_0{{ index + 1 }}</span>
                <h4 class="text-3xl lg:text-4xl font-headline font-bold mb-6">{{ project.name }}</h4>
                <div class="text-on-surface-variant text-base lg:text-lg leading-relaxed mb-8 font-body prose-ul:list-disc prose-ul:ml-5" v-html="project.description"></div>
                
                <a v-if="project.website?.url" :href="project.website.url" target="_blank" class="flex items-center gap-2 text-secondary font-bold hover:gap-4 transition-all cursor-pointer inline-flex">
                  ACCESS REPOSITORY <span class="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- System Cycles (Timeline) -->
    <section id="timeline" class="max-w-5xl mx-auto px-8 mb-48 pt-10">
      <div class="text-center mb-24 relative">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>
        <h2 class="text-label text-primary font-bold tracking-widest uppercase mb-4 relative z-10">System Cycles</h2>
        <h3 class="text-4xl md:text-5xl font-headline font-bold text-on-surface relative z-10">Timeline of Evolution</h3>
      </div>
      
      <div class="relative border-l border-primary/20 pl-8 md:pl-16 space-y-24">
        <div v-for="(job, index) in experienceList" :key="job.id" class="relative group">
          <div class="absolute -left-[41px] md:-left-[73px] top-0 w-5 h-5 rounded-full shadow-[0_0_15px_currentColor] transition-transform group-hover:scale-125" :class="`bg-${getColors(index)} text-${getColors(index)}`"></div>
          <div>
            <span class="font-label text-sm tracking-widest mb-2 block uppercase" :class="`text-${getColors(index)}`">{{ job.period }}</span>
            <h4 class="text-2xl font-headline font-bold mb-1">{{ job.position }}</h4>
            <h5 class="text-lg text-on-surface-variant font-bold mb-4">{{ job.company }}</h5>
            <div class="text-on-surface-variant font-body prose-ul:list-disc prose-ul:ml-5 prose-ul:mt-2 text-base leading-relaxed" v-html="job.description"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education & Achievements (Appended to match resume) -->
    <section id="systems" class="max-w-7xl mx-auto px-8 mb-32 grid md:grid-cols-2 gap-12">
      <!-- Education -->
      <div>
        <h2 class="text-label text-primary font-bold tracking-widest uppercase mb-8">Base Knowledge</h2>
        <div class="space-y-6">
          <div v-for="edu in resumeData.sections.education.items" :key="edu.id" class="glass-panel p-6 rounded-2xl hover:ambient-glow transition-all duration-300">
            <h4 class="text-xl font-headline font-bold mb-1">{{ edu.school }}</h4>
            <div class="text-sm font-label text-primary mb-3">{{ edu.area || edu.period }}</div>
            <div class="text-on-surface-variant text-sm" v-html="edu.description"></div>
          </div>
        </div>
      </div>
      <!-- Awards -->
      <div>
        <h2 class="text-label text-primary font-bold tracking-widest uppercase mb-8">Achievements</h2>
        <div class="space-y-6">
          <div v-for="award in resumeData.sections.awards.items" :key="award.id" class="glass-panel p-6 rounded-2xl hover:ambient-glow transition-all duration-300">
            <div class="flex justify-between items-start gap-4">
              <h4 class="text-xl font-headline font-bold mb-3">{{ award.title }}</h4>
            </div>
            <div class="text-on-surface-variant text-sm mb-3" v-html="award.description"></div>
            <a v-if="award.website?.url" :href="award.website.url" target="_blank" class="text-label-sm text-primary hover:text-primary-container inline-flex items-center gap-1">
              View Proof <span class="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Footer -->
    <section class="max-w-7xl mx-auto px-8 mb-32">
      <div class="glass-panel rounded-3xl p-16 text-center relative overflow-hidden ring-1 ring-primary/20">
        <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]"></div>
        <h3 class="text-4xl md:text-6xl font-headline font-bold mb-8 relative z-10">Ready to bridge the void?</h3>
        <p class="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto font-body relative z-10">
          Open to collaborative opportunities and robust system engineering challenges. Let's build what hasn't been imagined yet.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
          <a :href="`mailto:${resumeData.basics.email}`" class="px-10 py-5 aurora-glow text-surface font-bold rounded-2xl hover:scale-105 transition-all text-lg shadow-[0_10px_30px_rgba(143,245,255,0.2)] cursor-pointer inline-block">
            Establish Connection
          </a>
          <a :href="resumeData.basics.customFields.find(f => f.icon === 'LinkedIn' || f.text === 'shrish')?.link" target="_blank" class="px-10 py-5 bg-surface-container-highest/40 text-primary border border-primary/20 font-bold rounded-2xl hover:bg-surface-container transition-all text-lg cursor-pointer inline-block">
            Access LinkedIn
          </a>
        </div>
      </div>
    </section>

    <!-- Floating UI Items -->
    <AiChatPanel
      :is-open="showChatPanel"
      :name="name"
      :headline="headlineText"
      :summary="summaryText"
      :email="resumeData.basics.email"
      :github-url="githubUrl"
      :linkedin-url="linkedinUrl"
      :skills="visibleSkills"
      @close="closeChatPanel"
    />

    <div class="fixed bottom-8 right-8 z-50">
      <button
        type="button"
        class="w-16 h-16 rounded-full aurora-glow flex items-center justify-center shadow-[0_0_30px_rgba(143,245,255,0.6)] hover:scale-110 transition-transform cursor-pointer"
        :aria-expanded="showChatPanel"
        aria-controls="ai-chat-panel"
        aria-label="Open AI portfolio chat"
        @click="toggleChatPanel"
      >
        <span class="material-symbols-outlined text-surface text-3xl">smart_toy</span>
      </button>
    </div>

    <!-- Modals -->
    <TechnicalModal 
      :is-open="showSkillModal" 
      v-bind="activeSkill" 
      @close="showSkillModal = false" 
    />
  </main>
</template>
