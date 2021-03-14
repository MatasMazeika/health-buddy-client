import { ref, watch } from 'vue';
import { getFoodsApi } from '@/api/foodApi';
import { Food } from '@/store/interface/foodInterface';
import debounce from 'lodash.debounce';

export const foodStore = () => {
	const foodList = ref<Food[]>([]);
	const isLoadingFood = ref<boolean>(false);
	const foodSearch = ref<string>('');

	const setFood = (newFood: Food[]) => {
		foodList.value = newFood;
	};

	const setIsLoadingFood = (value: boolean) => {
		isLoadingFood.value = value;
	};

	const getFood = debounce(async (foodName: string = '') => {
		setIsLoadingFood(true);

		try {
			const { data } = await getFoodsApi(foodName);

			setFood(data.results.hits.hits);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoadingFood(false);
		}
	}, 200);

	watch(foodSearch, () => {
		getFood(foodSearch.value);
	});

	return {
		foodList,
		isLoadingFood,
		foodSearch,
		getFood,
	};
};
