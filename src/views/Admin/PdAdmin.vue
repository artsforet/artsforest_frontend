<template>
  <div class='song-admin-container'>
    <br /><br />
    <div class='table-container'>
      <h3 style="color: white;">PD의 선택</h3> <br /><br />
      <div class="curatin-update-info"></div>
      <br /><br /><br />
      <table>
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

<script>
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

<style sceopd>
table {
  width: 800px;
  border-collapse: collapse;
}
.table-container {
  width: 100%;
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
  height: 100vh;
  color: white;
  left: 0;
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
  background-color: white;
  color: #888;
  font-weight: 800;
  margin: 0 auto;
  text-align: center;
}

.pd-delete-button {
  background: transparent;
  border: none;
  color: white;
}
</style>
