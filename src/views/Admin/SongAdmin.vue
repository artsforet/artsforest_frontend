<template>
  <div class='song-admin-container'>
    <!-- <CreatePost @new-post="addPost" /> -->
    <br /><br />
    <div class='table-container'>
      <h1>큐레이션 앨범 등록</h1> <br /><br />
     <div class="curatin-update-info">
        <input type="text" v-model="albumName" placeholder="큐레이션 제목을 입력해주세요." />
        <br />
        <input type="file" @change="onFileChange" />
      </div>
    <table>
      <thead>
        <tr>
          <th>선택</th>
          <th>앨범 이미지</th>
          <th>노래 제목</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="song in songs" :key="song.id" style="width: 100%; border-top: 1px solid #888; padding: 10px 0">
          <td><input type="checkbox" :value="song" v-model="selectedSongs" /> </td>
          <td> <img :src="song.cover" alt="이미지" style="width: 50px;" /></td>
          <td> {{ song.title }} by {{ song.artist }} </td>
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

<style>
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
  padding: 8px;
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
  flex-wrap: wrap;
  text-align: center;
  
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
