<template>
  <div id="app">
    <!-- 메인 페이지 -->
    <div v-if="!hideNavBar" class='header-main'>
      <HeaderContent v-if="!hideNavBar"   />
      <HeaderComponent v-if="!hideNavBar"  />
    </div>
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
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from "axios";

function handleSongSelected(song) {
  this.selectedSong = song;
  fetchPlaylist();
}

const route = useRoute();

// 특정 경로에서 NavBar를 숨기도록 설정
const hideNavBar = computed(() => {
  return route.path === '/login' || route.path === '/register'
});

const fetchPlaylist = async () => {
  const response = await axios.get('http://localhost:80/playlist/userplayer', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}


</script>

<style>
#app {
  background-color: #202020;
}
.header-main {
}

 
.main-content {
  width: 100%;
  padding-top: 60px;
}
 .common-player {
  padding-top: 100px;
 }
</style>
