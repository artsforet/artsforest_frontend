import { defineStore } from 'pinia';
import WaveSurfer from 'wavesurfer.js';

interface AudioFile {
  link: string;
}

interface UserAudioState {
  currentAudioFile: AudioFile | null;
  wavesurfer: WaveSurfer | null;
}

export const useAudioStore = defineStore('audio', {
  state: (): UserAudioState => ({
    currentAudioFile: null,
    wavesurfer: null,
  }),
  actions: {
    setCurrentAudioFile(audioFile: AudioFile) {
      this.currentAudioFile = audioFile;
    },
    initWavesurfer(container: HTMLElement) {
      if (!this.wavesurfer) {
        this.wavesurfer = WaveSurfer.create({
          container: container,
          waveColor: 'violet',
          progressColor: 'purple',
        });
      }
    },
    loadAndPlayAudio(audioFile: AudioFile) {
      this.setCurrentAudioFile(audioFile);
      if (this.wavesurfer) {
        this.wavesurfer.load(audioFile.link);
        this.wavesurfer.on('ready', () => {
          this.wavesurfer?.play();
        });
      }
    },
    // setCurrentTime(time: number) {
    //   if (this.wavesurfer) {
    //     this.wavesurfer.setCurrentTime(time);
    //   }
    // },
  },
});
