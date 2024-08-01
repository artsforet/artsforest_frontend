<template>
<div class="header-content-main">
  <ul class="headear-content-main-list">
    <li class="header-content_user" v-if="loggedInUser">
      <span @click="toggleDropdown">{{loggedInUser}}</span>
      <div v-if="showDropdown" class="dropdown_list">
        <div><router-link to="/">마이페이지</router-link></div>
        <div><router-link to="/upload">업로드</router-link></div>
        <div><router-link to="/">1:1 문의 내역</router-link></div>
        <div @click="logout">로그아웃</div>
      </div>
  </li>
   <li v-else>
    <router-link to="/login"> 로그인 </router-link> 
   </li>
    <li> 
      <router-link to="/">
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

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const logout = () => {
  localStorage.removeItem('user');
  loggedInUser.value = '';
  showDropdown.value = false;
  router.push('/login');
};

onMounted(() => {
  if (loggedInUser.value) {
    loginMessage.value = 'You are already logged in.';
  }
});
</script>
<style scoped>
@import './HeaderContent.css';

.header-content-main {
  height: 30px;
  line-height: 30px;
  background-color: #202020;
  color: white;
  padding: 0;
  margin: 0;
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 1rem; /* Set font size to 1rem to override the 8px set in main.css, 
                      and make it relative to the root element's font size */
}

.headear-content-main-list {
  display: flex;
  justify-content: space-between;
  list-style: none;
  height: inherit;
}

.headear-content-main-list li {
  margiN: 0 20px;
}

.headear-content-main-list li > a {
  margin: 0 20px;
  color: white;
  text-decoration: none;
}

.header-content_user {
  position: relative;
}

.dropdown_list {
  width: 280px;
  height: 170px;
  right: 0;
  margin-top: 10px;
  position: absolute;
  background-color: #333;
  list-style: none;
  padding: 10px;
  color: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 99;
}

.dropdown_list li {
  margin: 10px 0;
}

.dropdown_list li a {
  color: white;
  text-decoration: none;
}

</style>