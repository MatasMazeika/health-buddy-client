import { reactive, ref } from 'vue';
import { api } from '@/api/api';
import { getStartAndEndTimeOfToday } from '@/views/utils/time';

const USER_API = `${process.env.VUE_APP_API_URL}/user-data`;
const CONSUMED_FOOD_API = `${process.env.VUE_APP_API_URL}/consumed-food`;

const INITIATE_USER_API = `${USER_API}/initiate`;

export const getInitiationUserData = ({ startDate, endDate }) => api.post(INITIATE_USER_API, {
	startDate,
	endDate,
});

export const getConsumedFood = ({ startDate, endDate }) => api.get(CONSUMED_FOOD_API, {
	params: {
		startDate,
		endDate,
	},
});

const userDetails = ref({
	username: '',
	email: '',
	avatar: '',
});

const consumedUserFood = ref({
	breakfast: [],
	lunch: [],
	supper: [],
	snacks: [],
});

const isLoadingUserData = ref(false);

export const userDataStore = () => {
	const setConsumedUserFood = (consumedFood) => {
		consumedFood.forEach((food) => {
			consumedUserFood.value[food.timeOfDay] = [...consumedUserFood.value[food.timeOfDay], food];
		});
	};

	const resetUserFood = () => {
		consumedUserFood.value = {
			breakfast: [],
			lunch: [],
			supper: [],
			snacks: [],
		};
	};

	const setConsumedFood = (consumedFood) => {
		setConsumedUserFood(consumedFood);
	};

	const setUserDetails = (details) => {
		console.log(details);
		userDetails.value = { ...details };
	};

	const addFoodToConsumedList = (food) => {
		consumedUserFood.value[food.timeOfDay] = [...consumedUserFood.value[food.timeOfDay], food];
	};

	const initUser = async () => {
		const { startDate, endDate } = getStartAndEndTimeOfToday();
		isLoadingUserData.value = true;

		try {
			const {
				data: {
					consumedFood, username, email, avatar,
				},
			} = await getInitiationUserData({
				startDate,
				endDate,
			});

			setConsumedFood(consumedFood);
			setUserDetails({ username, email, avatar });
		} catch (error) {
			console.log(error);
		} finally {
			isLoadingUserData.value = false;
		}
	};

	const getUserFood = async (startDate, endDate) => {
		try {
			const {
				data: { consumedFood },
			} = await getConsumedFood({ startDate, endDate });

			resetUserFood();
			setConsumedUserFood(consumedFood);
		} catch (error) {
			console.log(error);
		} finally {
			console.log('loaded');
		}
	};

	return {
		isLoadingUserData,
		initUser,
		userDetails,
		consumedUserFood,
		setUserDetails,
		getUserFood,
		setConsumedFood,
		addFoodToConsumedList,
	};
};
