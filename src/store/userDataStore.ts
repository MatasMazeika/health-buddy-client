import { reactive, ref, computed } from 'vue';
import { api } from '@/api/api';
import { getStartAndEndTimeOfToday } from '@/views/utils/time';
import { ConsumedFood, ConsumedUserFood } from '@/store/interface/foodInterface';
import { exerciseStore } from './exerciseStore';

const USER_API = `${process.env.VUE_APP_API_URL}/user-data`;
const CONSUMED_FOOD_API = `${process.env.VUE_APP_API_URL}/consumed-food`;

const INITIATE_USER_API = `${USER_API}/initiate`;

interface UserDetails {
	username: string,
	email: string,
	avatar: string
}

interface UserCaloricData {
	carbs: number
	fat: number
	protein: number
	calories: number
}

interface StartEndDate {
	startDate: any,
	endDate: any,
}

export const getInitiationUserData = ({ startDate, endDate }: StartEndDate) => api.post(INITIATE_USER_API, {
	startDate,
	endDate,
});

export const getConsumedFood = ({ startDate, endDate }: StartEndDate) => api.get(CONSUMED_FOOD_API, {
	params: {
		startDate,
		endDate,
	},
});

const userDetails = ref<UserDetails>({
	username: '',
	email: '',
	avatar: '',
});

const userCaloricData = ref<UserCaloricData>({
	carbs: 0,
	fat: 0,
	protein: 0,
	calories: 0,
});

const consumedUserFood = ref<ConsumedUserFood>({
	breakfast: [],
	lunch: [],
	supper: [],
	snacks: [],
});

const isLoadingUserData = ref(false);

export const userDataStore = () => {
	const { setDayExercises } = exerciseStore();
	const totalConsumedUserCaloricData = computed(() => {
		const allFood = Object
			.keys(consumedUserFood.value)
			// @ts-ignore
			.flatMap((key: any) => Object.values(consumedUserFood.value[key]));

		// @ts-ignore
		return allFood.reduce((curr: ConsumedFood, acc: UserCaloricData) => ({
			carbs: acc.carbs + curr.carbs,
			fat: acc.fat + curr.fat,
			protein: acc.protein + curr.protein,
			calories: acc.calories + curr.calories,
		}), {
			carbs: 0, fat: 0, protein: 0, calories: 0,
		});
	});

	const setConsumedUserFood = (consumedFood: ConsumedFood[]) => {
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

	const setUserDetails = (details: UserDetails) => {
		userDetails.value = { ...details };
	};

	const setUserCaloricData = (caloricData: UserCaloricData) => {
		userCaloricData.value = { ...caloricData };
	};

	const addFoodToConsumedList = (food: ConsumedFood) => {
		consumedUserFood.value[food.timeOfDay] = [...consumedUserFood.value[food.timeOfDay], food];
	};

	const initUser = async () => {
		const { startDate, endDate } = getStartAndEndTimeOfToday();

		isLoadingUserData.value = true;

		try {
			const {
				data: {
					consumedFood, username, email, avatar, carbs, fat, protein, calories, dailyExercises,
				},
			} = await getInitiationUserData({
				startDate,
				endDate,
			});

			setConsumedUserFood(consumedFood);
			setUserDetails({ username, email, avatar });
			setUserCaloricData({
				carbs, fat, protein, calories,
			});
			setDayExercises(dailyExercises);
		} catch (error) {
			console.log(error);
		} finally {
			isLoadingUserData.value = false;
		}
	};

	const getUserFood = async (startDate: any, endDate: any) => {
		try {
			const {
				data: { consumedFood },
			} = await getConsumedFood({ startDate, endDate });

			resetUserFood();
			setConsumedUserFood(consumedFood);
		} catch (error) {
			console.log(error);
		}
	};

	return {
		isLoadingUserData,
		initUser,
		userDetails,
		userCaloricData,
		consumedUserFood,
		totalConsumedUserCaloricData,
		setUserDetails,
		getUserFood,
		addFoodToConsumedList,
	};
};
