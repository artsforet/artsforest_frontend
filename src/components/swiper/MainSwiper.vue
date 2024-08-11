<template>
<div class="main-swiper-container">
  <swiper  
      :navigation="{
        nextEl: '.main-button-next',
        prevEl: '.main-button-prev',
      }"
    :modules="modules" 
    class="mainSwiper">
    <swiper-slide style=" background-color: rgba(239,239,239, 1) ">
      <img :src="image1" alt="Example Image" width="1920px"/>
    </swiper-slide>
    <swiper-slide class="main-swiper-slide-">Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
     <div class="main-button-prev">
        <i class="bi bi-chevron-left"></i>
      </div>
      <div class="main-button-next">
      <i class="bi bi-chevron-right"></i>
      </div>
  </swiper>

</div>
</template>

<style scoped>
.main-swiper-container {
  width: 100%;
  height: 400px;
  color: black;
  margin-top:50px;
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
  color: black;
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

 