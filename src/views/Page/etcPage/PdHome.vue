<template>
  <div class='song-admin-container'>
    <!-- <CreatePost @new-post="addPost" /> -->
    <br /><br />
    <div class='table-container'>
      <h4 style="font-weight:600">PD의 선택</h4> <br /><br />
    <table>
      <thead>
        <tr>
          <th></th>
          <th>곡정보</th>
          <th>태그</th>
          <th class="pd-td-icon">듣기</th>
          <th class="pd-td-icon">다운</th>
          <th class="pd-td-icon">재생목록</th>
          <th class="pd-td-icon">공유</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="song in songs" :key="song.id" style="width: 100%; border-top: 1px solid #333;">
          <td> <img :src="song.cover" alt="이미지" style="width: 50px;" /></td>
          <td> 
            <div>
              {{ song.title }}  <br />
              {{ song.description }} 
            </div>    
          </td>
          <td> 
            <span 
            style="float: left;"
            > 
            <span
            v-for="tag in song.tags" 
            :key="tag"
            style="margin: 0 5px; font-size:14px;"
            >
            #{{tag}} 
            </span>
            </span> 
           </td>
          <td class="pd-td-icon"> 
            <button @click="playPauseSong(song)" class="button-custom">
            <img src="@/assets/icons/music/play01.png" style="width: 30px" v-if="!isPlaying(song)" />
            <img src="@/assets/icons/music/pause01.png" style="width: 30px" v-if="isPlaying(song)" />
            </button>
           </td>
          <td class="pd-td-icon"> 
          <button @click="playPauseSong(song)" class="button-custom">
              <img src="@/assets/icons/music/download.png" alt="다운로드 버튼"  style="width: 30px" />
          </button>
          </td>
          <td class="pd-td-icon"> 
            <button @click="playPauseSong(song)" class="button-custom">
              <img src="@/assets/icons/music/playlist.png" alt="다운로드 버튼"  style="width: 30px" />
            </button> 
          </td>
          <td class="pd-td-icon">
            <button @click="playPauseSong(song)" class="button-custom">
              <img src="@/assets/icons/music/copy.png" alt="다운로드 버튼"  style="width: 30px" />
            </button>
           </td>
        </tr>
          <!-- <td>
            <button @click="deletePost(index)">삭제</button>
          </td> -->
        <!-- </tr> -->
      </tbody>
    </table>
    </div>
     <button @click="createAlbum" :disabled="!selectedSongs.length || !albumName || !albumCover">Create Album</button>
    <p v-if="albumCreatedMessage">{{ albumCreatedMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import eventBus from '@/eventBus';

export default {
  data() {
    return {
      songs: [],
      selectedSongs: [],
      albumName: '',
      albumCover: null,
      albumCreatedMessage: '',
    };
  },
  mounted() {
    this.fetchSongs();
  },
  methods: {
       async toggleLikes(song) {
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
      },
     async playPauseSong(song) {
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
    },
    async fetchSongs() {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get('http://localhost:80/music/pdSelect/all', {
            headers: {
              Authorization: `Bearer ${token}`
          }
        });
        this.songs = response.data;
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    },

    isPlaying(song){
      return eventBus.selectedSong && eventBus.selectedSong.id === song.id && eventBus.playPause;
    },


    onFileChange(event) {
      this.albumCover = event.target.files[0];
    },
    async createAlbum() {
      const formData = new FormData();
      formData.append('name', this.albumName);
      formData.append('cover', this.albumCover);

      // Add each song ID separately
      this.selectedSongs.forEach(song => {
        formData.append('songIds[]', song.id);
      });

      try {
        const response = await axios.post('http://localhost:80/music/curation/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        this.albumCreatedMessage = `Album "${response.data.name}" created successfully!`;
        this.selectedSongs = [];
        this.albumName = '';
        this.albumCover = null;
      } catch (error) {
        console.error('Failed to create album:', error);
        this.albumCreatedMessage = 'Failed to create album.';
      }
    }
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
.table-container {
  width: 1200px;
  max-height: 600px; /* 최대 높이 설정 */
  overflow-y: auto; /* 수직 스크롤 가능 */
  margin: 0 auto;
}
th, td {
  /* border: 1px solid #ddd; */
  padding: 20px 0;
  margin: 0;
}
th {
  color: white;
}

.song-admin-container {
  background-color: #171717;
  color: white;
}

.curatin-update-info{
  display: flex;
  text-align: center;
  
}

.button-custom {
  width: auto;
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
}


.pd-td-icon {
  width: 80px;
  text-align:center;
}
</style>


<!-- <template>
  <div class='song-admin-page'>
    <h1>큐레이션 음악 업로드</h1>
 
    <ul v-if="songs.length">
      <li v-for="song in songs" :key="song.id">
        <input type="checkbox" :value="song" v-model="selectedSongs" />
        <h3>{{ song.title }} by {{ song.artist }}</h3>
        <audio :src="song.url" controls></audio>
      </li>
    </ul>
    <p v-else>No songs available.</p>
    <div>
      <input type="text" v-model="albumName" placeholder="Enter album name" />
      <input type="file" @change="onFileChange" />
    </div>
    <button @click="createAlbum" :disabled="!selectedSongs.length || !albumName || !albumCover">Create Album</button>
    <p v-if="albumCreatedMessage">{{ albumCreatedMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      songs: [],
      selectedSongs: [],
      albumName: '',
      albumCover: null,
      albumCreatedMessage: '',
    };
  },
  mounted() {
    this.fetchSongs();
  },
  methods: {
    async fetchSongs() {
      try {
        const response = await axios.get('http://localhost:8000/music');
        this.songs = response.data;
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    },
    onFileChange(event) {
      this.albumCover = event.target.files[0];
    },
    async createAlbum() {
      const formData = new FormData();
      formData.append('name', this.albumName);
      formData.append('cover', this.albumCover);

      // Add each song ID separately
      this.selectedSongs.forEach(song => {
        formData.append('songIds[]', song.id);
      });

      try {
        const response = await axios.post('http://localhost:8000/music/curation/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        this.albumCreatedMessage = `Album "${response.data.name}" created successfully!`;
        this.selectedSongs = [];
        this.albumName = '';
        this.albumCover = null;
      } catch (error) {
        console.error('Failed to create album:', error);
        this.albumCreatedMessage = 'Failed to create album.';
      }
    }
  },
};
</script>


<style scoped>
.song-admin-page {
  background-color: black;
  color: white;
}
/* 추가적인 스타일링을 여기에 작성할 수 있습니다 */
</style> -->
