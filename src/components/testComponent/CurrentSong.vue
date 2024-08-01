<template>
    <div v-if="currentSong" class="curreont-song">
      <p>Currently Playing: {{ currentSong.title }}</p>
      <div ref="waveformContainer" class="waveform"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import WaveSurfer from 'wavesurfer.js';
  
  const props = defineProps({
    currentSong: Object
  });
  
  const waveformContainer = ref(null);
  let wavesurfer = null;
  
  watch(props.currentSong, async (newSong) => {
    if (wavesurfer) {
      wavesurfer.destroy();
    }
    if (newSong) {
    //   await nextTick();
      wavesurfer = WaveSurfer.create({
        container: waveformContainer.value,
        waveColor: 'violet',
        progressColor: 'purple',
        cursorColor: 'navy'
      });
    wavesurfer.load(newSong.url);
    }
  });
  
  onMounted(() => {
    if (props.currentSong) {
      wavesurfer = WaveSurfer.create({
        container: waveformContainer.value,
        waveColor: 'violet',
        progressColor: 'purple',
        cursorColor: 'navy'
      });
        wavesurfer.load(props.currentSong.url);
    }
  });
  </script>
  
  <style>
  .waveform {
    width: 1200px;
  }
  .curreont-song {
    width: 100%;
    position: fixed;
    bottom:0;
  }
  </style>
  
