<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import Axios from '@/api/Axios';
import axios from 'axios';
import { useUserStore } from '@/store/user';

 
const loggedInUser = ref('');
const router = useRouter();
const loginMessage = ref('');

const userStore = useUserStore();

 

const name = ref();
const nickname = ref('asd');
const username = ref();
const email = ref();
const password = ref();
const birthdate = ref();


const validateForm = (errors: any) => {
  errors.value.username = form.value.username ? '' : '사용자 이름을 입력하세요.';
  errors.value.email = form.value.email ? '' : '이메일을 입력하세요.';
  errors.value.password = form.value.password ? '' : '비밀번호를 입력하세요.';
  return !errors.value.username && !errors.value.email && !errors.value.password;
};


const registerForm = async (event: Event) => {
  event.preventDefault();
  try {
    const response = await axios.post('http://localhost:80/auth/register ', {
      name: name.value,
      username: username.value,
      nickname: nickname.value,
      password: password.value,
      birthdate: birthdate.value,
    })
    // localStorage.setItem('user', response.data.userData.username)
    // localStorage.setItem('userId', response.data.userData.id)
    // localStorage.setItem('token', response.data.accessToken)
    // localStorage.setItem('wave_login', 'true')
    // userStore.setUser(response.data.user);
    // alert('로그인이 완료되었습니다.')
    router.push('/');
  } catch (error) {
    console.log(error);
    // alert('아이디와 패스워드를 확인해주세요.');
  }
};

</script>

<template>
  <div class="login-container">
    <div class='login-container-wrap'>
    <div class="logo-container">
      <h2 class="site-logo">
        <a href="/">
        회원가입
        </a>
      </h2>
    </div>
    <div class="login-form-container">
      <form 
        class="login-form"
        @submit.prevent="registerForm">

        <div class="form-group">
          <label for="username" class="input-label">E-MAIL</label>
          <input
              type="email"
              autocomplete="off"
              placeholder="이메일을 입력해주세요."
              v-model="name"
              id="username"
              class="input-form"
          />
        </div>


        <div class="form-group">
          <label for="password" class="input-label">닉네임</label>
          <input
              type="text"
              autocomplete="off"
              placeholder="사용하실 닉네임을 입력해주세요."
              v-model="nickname"
              id="password"
              class="input-form"
          />
        </div>


        <div class="form-group">
          <label for="username" class="input-label">아이디</label>
          <input
              type="text"
              autocomplete="off"
              placeholder="사용하실 닉네임을 입력해주세요.."
              v-model="username"
              id="nickname"
              class="input-form"
          />
        </div>
        <div class="form-group">
          <label for="birthdate" class="input-label">생년월일</label>
          <input
              type="text"
              autocomplete="off"
              placeholder="생년월일"
              v-model="birthdate"
              id="birthdate"
              class="input-form"
          />
        </div>

        <div class="form-group">
          <label for="password" class="input-label">비밀번호</label>
          <input
              type="password"
              autocomplete="off"
              placeholder="Password"
              v-model="password"
              id="password"
              class="input-form"
          />
        </div>

        <button 
          type="submit" 
          class="login-button">
         회원가입 
        </button>
        <div class="remember-me">
          <input
              type="checkbox"
              id="rememberMe"
              class="remember-me-checkbox"
          />
          <label for="rememberMe" class="input-label remember-me-label">
            <i class="bi bi-check-circle" style=""></i> 
            &nbsp;
            <span class="remember-me-text"> 계정정보 저장</span>
          </label>
          <a href="#" class="link find-id-password">아이디/비밀번호 찾기</a>
        </div>
        <!-- <div v-if="userStore.loginErrors.length">
          <ul>
            <li v-for="error in userStore.loginErrors" :key="error">{{ error }}</li>
          </ul>
        </div> -->
        <p v-if="loggedInUser">Welcome, {{ loggedInUser }}!</p>
        <p v-if="loginMessage">{{ loginMessage }}</p>
      </form>
      <div class="signup-link">
        <!-- <p>아직 회원이 아니신가요? <a href="#" class="link">회원가입</a></p> -->
      </div>
      <div class="social-login">
        <!-- <p>소셜 로그인/회원가입</p> -->
        <!-- <div class="social-icons">
          <a href="#"><i class="bi bi-google"></i></a>
          <a href="#"><i class="bi bi-facebook"></i></a>
          <a href="#"><i class="bi bi-naver"></i></a>
          <a href="#"><i class="bi bi-chat"></i></a>
        </div> -->
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  background-color: #202020;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 100px;
  padding-bottom: 100px;
  top: 200px;
  color: white;
}

.login-container-wrap {
  width: 597px;
  margin:0  auto;
}

.logo-container {
  text-align: center;
  margin-bottom: 20px;
}

.site-logo > a {
  color: #fff;
  font-size: 1em;
  font-weight: 600;
}

.logo-image {
  width: 150px;
}

a {
  color: white;
   text-decoration: none;
}
.login-form-container {
  background-color: rgb(51, 51, 51);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.login-form {
  width: 437px;
  max-width: 437px;
  padding: 50px 80px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.form-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 0 1rem 0;
}

.input-label {
  color: #bbb;
  font-size: 0.8em;
  margin-bottom: 10px;
}

.input-form {
  width: 100%; /* Set width to 380px */
  height: 46px; /* Set height to match button */
  background: #484848;
  border-radius: 10px;
  color: #bbb;
  border: none;
  padding: 0 20px;
}  

.login-button {
  width: 100%; /* Set width to 380px */
  height: 46px; /* Set height to match input */
  background-color: #f3be38;
  color: #333;
  font-weight: 800;
  font-size: 1.1em;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  left: 0;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.remember-me {
  display: flex;
  margin-top: 10px;
  justify-content: space-between; /* Align to the left */
  width: 100%;
}

.remember-me-label {
  display: flex;
  color: #bbb; /* Default color */
  cursor: pointer; /* Add cursor pointer */
  margin-left: 0; /* Move to the far left */
  float: left;
  left: 0;
}

.remember-me-checkbox {
  display: none; /* Hide the default checkbox */
}

.remember-me-checkbox:checked + .remember-me-label {
  color: #f3be38; /* Set color to match login button when checked */
}

.remember-me-checkbox:checked + .remember-me-label .remember-me-text {
  color: #bbb; /* Set color to match login button when checked */
}

.remember-me-text {
  color: inherit;
}

a {
  color: white;
}
</style>
