<template>
  <div class="current-playing-music">
    <div class="music-info">
      <h2 class="music-title">{{ music.title }}</h2>
      <p class="music-description">{{ music.artist }}</p>
    </div>
    <div class="music-controls">
      <WaveSurferComponent :music="music.file" :isPlaying="isPlaying" />
      <button @click="togglePlayPause" class="btn play-button">
        <i :class="{'bi bi-play-fill': !isPlaying, 'bi bi-pause-fill': isPlaying}" class="play-icon"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { useCurrentSong } from '@/store/useCurrentSong';
import WaveSurferComponent from './common/waveform/WaveSurferComponent.vue';

export default {
  props: {
    music: {
      type: Object,
      required: true
    }
  },
  setup() {
    const { isPlaying, playPause } = useCurrentSong();

    const togglePlayPause = () => {
      playPause(music);
    };

    return {
      isPlaying,
      togglePlayPause
    };
  },
  components: {
    WaveSurferComponent
  }
};
</script>

<style scoped>
.current-playing-music {
}

.music-info {
  align-items: center;
  margin-right: 20px;
}

.music-title {
  font-size: 14px;
  color: white;
  margin-right: 10px;
}

.music-description {
  font-size: 12px;
  color: #bbbbbb;
}

.music-controls {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.play-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
}

.play-icon {
  font-size: 1.5rem;
}
</style>
