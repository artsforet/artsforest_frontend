import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:80', // 여기에 실제 API URL을 입력하세요
  headers: {
    'Content-Type': 'application/json'
  }
});

export const downloadMusic = (userId: number, musicId: number, token: string) => {
  return apiClient.post(`/downloads/${userId}/${musicId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};