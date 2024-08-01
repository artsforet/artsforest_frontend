<script setup lang="ts">
// import { ref, onMounted, watch, reactive, computed } from 'vue';
// // import { IMusic, IPlaylist } from '@appTypes/types.type';
// import { useRouter } from 'vue-router';
//
// interface AddPlaylistProps {
//   onClose: (any?: any) => any;
//   // onCreateSuccess?: (createPlaylist: IPlaylist) => any;
//   onCreateFail?: () => any;
//   // onAddSuccess?: (playlist: IPlaylist) => any;
//   onAddFail?: () => any;
//   onRemoveSuccess?: (playlistId: number) => any;
//   onRemoveFail?: () => any;
//   // addMusics?: IMusic[];
// }
//
// const props = defineProps<AddPlaylistProps>();
// // const store = useStore();
// const router = useRouter();
// // const openAlert = useAlert();
//
// const playlists = computed(() => store.state.user.userData?.playlists || []);
//
// const navIndex = ref(0);
// const newPlaylist = reactive({
//   title: '',
//   privacy: 'PUBLIC'
// });
// const filter = ref('');
// // const musics = ref<IMusic[]>([]);
// const navItems = ref(['Add to playlist', 'Create playlist']);
// const loading = ref(false);
// const loadingArr = ref<number[]>([]);
//
// const handleClickPrivacy = (event: Event) => {
//   const target = event.target as HTMLInputElement;
//   newPlaylist.privacy = target.id.toUpperCase();
// };
//
// const handleChangeInput = (event: Event) => {
//   const target = event.target as HTMLInputElement;
//   if (target.id === 'filter') {
//     filter.value = target.value;
//   } else {
//     newPlaylist.title = target.value;
//   }
// };
//
// const createPlaylist = async () => {
//   if (newPlaylist.title.length < 2) {
//     return alert('2자 이상의 제목을 입력해 주세요.');
//   }
//
//   loading.value = true;
//
//   const body = {
//     name: newPlaylist.title,
//     musicIds: musics.value.map((music) => music.id),
//     status: newPlaylist.privacy,
//   };
//
//   const value = await store.dispatch('userCreatePlaylist', body);
//
//   if (value.type.includes('fulfilled')) {
//     const createPlaylist: any = value.payload;
//     openAlert(`Create playlist: ${createPlaylist.name}`, {
//       severity: 'success',
//     });
//     props.onCreateSuccess && props.onCreateSuccess(createPlaylist);
//   } else {
//     openAlert(`Fail to Create playlist`, {
//       severity: 'error',
//     });
//     props.onCreateFail && props.onCreateFail();
//   }
//
//   loading.value = false;
//   newPlaylist.title = '';
//   newPlaylist.privacy = 'PUBLIC';
//   props.onClose();
// };
//
// const pullMusic = (index: number) => (event: MouseEvent) => {
//   event.preventDefault();
//   musics.value = musics.value.filter((_, n) => index !== n);
// };
//
// const editPlaylistMusics = (musics: IMusic[], action: 'add' | 'delete') => async (event: MouseEvent) => {
//   const target = event.currentTarget as HTMLElement;
//   const playlistId = target.getAttribute('data-playlistid');
//
//   if (!playlistId) {
//     return;
//   }
//
//   loadingArr.value.push(Number(playlistId));
//
//   const params = {
//     playlistId,
//     musicIds: musics.map((music) => music.id),
//   };
//   const actionFunc = action === 'add' ? userAddMusicsToPlaylist : userDeleteMusicsFromPlaylist;
//
//   const value = await store.dispatch(actionFunc, params);
//
//   loadingArr.value = loadingArr.value.filter((id) => id !== Number(playlistId));
//
//   if (value.type.includes('fulfilled')) {
//     const updatedPlaylist: IPlaylist = value.payload;
//     openAlert(
//         `'${updatedPlaylist.name}' ${
//             musics.length > 1 ? `${action} ${musics.length} tracks` : `${action} track: ${musics[0].title}`
//         }`,
//         {
//           severity: 'success',
//         }
//     );
//
//     if (action === 'add') {
//       props.onAddSuccess && props.onAddSuccess(updatedPlaylist);
//     } else {
//       props.onRemoveSuccess && props.onRemoveSuccess(Number(playlistId));
//     }
//   } else {
//     openAlert(`Fail to ${action} track`, {
//       severity: 'error',
//     });
//     if (action === 'add') {
//       props.onAddFail && props.onAddFail();
//     } else {
//       props.onRemoveFail && props.onRemoveFail();
//     }
//   }
// };
//
// const handleSetNav = () => {
//   !playlists.value.length ? navItems.value = ['Create playlist'] : navItems.value = ['Add to playlist', 'Create playlist'];
//   navIndex.value = 0;
// };
//
// onMounted(() => {
//   handleSetNav();
// });
//
// watch(() => props.addMusics, (newMusics) => {
//   musics.value = newMusics || [];
// });
</script>

<template>
  <div class="add-player">
    <div class="add-player-titl ">
      <div class="title">
        <div class="title-item"
            v-for="(nav, index) in navItems"
            :key="index"
            :select="navIndex=== index"
            @click="() => navIndex = index"
        >
          {{ nav }}
        </div>
      </div>
      <CommonStyle.StyledDivider />
    </div>
    <S.DialogContent>
      <div v-if="navItems[navIndex] === 'Add to playlist'">
        <!-- Add Music to Playlist -->
        <S.AddContent>
          <S.TextInput
              id="filter"
              type="text"
              v-model="filter"
              @input="handleChangeInput"
              placeholder="Filter playlists"
              style="width: 100%;"
          />
          <ul class="ul-playlists">
            <li v-for="(playlist, index) in playlists" :key="index">
              <div v-if="playlist.name.includes(filter)">
                <S.PlaylistItem>
                  <div class="image">
                    <router-link
                        :target="'_blank'"
                        class="link"
                        :to="`/playlist/${playlist.userId}/${playlist.permalink}`"
                    >
                      <img v-if="playlist.image" class="img" :src="playlist.image" alt="" />
                      <EmptyPlaylistImage v-else class="img" />
                    </router-link>
                  </div>
                  <div class="info">
                    <div class="info-name">
                      <router-link
                          :target="'_blank'"
                          :to="`/playlist/${playlist.userId}/${playlist.permalink}`"
                      >
                        {{ playlist.name }}
                      </router-link>
                    </div>
                    <div class="info-num" :title="`${playlist.musics.length} musics`">
                      <BsSoundwave size="14" style="margin-right: 4px;" />
                      {{ playlist.musics.length }}
                    </div>
                  </div>
                  <Reload v-if="loadingArr.includes(playlist.id)" size="40" style="margin: 0 10px 0 auto;" />
                  <S.AddButton
                      v-else
                      :added="musics.length === 0"
                      :data-playlistid="playlist.id"
                      @click="editPlaylistMusics(musics, musics.length === 0 ? 'delete' : 'add')"
                  >
                    {{ musics.length === 0 ? 'Added' : 'Add to playlist' }}
                  </S.AddButton>
                </S.PlaylistItem>
              </div>
            </li>
          </ul>
        </S.AddContent>
      </div>
      <div v-else>
        <!-- Create Playlist -->
        <S.CreatePlaylist>
          <div class="inputBox">
            <S.Label>
              Playlist title<span>{' *'}</span>
            </S.Label>
            <S.TextInput
                id="title"
                type="text"
                v-model="newPlaylist.title"
                @input="handleChangeInput"
            />
          </div>
          <div class="inputBox flex">
            <S.Label>{`Privacy: `}</S.Label>
            <input
                type="radio"
                id="public"
                name="privacy"
                @change="handleClickPrivacy"
                :checked="newPlaylist.privacy.toLowerCase() === 'public'"
            />
            <label for="public">Public</label>
            <input
                type="radio"
                id="private"
                name="privacy"
                @change="handleClickPrivacy"
                :checked="newPlaylist.privacy.toLowerCase() === 'private'"
            />
            <label for="private">Private</label>
          </div>
          <S.SaveBox>
            <Reload v-if="loading" size="40" />
            <S.SaveButton v-else @click="createPlaylist">Save</S.SaveButton>
          </S.SaveBox>
        </S.CreatePlaylist>
        <S.AddMusicsWrapper>
          <S.AddItem v-for="(music, index) in musics" :key="index">
            <div class="music-cover">
              <img v-if="music.cover" class="img" :src="music.cover" alt="" />
              <EmptyMusicCover v-else class="img" />
            </div>
            <div class="music-name">
              <span>{{ `${music.user?.nickname || music.userId} - ` }}</span>
              {{ music.title }}
            </div>
            <button class="music-close" @click="pullMusic(index)">
              <MdClose />
            </button>
          </S.AddItem>
          <S.AddItem v-for="index in 4 - musics.length" :key="index"></S.AddItem>
        </S.AddMusicsWrapper>
      </div>
    </S.DialogContent>
  </div>
</template>
