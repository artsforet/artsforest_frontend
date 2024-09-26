
<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const curation = ref([]);
const searchQuery = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

const fetchPlaylist = async () => {
  isLoading.value = true;
  errorMessage.value = "";
  try {
    const response = await axios.get("http://localhost:80/music/lastsong/all");

    // Group albums by curation name and keep only one entry per name
    // const groupedCurations = response.data.reduce((acc, album) => {
    //   if (!acc[album.name]) {
    //     acc[album.name] = { ...album, songs: [] };
    //   }
    //   acc[album.name].songs.push(...album.songs);
    //   return acc;
    // }, {});

    // Convert grouped data back into an array
    curation.value = response.data;
    acurationllTracks.value = curation.value.flatMap(album => album.songs);

  } catch (error) {
    errorMessage.value = "큐레이션이 없습니다.";
    console.error("Error fetching curation:", error);
  } finally {
    isLoading.value = false;
  }
};

const deleteCuration = async (lastSong) => {
  try {
    await axios.delete(`http://localhost:80/music/lastsong/delete/${lastSong.name}`);
    fetchPlaylist();
  } catch(error){
    console.error(error)
  }
}

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
  fetchPlaylist();
});

</script>
<template>
<div class="curation-delete-container">
  
  <h3 class="curation-delete-wrapper"> 
    방금 그곡 제거
    <hr />
  </h3>

  <div class="curation-delete-items">
    <ul 
      class="curation-delete-items-form" 
      style="
        display: flex; 
        flex-wrap: wrap;
        margin: 0 auto;
        justify-content: flex-start;
        padding: 0;
        width: 1200px;
      ">
      <li 
        v-for="(curationItem, index) in curation" 
        :key="index" 
        class="curation-delete-items-album-cover"
        tabindex="0"
        aria-label="Play songs in {{ curationItem.name }}"
      >
        <img 
          :src="curationItem.cover" 
          @click="() => deleteCuration(curationItem)"
          alt="Album Cover" 
          class="lastsong-cover"
        >
        <br />
        
        <span 
          style="
            color: white; 
            text-align: start; 
            left: 0; 
            float: left; 
            margin-top: 10px;"
          > {{ curationItem.name }} 
        </span>
      </li>
    </ul>
    <br />
  </div>
</div>
</template>

<style>


.curation-delete-container {
  width: 80%;
  height: 50vh;
  margin: 0 auto;
  justify-content: center;
  text-align: center;
  position: relative;
}


.curation-delete-wrapper {
  width: 800px;
  font-weight: 600;
  padding-bottom: 100px;
  margin: 0 auto;
} 


.curation-delete-items {
  justify-content: space-between;
}


.curation-delete-items-form {
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 왼쪽 정렬 */
  padding: 0;
  margin: 0 auto;
}

/* li */
.curation-delete-items-album-cover {
  list-style: none;
  margin: 10px; /* 아이템 간의 여백을 설정 */
  padding: 0;
  cursor: pointer;
  flex: 1 1 270px; /* 한 줄에 4개의 아이템을 배치 (1200px 기준) */
  max-width: 270px; /* 각 아이템의 최대 크기 */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  text-align: start;
}

.lastsong-cover {
  width: 100%;
  height: auto;
  max-height: 334px;
  object-fit: cover; /* 이미지가 요소의 크기에 맞게 조정 */
}

h3 {
  width: 100%;
  color: white;
}

</style>  

