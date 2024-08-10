<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import eventBus from '@/eventBus';

const curation = ref([]);
const allTracks = ref([]);

const currentPage = ref(1);
const itemsPerPage = 16;

const searchQuery = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

// Fetching curation data and grouping by unique curation name
const fetchCuration = async () => {
  isLoading.value = true;
  errorMessage.value = "";
  try {
    const response = await axios.get("http://localhost:80/music/curation/all");

    // Group albums by curation name and keep only one entry per name
    const groupedCurations = response.data.reduce((acc, album) => {
      if (!acc[album.name]) {
        acc[album.name] = { ...album, songs: [] };
      }
      acc[album.name].songs.push(...album.songs);
      return acc;
    }, {});

    // Convert grouped data back into an array
    curation.value = Object.values(groupedCurations);
    allTracks.value = curation.value.flatMap(album => album.songs);

  } catch (error) {
    errorMessage.value = "큐레이션이 없습니다.";
    console.error("Error fetching curation:", error);
  } finally {
    isLoading.value = false;
  }
};

// Adding tracks to the playlist and playing the first one
const addToPlaylistAndPlayFirst = async (tracks) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error("User is not authenticated.");
    return;
  }

  try {
    // Adding all tracks to the playlist
    console.log("TRACK" + tracks.songs[0].id)

    const requests = tracks.songs.map(song => 
      axios.post(`http://localhost:80/playlist/add/${song.id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
    );
    await Promise.all(requests);
    console.log("Tracks successfully added to the playlist.");

    // Play the first track
    eventBus.selectedSong = tracks.songs[0];
    eventBus.playPause = true;
  } catch (error) {
    console.error("Error adding tracks to playlist or playing the song:", error);
  }
};

const filteredTracks = computed(() => {
  if (!searchQuery.value.trim()) {
    return allTracks.value;
  }

  return allTracks.value.filter(track =>
    track.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
    track.artist.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredTracks.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredTracks.value.length / itemsPerPage);
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

const changePage = (page) => {
  currentPage.value = page;
};

const pages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const range = [];

  let start = Math.max(current - 5, 1);
  let end = Math.min(current + 4, total);

  if (current <= 5) {
    end = Math.min(10, total);
  } else if (current + 4 >= total) {
    start = Math.max(total - 9, 1);
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
});

onMounted(() => {
  fetchCuration();
});
</script>

<template>
<div class="song-curation-layout">
  <div class="song-curation-page">
    <center>
      <h2 style="font-weight:600">큐레이션</h2>
      <p> 다양한 주제와 컨셉이 어울리는 예술숲 음악 큐레이션을 만나보세요!</p>
      <input 
        type="text" 
        style="width: 500px; height: 50px; border-radius: 7px; padding: 0 10px; font-weight: 600" 
        placeholder="검색어를 입력하세요!" 
        v-model="searchQuery" 
        aria-label="Search for tracks"
      />
    </center>
    <br /><br />
    <div v-if="isLoading" class="loading">
      Loading...
    </div>
    <div v-else-if="errorMessage" class="error">
      {{ errorMessage }}
    </div>
    <div v-else class="song-curation-album-item">
      <ul class="grid-container">
        <li 
          v-for="(curationItem, index) in curation" 
          :key="index" 
          class="album-content"
          tabindex="0"
          aria-label="Play songs in {{ curationItem.name }}"
        >
          <img 
            :src="curationItem.cover" 
            @click="() => addToPlaylistAndPlayFirst(curationItem)"
            alt="Album Cover" 
            class="album-cover"
          >
          <br />
          {{ curationItem.name }}
        </li>
      </ul>
      <br />
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1"> 
          <i class="bi bi-chevron-left" style="font-size: 14px;"></i>
        </button>
        <button v-for="page in pages" :key="page" @click="changePage(page)" :class="{ active: page === currentPage }">
          {{ page }}
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages"> 
          <i class="bi bi-chevron-right" style="font-size: 14px"></i>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<style>

.song-curation-layout {
  width: 100%;
  height: 100vh;
  background-color: black;
  color: white;
  padding-top: 20px;
}

.song-curation-page {
  width: 1300px;
  margin: 0 auto;
}

.song-curation-album-item .grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.album-content {
  list-style: none;
  cursor: pointer;
  text-align: center;
}

.album-cover {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.loading,
.error {
  color: white;
  font-size: 18px;
  margin-top: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 20px;
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

</style>
