<template>
<div class="main-swiper-container">
  <swiper  
  :a11y="{
    enabled: true,
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
    firstSlideMessage: '첫 번째 슬라이드',
    lastSlideMessage: '마지막 슬라이드',
    paginationBulletMessage: '슬라이드 {{index}} 로 이동',
  }"
  :keyboard="{
    enabled: true,
    onlyInViewport: true,
  }"
      :navigation="{
        nextEl: '.main-button-next',
        prevEl: '.main-button-prev',
      }"
    :aria="{
    slideLabelMessage: '슬라이드 {{index}} 중 {{slidesLength}}',
    containerMessage: '이미지 슬라이더',
    roleDescriptionMessage: '슬라이드쇼',
    }"
    :modules="modules" 
    class="mainSwiper">
    
    <swiper-slide 
      role="group" 
      aria-label="슬라이드 1"
      aria-hidden="false" 
      style="background-color: rgba(239,239,239, 1)"
    >
      
      <img :src="image1" alt="Example Image" width="1920px"/>
    </swiper-slide>

    <swiper-slide 
      role="group" 
      aria-label="슬라이드 1"
      aria-hidden="false" 
      class="main-swiper-slide-"
    >
      Slide 1
    </swiper-slide>
    
    <swiper-slide
      role="group" 
      aria-label="슬라이드 1"
      aria-hidden="false" 
    >
      Slide 2
    </swiper-slide>
    
    <swiper-slide
      role="group" 
      aria-label="슬라이드 1"
      aria-hidden="false" 
    >
      Slide 3
    </swiper-slide>
    
    <swiper-slide
      role="group" 
      aria-label="슬라이드 1"
      aria-hidden="false" 
    >
      Slide 4
    </swiper-slide>
    
    <div class="main-button-prev" tabindex="0" aria-label="이전 슬라이드">
        <i class="bi bi-chevron-left"></i>
      </div>
      <div class="main-button-next" tabindex="0" aria-label="다음 슬라이드">
        <i class="bi bi-chevron-right"></i>
      </div>
  </swiper>

</div>
</template>

<style scoped>
.main-swiper-container {
  width: 100%;
  color: black;
  padding-top: 50px;;
}

.swiper {
  color: black;
}

.swiper-slide {
  width: 1920px;
  height: 400px;
  text-align: center;
  font-size: 18px;
  margin: 0;
  padding: 0;
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
}

.swiper-slide > img {
  display: block;
  width: 90%;
  height: 400px;
  z-index: -9999;
  object-fit: cover;
}

.bi {
  font-size: 30px;
}
.main-button-prev,
.main-button-next {
  background-color: rgba(0, 0, 0, 0.5);
  width: 70px;
  height: 70px;
  padding: 20px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  transform: translateY(-50%);
  z-index: 10;
}
.main-button-prev:hover,
.main-button-next:hover {
  background-color: white;
  color: black;
  border: 1px solid #888;
}


.main-button-prev {
  left: 20px;
  top: 50%;
}

.main-button-next {
  right: 20px;
  top: 50%;
}
</style>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import banner1 from '@/assets/image/Banner1.jpg';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { ref } from 'vue';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const image1 = ref(banner1)
      return {
        image1,
        modules: [Navigation],
      };
    },
  };
</script>

 