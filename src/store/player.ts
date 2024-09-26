// stores/messageStore.js
import { defineStore } from 'pinia';

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    playlist: [],
  }),
  actions: {
    updatePlaylist(newPlaylist) {
      playlist.value = newPlaylist;
    }
  }
});
