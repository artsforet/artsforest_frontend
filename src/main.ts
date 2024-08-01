import './assets/main.css'
import '../main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import '@/api/Axios'
import {createPinia} from "pinia";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import axiosInstance from './api/Axios'

const app = createApp(App)
const pinia = createPinia();
app.use(pinia);
app.use(router)
// Bootstrap is already globally available through its CSS and JS imports, so no need to use it explicitly here.
// app.config.globalProperties.$axios = axiosInstance;
app.mount('#app')
