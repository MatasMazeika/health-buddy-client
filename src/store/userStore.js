import { reactive, ref } from 'vue';
import { getErrorMessage } from '@/views/utils/errorHandler';
import { saveAuthToken } from '@/views/utils/tokens';
import { userDataStore } from '@/store/userDataStore';
import { useCaloryCalculation } from '@/views/auth/useCaloryCalculation';
import router, { DASHBOARD_ROUTE } from '@/router';
import { api } from '@/api/api';

const USER_API = `${process.env.VUE_APP_API_URL}/user`;

const LOGIN_API = `${USER_API}/login`;
const REGISTER_API = `${USER_API}/register`;
const UPLOAD_IMAGE_API = `${USER_API}/upload/image`;

export const login = ({ email, password }) => api.post(LOGIN_API, { email, password });

export const register = ({
	email, password, username, calories, protein, carbs, fat,
}) => api.post(REGISTER_API, {
	email, password, username, calories, protein, carbs, fat,
});

export const editUserDetailsApi = ({
	email, username, password, confirmPassword,
}) => api.patch(USER_API, {
	email, username, password, confirmPassword,
});

export const uploadImage = (image) => api.post(UPLOAD_IMAGE_API, image, {
	headers: { 'Content-Type': 'multipart/form-data' },
});

export const userStore = () => {
	const { setUserDetails } = userDataStore();
	const { caloricDataMultiplied } = useCaloryCalculation();

	const isLoadingAuthentication = ref(false);
	const authErrors = ref([]);

	const authInput = reactive({
		email: 'matas@matukas.com',
		password: 'matas123',
		username: '',
	});

	const handleAuthInput = (event) => {
		const { target: { name, value } } = event;

		authInput[name] = value;
	};

	const resetAuthInput = () => {
		authInput.value = {
			email: '',
			password: '',
			username: '',
		};
	};

	const resetErrors = () => {
		authErrors.value = [];
	};

	const handleLogin = async () => {
		resetErrors();
		isLoadingAuthentication.value = true;

		try {
			const {
				data: {
					token, avatar, email, username,
				},
			} = await login({ ...authInput });

			saveAuthToken(token);

			setUserDetails({ avatar, email, username });
			await router.push(`${DASHBOARD_ROUTE}/food`);
		} catch (error) {
			authErrors.value = getErrorMessage(error);
		} finally {
			isLoadingAuthentication.value = false;
		}
	};

	const handleRegistration = async () => {
		resetErrors();
		isLoadingAuthentication.value = true;

		try {
			const { data: { token } } = await register({
				...authInput,
				calories: caloricDataMultiplied.value.calories,
				...caloricDataMultiplied.value.macrocalories,
			});

			saveAuthToken(token);

			await router.push(DASHBOARD_ROUTE);
		} catch (error) {
			authErrors.value = getErrorMessage(error);
		} finally {
			isLoadingAuthentication.value = false;
		}
	};

	const uploadUserImage = async (image) => {
		try {
			const { data } = await uploadImage(image);

			return data.url;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	return {
		isLoadingAuthentication,
		authErrors,
		authInput,
		handleAuthInput,
		resetAuthInput,
		handleLogin,
		handleRegistration,
		uploadUserImage,
	};
};
