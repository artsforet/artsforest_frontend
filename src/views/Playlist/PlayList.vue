<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type WaveSurfer from 'wavesurfer.js'
import { WaveSurferPlayer } from "@meersagor/wavesurfer-vue";
import Axios from "@/api/Axios";
import AddPlayList from "@/components/AddPlayLIst/AddPlayList.vue";

const musics = ref([]);
const waveSurfers = ref([]);
const currentTimes = ref([]);
const totalDurations = ref([]);

onMounted(() => {
  fetchAllMusic();
})

const fetchAllMusic = async () => {
  try {
    const response = await Axios.get('/api/music/');
    musics.value = response.data;
    waveSurfers.value = musics.value.map(() => null); // waveSurfers 배열 초기화
    currentTimes.value = musics.value.map(() => '00:00'); // currentTimes 배열 초기화
    totalDurations.value = musics.value.map(() => '00:00'); // totalDurations 배열 초기화
  } catch (error) {
    console.error("Error fetching music:", error);
  }
};

const createOptions = (url: string) => ({
  height: 80,
  waveColor: '#d9dcff',
  progressColor: '#4353ff',
  barWidth: 3,
  barRadius: 3,
  cursorWidth: 1,
  url: url // 노래의 URL로 설정
});

const formatTime = (seconds: number): string => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':');

const timeUpdateHandler = (time: number, index: number) => {
  currentTimes.value[index] = formatTime(time);
}

const readyHandler = (duration: number, index: number) => {
  totalDurations.value[index] = formatTime(duration);
}

const readyWaveSurferHandler = (ws: WaveSurfer, index: number) => {
  waveSurfers.value[index] = ws;
}
</script>

<template>
  <main>
    <div class="music-bar-container">
      <h1>WaveSurferPlayer Using Components</h1>
      <div v-for="(music, index) in musics" :key="music.id" class="music-item">
        <div class="music-card">
          <div class="music-info">
            <div class="music-text">
              <div class="music-title">{{ music.title }}</div>
              <div class="music-album">{{ music.album }}</div>
            </div>
            <div class="waveform-container">
              <WaveSurferPlayer
                  :options="createOptions(music.link)"
                  class="waveform"
                  @timeupdate="(time: number) => timeUpdateHandler(time, index)"
                  @ready="(duration: number) => readyHandler(duration, index)"
                  @waveSurfer="(ws: WaveSurfer) => readyWaveSurferHandler(ws, index)"
              />
            </div>
          </div>
          <div class="music-controls">
            <p>{{ currentTimes[index] }} / {{ totalDurations[index] }}</p>
            <button @click="waveSurfers[index]?.playPause()" class="play-button">
              Play/Pause
            </button>
            <AddPlayList on-close="" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 20px;
}

.music-bar-container {
  width: 100%;
}

.music-item {
  margin-bottom: 20px;
}

.music-card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.music-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.music-text {
  flex: 0.2;
}

.music-title {
  font-size: 18px;
  font-weight: bold;
}

.music-album {
  font-size: 14px;
  color: #888;
}

.waveform-container {
  flex: 2;
}

.waveform {
  width: 100%;
}

.music-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.music-controls p {
  margin: 0;
  font-size: 14px;
  color: #555;
}

.play-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.play-button:hover {
  background-color: #0056b3;
}
</style>
