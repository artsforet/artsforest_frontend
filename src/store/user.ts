import { defineStore } from 'pinia';
import axios from 'axios';

interface Playlist {
  id: number;
  name: string;
  musics: any[];
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as any,
    playlists: [] as Playlist[],
  }),
  actions: {
    async fetchUser(userId: number) {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:80/auth/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.user = response.data;
      this.playlists = response.data.playlists;
    },
    async fetchOrCreatePlaylists() {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`http://localhost:80/playlists`, { headers });
      this.playlists = response.data;
    },
    async createPlaylist(name: string) {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:80/playlist', { name }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.playlists.push(response.data);
    },
    async addMusicToPlaylist(playlistId: number, musicId: number) {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:80/playlist/1/music`, { musicId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const playlist = this.playlists.find(pl => pl.id === playlistId);
      if (playlist) {
        playlist.musics.push(response.data);
      }
    },
    async addMusicToFirstPlaylist(musicId: number) {
      if (this.playlists.length === 0) {
        const newPlaylistResponse = await this.createPlaylist('Default Playlist');
        const firstPlaylistId = (newPlaylistResponse as unknown as Playlist).id;
        await this.addMusicToPlaylist(firstPlaylistId, musicId);
      } else {
        const firstPlaylistId = this.playlists[0].id;
        await this.addMusicToPlaylist(firstPlaylistId, musicId);
      }
    },
    setUser(user: any) {
      this.user = user;
    },
    async addMusicToUserPlaylist(musicId: number, playlistId: number) {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }
      await this.addMusicToPlaylist(playlistId, musicId);
    },
    async getDefaultPlaylistId() {
      if (!this.playlists.length) {
        await this.fetchOrCreatePlaylists();
      }
      let defaultPlaylist = this.playlists.find(playlist => playlist.name === 'Default Playlist');
      if (!defaultPlaylist) {
        const response = await axios.post(`http://localhost:80/playlists`, { name: 'Default Playlist' }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.playlists = response.data;
        // this.playlists.push(defaultPlaylist);
      }
      if (defaultPlaylist) {
        return defaultPlaylist.id;
      } else {
        throw new Error('Default playlist could not be created or found');
      }
    }
  }
});

