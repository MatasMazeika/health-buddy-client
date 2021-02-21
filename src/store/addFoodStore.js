import {
	reactive,
	ref,
	watch,
	computed,
} from 'vue';
import { api } from '@/api/api';
import debounce from 'lodash.debounce';
import { userDataStore } from '@/store/userDataStore';

const FOOD_API = `${process.env.VUE_APP_API_URL}/food`;
const CONSUMED_FOOD_API = `${process.env.VUE_APP_API_URL}/consumed-food`;

export const getFood = (search) => api.get(`${FOOD_API}?search=${search}`);

export const saveConsumedFood = (food) => api.post(CONSUMED_FOOD_API, food);

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

const selectedAmount = ref(100);

export const addFoodStore = () => {
	const { addFoodToConsumedList } = userDataStore();

	const selectedFoodWithAmount = computed(() => ({
		calories: Math.round(selectedFood.value.calories * (selectedAmount.value / 100)),
		protein: Math.round(selectedFood.value.protein * (selectedAmount.value / 100)),
		carbs: Math.round(selectedFood.value.carbs * (selectedAmount.value / 100)),
		fat: Math.round(selectedFood.value.fat * (selectedAmount.value / 100)),
	}));

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

	const uniqueLoadedFood = computed(() => [...new Map(loadedFood.value.map((item) => [item.name, item])).values()]);

	const setLoadingFood = (value) => {
		isLoadingUserFood.value = value;
	};

	const addFoodToList = (food) => {
		loadedFood.value = [...loadedFood.value, ...food];
	};

	const selectFood = (food) => {
		console.log(food);
		selectedFood.value = {
			...selectedFood.value,
			...food,
		};
	};

	const searchFood = debounce(async () => {
		setLoadingFood(true);

		try {
			const { data } = await getFood(foodName.value);

			addFoodToList(data.food);
		} catch (error) {
			console.log(error);
		} finally {
			setLoadingFood(false);
		}
	}, 600);

	const saveFood = () => {
		const consumedFood = {
			name: selectedFood.value.name,
			carbs: selectedFoodWithAmount.value.carbs,
			fat: selectedFoodWithAmount.value.fat,
			protein: selectedFoodWithAmount.value.protein,
			calories: selectedFoodWithAmount.value.calories,
			unit: 'gram',
			amount: selectedAmount.value,
			timeOfDay: selectedFood.value.timeOfDay,
			foodId: selectedFood.value.id,
		};

		try {
			addFoodToConsumedList(consumedFood);
			saveConsumedFood(consumedFood);
		} catch (error) {
			console.log(error);
		}
	};

	watch(foodName, () => {
		searchFood();
	});

	return {
		selectFood,
		saveFood,
		selectedFoodWithAmount,
		selectedAmount,
		selectedFood,
		selectedFoodPercentages,
		uniqueLoadedFood,
		searchFood,
		loadedFood,
		isLoadingUserFood,
		foodName,
	};
};
