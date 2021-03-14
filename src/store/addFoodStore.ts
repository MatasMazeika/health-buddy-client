import {
	reactive,
	ref,
	computed,
	readonly,
} from 'vue';
import { api } from '@/api/api';
import { userDataStore } from '@/store/userDataStore';
import { addFoodApi } from '@/api/foodApi';
import { Meal } from '@/store/interface/mealsInterface';
import { Food, ConsumedFood, TimeOfDay } from '@/store/interface/foodInterface';
import { saveConsumedFoodApi, saveMultipleConsumedFoods } from '@/api/ConsumedFoodApi';

const isLoadingUserFood = ref<boolean>(false);

const foodName = ref('');
const loadedFood = ref([]);

const selectedFood = ref<ConsumedFood>({
	id: null,
	name: '',
	calories: 0,
	protein: 0,
	carbs: 0,
	fat: 0,
	unit: 'gram',
	amount: 0,
	foodId: null,
	timeOfDay: 'breakfast',
});

const selectedMeal = ref<Meal>({
	id: null,
	mealFoods: [],
	mealName: '',
	totalCarbs: 0,
	totalProtein: 0,
	totalFat: 0,
	totalCalories: 0,
	totalAmount: 0,
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

const timeOfDay = ref<TimeOfDay>('breakfast');

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
			calories: Number(Math.round(selectedFood.value.calories * (addFoodData.amount / 100))) || 0,
			protein: Number(Math.round(selectedFood.value.protein * (addFoodData.amount / 100))) || 0,
			carbs: Number(Math.round(selectedFood.value.carbs * (addFoodData.amount / 100))) || 0,
			fat: Number(Math.round(selectedFood.value.fat * (addFoodData.amount / 100))) || 0,
		};
	});

	const selectedFoodPercentages = computed(() => {
		const total = selectedFood.value.protein + selectedFood.value.carbs + selectedFood.value.fat;
		const protein = Math.round((100 * selectedFood.value.protein) / total) || 0;
		const carbs = Math.round((100 * selectedFood.value.carbs) / total) || 0;
		const fat = Math.round((100 * selectedFood.value.fat) / total) || 0;

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

	const selectFood = (food: Food) => {
		addFoodData.amount = food.amount;
		selectedFood.value = {
			...selectedFood.value,
			...food,
		};
	};

	const setSelectedMeal = (meal: Meal) => {
		console.log(meal);
		selectedMeal.value = meal;
	};

	const saveConsumedFood = () => {
		const consumedFood = {
			name: selectedFood.value.name,
			carbs: selectedFoodWithAmount.value.carbs,
			fat: selectedFoodWithAmount.value.fat,
			protein: selectedFoodWithAmount.value.protein,
			calories: selectedFoodWithAmount.value.calories,
			unit: 'gram',
			amount: addFoodData.amount,
			timeOfDay: timeOfDay.value,
			foodId: selectedFood.value.foodId,
		};

		try {
			addFoodToConsumedList(consumedFood);
			saveConsumedFoodApi(consumedFood);
		} catch (error) {
			console.error(error);
		}
	};

	const saveConsumedMeal = async () => {
		const consumedMealFoods = selectedMeal.value.mealFoods.map((mealFood) => ({
			amount: mealFood.amount,
			calories: mealFood.calories,
			carbs: mealFood.carbs,
			fat: mealFood.fat,
			foodId: mealFood.foodId,
			name: mealFood.name,
			protein: mealFood.protein,
			unit: mealFood.unit,
			timeOfDay: timeOfDay.value,
		}));

		try {
			await saveMultipleConsumedFoods(consumedMealFoods);
			consumedMealFoods.forEach((consumedMealFood) => addFoodToConsumedList(consumedMealFood));
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

	return {
		selectFood,
		setSelectedMeal,
		saveConsumedMeal,
		saveConsumedFood,
		addFood,
		timeOfDay,
		selectedMeal,
		enteredFoodPercentages,
		addFoodData,
		selectedFoodWithAmount,
		selectedFood,
		selectedFoodPercentages,
		loadedFood,
		isLoadingUserFood,
		foodName,
	};
};
