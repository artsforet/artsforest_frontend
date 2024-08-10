<template>
  <div class="song-list-container">
    <div class="song-list">
       <div class="swiper-curated-flex" style="width: 100%; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center;">
          <router-link to='/playlist/curation' style="color: white; text-decoration: none;">
          <h3 style="font-weight:600">
              PD의 선택
          </h3>
          </router-link>
        <p style="color: white; align-self: flex-end; margin: 0; font-weight: 600">
          <router-link to='/playlist/curation' style="color: white; text-decoration: none">더보기</router-link>
        </p>
      </div>



          <div v-for="(song, index) in pd" :key="index" class="song-item">
            <router-link to='/'>
            <img :src="song.cover" class="song-image" />
            </router-link>
            <div class="song-info">
              <router-link to='/'>
              <div class="song-title">
                {{ song.title }}
              </div>
              <div class="song-album">{{ song.album }}</div>
              </router-link>
              <div class="song-meta">
                <span class="song-length">길이 {{ song.duration }}</span>
                <span class="song-bpm">템포 {{ song.tempo }} BPM</span>
              </div>
          </div>
      
          <button @click="playPauseSong(song)" class="button-custom">
            <img src="@/assets/icons/music/play.png" style="width: 50px" v-if="!isPlaying(song)" />
            <img src="@/assets/icons/music/pause.png" style="width: 50px" v-if="isPlaying(song)" />
          </button>
      </div>
        <div v-if="pd.length === 0" style="color: white; margin:0"> 등록된 곡이 없습니다.</div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import eventBus from '@/eventBus';

const pd = ref([]); 
const fetchPd = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost/music/pdSelect/all', {
      params: {
        limit: 8,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
  });
  pd.value = response.data;
}

onMounted(()=> {
  fetchPd();
})

const isPlaying = (song) => {
  return eventBus.selectedSong && eventBus.selectedSong.id === song.id && eventBus.playPause;
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
const songs = ref([
        {
          image: "https://swiperjs.com/demos/images/nature-1.jpg",
          title: "도로옆 해변이 보인다",
          album: "여름이다! 해변으로 떠나자! [여행 Vlog Type Vol. 3]",
          length: "01:59",
          bpm: 96,
        },
      ])
</script>

<style scoped>
.song-list-container {
  width: 100%;
  background-color: black;
  padding: 20px;
  padding-bottom: 200px;
  box-sizing: border-box;
  margin: 0 auto;
}

h3 {
  width: 100%;
  color: white;
  margin-bottom: 20px;
}

.song-list {
  width: 1196px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin: 0 auto;
}

.song-item {
  width: 580px;
  display: flex;
  align-items: center;
  padding-top: 20px;
  margin: 10px 0;
}

.song-image {
  width: 75px;
  height: 75px;
  margin-right: 20px;
  margin-top: 10px;
}

.song-info {
  color: white;
  text-align: start;
  flex-grow: 1;
  font-size: 15px;
}

.song-title {
  font-weight: bold;
}

.song-album {
  margin-top: 5px;
}

.song-meta {
  display: flex;
  margin-top: 5px;
  color: #f0a500;
  align-items: center;
  margin-bottom:-20px;
}

.song-meta span {
  margin-right: 10px;
}

.button-custom {
  color: white;
  cursor: pointer;
  margin: 0;
  padding: 0;
}


.bi {
  font-size: 25px;
  margin-right: 20px;
}

a {
  text-decoration: none;
  color: white;
}
</style>
