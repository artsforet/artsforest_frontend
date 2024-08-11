import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from "@/views/User/Login/LoginPage.vue";
import UploadPage from "@/views/Bgm/Upload/UploadPage.vue";
import PlayList from "@/views/Playlist/PlayList.vue";
import AlbumPage from '@/views/Page/soundFactory/SoundFactory/AlbumPage.vue';
import SongPage from "@/views/Page/soundFactory/SoundFactory/SongPage.vue";
import SfxEffect from "@/views/Page/soundFactory/SFX/SfxEffect.vue";

import PlaylistLastSong from "@/views/Page/soundFactory/Playlist/PlaylistLastSong.vue";
import PlaylistCuration from "@/views/Page/soundFactory/Playlist/PlaylistCuration.vue";

import SfxPolysound from "@/views/Page/soundFactory/SFX/SfxPolysound.vue";

import ArtsForestAlbum from "@/views/Page/soundFactory/ArtsForest/ArtsForestAlbum.vue";
import ArtsForestSong from "@/views/Page/soundFactory/ArtsForest/ArtsForestSong.vue";

import FreeFactory from "@/views/Page/soundFactory/Free/FreeFactory.vue";
import FreeYard from "@/views/Page/soundFactory/Free/FreeYard.vue";


import AlbumDetail from '@/views/Page/Music/AlbumDetail.vue';
import SongDetail from '@/views/Page/Music/SongDetail.vue';
import SongAmdin from '@/views/Admin/SongAdmin.vue';
import CurationDelete from '@/views/Admin/CurationDelete.vue';
import HomeAdmin from '@/views/Admin/HomeAdmin/HomeAdmin.vue';
import AdminMaster from '@/views/Admin/AdminMaster.vue';
import PdAdmin from '@/views/Admin/PdAdmin.vue';
import MyPage from '@/views/Admin/MyPage.vue';

import PdHome from '@/views/Page/etcPage/PdHome.vue';
import SeriesMusic from '@/views/Page/soundFactory/SeriesMusic.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/master',
      component: AdminMaster,
      // 자식만 네임드 라우트라는 점에 주목하세요.
      children: [
        { path: 'curation', name: 'songAdmin', component: SongAmdin },
        { path: 'curation/delete', name: 'curationDelete', component: CurationDelete },
        { path: 'pdadmin', name: 'pdAdmin', component: PdAdmin }
      ],
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
      path: '/playlist/curation',
      name: 'playlistCuration',
      component: PlaylistCuration,
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
    {
      path: '/sfxsong',
      name: 'sfxSong',
      component: SfxEffect,
    },
    {
      path: '/soundfactory/playlistcuartion',
      name: 'PlaylistCuration',
      component: PlaylistCuration,
    },
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
      path: '/series/:cate?',
      name: 'seriesMusic',
      component: SeriesMusic,
    },
    {
      path: '/pd',
      name: 'pdHome',
      component: PdHome,
    },
    {
      path: '/freefactory',
      name: 'freeFactory',
      component: FreeFactory
    },
    {
      path: '/freeyard',
      name: 'freeYard',
      component: FreeYard
    },
    {
      path: '/myPage',
      name: 'myPage',
      component: MyPage
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
})



export default router
