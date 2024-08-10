<script setup>
import MainSwiper from "@/components/swiper/MainSwiper.vue";
import CuratedItemsSwiper from "@/components/swiper/CuratedItemsSwiper.vue";
import PdSelect from "@/components/Home/PdSelect.vue";
import YoutubeMain from "@/components/Home/YoutubeMain.vue";
import ButtonSwiper from "@/components/swiper/ButtonSwiper.vue";
import LastSongSwiper from "@/components/swiper/LastSongSwiper.vue";
import { onMounted, ref } from "vue";
import axios from "axios";


const curation = ref([]);
const allTracks = ref([]);
const isLoading = ref(false);
const albumSeriesVlog = ref();
const fetchCuration = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get("http://localhost:80/music/curation/all", {
      params: {
        limit: 15,
      }
    });

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
    // errorMsssage.value = "Failed to fetch curation data. Please try again later.";
    console.error("Error fetching curation:", error);
  } finally {
    isLoading.value = false;
  }
};
const fetchAlbumSeries = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get('http://localhost:80/music/album/soundfactory/playlistLastSong', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  albumSeries.value = response.data;
}
const findVlog = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get('http://localhost:80/music/series/vlog', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  albumSeriesVlog.value = response.data;
}


onMounted(() => {
  fetchCuration();
  fetchAlbumSeries();
  findVlog();
})

</script>
<template>
<div>
  <MainSwiper /> 
  <CuratedItemsSwiper :allTracks=allTracks :curation=curation />
  <PdSelect />
  <ButtonSwiper :albumSeriesVlog=albumSeriesVlog :curation=curation />
  <!-- <LastSongSwiper /> -->
  <YoutubeMain />
</div>
</template>

