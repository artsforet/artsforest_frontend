<script setup>
import { onMounted, ref } from "vue"
import axios from "axios";
import eventBus from '@/eventBus';

const username = ref(localStorage.getItem('user'));
const downloadMusic = ref();

onMounted(()=> {
    fetchUserDownloadlist();
})
const fetchUserDownloadlist = async () => {
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:80/music/download/user/my-songs`, {
    headers: {
            Authorization: `Bearer ${token}`
        }
    })
    downloadMusic.value = response.data;
}
// export const getDownloadedMusic = async () => {
//   try {
//     const response = await api.get('/downloads/my-songs');
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch downloaded music:', error);
//     throw error;
//   }
 

 const isPlaying = (music) => {
  return eventBus.selectedSong && eventBus.selectedSong.id === music.music.id && eventBus.playPause;
};

function formatDatePart1(dateString) {
      const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function  formatDatePart2(dateString) {
      const date = new Date(dateString);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

const playPauseSong = async (music) => {
  const token = localStorage.getItem('token');
  try {
    await axios.post(`http://localhost:80/playlist/add/${music.music.id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error(error);
  }
  if (eventBus.selectedSong && eventBus.selectedSong.id === music.music.id) {
    eventBus.playPause = !eventBus.playPause;
  } else {
    eventBus.selectedSong = music.music;
    eventBus.playPause = true;
  }
};

const fetchAlbumSongs = () => {}
</script>

<template>
<div class="my-page-container">
    <div class="my-page-wrapper">
        <h2> 마이 페이지 </h2>
        <br />
        <div class="유저 이름">
            <div>
                <h3> 안녕하세요 &nbsp; {{ username }} &nbsp; 님 </h3>
            </div>
            <br />
            <div>
                <div> 다운로드 내역</div>
                <br />
                <table style="width:1200px">
                    <thead  style="min-width: 1920px; background-color: #333">
                        <tr> 
                            <td> 곡 정보</td>
                            <td> 다운로드 일시</td>
                            <td> 다운 </td>
                            <td> 재생 </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                          v-for="music in downloadMusic" :key=music.id
                          class="my-page-music-container"
                        >
                            <td style="display:flex; padding-top:20px;">
                            <div class="song-cover-container">
                              <router-link :to="{ name: 'AlbumDetail', params: { album: music.music.album } }">
                              <img 
                                  :src="music.music.cover" 
                                  :alt="music.music.title" 
                                  class="song-cover"
                                  @click="fetchAlbumSongs(song.album)"
                                  style="width:75px; border-radius: 10px"
                              />
                              </router-link>
                            </div>
                            <div class="song-info">
                              <router-link :to="{ name: 'SongDetail', params: { id: music.music.id } }">
                              <div class="item-title">{{ music.music.title }}
                              </div>
                              <div style="font-size:13px; color: #888">{{ music.music.description }}</div>
                              </router-link>
                            </div>
                            </td>
                            <td> 
                            <div>
                              <div style="text-align:ceter">
                                {{formatDatePart1(music.downloadedAt)}} 
                              </div>
                              <div style="text-align:ceter; margin:0 auto;">
                                {{formatDatePart2(music.downloadedAt)}} 
                              </div>
                            </div>
                            </td>
              <td> 다운 </td>
              <td> 
                  <button @click="playPauseSong(music)" class="button-custom">
                      <i class="bi bi-play-fill" style="font-size:30px; color: white;" ></i>
                  </button>
                </td>
                  </tr>
                </tbody>
                </table>
        </div>


        </div>
    </div>
</div>
</template>

<style scoped>
.my-page-container {
    width: 100%;
    height: 100%;
    padding-top:100px;
    padding-bottom:100px;
    background-color: rgb(26, 26, 26);
    color: white;

}

.my-page-music-container {
    height: 100px;
    border-bottom:1px solid #333;
}

.my-page-wrapper {
    width: 1196px;
    margin:0 auto;
}

.button-custom {
    padding: 0;
    margin:0  auto;
}
.my-page-music-cover {
    width: 60px;
    height: 60px;
    border-radius: 10px;
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

td {
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
