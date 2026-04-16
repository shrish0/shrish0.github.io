<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  details?: string[]
}>()
</script>

<template>
  <div
    class="h-full p-6 rounded-2xl bg-surface-container-low
           hover:bg-surface-container-high transition-all duration-500
           ambient-glow hover:ambient-glow-strong cursor-pointer group"
  >
    <h3 class="text-headline-lg mb-2 group-hover:text-primary transition-colors duration-300">
      {{ title }}
    </h3>
    <div v-if="subtitle" class="text-primary-container font-medium mb-3">
      {{ subtitle }}
    </div>
    <div v-if="details && details.length" class="space-y-1">
      <p
        v-for="(detail, index) in details"
        :key="index"
        class="text-label-sm text-on-surface-variant"
      >
        {{ detail }}
      </p>
    </div>
    <slot></slot>
  </div>
</template>