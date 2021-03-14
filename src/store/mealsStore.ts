import {
	ref, computed, reactive, watch,
} from 'vue';
import { Meal, MealFood } from '@/store/interface/mealsInterface';
import { createMealApi, getUserMealsApi } from '@/api/mealsApi';
import roundTo from 'round-to';
import debounce from 'lodash.debounce';

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
	foodId: null,
});

const currentAddingMealFoods = ref<MealFood[]>([]);

const mealName = ref<string>('');
const mealSearchText = ref<string>('');

export const mealsStore = () => {
	const isLoadingUserMeals = ref<boolean>(false);

	const currentAddingMealFoodsMultipliedWithAmount = computed(() => currentAddingMealFoods.value.map((mealFood) => ({
		calories: roundTo(mealFood.calories * (mealFood.amount / 100), 2),
		protein: roundTo(mealFood.protein * (mealFood.amount / 100), 2),
		carbs: roundTo(mealFood.carbs * (mealFood.amount / 100), 2),
		fat: roundTo(mealFood.fat * (mealFood.amount / 100), 2),
		unit: mealFood.unit,
		foodId: mealFood.id,
		amount: mealFood.amount,
		name: mealFood.name,
	})));

	const currentAddingMealMicrocaloriesSum = computed(
		() => currentAddingMealFoodsMultipliedWithAmount.value.reduce((acc, curr) => ({
			calories: roundTo(acc.calories + curr.calories, 2),
			protein: roundTo(acc.protein + curr.protein, 2),
			carbs: roundTo(acc.carbs + curr.carbs, 2),
			fat: roundTo(acc.fat + curr.fat, 2),
			amount: roundTo(acc.amount + curr.amount, 2),
		}), {
			calories: 0, protein: 0, carbs: 0, fat: 0, amount: 0,
		}),
	);

	const currentAddingMealMicrocaloriesTotalAmount = computed(() => currentAddingMealMicrocaloriesSum.value.protein
		+ currentAddingMealMicrocaloriesSum.value.carbs
		+ currentAddingMealMicrocaloriesSum.value.fat);

	const currentAddingMealFoodsPercentage = computed(() => {
		const protein = Math.round(
			(100 * currentAddingMealMicrocaloriesSum.value.protein) / currentAddingMealMicrocaloriesTotalAmount.value,
		);
		const carbs = Math.round(
			(100 * currentAddingMealMicrocaloriesSum.value.carbs) / currentAddingMealMicrocaloriesTotalAmount.value,
		);
		const fat = Math.round(
			(100 * currentAddingMealMicrocaloriesSum.value.fat) / currentAddingMealMicrocaloriesTotalAmount.value,
		);

		return {
			protein,
			carbs,
			fat,
		};
	});

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

	const setIsLoadingUserMeals = (value: boolean) => {
		isLoadingUserMeals.value = value;
	};

	const setSelectedMeal = (meal: Meal) => {
		selectedMeal.value = meal;
	};

	const setUserMeals = (meals: Meal[]) => {
		userMeals.value = meals;
	};

	const getUserMeals = debounce(async () => {
		setIsLoadingUserMeals(true);

		try {
			const { data } = await getUserMealsApi(mealSearchText.value);
			console.log(data);

			setUserMeals(data.meals);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoadingUserMeals(false);
		}
	}, 200);

	const createMeal = async () => {
		const createMealData = {
			mealName: mealName.value,
			mealFoods: currentAddingMealFoodsMultipliedWithAmount.value,
			totalAmount: currentAddingMealMicrocaloriesSum.value.amount,
			totalCalories: currentAddingMealMicrocaloriesSum.value.calories,
			totalProtein: currentAddingMealMicrocaloriesSum.value.protein,
			totalFat: currentAddingMealMicrocaloriesSum.value.fat,
			totalCarbs: currentAddingMealMicrocaloriesSum.value.carbs,
		};

		try {
			const { data } = await createMealApi(createMealData);

			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	watch(mealSearchText, () => {
		getUserMeals();
	});

	return {
		userMeals: computed(() => userMeals.value),
		selectedMeal: computed(() => selectedMeal.value),
		mealFoodData,
		currentAddingMealFoodsMultipliedWithAmount,
		currentAddingMealMicrocaloriesSum,
		currentAddingMealFoodsPercentage,
		currentAddingMealFoods,
		mealName,
		mealSearchText,
		isLoadingUserMeals,
		createMeal,
		removeCurrentAddingMealFoodByIndex,
		addFoodToCurrentAddingMealFoods,
		setSelectedMeal,
		getUserMeals,
	};
};
