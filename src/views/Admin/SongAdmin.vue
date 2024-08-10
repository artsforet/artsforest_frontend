<template>
  <div class='song-admin-container'>
    <br /><br />
     <h3 style="color: white;">큐레이션 등록</h3> <br /><br />
     <div class="curatin-update-info">
        <input type="text" v-model="albumName" placeholder="큐레이션 제목을 입력해주세요." class='curation-create-title' />
        <br />
        <input type="file" @change="onFileChange" />
      </div>
    <div class='table-container'>
     
      <br /><br /><br />
    <table>
      <thead>
        <tr>
          <th>선택</th>
          <th>앨범 이미지</th>
          <th>노래 제목</th>
        </tr>
      </thead>
      <tbody v-if="songs">
        <tr v-for="song in songs" :key="song.id">
          <td><input type="checkbox" :value="song" v-model="selectedSongs" /> </td>
          <td> <img :src="song.cover" alt="이미지" style="width: 50px;" /></td>
          <td> {{ song.title }} by {{ song.artist }} </td>
        </tr>
      </tbody>
    </table>
    </div>
    <div class='table-container'>
    <br /><br /><br /><br />

    <button
      class='curation-create-button' 
      @click="createAlbum"  > 큐레이션 등록</button>
    <p v-if="albumCreatedMessage">{{ albumCreatedMessage }}</p>
    </div>

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
        const response = await axios.get('http://localhost:80/music');
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
th, td {
  padding: 10px 8px;
  max-width: 200px; /* 각 td의 최대 너비를 지정 */
  text-overflow: ellipsis; /* 텍스트가 길 경우 생략(...) 처리 */
  white-space: nowrap; /* 텍스트가 한 줄로 표시되도록 설정 */
  overflow: hidden; /* 넘치는 텍스트는 숨김 */
}
  vertical-align: middle; /* 텍스트 가운데 정렬 */

table {
  table-layout: fixed; /* 테이블 셀의 너비를 고정 */
}

.table-container {
  max-height: 500px;
  overflow-y: auto; /* 수직 스크롤 가능 */
  margin: 0 auto;
  text-align: center;
  justify-content: center;
}

th {
  color: white;
}

.song-admin-container {
  width: 80%; /* 부모 컨테이너의 너비를 브라우저 크기에 비례하도록 설정 */
  max-width: 1400px;
  height: 1000px;
  color: white;
  margin: 0 auto;
  text-align: center;
  justify-content: center;
}

.curatin-update-info {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin-left: 50px;
}

.curation-create-title {
  width: 300px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid white;
  background-color: transparent;
  margin-right: 30px;
  color: white;
}

.curation-create-title:focus {
}

.curation-create-button {
  background-color: white;
  color: #888;
  font-weight: 800;
  text-align: start;
  float: left;
  margin-left: 50px;
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
