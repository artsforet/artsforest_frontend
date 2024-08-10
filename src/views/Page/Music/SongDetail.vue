<template>
  <div class="song-detail-container">
    <div class="song-header">
      <img :src="song.cover" alt="Album Cover" class="album-cover" />
      <div class="song-info">
        <h1>{{ song.title }}</h1>
        <br />

        <p v-if="song.description" class="song-detail-info-description">{{ song.description }}</p>
        <br />
        <div class="song-meta">
          <div class="key-values">
            <div class="keys">
              <!-- <p v-if="song.years" class="song-meta-number">발매일:</p> -->
              <p v-if="song.tempo" >템포:</p>
              <p v-if="song.duration">시간:</p>
              <p v-if="song.artist" class="song-meta-data">아티스트</p>
              <p v-if="song.mood" class="song-meta-data">분위기</p>
              <p v-if="song.album" class="song-meta-data">앨범시리즈</p>
              <p v-if="downloadCount" class="song-meta-data"> 아티스트곡 다운로드 횟수</p>
            </div>
            <div class="values">
              <!-- <p v-if="song.years" class="song-meta-number">{{ song.years }}</p> -->
              <p v-if="song.tempo" class="song-meta-number">{{ song.tempo }} BPM </p>
              <p v-if="song.duration" class="song-meta-number">{{ formatDuration(song.duration) }}</p>
              <span v-if="song.artist" class="song-meta-data"> #{{ song.artist }}</span> <br /><br />
              <span v-if="song.mood" class="song-meta-data">#{{ song.mood }}</span> <br /><br />
              <span v-if="song.album" class="song-meta-data">#{{ song.album }}</span><br /><br />
              <p v-if="song.downloadCount" class="song-meta-data">{{ downloadCount }}</p>
              <!-- <p>
                <span 
                  style="
                    border-radius:25px; 
                    border:1px solid white; 
                    padding: 4px 8px; 
                    color: ##bbb;
                    font-size: 1em;
                  "
                >{{ song.mood }}</span>
              </p>
              <p><span>{{ song.releaseDate }}</span></p>
              <p>
                <span 
                  style="
                    border-radius:25px; 
                    border:1px solid white; 
                    padding: 4px 8px; 
                    color: ##bbb"
                >{{ song.album }}</span>
              </p>
              <p>{{ downloadCount }}</p> -->
            </div>
          </div>
        </div>
        <!-- <div class="song-tags">
          <span v-for="tag in song.tags" :key="tag">{{ tag }}</span>
        </div> -->
      </div>
    </div>

    <div class="purchase-section">
      <hr style="width: 1196px; margin: 50px auto"/>
      <button @click="purchaseSong" class="music-ticket">

        연 결제로 구매하시고 더 저렴하게 음원 이용하세요! <br />
        <div class="music-ticket-inner">
            이용권 살펴보기
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const song = ref({});
const audio = ref(null);
const currentTime = ref(0);
const totalTime = ref(0);
const isPlaying = ref(false);
const isLiked = ref(false);
const downloadCount = ref();

const fetchSong = async () => {
  try {
    const response = await axios.get(`http://localhost:80/music/${route.params.id}`);
    song.value = response.data;
    totalTime.value = song.value.duration;
    fetchArtistDownloadsCount(song.value);
  } catch (error) {
    console.error('Failed to fetch song:', error);
  }
};

const fetchArtistDownloadsCount = async (song) => {
    const response = await axios.get(`http://localhost:80/music/artist/${song.artist}`);
    downloadCount.value = response.data;
};

const playPauseSong = () => {
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const updateTime = () => {
  currentTime.value = audio.value.currentTime;
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const toggleLike = () => {
  isLiked.value = !isLiked.value;
};

const downloadSong = async (song) => {
  try {
    const response = await axios.get(song.link, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${song.title}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Failed to download song:', error);
  }
};

const purchaseSong = () => {
  // 구매 로직 구현
};

onMounted(() => {
  fetchSong();
  // downloadSong() 함수 호출 제거: fetchSong 함수에서 호출하는 것으로 충분
});
</script>

<style scoped>
.song-detail-container { 
  height: 100vh;
  background-color: #1f1f1f;
  padding: 20px;
  color: white;  
  font-size: 14px;
}

.song-header {
  width:1196px;
  margin: 0 auto;
  display: flex;
  margin-top: 100px;
}

.album-cover {
  width: 238px;
  height: 238px;
  margin-right: 20px;
}

.song-info {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
}

.song-info h1 {
  margin: 0;
  font-size: 2em;
}

.artist {
  margin: 5px 0;
  font-size: 1.2em;
}

.song-meta {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  line-height: 20px;
}

.key-values {
  display: flex;
}

.keys, .values {
  margin-right: 100px;
}

.song-controls {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.song-controls button {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5em;
  margin-right: 10px;
}

.song-controls audio {
  margin-right: 10px;
}

.purchase-section {
  text-align: center;
  margin-top: 20px;
}

.purchase-section button {
  background-color: #ff5722;
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2em;
}

.song-detail-title {
  color: white;
  height: 10px;  
}

.music-ticket {
    width: 1128px;
    background:linear-gradient(230deg, #f11b63 57%, #e26c37 80%);
    height: 100px;
}

.music-ticket-inner {
    width: 200px;
    border-radius: 25px;
    background-color: white;
    color: black;
    margin: 10px auto;
    padding: 5px 0;
}

.song-meta-number {
  color: orange;
}
 
.keys > .song-meta-data {
  padding: 2px 5px 0 0;
 }
.values > .song-meta-data {
  color: #bbb;
  line-height: 1em; /* Line height relative to the text size */
  font-size: 16px;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap; /* Prevents text from wrapping */
  overflow: hidden; /* Ensures the element doesn't grow beyond its content */
  text-overflow: ellipsis; /* Adds ellipsis if text overflows */
}


.song-detail-info-description {
    height: 5px;
}
</style>
