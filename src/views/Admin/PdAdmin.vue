
<script scope>
import axios from 'axios';

export default {
  data() {
    return {
      songs: [],
      selectedSongs: [],
      pdSongs: [],
      albumCreatedMessage: '',
    };
  },
  mounted() {
    this.fetchSongs();
    this.fetchPdSongs();
  },
  methods: {
    async fetchSongs() {
      try {
        const response = await axios.get('http://localhost:80/music/pdSelect/available');
        this.songs = response.data;
        this.selectedSongs = this.songs.filter(song => song.isSelected);
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    },
    async fetchPdSongs() {
      try {
        const response = await axios.get('http://localhost:80/music/pdSelect/all');
        this.pdSongs = response.data;
      } catch (error) {
        console.error('Failed to fetch PD songs:', error);
      }
    },
    async createAlbum() {
      try {
        const songIds = this.selectedSongs.map(song => song.id);
        if (!Array.isArray(songIds)) {
          console.error('songIds must be an array');
          this.albumCreatedMessage = 'Failed to add songs to playlist: songIds is not an array.';
          return;
        }
        await axios.post('http://localhost:80/music/pdSelect/create', {
          songIds: songIds,
        });

        this.selectedSongs = [];
        this.fetchSongs();
        this.fetchPdSongs();
        alert("PD의 선택 노래 리스트 지정이 완료 되었습니다.") 
      } catch (error) {
        console.error('Failed to add songs to playlist:', error);
        this.albumCreatedMessage = 'Failed to add songs to playlist.';
      }
    },
    async removeFromPd(song) {
      try {
        await axios.delete(`http://localhost:80/music/pdSelect/delete/${song.id}`);
        this.fetchSongs();
        this.fetchPdSongs();
      } catch (error) {
        console.error('Failed to remove song from PD:', error);
      }
    },
  },
};
</script>
 



<template>
  <div class="curated-container"> 

    <div class="curated-container-wrapper">
      <div class="curation-create-title">
        <h3 style="color: white; height: 40px;">
            PD의 선택
        </h3>

        <hr />
        <br />
        
        <span style="display: flex; width: 100%; justify-content: space-between ">
          &nbsp; &nbsp; &nbsp;
        </span>
      </div>

      <!-- <table class="pd-admin-table">
        <thead>
          <tr>
            <th>선택</th>
            <th>앨범 이미지</th>
            <th>노래 제목</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody v-if="songs">
          <tr v-for="song in songs" :key="song.id" style="width: 100%; border-top: 1px solid #888; padding: 10px 0">
            <td><input type="checkbox" :value="song" v-model="selectedSongs" :checked="song.isSelected" /> </td>
            <td><img :src="song.cover" alt="이미지" style="width: 50px;" /></td>
            <td>{{ song.title }} by {{ song.artist }}</td>
            <td><button @click="removeFromPd(song)" class='pd-delete-button'> 제거</button></td>
          </tr>
        </tbody>
      </table> -->

      <ul 
          class="userlist"
          style="
            width: 1200px;
            margin: 0 auto;
            padding: 0;
            height: 500px;
            overflow-y: auto;
          ">
          
          <li 
            v-for="music in songs" 
            :key="music.id" 
            class="curated-upload-item"
            >

            <div class="admin-curated-items">

              <input type="checkbox" :id="'checkbox-' + music.id" :value="music" v-model="selectedSongs" class="curation-upload-checkbox" />
              <label :for="'checkbox-' + music.id"></label> 

              <img :src="music.cover" alt="music.cover"  width="50px" /> 
              <div> {{ music.title }}</div>
              <div><button @click="removeFromPd(music)" class='pd-delete-button'> 제거</button></div>

            </div>
          </li>
        </ul>

      <br /><br />
      <button
        class='curation-create-button'
        @click="createAlbum"
        :disabled="!selectedSongs.length"
      > PD의 선택 노래 지정 </button>

       <br /><br />

       <ul 
          class="userlist"
          style="
            width: 1200px;
            margin: 0 auto;
            padding: 0;
            height: 500px;
            overflow-y: auto;
          ">

          
          <!-- <li 
            v-for="music in songs" 
            :key="music.id" 
            class="curated-upload-item"
            >

            <div class="admin-curated-items">

              <input type="checkbox" :id="'checkbox-' + music.id" :value="music" v-model="selectedSongs" class="curation-upload-checkbox" />
              <label :for="'checkbox-' + music.id"></label> 

              <img :src="music.cover" alt="music.cover"  width="50px" /> 
              <div> {{ music.title }}</div>
            </div>
          </li> -->
        </ul>

        <button 
          @click="createAlbum" 
          class="curaion-create-album"
        >
          큐레이션 앨범 등록
        </button>
    </div>
  </div>
</template>


<style scoped>
.curated-container {
  width: 1200px;
  margin-bottom: 100px;
  background-color: #212121;
  margin: 0 auto;
}

.curated-container > .curated-container-wrapper { 
  margin: 0 auto;
}

.curated-upload-item {
  color: white;
  list-style: none;
}

.curation-create-title {
  width: 800px;
  margin: 0 auto;
  text-align: center; 
}

.curated-container > .curated-container-wrapper > .curation-create-title > h3 {
  padding-bottom: 25px;
}

.admin-curated-items {
  display: flex;
  padding: 10px 0;
  align-items: center;
  gap: 20px;
}

.curation-upload-checkbox {
    display: none; 
}

.curation-upload-checkbox + label {  
    width: 20px;
    height: 20px;
    border: 2px solid #888;
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
    border-radius: 5px;
    user-select: none; 
    align-items:center;
}

.curation-upload-checkbox:checked + label {
    background: #FFC200;
}

.curation-upload-checkbox + label + label {
    font-size: 30px;
    position: relative;
    top: 6px;
    letter-spacing: -5px;
    cursor: pointer;
    user-select: none;
}

.curation-create-name[type="text"] {
  white-space: normal;
}

.curaion-create-album {
  background-color: #FFC200;
  color: #333;
  border-radius: 5px;
  padding: 5px 10px;
  font-weight: 800;
  margin: 50px auto;
  text-align: center;
  float: right;
}

#file-upload {
  display: none;
}

.custom-file-label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: auto;
}

.custom-file-label:hover {
  background-color: #45a049;
}

#file-name {
  margin-left: 10px;
  font-style: italic;
}


.file-upload-wrapper input[type="file"] {
  display: none;
}

/* 커스텀 파일 업로드 버튼 스타일 */
.custom-file-upload {
  display: inline-block;
  padding: 10px 10px;
  background-color: #FFC200;
  color: #333;
  font-weight: 700;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: end;
  margin-left: auto;
}

/* 마우스 오버 시 스타일 변경 */
.custom-file-upload:hover {
  background-color: #FFC200;
}
</style>





<!-- <template>
  <div class='song-admin-container'>
    <div class='table-container'>
        <h3 class='admin-pd-select-container'>
          <router-link to='/pd' 
            style="
              width: 1200px; 
              color: white; 
              text-decoration: none; 
              font: 1.4em;
              "> 
            PD의 선택
          </router-link>
        </h3> 

      <div class="curatin-update-info"></div>
      <br /><br /><br />
      <table class="pd-admin-table">
        <thead>
          <tr>
            <th>선택</th>
            <th>앨범 이미지</th>
            <th>노래 제목</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody v-if="songs">
          <tr v-for="song in songs" :key="song.id" style="width: 100%; border-top: 1px solid #888; padding: 10px 0">
            <td><input type="checkbox" :value="song" v-model="selectedSongs" :checked="song.isSelected" /> </td>
            <td><img :src="song.cover" alt="이미지" style="width: 50px;" /></td>
            <td>{{ song.title }} by {{ song.artist }}</td>
            <td><button @click="removeFromPd(song)" class='pd-delete-button'> 제거</button></td>
          </tr>
        </tbody>
      </table>
      <br /><br />
      <button
        class='curation-create-button'
        @click="createAlbum"
        :disabled="!selectedSongs.length"
      > PD의 선택 노래 지정 </button>
      <p v-if="albumCreatedMessage">{{ albumCreatedMessage }}</p>
    </div>
    <br /><br />
  </div>
</template>

<script scope>
import axios from 'axios';

export default {
  data() {
    return {
      songs: [],
      selectedSongs: [],
      pdSongs: [],
      albumCreatedMessage: '',
    };
  },
  mounted() {
    this.fetchSongs();
    this.fetchPdSongs();
  },
  methods: {
    async fetchSongs() {
      try {
        const response = await axios.get('http://localhost:80/music/pdSelect/available');
        this.songs = response.data;
        this.selectedSongs = this.songs.filter(song => song.isSelected);
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    },
    async fetchPdSongs() {
      try {
        const response = await axios.get('http://localhost:80/music/pdSelect/all');
        this.pdSongs = response.data;
      } catch (error) {
        console.error('Failed to fetch PD songs:', error);
      }
    },
    async createAlbum() {
      try {
        const songIds = this.selectedSongs.map(song => song.id);
        if (!Array.isArray(songIds)) {
          console.error('songIds must be an array');
          this.albumCreatedMessage = 'Failed to add songs to playlist: songIds is not an array.';
          return;
        }
        await axios.post('http://localhost:80/music/pdSelect/create', {
          songIds: songIds,
        });

        this.selectedSongs = [];
        this.fetchSongs();
        this.fetchPdSongs();
        alert("PD의 선택 노래 리스트 지정이 완료 되었습니다.") 
      } catch (error) {
        console.error('Failed to add songs to playlist:', error);
        this.albumCreatedMessage = 'Failed to add songs to playlist.';
      }
    },
    async removeFromPd(song) {
      try {
        await axios.delete(`http://localhost:80/music/pdSelect/delete/${song.id}`);
        this.fetchSongs();
        this.fetchPdSongs();
      } catch (error) {
        console.error('Failed to remove song from PD:', error);
      }
    },
  },
};
</script>

<style scoped>

.song-admin-container {
  width: 100%;
  color: white;
}

.admin-pd-select-container > a {
  font-size: 1.2em;
  text-align: center;
}

.pd-admin-table {
  width: 800px;
  border-collapse: collapse;
}

.table-container {
  width: 1200px;
  overflow-y: auto; /* 수직  스크롤 가능 */
  margin: 0 auto;
}

.pd-admin-table > th, td {
  /* border: 1px solid #ddd; */
  padding: 8px;
}

.pd-admin-table  > th {
  color: white;
}


.curatin-update-info {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
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

.curation-create-button {
  background-color: #FFC200;
  color: #333;
  border-radius: 5px;
  padding: 5px 10px;
  font-weight: 800;
  text-align: center;
  float: right;
}

.pd-delete-button {
  background: transparent;
  border: none;
  color: white;
}

</style> -->
