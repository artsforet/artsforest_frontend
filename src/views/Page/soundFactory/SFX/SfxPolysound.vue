<template>
  <div class="song-common-layout">
    <br /><br /><br />
    <div class="song-common-page">
      <h2 style="font-weight:600">곡 > BGM </h2>
      <p> 템포 전체 | 길이 전체 </p>
      <br />
      <ul style="padding: 0">
        <li v-for="song in paginatedSongs" :key="song.id" class="song-item">
          <div class="soundfactory-song-info">
            <div class="soundfactory-song-info-text">
              <router-link :to="{ name: 'AlbumDetail', params: { album: song.album } }">
              <img 
                :src="song.cover" 
                alt="Beautiful Landscape" 
                class="song-cover"
                @click="fetchAlbumSongs(song.album)"
              />
              </router-link>
              <div class="text-container">
                <router-link :to="{ name: 'SongDetail', params: { id: song.id } }">
                  <span>{{ song.title }}</span> <br />
                  <span style="font-size:13px; color: #888">{{ song.description }}</span>
                </router-link>
              </div>
            </div>
          </div>
          <div class='waveform-custom'> 
          <div class="waveform-container" :id="'waveform-' + song.id"><br/>

          </div>
          <span 
            style="float: left; margin-left: 100px"
            > 
            <span
            v-for="tag in song.tags" 
            :key="tag"
            style="margin: 0 5px; font-size:14px;"
            >
            #{{tag}} 
            </span>
            </span> 
          </div>
          &nbsp; &nbsp; &nbsp;

          <div class="time-info">
            <span class="current-time" v-if="eventBus.selectedSong && eventBus.selectedSong.id === song.id">{{ formatTime(eventBus.currentTime) }} / </span>
            &nbsp;
            <span class="total-time">{{ formatTime(song.duration) }}</span>
          </div>

          <button @click="playPauseSong(song)" class="button-custom">
            <i class="bi bi-play-fill" v-if="!isPlaying(song)"></i>
            <i class="bi bi-pause-fill" v-if="isPlaying(song)"></i>
          </button>

          <button @click="downloadMp(song)" class="button-custom">
            <i class="bi bi-download"></i>
          </button>

          <button @click="toggleLikes(song)" class="button-custom">
            <img v-if="song.isLiked === true" :src="fillheart" style="width: 30px" />
            <img v-if="song.isLiked === false" :src="nofillheart" style="width: 30px" />
            <!-- <i :class="song.isLiked === true? 'bi bi-heart-fill' : 'bi bi-heart'" style="color: red"></i> -->
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
import { onMounted, computed, watch, ref } from 'vue';
import { useSongStore } from '@/stores/songStore';
import { useDownloadStore } from "@/stores/download";
import { storeToRefs } from 'pinia';
import WaveSurfer from 'wavesurfer.js';
import eventBus from '@/eventBus';
import axios from "axios";
import fillheart from '@/assets/icons/fill-heart.png';
import nofillheart from '@/assets/icons/no-fill-heart.png';

const downloadStore = useDownloadStore();
const download = ref();
const songStore = useSongStore();
const { paginatedSongs, totalPages, currentPage } = storeToRefs(songStore);

const waveSurferInstances = new Map();

const fetchAlbumSongs = async (albumId) => {
  try {
    const response = await axios.get(`http://localhost:8000/music/album/${albumId}`);
    songStore.setSongs(response.data);  // 노래 목록을 갱신
  } catch (error) {
    console.error('Failed to fetch album songs:', error);
  }
};

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


const userId = ref(localStorage.getItem('userId')); 
const token = localStorage.getItem('token');
 

const toggleLikes = async (song) => {
  const token = localStorage.getItem('token');
  try {
    if (song.isLiked) {
      await axios.delete(`http://localhost:8000/music/unlike/${song.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(song);
      song.isLiked = false;
    } else {
      await axios.post(`http://localhost:8000/music/like/${song.id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      song.isLiked = true;
    }
  } catch (error) {
    console.error("Error toggling like status:", error);
    // 오류 처리 추가
  }
};

onMounted(() => {
  // fetchUserLikedSongs();
});


const isPlaying = (song) => {
  return eventBus.selectedSong && eventBus.selectedSong.id === song.id && eventBus.playPause;
};


const initializeWaveSurfer = () => {
  paginatedSongs.value.forEach((song) => {
    const containerId = '#waveform-' + song.id;
    if (waveSurferInstances.has(song.id)) {
      waveSurferInstances.get(song.id).destroy();
    }
    const waveform = WaveSurfer.create({
      container: containerId,
      waveColor: '#333',
      progressColor: 'white',
      interact: false, // 파형을 건드릴 수 없게 설정
      height: 50,
      fillParent: true,
      barWidth: 2,
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


const fetchArtistDownloads = async (song) => {
  try {
    const response = await axios.get(`http://localhost:8000/music/downloads/artist/${song}`);
    downloads.value = response.data;
  } catch (error) {
    console.error('Failed to fetch artist downloads:', error);
  }
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

    const token = localStorage.getItem('token');
    // URL 해제
    window.URL.revokeObjectURL(url);
    if(song.isPublic === true){
    // 링크를 클릭하여 파일 다운로드
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      axios.post(`http://localhost:8000/music/download/${song.id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      alert('결제 페이지로 이동합니다.')
    }
  } catch (error) {
    console.error('File download failed:', error);
  }
}


onMounted(() => {
  fetchAlbumSongs();
  const token = localStorage.getItem('token');
  songStore.fetchSfxPolysound(token).then(() => {
    initializeWaveSurfer();
  });
});


watch(currentPage, () => {
  songStore.fetchSfxPolysound().then(() => {
    initializeWaveSurfer();
  });
});


</script>
