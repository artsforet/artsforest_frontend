<script setup>
import { ref, onMounted } from "vue";
import axios from  "axios"
import { useRoute } from "vue-router";

const songs = ref();
const selectedSongs = ref([]);
const albumName = ref('');
const albumCover = ref(null);
const albumCreatedMessage = ref(); 
onMounted(() => {
  fetchSongs()
});

 
const route = useRoute();

async function fetchSongs() {
      try {
      const response = await axios.get('http://localhost:80/music');
      songs.value = response.data;
    } catch (error) {
      console.error('Failed to fetch songs:', error)
    }
};
function onFileChange(event) {
      albumCover.value = event.target.files[0];
};

async function createAlbum() {
      const formData = new FormData();
      formData.append('name', albumName.value);
      formData.append('cover', albumCover.value);

      // Add each song ID separately
      selectedSongs.value.forEach(song => {
        formData.append('songIds[]', song.id);
      });

      try {
        const response = await axios.post('http://localhost:80/music/curation/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        albumCreatedMessage.value = `Album "${response.data.name}" created successfully!`;
        selectedSongs.value = [];
        albumName.value = '';
        albumCover.value = null;
        alert('큐레이션 등록이 완료 되었습니다.')
        route.path('/')
      } catch (error) {
        console.error('Failed to create album:', error);
        this.albumCreatedMessage = 'Failed to create album.';
      }
    }
 
</script>

<style>
.curated-container {
  width: 100%;
  max-height: 800px;
  overflow-y: auto;
  margin-bottomL: 100px;
  margin-bottom: 100px;
  backgorund-color: black;
  padding-bottom: 100px;
}

 
.curated-container > .curated-container-wrapper { 
  padding-left: 200px;
  position: relative;

}

.curated-upload-item {
  width: 1920px;
  max-width: 1920px;
  margin: 0;
}

.curated-container > .curated-container-wrapper > h3 {
  width: 100%;
  max-height: 400px;
  top: 0;
} 


.admin-curated-items {
  max-width: 1920px;
  display: flex;
  padding: 10px 0;
  align-items: center;
  gap: 20px;
}

.main-content {
  width: 100%;
}
</style>


<template>
  <div class="curated-container"> 
    <div class="curated-container-wrapper">
        <h3 style="color: white;">
          큐레이션 등록
       </h3>

       <input type="text" v-model="albumName" placeholder="Enter album name" />
       <input type="file" @change="onFileChange" />
        <ul style="margin: 0; padding: 0;">
          <li v-for="music in songs" :key="music.id" class="curated-upload-item">
            <div class="admin-curated-items">
              <input type="checkbox" :value="music" v-model="selectedSongs" />
              <img :src="music.cover" alt="music.cover"  width="50px" /> 
              <div> {{ music.title }}</div>
            </div>  
          </li>
          <button @click="createAlbum" :disabled="!selectedSongs.length || !albumName || !albumCover">Create Album</button>
        </ul>
    </div>
  </div>
</template>