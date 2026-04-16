<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { SKILL_ICONS } from '@/utils/constants'

defineProps<{
  skills: Array<{ name: string; colorClass?: string }>
}>()

const getIcon = (name: string): string => {
  const key = name.toLowerCase().replace('.', '').replace('js', '').trim()
  // Map common variations if needed, or rely on strict mapping in constants 
  // For now trying direct match or basic cleanup
   if (SKILL_ICONS[key]) return SKILL_ICONS[key]
   // fallback lookups could be added here
   if (name.toLowerCase() === 'vue.js') return SKILL_ICONS['vue'] || ''
   
   return SKILL_ICONS[name.toLowerCase()] || ''
}
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div 
      v-for="skill in skills" 
      :key="skill.name"
      class="flex flex-col items-center p-4 rounded-lg bg-background-soft border border-white/5 hover:border-primary/50 transition-colors"
    >
      <Icon 
        v-if="getIcon(skill.name)" 
        :icon="getIcon(skill.name)" 
        width="40" 
        class="mb-2" 
      />
      <span v-else class="text-2xl mb-2">💻</span>

      <h3 class="font-medium text-heading">{{ skill.name }}</h3>
    </div>
  </div>
</template>
