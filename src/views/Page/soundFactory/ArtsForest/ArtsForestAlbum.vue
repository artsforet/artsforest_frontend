<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import eventBus from '@/eventBus';

const albumList = ref([]);
const allTracks = ref([]); // 모든 노래 목록을 저장할 배열

const currentPage = ref(1);
const itemsPerPage = 20; // 한 페이지당 최대 20개 (5줄 x 4개)
const maxPages = 10; // 최대 페이지 수

const fetchAlbum = async () => {
  try {
    const response = await axios.get("http://localhost:80/music/soundfactory/album");
    albumList.value = response.data;

    // 모든 노래 목록을 수집
    response.data.forEach(album => {
      album.albums.forEach(subAlbum => {
        allTracks.value.push(...subAlbum.tracks);
      });
    });
  } catch (error) {
    console.error("Error fetching albums:", error);
  }
};

const addToPlaylistAndPlayFirst = async (tracks) => {
  const token = localStorage.getItem('token');
  const requests = tracks.map(song => {
    return axios.post(`http://localhost:80/playlist/add/${song.id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  });

  try {
    const responses = await Promise.all(requests);
    console.log("All tracks added to playlist:", responses);

    // 첫 번째 트랙 재생
    const firstTrack = tracks[0];
    eventBus.selectedSong = firstTrack;
    eventBus.playPause = true;
  } catch (error) {
    console.error("Error adding tracks to playlist:", error);
  }
};

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allTracks.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.min(Math.ceil(allTracks.value.length / itemsPerPage), maxPages);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

onMounted(() => {
  fetchAlbum();
});
</script>

<template>
<div class="song-common-layout"> 
    <br /><br /><br /> <br /><br />
  <div class="song-common-page">
     <h2 style="font-weight:600"> 앨범 > 예술숲 </h2>
    <br />
      <div style="height:40px"></div>
      <ul class="soundfactory-album-item">
        <li 
          v-for="(track, index) in paginatedItems" 
          :key="index" 
          @click="() => addToPlaylistAndPlayFirst([track])"
          class="album-content"
        >
          <img 
            :src="track.cover" 
            alt="Album Cover" 
            class="album-cover"
          > <br /><br />
          {{ track.album }} <br /> 
        </li>
      </ul>
      <br />
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">
          <i class="bi bi-chevron-left" style="font-size: 14px;"></i>
         </button>
        <button @click="changePage(page)" 
                :class="{ active: currentPage === page }" 
                v-for="page in totalPages" 
                :key="page">
          {{ page }}
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages">
        <i class="bi bi-chevron-right" style="font-size: 14px"></i>
        </button>
      </div>
    </div>
</div>
</template>



<style scoped>
div {
  margin: 0;
  padding: 0;
}
.song-common-layout{
  width: 100%;
  height: 100vh;
  background-color: rgb(26, 26, 26);
  color: white;
}


.song-common-page {
  width: 1200px;
  margin: 0 auto;

}
.playing {
    color: #f3be38;
}

.button-custom {
  margin-top: 10px;
  background: transparent;
  color: white;
  border: none;
}
.bi {
  font-size: 30px;
}

.song-list {
  display: flex;
  flex-direction: column;
}

.song-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #333;
  padding: 10px 0;
  display: flex;
  color: white;
}

.song-cover-container {
  margin-right: 20px;
}

.album-cover {
  width: 222px;
  height: 222px;
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

.soundfactory-album-item {
  gap: 20px;
}
.album-content {
  text-align: start;
  font-size: 0.9em;
  margin-bottom: 40px;
}

</style>
