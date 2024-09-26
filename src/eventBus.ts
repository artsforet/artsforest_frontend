// src/eventBus.js
import { reactive } from 'vue';

const eventBus = reactive({
  playlist: [],
  selectedSong: null,
  playPause: false,
  currentTime: 0,
});

export default eventBus;
