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
        :zoom="true"
        :navigation="{
          nextEl: '.custom-button-next',
          prevEl: '.custom-button-prev',
        }"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
        class="curatedSwiper"
        :spaceBetween="25"
        :slidesPerView="3"
      >
        <swiper-slide>
          <div class="swiper-zoom-container">
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
               <swiper-slide>
          <div class="swiper-zoom-container">
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

        <swiper-slide>
          <div class="swiper-zoom-container">
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
  import 'swiper/css/zoom';
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
        modules: [Zoom, Navigation, Pagination],
      };
    },
  };
</script>

<style scoped>
.sipwer-curated-container > .sipwer-curated-wrapper > h3 {
  height: 30px;
  font-weight: 600;
}

.sipwer-curated-container {
  width: 100%;
  padding-bottom:300px;
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
  width: 334px;
  height: 340px;
  flex-wrap: wrap;
  background-color: #333;
  padding-bottom: 100px;
  margin: 0 5px;
  float: left;
}

.swiper-slide img {
  display: block;
  width: 384px;
  height: 215px;
  object-fit: cover;
  top: 0;
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
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.custom-button-prev {
  left: -20px; /* Half of button width to overlap */
}

.custom-button-next {
  right: -20px; /* Half of button width to overlap */
}

.swiper-zoom-container {
  flex-wrap: wrap;
  font-size: 16px;
  color: white;
  text-align: center;
  justify-content: start;
    margin: 0 auto;
}

.curatedSwiper {
  margin: 0 auto;
  text-align: center;
  justify-content: center;
}


</style>
