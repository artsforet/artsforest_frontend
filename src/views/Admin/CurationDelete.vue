<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const curation = ref([]);
const searchQuery = ref("");
const isLoading = ref(false);
const errorMessage = ref("");
const itemsPerPage = 20; // 4 columns * 5 rows
const currentPage = ref(1);
const allTracks = ref([]);

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

const deleteCuration = async (curationItem) => {
  try {
    await axios.delete(`http://localhost:80/music/curation/delete/${curationItem.name}`);
    fetchCuration();
  } catch(error){
    console.error(error);
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

onMounted(() => {
  fetchCuration();
});
</script>
<template>
<div class="curation-delete-container">
  
  <h3 class="curation-delete-wrapper"> 
    큐레이션 삭제 
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
  width: 81%;
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
  text-align: start;
  left: 0;
}


.curation-delete-items-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 요소를 왼쪽 정렬 */
  gap: 20px; /* 아이템 간 여백을 지정합니다. */
  padding: 0;
  margin: 0 auto;
  max-width: 1000px; /* 컨테이너의 최대 너비를 설정합니다. */
}

/* li */
.curation-delete-items-album-cover {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1 1 calc(20% - 20px); /* 5개의 아이템을 한 줄에 배치합니다. 여백을 고려하여 설정합니다. */
  max-width: 200px; /* 이미지의 최대 크기를 설정합니다. */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: start;
  float: left;
}


.album-cover {
  max-width: 100%;
  max-height: 200px;
  object-fit: cover; /* 이미지가 요소의 크기에 맞게 조정됩니다. */
}



h3 {
  width: 100%;
  color: white;
}

/* .album-cover {
  max-width: 200px;
  max-height: 200px;
} */

</style>  

