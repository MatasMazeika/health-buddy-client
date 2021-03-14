import { ConsumedFood } from '@/store/interface/foodInterface';
import { api } from '@/api/api';

const CONSUMED_FOOD_API = `${process.env.VUE_APP_API_URL}/consumed-food`;

const SAVE_CONSUMED_MEAL_API = `${process.env.VUE_APP_API_URL}/consumed-food/multiple`;

export const saveConsumedFoodApi = (food: ConsumedFood) => api.post(CONSUMED_FOOD_API, food);

export const saveMultipleConsumedFoods = (foods: ConsumedFood[]) => api.post(SAVE_CONSUMED_MEAL_API, { foods });
