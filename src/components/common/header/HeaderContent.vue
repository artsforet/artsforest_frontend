<template>
<div class="header-content-main">
  <ul class="headear-content-main-list">
    <li class="header-content_user">
      <img src="@/assets/image/topBanner/topBanner.gif" style="width: 350px"/>
      &nbsp; &nbsp; &nbsp;
    </li>
    <li v-if="loggedInUser">
      <span @click="toggleDropdown" style="cursor: pointer; margin-left: 600px">{{loggedInUser}}</span>
      <div v-if="showDropdown" class="dropdown_list">
        <div> 
          <h5> {{ loggedInUser }} 님</h5> 
        </div>
        <div><router-link to="/mypage">마이페이지</router-link></div>
        <div
          v-if="check ===`master`"
        ><router-link to="/master/curation">관리자 전용 어드민</router-link></div>
        <div><router-link to="/admin/mymusic">나의 노래 리스트</router-link></div>
        <div><router-link to="/upload">업로드</router-link></div>
        <!-- <div><router-link to="/">1:1 문의 내역</router-link></div> -->
        <div @click="logout" style="cursor: pointer" class="a-logout">로그아웃</div>
      </div>
   </li>
   <li v-else>
    <router-link to="/login"> 로그인 </router-link> 
   </li>
    <li style="min-width: 120px;"> 
      <router-link to="/voucher">
        비대면 바우처 
      </router-link>
    </li>
   <!-- <li> 
    <router-link to="/notice">
      공지사항 
    </router-link>
    </li> -->
   <!-- <li> 
    <router-link to="/">
      1:1문의  
    </router-link>
  </li> -->
   <!-- <li> 
    <router-link to="/">
      FAQ
    </router-link>  
   </li> -->
  </ul>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
// import { useAuthStore } from '@/store/user'; // Ensure this matches the export
import Axios from '@/api/Axios';
import axios from 'axios';

const username = ref();
const password = ref();
const loggedInUser = ref(localStorage.getItem('user'));
// const userStore = useAuthStore(); // Corrected to useAuthStore
const router = useRouter();
const loginMessage = ref('');
const showDropdown = ref(false);
const check = localStorage.getItem('authority')

const userAdmin = ref();
const fechUserInfo = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:80/auth/profile', {
    headers: {
            Authorization: `Bearer ${token}`
      }
  })
  userAdmin.value = response.data.authority;
};


const toggleDropdown = () => {
  fechUserInfo();
  showDropdown.value = !showDropdown.value;
};

async function logout() {
      const token = localStorage.getItem('token')
      try {
        await axios.post(`http://localhost:80/auth/logout`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        localStorage.removeItem('token'); // 로컬 저장소에서 액세스 토큰 제거
        router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
        alert('Logout failed, please try again');
      }
    };

onMounted(() => {
  if (loggedInUser.value) {
    loginMessage.value = 'You are already logged in.';
  }
});

function $emit(arg0: string) {
  throw new Error('Function not implemented.');
}
</script>
<style scoped>
@import './HeaderContent.css';

.header-content-main {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #202020;
  color: white;
  padding: 0;
  margin: 0;
  top: 0;
  display: flex;
  text-align: center;
  justify-content: center;
  z-index: 9999;
  font-size: 1rem;
  position: fixed;
}

.headear-content-main-list {
  width: 1197px;
  display: flex;
  list-style: none;
  height: inherit;
  background-color: #202020;
  z-index: 9999;
  padding: 0;
}

.headear-content-main-list li {
}

.headear-content-main-list li > a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
}

.header-content_user {
  position: relative;
}

.dropdown_list {
  width: 250px;
  margin-top: 10px;
  margin-left: 430px;
  background-color: #333;
  list-style: none;
  padding: 20px;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 99;
  text-align: start;
}


.dropdown_list > div{
  margin: 0;
  padding: 0;
  height: 30px;
}


.dropdown_list > div > a {
  color: white;
  text-decoration: none;
  font-size: 14px;
  margin: 0;
  padding: 0;
}

.dropdown_list > div > a:hover {
  color: rgba(255,255,255, 0.8)
}

img {
  border-radius: 2px;
}

.a-logout {
  color: white;
  text-decoration: none;
  font-size: 14px;
  margin: 0;
  padding: 0;
}
</style>