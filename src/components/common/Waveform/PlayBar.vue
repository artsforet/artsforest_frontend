<template>
  <div class="music-bar">
    <div id="current-song-info" style="justify-content:">
      <div class="current-song-info">
        <!-- <button @click="playPause" class="button-custom" style="font-size:50px;">
          <i :class="isPlaying ? 'bi-pause-fill' : 'bi-play-fill'" style="font-size: 50px;"></i>
        </button> -->


        <button @click="playPause" class="button-custom">
          <img src="@/assets/icons/music/play01.png" v-if="!isPlaying" style="width: 30px" />
          <img src="@/assets/icons/music/pause01.png"  v-if="isPlaying" style="width: 30px"/>
          <!-- <i class="bi bi-pause-fill" v-if="isPlaying(song)"></i> -->
        </button>

        <div class="current-song-info-text">
          <span v-if="eventBus.selectedSong && eventBus.selectedSong.cover">
            <img :src="eventBus.selectedSong.cover" alt="Song Cover" class="song-cover-image" style="width: 75px;"/>
          </span>
          &nbsp;&nbsp;&nbsp;
          {{ eventBus.selectedSong ? eventBus.selectedSong.title : '' }} <br />
          &nbsp;&nbsp;&nbsp;
          {{ eventBus.selectedSong ? eventBus.selectedSong.description : '' }}
        </div>
      </div>

      <div class="musicbar-center">
        <div class="time-info">
          <div> {{ formatTime(currentTime) }} / </div> &nbsp;
          <div> {{ formatTime(duration) }} </div> 
        </div>

        <div id="waveform" v-show="eventBus.selectedSong"></div>
        <div v-if="!eventBus.selectedSong">
          듣고 싶은 곡을 플레이해보세요.
        </div>
        
        <div class="volume-control" @mouseenter="showVolumeBar = true">
          <i class="bi bi-volume-up-fill" style="font-size: 30px;"></i>
          
          <div 
            class="volume-bar" 
            v-show="showVolumeBar"
            @mouseenter="showVolumeBar = true"
            @mouseleave="showVolumeBar = false"
          >
            <input type="range" min="0" max="100" @input="changeVolume" class="volume-slider" />
          </div>
        </div>
      </div>

      <button @click="initModal" class="button-custom">
        <i class="bi bi-music-note-list" style="font-size: 30px;"></i>
      </button>
    </div>
    <PlaylistModal v-if="showModal" @close="showModal = false" class="playlist-modal">
      <template v-slot:header>
        <h3>플레이 리스트</h3>
      </template>
      <template v-slot:body>
        <div class="playlist-body">
            <ul class="user-playlist">
              <li
                v-for="(song, index) in playlist"
                :key="song.id"
                class="user-playlist-item"
                @click="userlistPlay(song.music, index)"
                :class="{ 'current-song': currentSongIndex === index }"
              >
                <div class="user-playlist-info">
                  <div class="user-playlist-no">
                    {{ index }}
                  </div>
                  <div class="user-playlist-meta">
                    {{ song.music.title }} <br />
                    {{ song.music.description }}
                  </div>
                </div>
              </li>
            </ul>
        </div>
      </template>
      <template v-slot:footer>
        <button @click="showModal = false">닫기</button>
      </template>
    </PlaylistModal>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import WaveSurfer from 'wavesurfer.js';
import eventBus from '@/eventBus';
import PlaylistModal from '@/components/modal/PlaylistModal.vue';
import { useSongStore } from '@/stores/songStore';
import axios from 'axios';

// style sheets
import '@/components/common/Waveform/playlistInfo.css';

const songStore = useSongStore();
const wavesurfer = ref(null);
const isPlaying = ref(false);
const showModal = ref(false);
const showVolumeBar = ref(false);
const playlist = ref([]);
const currentSongIndex = ref(0);
const currentTime = ref(0);
const duration = ref(0);

const initModal = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:80/playlist/userplayer', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    showModal.value = !showModal.value;
    playlist.value = response.data;
  } catch (error) {
    console.error('Error fetching playlist:', error);
  }
};

const saveState = () => {
  const state = {
    selectedSong: eventBus.selectedSong,
    currentTime: wavesurfer.value.getCurrentTime(),
    isPlaying: isPlaying.value,
    currentSongIndex: currentSongIndex.value
  };
  localStorage.setItem('musicPlayerState', JSON.stringify(state));
};

const loadState = () => {
  const state = JSON.parse(localStorage.getItem('musicPlayerState'));
  if (state && state.selectedSong) {
    eventBus.selectedSong = state.selectedSong;
    currentSongIndex.value = state.currentSongIndex;
    wavesurfer.value.load(state.selectedSong.link);
    wavesurfer.value.once('ready', () => {
      wavesurfer.value.seekTo(state.currentTime / wavesurfer.value.getDuration());
      if (state.isPlaying) {
        wavesurfer.value.play();
        isPlaying.value = true;
      }
    });
  }
};

const loadSong = (url) => {
  if (wavesurfer.value.isPlaying()) {
    wavesurfer.value.stop(); // 현재 재생 중인 노래를 중지
  }
  wavesurfer.value.load(url);
  wavesurfer.value.once('ready', () => {
    duration.value = wavesurfer.value.getDuration();
    wavesurfer.value.play();
    isPlaying.value = true;
    saveState();
  });
};

const playPause = () => {
  wavesurfer.value.playPause();
  isPlaying.value = !isPlaying.value;
  saveState();
};

const userlistPlay = (song, index) => {
  eventBus.selectedSong = song;
  currentSongIndex.value = index;
  eventBus.playPause = true;
};

const playNextSong = () => {
  if (currentSongIndex.value < playlist.value.length - 1) {
    currentSongIndex.value++;
    eventBus.selectedSong = playlist.value[currentSongIndex.value].music;
  } else {
    isPlaying.value = false;
  }
  saveState();
};

const changeVolume = (event) => {
  const volume = event.target.value / 100;
  wavesurfer.value.setVolume(volume);
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

watch(
  () => eventBus.selectedSong,
  (newSong) => {
    if (newSong) {
      loadSong(newSong.link);
    }
  },
  { immediate: true }
);

watch(
  () => eventBus.playPause,
  (newPlayPause) => {
    if (newPlayPause) {
      wavesurfer.value.play();
    } else {
      wavesurfer.value.pause();
    }
    saveState();
  }
);

watch(currentTime, (newTime) => {
  eventBus.currentTime = newTime;
});

watch(duration, (newDuration) => {
  eventBus.duration = newDuration;
});


onMounted(() => {
  wavesurfer.value = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#333',
    progressColor: 'white',
    height: 50,
    barWidth:2,
  });

  wavesurfer.value.on('audioprocess', () => {
    currentTime.value = wavesurfer.value.getCurrentTime();
    saveState();
  });

  wavesurfer.value.on('finish', () => {
    playNextSong();
  });

  loadState(); // Load state when the component mounts
});

onBeforeUnmount(() => {
  saveState(); // Save state before the component unmounts
});
</script>

<style>
.music-bar {
  width: 100%;
  display: flex;
  align-items: center;
}

#current-song-info {
  width: 100%;
}

.current-song-info {
  display: flex;
  align-items: center;
}

.current-song-info-text {
  margin-left: 10px;
  text-align: left;
  display: flex;
  align-items: center;
}

.musicbar-center {
  display: flex;
  align-items: center;
  position: relative;
  float: left;
  margin: 0 40px;
}

.time-info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  color: white;
  margin: 0 40px;
}

#waveform {
  width: 500px;
}

.volume-control {
  position: relative;
  margin-left: 20px;
  font-size: 30px;
}

.volume-bar {
  position: absolute;
  right: 0;
  bottom: 70px;
  width: 30px;
  height: 100px;
  background-color: #000; /* 변경: 검은색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.volume-slider {
  transform: rotate(-90deg);
  width: 100px;
  height: 30px;
  background-color: #333; /* 둥근 사각형 모양을 위한 배경색 추가 */
  border-radius: 8px; /* 둥근 모서리 추가 */
}

.volume-slider::-webkit-slider-thumb {
  background-color: orange; /* 변경: 오렌지색 슬라이더 */
  border: 2px solid #000; /* 검은색 테두리 추가 */
  border-radius: 8px; /* 둥근 모서리 추가 */
  color: orange;
}

.button-custom {
  margin-right: 20px;
  background: transparent;
  border: none;
  color: white;
}

.playlist-modal {
  display: flex;
  height: 100%;
}

.modal-container {
  overflow-y:auto;
}
.playlist-body {
  flex-grow: 1;
  overflow-y: auto;
  -ms-overflow-style: none; /* 인터넷 익스플로러, 엣지 */
  scrollbar-width: none; /* 파이어폭스 */
}

.playlist-body::-webkit-scrollbar {
  display: none; /* 웹킷 기반 브라우저 */
}

.playlist-modal header,
.playlist-modal .modal-header {
  background: black;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.modal-body {
  overflow-y: auto;
}
.playlist-modal .modal-footer {
  position: sticky;
  bottom: 0;
  background: black; /* 필요한 경우 다른 배경색으로 변경 */
  padding: 10px;
  border-top: 1px solid #ccc;
  text-align: right; /* 필요한 경우 다른 정렬 방식으로 변경 */
}

.user-playlist {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto
}

.user-playlist-item {
  display: flex;
  margin: 0;
  padding: 0;
  padding-left: 20px;
}

.user-playlist-info {
  width: 100%;
  margin-top: 20px;
  text-align: start;
  padding: 0;
  display: flex;
  align-items: center;
}

.user-playlist-no {
  width: 100px;
  align-items: center;
}

.user-playlist-meta {
  float: left;
}

.current-song .user-playlist-no {
  color: blue;
}

.modal-body {
  overflow-y: auto;
}
</style>
