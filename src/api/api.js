import axios from 'axios';
import router, { LOGIN_ROUTE } from '@/router';
import { getAuthToken, removeAuthToken } from '@/views/utils/tokens';

const STATUS_UNAUTHORIZED = 401;

export const api = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		Authorization: `Bearer ${getAuthToken()}`,
		'Content-Type': 'application/json',
		common: {
			Accept: 'application/json',
		},
	},
});

api.interceptors.request.use((config) => ({
	...config,
	headers: { ...config.headers, Authorization: `Bearer ${getAuthToken()}` },
}));

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.status === STATUS_UNAUTHORIZED) {
			router.push(LOGIN_ROUTE);
			removeAuthToken();
		}

		return Promise.reject(error);
	},
);
