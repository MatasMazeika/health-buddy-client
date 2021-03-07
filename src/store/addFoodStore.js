import {
	reactive,
	ref,
	watch,
	computed,
	readonly,
} from 'vue';
import { api } from '@/api/api';
import debounce from 'lodash.debounce';
import { userDataStore } from '@/store/userDataStore';
import { addFoodApi } from '@/api/foodApi';

const FOOD_API = `${process.env.VUE_APP_API_URL}/food`;
const CONSUMED_FOOD_API = `${process.env.VUE_APP_API_URL}/consumed-food`;

export const getFoodApi = (search) => api.get(`${FOOD_API}?search=${search}`);

export const saveConsumedFoodApi = (food) => api.post(CONSUMED_FOOD_API, food);

const isLoadingUserFood = ref(false);

const foodName = ref('');
const loadedFood = ref([]);
const selectedFood = ref({
	name: null,
	calories: null,
	protein: null,
	carbs: null,
	fat: null,
	unit: 'gram',
	amount: null,
	timeOfDay: null,
});

const addFoodData = reactive({
	name: '',
	carbs: 0,
	protein: 0,
	fat: 0,
	amount: 0,
	calories: 0,
	unit: 'gram',
});

export const addFoodStore = () => {
	const { addFoodToConsumedList } = userDataStore();

	const selectedFoodWithAmount = computed(() => {
		console.log({
			calories: Math.round(selectedFood.value.calories * (addFoodData.amount / 100)),
			protein: Math.round(selectedFood.value.protein * (addFoodData.amount / 100)),
			carbs: Math.round(selectedFood.value.carbs * (addFoodData.amount / 100)),
			fat: Math.round(selectedFood.value.fat * (addFoodData.amount / 100)),
		});

		return {
			calories: Math.round(selectedFood.value.calories * (addFoodData.amount / 100)),
			protein: Math.round(selectedFood.value.protein * (addFoodData.amount / 100)),
			carbs: Math.round(selectedFood.value.carbs * (addFoodData.amount / 100)),
			fat: Math.round(selectedFood.value.fat * (addFoodData.amount / 100)),
		};
	});

	const selectedFoodPercentages = computed(() => {
		const total = selectedFood.value.protein + selectedFood.value.carbs + selectedFood.value.fat;
		const protein = Math.round((100 * selectedFood.value.protein) / total);
		const carbs = Math.round((100 * selectedFood.value.carbs) / total);
		const fat = Math.round((100 * selectedFood.value.fat) / total);

		return {
			protein,
			carbs,
			fat,
		};
	});

	const enteredFoodPercentages = computed(() => {
		const total = addFoodData.protein + addFoodData.carbs + addFoodData.fat;
		const protein = Math.round((100 * addFoodData.protein) / total) || 0;
		const carbs = Math.round((100 * addFoodData.carbs) / total) || 0;
		const fat = Math.round((100 * addFoodData.fat) / total) || 0;
		console.log(protein);

		return {
			protein,
			carbs,
			fat,
		};
	});

	const uniqueLoadedFood = computed(() => [...new Map(loadedFood.value.map((item) => [item.name, item])).values()]);

	const setLoadingFood = (value) => {
		isLoadingUserFood.value = value;
	};

	const addFoodToList = (food) => {
		loadedFood.value = [...loadedFood.value, ...food];
	};

	const selectFood = (food) => {
		addFoodData.amount = food.amount;
		selectedFood.value = {
			...selectedFood.value,
			...food,
		};
	};

	const searchFood = debounce(async () => {
		setLoadingFood(true);

		try {
			const { data } = await getFoodApi(foodName.value);

			addFoodToList(data.food);
		} catch (error) {
			console.error(error);
		} finally {
			setLoadingFood(false);
		}
	}, 600);

	const saveConsumedFood = () => {
		const consumedFood = {
			name: selectedFood.value.name,
			carbs: selectedFoodWithAmount.value.carbs,
			fat: selectedFoodWithAmount.value.fat,
			protein: selectedFoodWithAmount.value.protein,
			calories: selectedFoodWithAmount.value.calories,
			unit: 'gram',
			amount: addFoodData.amount,
			timeOfDay: selectedFood.value.timeOfDay,
			foodId: selectedFood.value.id,
		};

		try {
			addFoodToConsumedList(consumedFood);
			saveConsumedFoodApi(consumedFood);
		} catch (error) {
			console.error(error);
		}
	};

	const addFood = async () => {
		const foodToAdd = readonly(addFoodData);

		try {
			const { data } = await addFoodApi(foodToAdd);

			await selectFood(data.food);
			saveConsumedFood();
		} catch (error) {
			console.error(error);
		}
	};

	watch(foodName, () => {
		searchFood();
	});

	return {
		selectFood,
		saveConsumedFood,
		addFood,
		enteredFoodPercentages,
		addFoodData,
		selectedFoodWithAmount,
		selectedFood,
		selectedFoodPercentages,
		uniqueLoadedFood,
		searchFood,
		loadedFood,
		isLoadingUserFood,
		foodName,
	};
};
