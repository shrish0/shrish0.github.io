<script setup lang="ts">
const props = defineProps<{
  title: string
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

// Close modal
const closeModal = () => emit('close')
</script>

<template>
  <div v-if="show" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <!-- Header -->
      <div class="modal-header">
        <h2>{{ props.title }}</h2>
        <button class="modal-close" @click="closeModal">✖</button>
      </div>

      <!-- Body Slot -->
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0);
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.modal-body {
  padding: 1rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
