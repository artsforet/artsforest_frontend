<template>
  <div class="sipwer-curated-container">
    <div class="sipwer-curated-wrapper">
      <div class="swiper-curated-flex" style="width: 100%; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center;">
          <router-link to='/playlist/curation' style="color: white; text-decoration: none;">
          <h3 style="font-weight:600">
              큐레이션
          </h3>
          </router-link>
        <p style="color: white; align-self: flex-end; margin: 0; font-weight: 600">
          <router-link to='/playlist/curation' style="color: white; text-decoration: none">더보기</router-link>
        </p>
      </div>
      <swiper
        v-if="curation.length > 0"
        :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }"
        :zoom="true"
        :navigation="{
          nextEl: '.curated-button-next',
          prevEl: '.curated-button-prev',
        }"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
        class="curatedSwiper"
        :spaceBetween="25"
        :slidesPerView="5"
        :scrollbar="{ draggable: true }"
      >
        <swiper-slide
          v-for="(curationItem, index) in curation" :key="  index"
          class='curations-swiper-slide'
        >
          <div class="curation-swiper-slide-inner">
            <img :src="curationItem.cover"  alt="Image"   class="slide-image" />
            <div class="overlay" @click="addToPlaylistAndPlayFirst(curationItem)">
             <i class="bi bi-play-fill"></i>
            </div>
            <div>{{curationItem.name}} </div>
          </div>
        </swiper-slide>
      </swiper>
      <div v-else class='none-curation'>
        큐레이션에 등록된 앨범이 없습니다.
      </div>
      <!-- Custom Navigation Buttons -->
      <div class="curated-button-prev" v-if="curation.length !== 0">
        <i class="bi bi-chevron-left"></i>
      </div>
      <div class="curated-button-next" v-if="curation.length !== 0">
      <i class="bi bi-chevron-right"></i>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import eventBus from "@/eventBus";
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import { Zoom, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { onMounted, ref, defineProps } from 'vue';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons CSS

// isPlaying function
const isPlaying = (song) => {
  return eventBus.selectedSong && eventBus.selectedSong.id === song.id && eventBus.playPause;
};

const props = defineProps({
  allTracks: {
    type: Array,
    required: true,
  },
  curation: {
    type: Array,
    required: true,
  },
})
const addToPlaylistAndPlayFirst = async (tracks) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error("User is not authenticated.");
    return;
  }

  try {
    // Adding all tracks to the playlist

    const requests = tracks.songs.map(song => {
       axios.post(`http://localhost:80/playlist/add/${song.id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
    }
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

// You don't need to explicitly export the setup function in the script setup syntax.
// All declared variables and functions are automatically available in the template.
</script>


<style scoped>
.sipwer-curated-container > .sipwer-curated-wrapper > h3 {
  
  height: 30px;
  font-weight: 600;
}

.sipwer-curated-container {
  width: 100%;
  height: 50vh;
  background-color: black;
  align-items: center;
  text-align:start;
}

.sipwer-curated-wrapper {
  width: 1196px;
  font-size: 18px;
  position: relative;
  top: 25%;
  /* Center slide text vertically */
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}

.swiper-slide {
  max-width: 222px;
  min-height: 280px;
  padding-top: 20px;
}

.swiper-slide img {
  display: block;
  width: 222px;
  height: 222px;
  min-height: 222px;
}

/* Custom Navigation Buttons */
.curated-button-prev, .curated-button-next {
  background-color: #464646;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: 55%;
  transform: translateY(-50%) 2s;
  z-index: 10;
}

.curated-button-prev {
  left: -20px; /* Half of button width to overlap */
}

.curated-button-next {
  right: -20px; /* Half of button width to overlap */
}


.curatedSwiper {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  justify-content: center;
}

.curation-swiper-slide-inner {
  padding-top: 10px;
  font-size: 16px;
  color: white;
  text-align: start;
  justify-content: start;
}

.swiper-slide {
  align-items: center;
  font-size: 18px;
  transition: transform 0.2s; /* 부드러운 애니메이션 설정 */
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* 기본적으로 어둡게 처리 */
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0; /* 초기 상태에서는 보이지 않음 */
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.curation-swiper-slide-inner:hover .overlay {
  opacity: 1; /* hover 시 오버레이 보이기 */
}

.play-icon {
  width: 50px;
  height: 50px;
  background: white;
  mask: url('path-to-play-icon.svg') center center / contain no-repeat;
  -webkit-mask: url('path-to-play-icon.svg') center center / contain no-repeat;
}


.swiper-slide-custom {
  position: relative; /* 오버레이 위치 설정을 위한 상대 위치 */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  background: #f0f0f0;
}

.curation-swiper-slide-inner {
  position: relative; /* 오버레이 위치 설정을 위한 상대 위치 */
  transition: transform 0.5s ease; /* 이동 애니메이션을 1초로 설정 */
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid;
  border-image: linear-gradient(to bottom right, #FFC200 40%, white 20%, #FFC200 30%);
  border-image-slice: 1;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
  transform: translateY(-50%) 2s;
}

.curation-swiper-slide-inner:hover .overlay {
  opacity: 1;
}

.curation-swiper-slide-inner:hover {
  transform: translateY(-15px); /* hover 시 위로 이동 */
}


.bi-play-fill {
  font-size: 50px;
  color: white;
  margin-bottom: 30px;

}

.swiper-curated-flex > a > h3:hover {
  color: #f3be38;
}

.none-curation {
  line-height:100px; 
  color: white; 
}

</style>
