<template>
  <div v-if="open" class="drawer" @click="handleClose">
    <div class="container" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

interface Props {
  open: boolean;
  onClose: () => void;
}

const props = defineProps<Props>();

const handleClose = (event: MouseEvent) => {
  if (event.target !== event.currentTarget) {
    return;
  }
  props.onClose();
};

const keyboardEvent = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    props.onClose();
  }
};

onMounted(() => {
  if (props.open) {
    window.addEventListener('keydown', keyboardEvent);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', keyboardEvent);
});

watch(() => props.open, (newVal) => {
  const body = document.body;
  body.style.overflow = newVal ? 'hidden' : 'auto';

  if (newVal) {
    window.addEventListener('keydown', keyboardEvent);
  } else {
    window.removeEventListener('keydown', keyboardEvent);
  }
});
</script>

<style scoped>
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
