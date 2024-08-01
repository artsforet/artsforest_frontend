// main.js 또는 main.ts (Vue 3의 경우)
import { createApp } from 'vue';
import axios from 'axios';


const token = localStorage.getItem('token')
// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // 기본 URL 설정
  timeout: 10000, // 요청 타임아웃 설정 (밀리초)
  headers: {
    'content-type': 'application/json' // 기본 헤더 설정
  }
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(config => {
  // 요청 전에 수행할 작업
  console.log('Request:', config);
  return config;
}, error => {
  // 요청 오류 처리
  return Promise.reject(error);
});

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(response => {
  // 응답 데이터 처리
  console.log('Response:', response);
  return response;
}, error => {
  // 응답 오류 처리
  return Promise.reject(error);
});

// Axios 인스턴스를 Vue 인스턴스에 추가

export default axiosInstance;