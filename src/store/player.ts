import { defineStore } from 'pinia';
import axios from 'axios';
import WaveSurfer from 'wavesurfer.js';

interface AudioFile {
  id: number;
  link: string;
}

interface PlayerState {
  currentAudioFile: AudioFile | null;
  musicObject: AudioFile[];
  wavesurfer: WaveSurfer | null;
}

export const usePlayerStore = defineStore('player', {
  state: (): PlayerState => ({
    currentAudioFile: null,
    musicObject: [],
    wavesurfer: null,
  }),
  actions: {
    initializeWaveSurfer(container: string) {
      this.wavesurfer = WaveSurfer.create({
        container: container,
        waveColor: 'violet',
        progressColor: 'purple'
      });
    },
    async setCurrentAudioFile(audio: AudioFile) {
      this.currentAudioFile = audio;

      const token = localStorage.getItem('token');
      try {
        await axios.post(`http://localhost:80/playlist/add/${audio.id}`, {
          music_id: audio.id,
          token: token
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const response = await axios.get(`http://localhost:80/playlist/userplayer`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        this.musicObject = response.data;

        const lastItem = this.musicObject[this.musicObject.length - 1];
        if (this.wavesurfer && lastItem) {
          this.wavesurfer.load(lastItem.link);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
});
