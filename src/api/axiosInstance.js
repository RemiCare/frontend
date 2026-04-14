import axios from 'axios';

// base URL 설정
//const API_BASE_URL = 'https://server.lifewatch.store'; 
const API_BASE_URL = 'http://localhost:8080'; // 개발 환경에서는 로컬 서버 주소 사용
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정 (Authorization 헤더 추가)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // 로그인 시 저장한 토큰
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;