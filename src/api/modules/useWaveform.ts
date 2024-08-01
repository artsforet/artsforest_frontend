<script setup lang="ts">
import { computed, onMounted, nextTick, watch } from 'vue';
import { useMusicStore } from '@/store/music';
import WaveSurfer from 'wavesurfer.js';

interface Music {
  id: number;
  title: string;
  description: string;
  cover: string;
  link: string;
}

const musicStore = useMusicStore();
const waveSurferInstances: Record<number, WaveSurfer> = {};

const currentPlayingMusic = computed<Music | undefined>(() => {
  return musicStore.musicList.find(music => music.id === musicStore.currentPlayingId);
});

const playPause = (music: Music) => {
  musicStore.playPause(music);
  const waveSurfer = waveSurferInstances[music.id];
  if (waveSurfer) {
    waveSurfer.playPause();
  }
};

const initializeWaveSurfer = async (music: Music) => {
  await nextTick();
  const containerId = `waveform-bar-${music.id}`;
  const container = document.getElementById(containerId);
  if (container) {
    const waveSurfer = WaveSurfer.create({
      container,
      waveColor: 'violet',
      progressColor: 'purple',
    });
    waveSurfer.load(music.link);
    waveSurferInstances[music.id] = waveSurfer;
  }
};

watch(currentPlayingMusic, async (newMusic) => {
  if (newMusic) {
    await initializeWaveSurfer(newMusic);
  }
});

onMounted(async () => {
  if (currentPlayingMusic.value) {
    await initializeWaveSurfer(currentPlayingMusic.value);
  }
});
</script>