<!-- 2번 Page -->
<template>
  <div class="song-common-layout">
    <br /><br /><br />
    <div class="song-common-page">
    <h2 style="font-weight:600"> 앨범 > ARTS FOREST </h2>
      <p> 템포 전체 | 길이 전체 </p>
      <br />
      <ul style="padding: 0">
        <li v-for="song in paginatedSongs" :key="song.id" class="song-item">
          <div class="soundfactory-song-info">
            <div class="soundfactory-song-info-text">
              <img 
                :src="song.cover" 
                alt="Beautiful Landscape" class="song-cover">
              <div class="text-container">
                <span>{{ song.title }}</span>
                <span>{{ song.description }}</span>
              </div>
            </div>
          </div>

          <div class="waveform-container" :id="'waveform-' + song.id"></div>

          <div class="time-info">
            <span class="current-time" v-if="eventBus.selectedSong && eventBus.selectedSong.id === song.id">{{ formatTime(eventBus.currentTime) }} / </span>
            <span class="total-time">{{ formatTime(eventBus.duration) }}</span>
          </div>

          <button @click="playPauseSong(song)" class="button-custom">
            <i class="bi bi-play-fill" v-if="!isPlaying(song)"></i>
            <i class="bi bi-pause-fill" v-if="isPlaying(song)"></i>
          </button>

          <button @click="downloadMp(song)" class="button-custom">
            <i class="bi bi-download"></i>
          </button>

          <button @click="toggleLike(song)" class="button-custom">
            <i class="bi bi-heart" v-if="!isLiked(song)"></i>
            <i class="bi bi-heart-fill" v-if="isLiked(song)"></i>
          </button>
        </li>
      </ul>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1"> < </button>
        <button v-for="page in pages" :key="page" @click="changePage(page)" :class="{ active: page === currentPage }">
          {{ page }}
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages"> > </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, watch } from 'vue';
import { useSongStore } from '@/stores/songStore';
import { storeToRefs } from 'pinia';
import WaveSurfer from 'wavesurfer.js';
import eventBus from '@/eventBus';
import axios from "axios";

const songStore = useSongStore();
const { paginatedSongs, totalPages, currentPage } = storeToRefs(songStore);

const waveSurferInstances = new Map();

const playPauseSong = async (song) => {
  const token = localStorage.getItem('token');
  try {
    await axios.post(`http://localhost:8000/playlist/add/${song.id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error(error);
  }
  if (eventBus.selectedSong && eventBus.selectedSong.id === song.id) {
    eventBus.playPause = !eventBus.playPause;
  } else {
    eventBus.selectedSong = song;
    eventBus.playPause = true;
  }
};

const toggleLike = (song) => {
  song.isLiked = !song.isLiked;
  // Add logic to handle the like action, such as sending a request to the server
};

const isPlaying = (song) => {
  return eventBus.selectedSong && eventBus.selectedSong.id === song.id && eventBus.playPause;
};

const isLiked = (song) => {
  return song.isLiked;
};

const initializeWaveSurfer = () => {
  paginatedSongs.value.forEach((song) => {
    const containerId = '#waveform-' + song.id;
    if (waveSurferInstances.has(song.id)) {
      waveSurferInstances.get(song.id).destroy();
    }
    const waveform = WaveSurfer.create({
      container: containerId,
      waveColor: 'gray',
      progressColor: 'orange',
      interact: false, // 파형을 건드릴 수 없게 설정
      height: 50,
      fillParent: true
    });
    waveform.load(song.link);
    waveform.setMuted(true); // 소리를 뮤트 처리
    waveform.on('ready', () => {
      song.duration = waveform.getDuration();
      if (eventBus.selectedSong && eventBus.selectedSong.id === song.id) {
        waveform.seekTo(eventBus.currentTime / waveform.getDuration());
      }
    });
    waveform.on('audioprocess', () => {
      song.currentTime = waveform.getCurrentTime();
    });
    watch(() => eventBus.currentTime, (newTime) => {
      if (eventBus.selectedSong && eventBus.selectedSong.id === song.id) {
        waveform.seekTo(newTime / waveform.getDuration());
      }
    });
    waveSurferInstances.set(song.id, waveform);
  });
};

const prevPage = () => {
  if (currentPage.value > 1) {
    songStore.setPage(currentPage.value - 1);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    songStore.setPage(currentPage.value + 1);
  }
};

const changePage = (page) => {
  songStore.setPage(page);
};

const pages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const range = [];

  let start = Math.max(current - 5, 1);
  let end = Math.min(current + 4, total);

  if (current <= 5) {
    end = Math.min(10, total);
  } else if (current + 4 >= total) {
    start = Math.max(total - 9, 1);
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
});

const formatTime = (seconds) => {
  if (!seconds) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const downloadMp = async (song) => {
  try {
    const response = await fetch(song.link); // song.link를 URL로 사용하여 fetch 요청을 보냄
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const blob = await response.blob();
    const fileName = song.title;
    
    // Blob URL 생성
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);

    // 링크를 클릭하여 파일 다운로드
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // URL 해제
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('File download failed:', error);
  }
}



onMounted(() => {
  songStore.fetchSongs().then(() => {
    initializeWaveSurfer();
  });
});

watch(currentPage, () => {
  songStore.fetchSongs().then(() => {
    initializeWaveSurfer();
  });
});
</script>
