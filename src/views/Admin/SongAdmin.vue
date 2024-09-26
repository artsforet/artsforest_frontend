<script setup>
import { ref, onMounted } from "vue";
import axios from  "axios";
import { useRoute, useRouter } from "vue-router";

const songs = ref([]);
const selectedSongs = ref([]);
const albumName = ref('');
const albumCover = ref(null);
const albumCreatedMessage = ref(''); 

onMounted(() => {
  fetchSongs();
});

const route = useRoute();
const router = useRouter();

async function fetchSongs() {
  try {
    const response = await axios.get('http://localhost:80/music');
    songs.value = response.data;
  } catch (error) {
    console.error('Failed to fetch songs:', error);
  }
}

function onFileChange(event) {
  albumCover.value = event.target.files[0];
}


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
    selectedSongs.value = [];
    albumName.value = '';
    albumCover.value = null;
    alert('큐레이션 등록이 완료 되었습니다.');
    router.push('/master/curation');
  } catch (error) {
    console.error('Failed to create album:', error);
    albumCreatedMessage.value = 'Failed to create album.';
  }
}

</script>

<template>
  <div class="curated-container"> 

    <div class="curated-container-wrapper">
      <div class="curation-create-title">
        <h3 style="color: white; height: 40px;">
            큐레이션 등록
        </h3>

        <hr />
        <br />
        
        <span style="display: flex; width: 100%; justify-content: space-between ">
        <input 
          type="text" 
          v-model="albumName" 
          class="curation-create-name"
          placeholder="큐레이션 이름을 지정해주세요."
          style="
            width: 305px; 
            height: 45px;
            border-left: none; 
            border-right: none;
            border-top: none; 
            border-bottom: none;
            background-color: rgb(51, 51, 51); 
            border-radius: 5px;
            color: white;
            white-space: normal;
            padding: 0 5px;
        "/>

          &nbsp; &nbsp; &nbsp;

          <div class="file-upload-wrapper">
            <label 
              for="file-upload" 
              class="custom-file-upload"
            > 큐레이션 앨범 이미지를 선택해주세요. </label>
            
            <input 
              type="file"
              id="file-upload"
              @change="onFileChange"
            />
            
          </div>
        </span>
      </div>

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
            </div>
          </li>
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
  margin: 0 auto;}

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


