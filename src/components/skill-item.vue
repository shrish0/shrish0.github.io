<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { SKILL_ICONS } from '@/utils/constants'

defineProps<{
  skills: Array<{ name: string; colorClass?: string }>
}>()

const getIcon = (name: string): string => {
  const lowercaseName = name.toLowerCase().trim()
  // 1. Check exact match (lowercase)
  if (SKILL_ICONS[lowercaseName]) return SKILL_ICONS[lowercaseName]

  // 2. Check "cleaned" match (no dots, no 'js')
  const cleanedKey = lowercaseName.replace(/\./g, '').replace(/js/g, '').trim()
  if (SKILL_ICONS[cleanedKey]) return SKILL_ICONS[cleanedKey]

  return ''
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
        height="40"
        class="mb-3" 
      />
      <span v-else class="text-2xl mb-2">💻</span>

      <h3 class="font-medium text-heading">{{ skill.name }}</h3>
    </div>
  </div>
</template>
