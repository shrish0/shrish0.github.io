<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
  title?: string
  efficiency?: string
  overhead?: string
  description?: string
  bullets?: string[]
  icon?: string
  level?: number
}>()

defineEmits(['close'])

const proficiencyLabel = computed(() => {
  const lvl = props.level || 0
  if (lvl >= 5) return 'Expert'
  if (lvl === 4) return 'Advanced'
  if (lvl === 3) return 'Intermediate'
  if (lvl === 2) return 'Beginner'
  return 'Novice'
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-surface/80 backdrop-blur-sm"
    >
      <div class="glass-panel max-w-2xl w-full p-10 rounded-3xl relative animate-fade-up pointer-events-auto">
        <button
          @click="$emit('close')"
          class="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          <span class="text-2xl font-bold">✕</span>
        </button>

        <div class="flex items-start gap-8 mb-8">
          <div class="w-20 h-20 rounded-2xl aurora-glow flex items-center justify-center shrink-0 text-surface">
            <span class="material-symbols-outlined text-4xl">{{ icon || 'dns' }}</span>
          </div>
          <div>
            <h5 class="text-xs font-label text-primary tracking-[0.2em] uppercase mb-2">Module Specifications</h5>
            <h3 class="text-4xl font-headline font-bold text-heading">{{ title || 'Spatial Logic' }}</h3>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-8">
          <div class="glass-surface p-4 rounded-xl border border-outline-variant/15 flex flex-col justify-center">
            <span class="text-[10px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Efficiency Rating</span>
            <div class="text-xl font-headline text-primary">{{ efficiency || '99.42%' }}</div>
          </div>
          <div class="glass-surface p-4 flex flex-col justify-center rounded-xl border border-outline-variant/15">
            <div class="flex items-center justify-between mb-1">
              <span class="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Proficiency Rating</span>
              <span class="text-[10px] font-label text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">{{ proficiencyLabel }}</span>
            </div>
            <div class="flex items-center gap-1 mt-1">
              <span 
                v-for="i in 5" 
                :key="i" 
                class="text-xl leading-none transition-colors" 
                :class="i <= (level || 0) ? 'text-primary drop-shadow-[0_0_8px_color-mix(in_srgb,var(--color-primary)_40%,transparent)]' : 'text-on-surface-variant/20'"
              >
                ★
              </span>
            </div>
          </div>
        </div>

        <div class="space-y-6 mb-8">
          <p class="text-on-surface-variant font-body leading-relaxed">
            {{ description || 'Implementing non-Euclidean data mapping to reduce pointer chasing in massive graph databases. The Spatial Logic module allows for instantaneous traversal of nodes across disparate clusters.' }}
          </p>

          <ul class="space-y-3 font-body text-sm">
            <li v-for="(bullet, index) in (bullets || ['Optimized B-tree indexing for high-concurrency writes', 'Custom memory allocator for zero-fragmentation', 'Thread-safe lockless queues for asynchronous IO'])" :key="index" class="flex items-center gap-3 text-on-surface">
              <span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0 opacity-80"></span>
              {{ bullet }}
            </li>
          </ul>
        </div>

      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
