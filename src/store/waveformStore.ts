import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWaveformStore = defineStore('waveform', () => {
  const currentSong = ref(null);

  const setCurrentSong = (song: any) => {
    currentSong.value = song;
  };

  return {
    currentSong,
    setCurrentSong,
  };
});