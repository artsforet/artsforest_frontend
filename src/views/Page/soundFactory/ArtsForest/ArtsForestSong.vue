<template>
  <div class="song-common-layout">
    <br /><br /><br /> <br /><br />
    <div class="song-common-page">
      <h2 style="font-weight:600">곡 > 예술숲 </h2>
      <p style="color: #FFC200"> 템포 전체 | 길이 전체 </p>
      <br />
      <div class="song-list">
        <div v-for="song in paginatedSongs" :key="song.id" class="song-item">
          <div class="song-cover-container">
            <router-link :to="{ name: 'AlbumDetail', params: { album: song.album } }">
              <img 
                :src="song.cover" 
                alt="Beautiful Landscape" 
                class="song-cover"
                @click="fetchAlbumSongs(song.album)"
              />
            </router-link>
          </div>
          <div class="song-info">
            <router-link :to="{ name: 'SongDetail', params: { id: song.id } }">
              <div class="item-title">{{ song.title }}</div>
              <div style="font-size:13px; color: #888">{{ song.description }}</div>
            </router-link>
            <div class="song-tags">
              <span v-for="tag in song.tags" :key="tag" class="song-tag">
                #{{tag}} 
              </span>
            </div>
          </div>
          <div class="waveform-custom">
            <div class="waveform-container" :id="'waveform-' + song.id"></div>
          </div>
          <div class="time-info" :class="{ playing: eventBus.selectedSong && eventBus.selectedSong.id === song.id }">
            <span class="current-time" v-if="eventBus.selectedSong && eventBus.selectedSong.id === song.id">{{ formatTime(eventBus.currentTime) }} / </span>
            <span class="total-time">{{ formatTime(song.duration) }}</span>
          </div>
          <div class="song-actions">
            <button @click="playPauseSong(song)" class="button-custom">
              <i class="bi bi-play-fill" v-if="!isPlaying(song)"></i>
              <i class="bi bi-pause-fill" v-if="isPlaying(song)"></i>
            </button>
            <button @click="downloadMp(song)" class="button-custom">
              <i class="bi bi-download"></i>
            </button>
            <button @click="toggleLikes(song)" class="button-custom">
              <img v-if="song.isLiked === true" :src="fillheart" class="heart-icon" />
              <img v-else :src="nofillheart" class="heart-icon" />
            </button>
          </div>
        </div>
      </div>
      <br /><br />
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1"> 
          <i class="bi bi-chevron-left" style="font-size: 14px;"></i>
         </button>
        <button v-for="page in pages" :key="page" @click="changePage(page)" :class="{ active: page === currentPage }">
          {{ page }}
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages"> 
          <i class="bi bi-chevron-right" style="font-size: 14px"></i>
        </button>
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
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`http://localhost:80/music/album/${albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    songStore.setSongs(response.data);  // 노래 목록을 갱신
  } catch (error) {
    console.error('Failed to fetch album songs:', error);
  }
};

const playPauseSong = async (song) => {
  const token = localStorage.getItem('token');
  try {
    await axios.post(`http://localhost:80/playlist/add/${song.id}`, {}, {
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
      await axios.delete(`http://localhost:80/music/unlike/${song.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(song);
      song.isLiked = false;
    } else {
      await axios.post(`http://localhost:80/music/like/${song.id}`, {}, {
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
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`http://localhost:80/music/downloads/artist/${song}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
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
    alert(url)
    const token = localStorage.getItem('token');
    // URL 해제
    window.URL.revokeObjectURL(url);
    if(song.isPublic === true){
    // 링크를 클릭하여 파일 다운로드
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      axios.post(`http://localhost:80/music/download/${song.id}`, {}, {
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

<style scoped>
div {
  margin: 0;
  padding: 0;
}
.song-common-layout{
  width: 100%;
  height: 100vh;
  background-color: rgb(26, 26, 26);
  color: white;
}

.song-common-page {
  width: 1200px;
  margin: 0 auto;

}
.playing {
    color: #f3be38;
}

.button-custom {
  margin-top: 10px;
  background: transparent;
  color: white;
  border: none;
}
.bi {
  font-size: 30px;
}

.song-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.song-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #333;
  padding: 10px 0;
  display: flex;
  color: white;
}

.song-cover-container {
  margin-right: 20px;
}

.song-cover {
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.song-info {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
}

.item-title {
  font-weight: bold;
}

.song-tags {
  display: flex;
  margin-top: 5px;
}

.song-tag {
  margin-right: 5px;
  font-size: 13px;
  color: #888;
}

.waveform-custom {
  flex: 4;
  margin-right: 20px;
}

.time-info {
  flex: 1;
  font-size: 14px;
  display: flex;
  justify-content: center;
  margin-right: 20px;
}

.song-actions {
  display: flex;
  justify-content: space-around;
  gap: 10px;
}

.heart-icon {
  width: 20px;
}

a {
  color: white;
  text-decoration: none;
}

.pagination {
  justify-content: center;
}
.pagination > button {
  width: 30px;
  height: 30px;
  border-radius: 25px;
  background-color: #484848;
  color: #bbbbbb;
  font-weight: 300;
  margin: 0 5px;
  border: none;
}

.pagination button.active {
  color: #232020;
  background-color: #f3be38;
  font-weight: bold;
  border: none;
}

</style>
