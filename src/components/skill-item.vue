<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { SKILL_ICONS } from '@/utils/constants'

defineProps<{
  skills: Array<{ name: string; colorClass?: string }>
}>()

const getIcon = (name: string): string => {
  const lowercaseName = name.toLowerCase().trim()
  if (SKILL_ICONS[lowercaseName]) return SKILL_ICONS[lowercaseName]

  const cleanedKey = lowercaseName.replace(/\./g, '').replace(/js/g, '').trim()
  if (SKILL_ICONS[cleanedKey]) return SKILL_ICONS[cleanedKey]

  return ''
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div
      v-for="skill in skills"
      :key="skill.name"
      class="glass-panel p-8 rounded-xl cursor-pointer hover:scale-[1.03] transition-all group border-primary/5 hover:ambient-glow"
    >
      <div class="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-surface transition-colors">
        <Icon
          v-if="getIcon(skill.name)"
          :icon="getIcon(skill.name)"
          width="24"
          height="24"
        />
        <span v-else class="material-symbols-outlined">architecture</span>
      </div>
      
      <h4 class="text-xl font-headline font-bold mb-3 text-heading">{{ skill.name }}</h4>
      <p class="text-sm text-on-surface-variant font-body mb-6 line-clamp-2">
        {{ (skill as any).description || 'Core expertise node with high-performance output capabilities.' }}
      </p>
      
      <div class="text-xs font-label text-primary/60 tracking-widest uppercase">
        Status: Optimal
      </div>
    </div>
  </div>
</template>
