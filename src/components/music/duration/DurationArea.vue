<template>
  <div class="duration-box">
    <span id="currentTime" class="current-time">
      {{ progress.currentStringTime }}
    </span>
    <span id="duration" class="duration">
      {{ progress.durationStringTime }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/store/player'

const playerStore = usePlayerStore()
const progress = computed(() => playerStore.progress)
</script>

<style scoped>
.duration-box {
  display: flex;
  justify-content: space-between;
}

.current-time,
.duration {
  font-size: 14px;
}
</style>
