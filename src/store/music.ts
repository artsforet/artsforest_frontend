// import { defineStore } from 'pinia';
// import WaveSurfer from 'wavesurfer.js';
// import axios from 'axios';
// import { nextTick } from 'vue';

// interface Music {
//   id: number;
//   title: string;
//   description: string;
//   cover: string;
//   link: string;
// }

// interface MusicStoreState {
//   waveSurferInstance: WaveSurfer | null;
//   currentPlayingId: number | null;
//   musicList: Music[];
// }

// export const useMusicStore = defineStore('music', {
//   state: (): MusicStoreState => ({
//     waveSurferInstance: null,
//     currentPlayingId: null,
//     musicList: [],
//   }),
//   actions: {
//     async loadMusicList() {
//       try {
//         const response = await axios.get('http://localhost:8000/music/soundfactory/song');
//         this.musicList = response.data;
//       } catch (error) {
//         console.error('Error fetching music:', error);
//       }
//     },
//     async initializeWaveSurfer(music: Music, container: HTMLElement) {
//       if (this.waveSurferInstance) {
//         this.waveSurferInstance.destroy();
//       }
//       this.waveSurferInstance = WaveSurfer.create({
//         container,
//         waveColor: 'violet',
//         progressColor: 'purple'
//       });
//       this.waveSurferInstance.load(music.link);
//       this.currentPlayingId = music.id;
//     },
//     playPause() {
//       if (this.waveSurferInstance) {
//         if (this.waveSurferInstance.isPlaying()) {
//           this.waveSurferInstance.pause();
//         } else {
//           this.waveSurferInstance.play();
//         }
//       }
//     }
//   }
// });