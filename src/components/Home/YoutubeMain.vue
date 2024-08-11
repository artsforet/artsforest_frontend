<template>
  <div class="sipwer-curated-container">
    <div class="sipwer-curated-wrapper">
      <h3 style="color: white"> 영상 속 예술숲 </h3>
      <br />      <br />      <br />
      <swiper
        :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }"
        :navigation="{
          nextEl: '.custom-button-next',
          prevEl: '.custom-button-prev',
        }"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
        class="youtubeSwiper"
        :spaceBetween="10"
        :slidesPerView="3"
      >
        <swiper-slide class="swiper-slide-youtube">
          <div class="swiper-slide-youtube-container">
            <img src="@/assets/image/youtube/hqdefault.webp"  v-if="!isPlaying" />

            <div 
                class="artsForest-youtube"
                style="width: 90%; text-align:start; margin: 0 auto;"
            >
            <div style="height: 14px;"> [Love affair] 첼로 박건우 (피아노 박경훈)</div>
            <hr />
            <div> 오누리가 추천하는 먹방 영상에도 잘 어울리는 BGM, BGM 팩토리! </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide-youtube">
          <div class="swiper-slide-youtube-container">
            <img src="https://i.ytimg.com/vi/nK5HrmvsGXI/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCPIC8u7atUO2LiVauV3rZEA2N1vg" />
            <div 
                class="artsForest-youtube"
                style="width: 90%; text-align:start; margin: 0 auto;"
            >
            <div style="height: 14px;"> 예술숲 추천 음악 </div>
            <hr />
            <div> 오누리가 추천하는 먹방 영상에도 잘 어울리는 BGM, BGM 팩토리! </div>
            </div>
          </div>
        </swiper-slide>

        <swiper-slide class="swiper-slide-youtube">
          <div class="swiper-slide-youtube-container">
            <img src="https://i.ytimg.com/vi/ib_DhkgdBes/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC3YrZcXWYyhEkaRdLvDS9Ga7Ic1Q" alt="" />
            <div 
                class="artsForest-youtube"
                style="width: 90%; text-align:start; margin: 0 auto;"
            >
            <div style="height: 14px;"> 예술숲 추천 음악 </div>
            <hr />
            <div>[공연] 상사화 (안예은&앙상블더류)_인의예지림 여름음악회 </div>
            </div>
          </div>
        </swiper-slide>

      </swiper>
      <!-- Custom Navigation Buttons -->
      <div class="custom-button-prev">
        <i class="bi bi-chevron-left"></i>
      </div>
      <div class="custom-button-next">
      <i class="bi bi-chevron-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

  // import required modules
  import { Zoom, Navigation, Pagination } from 'swiper/modules';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [ Navigation, Pagination],
      };
    },
  };
</script>

<style scoped>
 .sipwer-curated-container {
  height: 80vh;
  background-color: black;
  margin: 0 auto;
 }

 .sipwer-curated-wrapper {
  width: 1196px;
  margin: 0 auto;
  position: relative;

 }
h3 {
  color: white;
}
.swiper-slide-youtube {
  height: 360px;
  flex-wrap: wrap;
  background-color: #1e1e1e;
  padding-bottom: 100px;
  float: left;
  border-radius: 10px;
}

.swiper-slide-youtube-container > img {
  width: 100%;
}
 
/* Custom Navigation Buttons */
.custom-button-prev, .custom-button-next {
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
  transform: translateY(-50%);
  z-index: 10;
  border-radius: 100px;
}

.custom-button-prev {
  left: -20px; /* Half of button width to overlap */
}

.custom-button-next {
  right: -20px; /* Half of button width to overlap */
}

 

</style>
