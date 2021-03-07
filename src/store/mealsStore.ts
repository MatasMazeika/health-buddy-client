import { ref, computed, reactive } from 'vue';
import { Meal, MealFood } from '@/store/interface/mealsInterface';
import { createMealApi, getUserMealsApi } from '@/api/mealsApi';
import roundTo from 'round-to';

const userMeals = ref<Meal[]>([]);

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

const mealFoodData = reactive<MealFood>({
	id: null,
	name: '',
	carbs: 0,
	fat: 0,
	protein: 0,
	calories: 0,
	unit: 'gram',
	amount: 0,
});

const currentAddingMealFoods = ref<MealFood[]>([]);

const mealName = ref<string>('');

export const mealsStore = () => {
	const currentAddingMealFoodsMultipliedWithAmount = computed(() => currentAddingMealFoods.value.map((mealFood) => ({
		calories: roundTo(mealFood.calories * (mealFood.amount / 100), 2),
		protein: roundTo(mealFood.protein * (mealFood.amount / 100), 2),
		carbs: roundTo(mealFood.carbs * (mealFood.amount / 100), 2),
		fat: roundTo(mealFood.fat * (mealFood.amount / 100), 2),
	})));

	const currentAddingMealMicrocaloriesSum = computed(
		() => currentAddingMealFoodsMultipliedWithAmount.value.reduce((acc, curr) => ({
			calories: roundTo(acc.calories + curr.calories, 2),
			protein: roundTo(acc.protein + curr.protein, 2),
			carbs: roundTo(acc.carbs + curr.carbs, 2),
			fat: roundTo(acc.fat + curr.fat, 2),
		}), {
			calories: 0, protein: 0, carbs: 0, fat: 0,
		}),
	);

	const currentAddingMealFoodsPercentage = computed(() => {
		const total = currentAddingMealMicrocaloriesSum.value.protein
			+ currentAddingMealMicrocaloriesSum.value.carbs
			+ currentAddingMealMicrocaloriesSum.value.fat;
		const protein = Math.round((100 * currentAddingMealMicrocaloriesSum.value.protein) / total);
		const carbs = Math.round((100 * currentAddingMealMicrocaloriesSum.value.carbs) / total);
		const fat = Math.round((100 * currentAddingMealMicrocaloriesSum.value.fat) / total);

		return {
			protein,
			carbs,
			fat,
		};
	});

	const isUserMealsAdded = computed(() => userMeals.value.length > 0);

	const addFoodToCurrentAddingMealFoods = (mealFood: MealFood) => {
		console.log(mealFood);
		currentAddingMealFoods.value.push(mealFood);
	};

	const removeCurrentAddingMealFoodByIndex = (index: number) => {
		currentAddingMealFoods.value.splice(index, 1);
	};

	const resetCurrentAddingFoods = () => {
		currentAddingMealFoods.value = [];
	};
	const resetCurrentAddingMealFoodData = () => {
		currentAddingMealFoods.value = {
			// @ts-ignore
			id: null,
			name: '',
			carbs: 0,
			fat: 0,
			protein: 0,
			calories: 0,
			unit: 'gram',
			amount: 0,
		};
	};

	const setSelectedMeal = (meal: Meal) => {
		selectedMeal.value = meal;
	};

	const setUserMeals = (meals: Meal[]) => {
		userMeals.value = meals;
	};

	const getUserMeals = async () => {
		if (isUserMealsAdded.value) {
			return;
		}

		try {
			const { data } = await getUserMealsApi();
			console.log(data);

			setUserMeals(data.meals);
		} catch (error) {
			console.error(error);
		}
	};

	const createMeal = async () => {
		const createMealData = {
			mealName: mealName.value,
			mealFoods: currentAddingMealFoods.value,
		};

		try {
			const { data } = await createMealApi(createMealData);

			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	return {
		userMeals: computed(() => userMeals.value),
		selectedMeal: computed(() => selectedMeal.value),
		mealFoodData,
		currentAddingMealFoodsMultipliedWithAmount,
		currentAddingMealMicrocaloriesSum,
		currentAddingMealFoodsPercentage,
		currentAddingMealFoods,
		mealName,
		createMeal,
		removeCurrentAddingMealFoodByIndex,
		addFoodToCurrentAddingMealFoods,
		setSelectedMeal,
		getUserMeals,
	};
};
