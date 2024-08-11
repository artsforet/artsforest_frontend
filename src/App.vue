<template>
  <div id="app">
    <!-- 메인 페이지 -->
    <div v-if="!hideNavBar" class='header-main'>
      <HeaderContent  />
      <HeaderComponent v-if="!hideNavBar"/>
    </div>
    <br /><br />
    <main class="main-content">
    <router-view 
      @songSelected="handleSongSelected" />
    </main>
    <!-- 하단 공통 MusicBar -->
    <div class='app-footer'>
      <FooterComponent />
    </div>
    <div class="common-player">
      <PlayBar :selectedSong="selectedSong" />
    </div>
</div>
</template>

<script setup>
import HeaderContent from '@/components/common/header/HeaderContent.vue';
import HeaderComponent from '@/components/common/header/HeaderComponent.vue';
import PlayBar from '@/components/common/Waveform/PlayBar.vue';
import FooterComponent from '@/components/Footer/FooterComponent.vue';
import "/main.css";
import { computed } from 'vue';
import { useRoute } from 'vue-router';

function handleSongSelected(song) {
  this.selectedSong = song;
}

const route = useRoute();

// 특정 경로에서 NavBar를 숨기도록 설정
const hideNavBar = computed(() => {
  return route.path === '/login'
});

</script>

<style>
.header-main {
}

 
 .common-player {
  padding-top: 100px;
 }
</style>
