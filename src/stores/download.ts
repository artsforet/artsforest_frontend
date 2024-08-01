// src/stores/download.js
import { defineStore } from 'pinia';
import { downloadMusic } from '../api';

export const useDownloadStore = defineStore('download', {
  state: () => ({
    downloads: null,
  }),
  actions: {
    async downloadMusic(userId: any, musicId: any, token: any) {
      try {
        await downloadMusic(userId, musicId, token);
      } catch (error) {
        console.error('Failed to download music:', error);
      }
    },
  },
});
