import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from "@/views/User/Login/LoginPage.vue";
import UploadPage from "@/views/Bgm/Upload/UploadPage.vue";
import PlayList from "@/views/Playlist/PlayList.vue";
import AlbumPage from '@/views/Page/soundFactory/SoundFactory/AlbumPage.vue';
import SongPage from "@/views/Page/soundFactory/SoundFactory/SongPage.vue";
import SfxEffect from "@/views/Page/soundFactory/SFX/SfxEffect.vue";

import PlaylistLastSong from "@/views/Page/soundFactory/Playlist/PlaylistLastSong.vue";
import PlaylistQuration from "@/views/Page/soundFactory/Playlist/PlaylistQuration.vue";

import SfxPolysound from "@/views/Page/soundFactory/SFX/SfxPolysound.vue";

import ArtsForestAlbum from "@/views/Page/soundFactory/ArtsForest/ArtsForestAlbum.vue";
import ArtsForestSong from "@/views/Page/soundFactory/ArtsForest/ArtsForestSong.vue";


import AlbumDetail from '@/views/Page/Music/AlbumDetail.vue';
import SongDetail from '@/views/Page/Music/SongDetail.vue';
import SongAmdin from '@/views/Admin/SongAdmin.vue';
import HomeAdmin from '@/views/Admin/HomeAdmin/HomeAdmin.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'songAdmin',
      component: SongAmdin
    },
    {
      path: '/play',
      name: 'playlist',
      component: PlayList
    },
    {
      path: '/login',
      name: 'loginPage',
      component: LoginPage
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadPage
    },
    {
      path: '/soundfactory/song/:page?',
      name: 'SongPage',
      component: SongPage,
    },

    {
      path: '/soundfactory/album',
      name: 'AlbumPage',
      component: AlbumPage,
    },
    {
      path: '/sfx/sfxEffect',
      name: 'sfxEffect',
      component: SfxEffect,
    },
    {
      path: '/sfx/sfxPolysound',
      name: 'sfxPolysound',
      component: SfxPolysound,
    },
    {
      path: '/playlist/quration',
      name: 'playlistQuration',
      component: PlaylistQuration,
    },
    {
      path: '/artsforest/song',
      name: 'artsforestSong',
      component: ArtsForestSong,
    },
    {
      path: '/artsforest/album',
      name: 'artsForestAlbum',
      component: ArtsForestAlbum,
    },
    // {
    //   path: '/artsforest/album',
    //   name: 'artsforestSong',
    //   component: ArtsForestSong,
    // },
    {
      path: '/sfxsong',
      name: 'sfxSong',
      component: SfxEffect,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    // {
    //   path: '/notice',
    //   name: 'notice',
    //   component: NoticePage,
    // },
    {
      path: '/soundfactory/playlistquartion',
      name: 'PlaylistQuration',
      component: PlaylistQuration,
    },


    // {
      // path: '/music/:id',
      // name: 'AlbumDetailsPage',
      // component: DetailPage,
    // },
    {
      path: '/album/:album',
      name: 'AlbumDetail',
      component: AlbumDetail,
      props: true
    },
    {
      path: '/song/:id',
      name: 'SongDetail',
      component: SongDetail,
      props: true
    },
    {
      path: '/homeAdmin',
      name: 'homeAdmin',
      component: HomeAdmin,
    },
  
  ]
})

export default router
