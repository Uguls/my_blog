import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACK_URL, // 백엔드 API URL 설정
	withCredentials: true, // 쿠키를 포함하여 요청을 보냄
});

export default axiosInstance;