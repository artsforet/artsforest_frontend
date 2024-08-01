<template>
<div class='home-admin'>
    <div class='home-admin-container'>
    asd
    <span v-for="song in musicData" :key="song.id">
        {{song}}
    </span>
    </div>
</div>
</template>
<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const musicData = ref();
const allTracks = ref(); 
// const fetchCuration = async () => {
//   try {
//     const response = await axios.get("http://localhost:8000/music/curation/all");
//     curation.value = response.data;

//     response.data.forEach(album => {
//       album.songs.forEach(subAlbum => {
//         allTracks.value.push(subAlbum);
//       });
//     });
//   } catch (error) {
//     console.error("Error fetching curation:", error);
//   }
// };

onMounted(()=> {
    fetchCuration();
})
</script>
<style scoped>
.home-admin {
    width: 100%;
    height: 100vh;
    background-color: black;
    color: white;
}
.home-admin-container {
    color: white;
}


</style>