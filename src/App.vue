<template>
  <div>
    <!-- 메인 페이지 -->
    <HeaderContent />
    <HeaderComponent />
    <router-view 
      @songSelected="handleSongSelected" />
    <!-- 하단 공통 MusicBar -->
    <PlayBar :selectedSong="selectedSong" />
    <FooterComponent />
  </div>
</template>

<script setup>
import HeaderContent from '@/components/common/header/HeaderContent.vue';
import HeaderComponent from '@/components/common/header/HeaderComponent.vue';
import PlayBar from '@/components/common/Waveform/PlayBar.vue';
import FooterComponent from '@/components/Footer/FooterComponent.vue';
import "/main.css";

function handleSongSelected(song) {
  this.selectedSong = song;
}
</script>

<style>
#app {
  overflow-y: auto;
}

</style>
