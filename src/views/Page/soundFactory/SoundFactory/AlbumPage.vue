 <script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import eventBus from '@/eventBus';

const albumList = ref([]);
const allTracks = ref([]); // 모든 노래 목록을 저장할 배열

const currentPage = ref(1);
const itemsPerPage = 25; // 한 페이지당 최대 25개 (5줄 x 5개)

const fetchAlbum = async () => {
  try {
    const response = await axios.get("http://localhost:8000/music/soundfactory/album");
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
    return axios.post(`http://localhost:8000/playlist/add/${song.id}`, {}, {
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
  return Math.ceil(allTracks.value.length / itemsPerPage);
});

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
  <br /><br /><br />
  <div class="song-common-page">
  <h2 style="font-weight:600">앨범 > BGM </h2> <br/>
  <div class="song-common-page">
      <div>
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
            > <br />
            {{ track.album }} <br /> 
            {{ track.description }}
          </li>
        </ul>
        <br />
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
</div>
</template>

<style>
.soundfactory-album-container {
  width: 100%;
  height: 1200px;
  text-align: center;
  background-color: rgba(23,23,23, 1);
  color: white;
  padding-top: 250px;
}

.soundfactory-album-wrap {
  width: 1196px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;

}

.soundfactory-album-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
  padding: 0;
}

.soundfactory-album-item > li {
  list-style: none;
}

.album-content {
  cursor: pointer;
  text-align: center;
}

.album-cover {
  width: 220px;
  height: 220px;
  object-fit: cover;
}
</style>
