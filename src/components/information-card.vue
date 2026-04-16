<script setup lang="ts">
defineProps<{
    title: string;
    subtitle?: string;
    details?: string[];
}>();
</script>

<template>
  <div class="h-full p-6 rounded-2xl bg-background-soft border border-white/5 hover:border-primary/50 transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/10">
    <h3 class="text-xl font-bold text-heading mb-2">{{ title }}</h3>
    <div v-if="subtitle" class="text-primary font-medium mb-3">{{ subtitle }}</div>
    <div v-if="details && details.length" class="space-y-1">
      <p v-for="(detail, index) in details" :key="index" class="text-text-mute text-sm">
        {{ detail }}
      </p>
    </div>
    <slot></slot>
  </div>
</template>