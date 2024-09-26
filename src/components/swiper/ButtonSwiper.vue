<template>
  <div class="button-swiper-container">
    <div class="button-swiper-wrapper">
      <h3 style="color: white; text-align: start; font-weight: 600">앨범 시리즈</h3>
      <br />
      <div class="categories">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectCategory(category)"
          :class="{ active: category === selectedCategory }"
        >
          {{ category }}
        </button>
      </div>

      <swiper
        ref="buttonSwiper"
        :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }"
        :zoom="true"
        :navigation="{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
        }"
        :modules="modules"
        class="buttonSwiper"
        :spaceBetween="25"
        :slides-per-view="5"
        :scrollbar="{
          el: '.swiper-scrollbar'
        }"
        @progress="updateScrollbar"
        v-if="selectedData.length > 0"
      >
        <swiper-slide
          v-for="(item, index) in selectedData"
          :key="index"
          class="button-swiper-inner"
        >
          <img :src="item.cover" alt="Image" />
          <p>{{ item.description }}</p>
        </swiper-slide>
        <div class="swiper-scrollbar"></div>
      </swiper>
      <div v-else class="button-swiper-inner" style="color: white; margin: 0 auto; height: 258px;" > 등록된 시리즈가 없습니다.</div>
      <div class="custom-swiper-button-prev" @click="prevSlide">
        <i class="bi bi-chevron-left"></i>
      </div>
      <div class="custom-swiper-button-next" @click="nextSlide">
        <i class="bi bi-chevron-right"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, defineProps } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

const categories = [
  '브이로그', '귀여운 음악', '코믹', '기쁨과 환희', '잔잔한 음악',
  '행사 음악', '할리우드', '세계 음악', '인트로 음악', '시사',
  '공포 미스터리', '배경음악의 정석', '힙합 R&B', '배경음악 팩토리',
  '테마', '자장가', '계절'
];

const props = defineProps({
  allTracks: {
    type: Array,
    required: true,
  },
  albumSeriesVlog: {
    type: Array,
    required: true,
  },
});

const allData = ref({});
const selectedCategory = ref('브이로그');
const buttonSwiper = ref(null);
const albumSeries = ref([]);

const selectedData = computed(() => {
  return allData.value[selectedCategory.value] || [];
});

const fetchAllData = async () => {
  try {
    const responses = await Promise.all(categories.map(category => 
      axios.get(`http://localhost:80/music/series/${category}`)
    ));
    const data = {};
    responses.forEach((response, index) => {
      data[categories[index]] = response.data;
    });
    allData.value = data;
    albumSeries.value = allData.value[selectedCategory.value] || [];
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

const selectCategory = async (category) => {
  selectedCategory.value = category;
  albumSeries.value = allData.value[category] || [];
  await nextTick(); // Ensure the swiper is updated after data change
  if (buttonSwiper.value && buttonSwiper.value.swiper) {
    buttonSwiper.value.swiper.update();
    updateScrollbar({ progress: buttonSwiper.value.swiper.progress });
  }
};

const nextSlide = () => {
  if (buttonSwiper.value && buttonSwiper.value.swiper) {
    buttonSwiper.value.swiper.slideNext();
  }
};

const prevSlide = () => {
  if (buttonSwiper.value && buttonSwiper.value.swiper) {
    buttonSwiper.value.swiper.slidePrev();
  }
};

const modules = [Navigation, Pagination, Scrollbar];

const updateScrollbar = ({ progress }) => {
  const swiper = buttonSwiper.value?.swiper;
  if (swiper) {
    const scrollbar = swiper.scrollbar.el;
    const dragEl = scrollbar.querySelector('.swiper-scrollbar-drag');
    const percentage = progress * 100;
    dragEl.style.background = `linear-gradient(to right, white ${percentage}%, rgba(255, 255, 255, 0.2) ${percentage}%)`;
  }
};

onMounted(async () => {
  await fetchAllData();
  selectCategory(selectedCategory.value);
});
</script>



<style>
.button-swiper-container {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  background-color: black;
  padding-bottom: 200px;
}

.button-swiper-wrapper {
  max-width: 1196px;
  margin: 0 auto;
  position: relative;
}

.categories {
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.categories > button {
  width: 128px;
  margin: 1px 2px;
  padding: 10px 5px;
  cursor: pointer;
  border: none;
  background-color: #202020;
  color: #5b5b5b;
  transition: background-color 0.3s;
}

.custom-button-prev, .custom-button-next {
  background-color: #464646;
  width: 40px;
  height: 40px;
  color: white;
  display: flex;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.categories button.active {
  background-color: white;
  color: #000000;
}

.categories button:hover {
  background-color: #d0d0d0;
}

.swiper-slide {
  width: 222px;
  height: 275px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  color: white;
  text-align: start;
}

.swiper-slide img {
  width: 222px;
  height: 222px;
  margin-bottom: 10px;
}

.button-swiper-inner {
  max-width: 300px;
  height: auto;
  border-radius: 10px;
}

.custom-swiper-button-prev,
.custom-swiper-button-next {
  width: 40px;
  height: 40px;
  position: absolute;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  font-size: 24px;
  color: white;
  top: 58%;
  border-radius: 50%;
  background-color: #464646;
}

.custom-swiper-button-prev {
  left: -20px;
}

.custom-swiper-button-next {
  right: -20px;
}

.swiper-scrollbar {
  background: black;
  max-height: 1px;
} 

.swiper-scrollbar-drag {
  background: white;
}
</style>
