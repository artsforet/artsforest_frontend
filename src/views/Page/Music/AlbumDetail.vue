<template>
  <div class="album-detail-page">
    <br />
    <div class="album-detail-wrap">
      <div class="album-header">
        <img v-if="songs[0]" :src="songs[0].song.cover" alt="Album Cover" class="album-cover" style="width: 200px; height: 200px;" />
        <div class="album-info">
          <h2>{{ albumName }}</h2> <br/>
          <p v-if="songs[0]">발매일: <span > {{ songs[0].song.years }} </span></p>
          <p v-if="songs[0]" style="font-size: 13px; padding: 0 5px 0 0">시리즈 <span style="border: 1px solid white; border-radius: 25px; padding: 5px 10px; font-size: 12px; color: #ccc"> {{ songs[0].song.series }} </span></p>
        </div>
      </div>
      <br />
      <ul class="song-list">
        <li v-for="song in songs" :key="song.id" class="song-item">
          <img :src="song.song.cover" alt="Song Cover" class="song-cover" />



          <div class="song-info">
            <div class="song-title">{{ song.song.title }}</div>
            <div class="song-details">{{ song.song.album }}</div>
          </div>

  

          <div class="song-meta" style="font-size:14px; color: #f3be38 ">
            <span class="song-duration">{{ formatTime(song.duration) }}</span>
            <span class="song-bpm">{{ song.song.tempo}} BPM</span>
          </div>


        <div class="song-tags" style="width:404px;">
            <span v-for="tags in song.tags" :key="tags" style="font-size:14px; color: #888"> #{{tags}} </span>
          </div>

          <button @click="playPauseSong(song.song)" class="button-custom">
            <i class="bi" :class="[isPlaying(song) ? 'bi-pause-fill' : 'bi-play-fill']"></i>
          </button>
          <button @click="downloadMp(song.song)" class="button-custom">
            <i class="bi bi-download"></i>
          </button>
           <button @click="toggleLikes(song)" class="button-custom">
            <img v-if="song.isLiked === true" :src="fillheart" style="width: 30px" />
            <img v-if="song.isLiked === false" :src="nofillheart" style="width: 30px" />
            <!-- <i :class="song.isLiked === true? 'bi bi-heart-fill' : 'bi bi-heart'" style="color: red"></i> -->
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import eventBus from '@/eventBus';
import fillheart from '@/assets/icons/fill-heart.png';
import nofillheart from '@/assets/icons/no-fill-heart.png';

const route = useRoute();
const albumName = ref(route.params.album);
const releaseDate = ref('');
const songs = ref([]);
const cover = ref('');

onMounted(() => {
  fetchAlbumSongs();
});

const fetchAlbumSongs = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`http://localhost:8000/music/album/${albumName.value}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    songs.value = response.data;
    if (response.data.length > 0) {
      cover.value = response.data[0].cover;
      releaseDate.value = response.data[0].years;
    }
  } catch (error) {
    console.error('Failed to fetch album songs:', error);
  }
};



const playPauseSong = (song) => {
  if (eventBus.selectedSong && eventBus.selectedSong.id === song.id) {
    eventBus.playPause = !eventBus.playPause;
  } else {
    eventBus.selectedSong = song;
    eventBus.playPause = true;
  }
};

const toggleLikes = async (song) => {
  const token = localStorage.getItem('token');
  console.log(song.song)
  try {
    if (song.isLiked) {
      await axios.delete(`http://localhost:8000/music/unlike/${song.song.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(song);
      song.isLiked = false;
    } else {
      await axios.post(`http://localhost:8000/music/like/${song.song.id}`, {}, {
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

const isPlaying = (song) => {
  return eventBus.selectedSong && eventBus.selectedSong.id === song.id && eventBus.playPause;
};

const isLiked = (song) => {
  return song.isLiked;
};

const downloadMp = async (song) => {
  try {
    const response = await fetch(song.link);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const blob = await response.blob();
    const fileName = song.title;
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const token = localStorage.getItem('token');
    window.URL.revokeObjectURL(url);
    axios.post(`http://localhost:8000/music/download/${song.id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('File download failed:', error);
  }
};

const formatTime = (seconds) => {
  if (!seconds) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};
</script>

<style scoped>
.album-detail-page {
  height: 100vh;
  color: #ffffff;
  background-color: #1e1e1e;
}

.album-detail-wrap {
  width: 1196px;
  margin: 0 auto;
}
.album-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.album-cover {
  width: 150px;
  height: 100px;
  margin-right: 20px;
}

.album-info {
  display: flex;
  flex-direction: column;
}
.album-info > span > p > span {}

.album-info h2 {
  margin: 0;
}

.song-list {
  list-style-type: none;
  padding: 0;
}

.song-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 5px;
  color: white;
  text-align: start;
}

.song-cover {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.song-info {
  width: 260px;
  margin-left: 20px;
}

.song-title {
  font-weight: bold;
}

.song-details {
  font-size: 14px;
  color: #888;
}

.song-meta {
  margin-right: 10px;
  text-align: right;
  display: flex;
  flex-wrap: wrap;
}

.song-duration {
  width: 50px;
}
.song-bpm {
  width: 80px;
  margin-right: 20px;
}

.song-duration,
.song-bpm {
  display: block;
  margin-left: 20px;
}

.button-custom {
  margin-bottom: 50px;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  margin-left: 10px;
}
</style>
