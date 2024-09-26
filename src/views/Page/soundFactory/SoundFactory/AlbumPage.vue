<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import eventBus from '@/eventBus';

const albumList = ref([]);
const allTracks = ref([]);

const currentPage = ref(1);
const itemsPerPage = 20; // 4 columns x 5 rows
const maxPages = 10;

const fetchAlbum = async () => {
  try {
    const response = await axios.get("http://localhost:80/music/soundfactory/album");
    albumList.value = response.data;

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
<div class="soundfactory-cate-album-page"> 
  <br /><br /><br /> <br /><br />
  <div class="soundfactory-cate-album-wrapper">
    <h2 style="font-weight:600"> 앨범 > SOUND FACTORY </h2>
    <br />
    <ul class="soundfactory-cate-album-item">
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
        >
        <br />
        {{ track.album }}
      </li>
    </ul>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">
        <i class="bi bi-chevron-left"></i>
      </button>
      <button @click="changePage(page)" 
              :class="{ active: currentPage === page }" 
              v-for="page in totalPages" 
              :key="page">
        {{ page }}
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </div>
</div>
</template>

<style scoped>
.soundfactory-cate-album-page {
  width: 100%;
  height: 80vh;
  padding-bottom: 100px;
  background-color: rgb(26, 26, 26);
  color: white;
}

.soundfactory-cate-album-wrapper {
  width: 1200px;
  margin: 0 auto;
}

.soundfactory-cate-album-item {
  display: grid;
  grid-template-columns: repeat(5, 222px); /* 4열, 각 열의 너비를 222px로 고정 */
  grid-gap: 20px;
  justify-content: start; /* 항목을 왼쪽 끝으로 정렬 */
  list-style: none;
  padding: 0;
  padding-top: 100px;
}

.album-content {
  text-align: center;
  font-size: 0.9em;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.album-cover {
  width: 222px;
  height: 222px;
  cursor: pointer;
  object-fit: cover;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination > button {
  width: 30px;
  height: 30px;
  border-radius: 25px;
  background-color: #484848;
  color: #bbbbbb;
  font-weight: 300;
  border: none;
}

.pagination button.active {
  color: #232020;
  background-color: #f3be38;
  font-weight: bold;
}
</style>
