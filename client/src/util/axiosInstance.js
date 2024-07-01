import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACK_URL, // 백엔드 API URL 설정
	withCredentials: true, // 쿠키를 포함하여 요청을 보냄
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BACK_URL}/auth/token`,
					{},
					{ withCredentials: true }
				);
				if (response.status === 200) {
					const newToken = response.data.accessToken;
					axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
					originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
					return axios(originalRequest);
				}
			} catch (tokenError) {
				return Promise.reject(tokenError);
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;