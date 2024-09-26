// src/stores/songStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useSongStore = defineStore('songStore', {
  state: () => ({
    songs: [],
    playlist: [],
    currentPage: 1,
    songsPerPage: 10,
  }),
  getters: {
    paginatedSongs: (state) => {
      const start = (state.currentPage - 1) * state.songsPerPage;
      const end = start + state.songsPerPage;
      return state.songs.slice(start, end);
    },
    totalPages: (state) => {
      return Math.ceil(state.songs.length / state.songsPerPage);
    },
  },
  actions: {
    // BGM FACTORY SONG 
    async fetchSongs(token?: string) {
      try {
        const response = await axios.get('http://localhost:80/music/soundfactory/song', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        this.songs = response.data;
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    },


    // BGM FACTORY ALBUM
    async fetchAlubm() {
      try {
        const response = await axios.get('http://localhost:80/music/soundfactory/album');
        this.songs = response.data;
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    },


    // SFX 효과음
    async fetchSfxSong() {
      try {
        const response = await axios.get('http://localhost:80/music/soundfactory/sfxEffect');
        this.songs = response.data;
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    },


    // SFX 폴리사운드
    async fetchSfxPolysound() {
      try {
        const response = await axios.get('http://localhost:80/music/soundfactory/sfxPolysound');
        this.songs = response.data;
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    },

    // 예술숲 곡
    async fetchArtsForestSong() {
      try {
        const response = await axios.get('http://localhost:80/music/soundfactory/artsForestSong');
        this.songs = response.data;
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    },


    // 에술숲 앨범 
    async fetchArtsForestAlbum() {
      try {
        const response = await axios.get('http://localhost:80/music/soundfactory/artsForestAlbum');
        this.songs = response.data;
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    },


    // 무료배포 사운드 팩토리
    async fetchFreeSoundFactory() {
      try {
        const response = await axios.get('http://localhost:80/music/soundfactory/freeSoundFacotry');
        this.songs = response.data;
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    },

    // 무료배포 공유마당 
    async fetchFreeYard() {
      try {
        const response = await axios.get('http://localhost:80/music/soundfactory/FreeYard');
        this.songs = response.data;
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    },
 


    // 플레이리스트 큐레이션 
    async fetchPlaylistCuration() {
      try {
        const response = await axios.get('http://localhost:80/music/soundfactory/playlistCuration');
        this.songs = response.data;
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    },
 

 

    // 플레이리스트 방금그곡
    async fetchPlaylistLastSong() {
      try {
        const response = await axios.get('http://localhost:80/music/soundfactory/playlistLastSong');
        this.songs = response.data;
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    },
 

    async userPlaylist(getToken: string) {
      try {
        const response = await axios.get('http://localhost:80/playlist/userplayer', {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }); // 여기에 실제 API 엔드포인트를 입력하세요
        this.playlist = response.data;
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    },
    setPage(page) {
      this.currentPage = page;
    },
  },
});

