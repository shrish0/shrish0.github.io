<script setup lang="ts">
defineProps<{
  title: string
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const closeModal = () => emit('close')
</script>

<template>
  <!-- Modal Overlay -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="modal-overlay"
        @click.self="closeModal"
      >
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div v-if="show" class="modal-panel">
            <!-- Header: spacing-only separation (No-Line Rule) -->
            <div class="flex justify-between items-center mb-8">
              <h2 class="text-headline-lg">{{ title }}</h2>
              <button
                class="modal-close-btn"
                @click="closeModal"
                aria-label="Close modal"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div class="modal-body">
              <slot></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(4, 8, 20, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

/* Surface-bright with backdrop-blur per design.md */
.modal-panel {
  background: color-mix(in srgb, var(--color-surface-bright) 85%, transparent);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid color-mix(in srgb, var(--color-outline-variant) 15%, transparent);
  border-radius: 1.5rem;
  width: 100%;
  max-width: 640px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 2rem;
  box-shadow: 0 0 60px color-mix(in srgb, var(--color-primary) 8%, transparent);
}

.modal-body {
  padding: 0;
}

.modal-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-surface-container) 60%, transparent);
  color: var(--color-on-surface-variant);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-close-btn:hover {
  background: color-mix(in srgb, var(--color-primary) 15%, transparent);
  color: var(--color-primary);
}

/* Custom scrollbar inside modal */
.modal-panel::-webkit-scrollbar { width: 4px; }
.modal-panel::-webkit-scrollbar-track { background: transparent; }
.modal-panel::-webkit-scrollbar-thumb {
  background: var(--color-outline-variant);
  border-radius: 9999px;
}
</style>
