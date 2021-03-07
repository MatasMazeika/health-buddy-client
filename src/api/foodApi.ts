import { api } from '@/api/api';
import { Food } from '@/store/interface/foodInterface';

const FOOD_API = `${process.env.VUE_APP_API_URL}/food`;

export const addFoodApi = (food: Food) => api.post(FOOD_API, food);

export const getFoodsApi = (food: string) => api.get(`${FOOD_API}?search=${food}`);
