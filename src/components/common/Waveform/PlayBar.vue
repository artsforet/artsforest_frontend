<template>
  <div class="music-bar">
    <div id="current-song-info" style="justify-content:">
      <div class="current-song-info">


        <button @click="playPreviousSong" class="button-custom">
          <i class="bi bi-skip-start-fill" style="font-size:35px"></i>
        </button>
        
        
        <!-- Play/Pause button remains unchanged -->
        <button @click="playPause" class="button-custom">
          <img src="@/assets/icons/music/pause01.png" v-if="!isPlaying" style="width: 40px"/>
          <img src="@/assets/icons/music/play01.png" v-if="isPlaying" style="width: 40px" />
        </button>


        <!-- Updated button for skipping to the next song -->
        <button @click="playNextSong" class="button-custom">
          <i class="bi bi-skip-end-fill" style="font-size:35px"></i>
        </button>


        <div 
          v-if="eventBus.selectedSong && eventBus.selectedSong.cover"
          class="current-song-info-text">
          <span>

            <img 
              :src="eventBus.selectedSong.cover" 
              alt="Song Cover" 
              class="song-cover-image" 
              style="width: 75px;"
            />
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
            <input 
              type="range" 
              min="0" 
              max="100"
              @input="changeVolume" 
              class="volume-slider" 
            />
          </div>
        </div>
      </div>

      <div class="sound-bar-hover-key-desc button-custom">
        <i class="bi bi-question-circle-fill">
          <div class="popup">
            <div class="sound-bar-popup-style">

            <h3 style="font-style: normal; font-weight: 600; color: white;"> 키보드 단축키 안내</h3>
            <br />
          
            <div class="common-button-style-keyboard-all">

              <div class="common-button-style-keyboard-width">
                <div class="common-button-style-keyboard"> 
                  Z 
                </div>
                <div class="common-button-style-keyboard-desc"> 
                  노래 재생목록 창 열기 / 닫기
                </div>
              </div>
              
              <div class="common-button-style-keyboard-width">
                <div class="common-button-style-keyboard"> 
                  Space bar
                </div>
                <div class="common-button-style-keyboard-desc"> 
                  재생 / 일시정지
                </div>
              </div>


              <div class="common-button-style-keyboard-width">
                <div class="common-button-style-keyboard"> 
                  X
                </div>
                
                &nbsp; &nbsp;

                <div class="common-button-style-keyboard"> 
                  C
                </div>
                <div class="common-button-style-keyboard-desc"> 
                  이전 곡 / 다음 곡
                </div>
              </div>


              <div class="common-button-style-keyboard-width">
                <div class="common-button-style-keyboard"> 
                  D
                </div>
                <div class="common-button-style-keyboard-desc"> 
                  곡 삭제
                </div>
              </div>


              <div class="common-button-style-keyboard-width">
                <div class="common-button-style-keyboard"> 
                  -
                </div>

                &nbsp; &nbsp;
                
                <div class="common-button-style-keyboard"> 
                  +
                </div>
                
                <div class="common-button-style-keyboard-desc"> 
                  볼륨 조절
                </div>
              </div>


              <div class="common-button-style-keyboard-width">
                <div class="common-button-style-keyboard"> 
                  M 
                </div>
                <div class="common-button-style-keyboard-desc"> 
                  음소거
                </div>
              </div>

            </div>
            </div>
          </div>
        </i>
      </div>
      
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

      <button class="button-custom" @click="playlistModalOpen">
        <i class="bi bi-music-note-list" style="font-size: 30px;">
        </i>
      </button> 
      <div
         v-if="openModal === true"
         style="
          position: fixed; 
          background-color: black; 
          color: white;  
          width: 400px; 
          height: 90vh; 
          right: 0;  
          top: 40px; bottom:100px; z-index: 99;  display: flex; background-color:#202020; border-left:1px solid #333"
        >

        <ul class="user-playlist">
            <div 
              class="swiper-curated-flex" 
              style="
                width: 90%; 
                display: flex; 
                flex-wrap: wrap; 
                justify-content: space-between; 
                align-items: center; 
                margin: 0 auto; 
                margin-top: 20px;
                ">
                
                <router-link to='/' style="color: white; text-decoration: none;">
                  <h3>
                      플레이 리스트
                  </h3>
                </router-link>
              
                <p style="color: white; align-self: flex-end; margin: 0;">
                  <button 
                    @click="playlistModalOpen" 
                    style="
                      background-color: transparent; 
                      border: none; 
                      color: white;"
                    >
                    닫기
                  </button>
                </p>
            </div>

              <li
                v-for="(song, index) in playlist"
                :key="song.id"
                class="user-playlist-item"
                @click="userlistPlay(song.music, index)"
                @mouseover="hoveredIndex = index"
                @mouseleave="hoveredIndex = null"
                :class="{ 'current-song': currentSongIndex === index }"
              >
              <div class="user-playlist-info" style="align-items:center">
                <div class="user-playlist-no">
                  {{ index }}
                </div>
              
                <div 
                  class="user-playlist-meta" 
                  style=" 
                    display: flex; 
                    align-items:center" 
                >

                <img :src="song.music.cover" alt="앨범 자켓" style="width:50px; height: 50px; font-size:1rem; margin-right: 20px; color: #333"/>
                  <div 
                    style="
                      flex-direction: column; 
                      font-size:0.8em; 
                      cursor: pointer"
                  >
                    {{ song.id }}
                      {{ song.music.title }} <br />
                      {{ song.music.description }}
                    </div>  
                  </div>
              </div>
              <button 
                @click.stop="deleteSong(song.music.id)" 
                class="delete-button"
              >
                삭제
            </button>
            </li>
          </ul>
    </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import WaveSurfer from 'wavesurfer.js';
import eventBus from '@/eventBus';
// import PlaylistModal from '@/components/modal/PlaylistModal.vue';
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
const openModal = ref(false);
const hoveredIndex = ref(null); // Add this ref



onMounted(() => {
    window.addEventListener('keydown', handleSpacebar);
    window.addEventListener('keydown', muteController);
    window.addEventListener('keydown', modalOpen);
    window.addEventListener('keydown', playKeyboardController);
    window.addEventListener('keydown', deleteSong);
})


// 스페이스바 이벤트 리스너 추가

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


function handleSpacebar(event) {
      if (event.code === 'Space' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        event.preventDefault();
        playPause();
      }
      if (event.code === 'm') {
        event.preventDefault();
        playPause();
      }
};


function modalOpen(event){
  if (event.code === 'KeyZ' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
      event.preventDefault();
      playlistModalOpen();
    }
  if (event.code === 'm') {
    event.preventDefault();
      playlistModalOpen();
  }
}

watch(playlist, (newValue, oldValue) => {
  fetchPlaylist();
  // 원하는 로직 추가
});



function playKeyboardController(event){
  if (event.code === 'KeyX' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
      event.preventDefault();
      playPreviousSong();
    }
    if (event.code === 'KeyC' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
      event.preventDefault();
      playNextSong();
    }
    // if (event.code === 'KeyD' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
    //   event.preventDefault();
    //   deleteSong();
    // }
     if (event.code === 'm') {
      event.preventDefault();
      playPreviousSong();
  }
}

const previousVolume = ref(0);



function muteController(event) {
  if (event.code === 'KeyM') {
      toggleMute();
    }
}

function volumneController(event) {
  if (event.code === 'KeyM') {
      toggleMute();
    }
}

function toggleMute() {
  const volume = wavesurfer.value.getVolume();
    if (volume !== 0) {
      // 현재 볼륨이 0이 아닐 때 (즉, 소리가 나고 있을 때)
      previousVolume.value = volume; // 현재 볼륨을 저장
      wavesurfer.value.setVolume(0)  // 볼륨을 0으로 설정 (뮤트)
    } else {
      // 현재 볼륨이 0일 때 (즉, 뮤트 상태일 때)
      wavesurfer.value.setVolume(previousVolume.value); // 이전 볼륨으로 복원
    }
    this.wavesurfer.setVolume(volume);
  }



watch(eventBus.selectedSong, async (newQuestion, oldQuestion) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:80/playlist/userplayer', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      playlist.value = response.data;
    } catch (error) {
    } finally {
    }
})

const setHoveredIndex = (index) => {
  hoveredIndex.value = index;
};

// Clear the index when not hovering over any song
const clearHoveredIndex = () => {
  hoveredIndex.value = null;
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

// const loadSong = (url) => {
//   if (wavesurfer.value.isPlaying()) {
//     wavesurfer.value.stop(); // 현재 재생 중인 노래를 중지
//   }
//   wavesurfer.value.load(url);
//   wavesurfer.value.once('ready', () => {
//     duration.value = wavesurfer.value.getDuration();
//     wavesurfer.value.play();
//     isPlaying.value = true;
//     saveState();
//   });
// };


const playPreviousSong = () => {
  if (currentSongIndex.value > 0) {
    currentSongIndex.value--;
    eventBus.selectedSong = playlist.value[currentSongIndex.value].music;
    loadSong(eventBus.selectedSong.link);
  }
  saveState();
};


const volumeStep = 0.1; // Define the step to increase or decrease the volume

function increaseVolume() {
  let newVolume = wavesurfer.value.getVolume() + volumeStep;
  if (newVolume > 1) newVolume = 1; // Ensure volume doesn't go above 100%
  wavesurfer.value.setVolume(newVolume);
}

function decreaseVolume() {
  let newVolume = wavesurfer.value.getVolume() - volumeStep;
  if (newVolume < 0) newVolume = 0; // Ensure volume doesn't go below 0%
  wavesurfer.value.setVolume(newVolume);
}


// const playNextSong = () => {
//   if (currentSongIndex.value < playlist.value.length - 1) {
//     currentSongIndex.value++;
//     eventBus.selectedSong = playlist.value[currentSongIndex.value].music;
//     loadSong(eventBus.selectedSong.link);
//   } else {
//     isPlaying.value = false;
//   }
//   saveState();
// };

const loadSong = (url) => {
  if (wavesurfer.value.isPlaying()) {
    wavesurfer.value.stop(); // Stop the current song if it's playing
  }
  wavesurfer.value.load(url);
  wavesurfer.value.once('ready', () => {
    duration.value = wavesurfer.value.getDuration();
    wavesurfer.value.play();
    isPlaying.value = true;
    saveState();
  });
};

const playPause = (event) => {
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

  const playlistModalOpen = () => {
    openModal.value = !openModal.value;
    initModal();
  }

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
      initModal();
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

watch(playlist, async (newDuration) => {
  eventBus.duration = newDuration;
});


const fetchPlaylist = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:80/playlist/userplayer', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  playlist.value = response.data;
};


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




async function deleteSong(songId) {
  const token = localStorage.getItem('token')
  try {
        await axios.delete(`http://localhost:80/playlist/songs/${songId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    fetchPlaylist();
  } catch (error) {
    console.error('Failed to delete song:', error);
  }
};




function handleKeydown(event) {
  if (event.key === 'd' && hoveredIndex.value !== null) {
    const songId = playlist.value[hoveredIndex.value].music.id;
    deleteSong(songId);
  }
  else if (event.key === '-' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
    // Check if the '-' key was pressed
    decreaseVolume();
  } else if (event.key === '=' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
    // Check if the '=' key was pressed
    increaseVolume();
  }
}


onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style>
.music-bar {
  width: 100%;
  display: flex;
  align-items: center;
  position: relatiuve;
  z-index: 99999;
}

#current-song-info\- {
}

.current-song-info {
  display: flex;
  align-items: center;
}

.current-song-info-text {
  width: 220px;
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
  width:100px;
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
  bottom: 100px;
  width: 30px;
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


/* 유저 고유 플레이 리스트 목록 */ 

.playlist-modal {
  height: 100%;
}

.scroll p {
  font-size: 2rem;
  padding: 0.6rem 1rem;
  background: #febf00;
}

.playlist-body {
  flex-grow: 1;
  overflow-y: auto;
}

.playlist-body::-webkit-scrollbar {
  display: none;
}

.playlist-modal header,
.playlist-modal .modal-header {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.playlist-modal .modal-footer {
  position: sticky;
  bottom: 0;
  background: #202020;
  padding: 10px;
  text-align: right;
}

.user-playlist {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
}

 
.user-playlist::-webkit-scrollbar {
  display: none;
}

.user-playlist {
  -ms-overflow-style: none;
  scrollbar-width: none;
}


.user-playlist-item {
  display: flex;
  margin: 0;
  padding: 0;
  padding-left: 20px;
  color: white;
}

.user-playlist-info {
  width: 400px;
  margin-top: 20px;
  text-align: start;
  padding: 0;
  display: flex; 
}

.user-playlist-no {
  width: 20px;
  align-items: center;
  margin-right: 10px;
}

.user-playlist-meta {
  float: left;
}

 
.bi-question-circle-fill {
  position: relative; 
  font-size: 30px;
}


.popup {
  display: none;
  position: absolute;
  background-color: #333;
  padding: 10px;
  margin-right: 200px;
  bottom: 60px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 99999;
}


.bi-question-circle-fill:hover .popup {
  display: block;
}

.bi-question-circle-fill:hover {
  color: #FFC200;
  font-weight: 600;
}



.common-button-style-keyboard-all {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.common-button-style-keyboard {
  align-items: center;
  text-align: center;
  padding-top: 12px;
  background-color: #FFC200;
  color: #333;
  font-size: 1.2em;
  font-weight: 600;
  font-style: normal;
  border-radius: 10px;
  padding: 10px 20px;
}

.common-button-style-keyboard-desc {
  float: right;
  text-align: end;
  margin-bottom: 20px;
  margin-left: auto;
  font-style: normal;
  font-size: 1.2rem;
  color: white;
}

.sound-bar-popup-style {
  width: 480px;
  padding: 50px;
}

.common-button-style-keyboard-width {
  width: 100%;
  display: flex;
  margin: 10px 0;
}

.delete-button{
  width: 200px;
  color: white;
  background-color: transparent;
  border: none;
  align-items: center;
}
</style>
