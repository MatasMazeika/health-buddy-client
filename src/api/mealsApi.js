import { api } from '@/api/api';

const MEALS_API = `${process.env.VUE_APP_API_URL}/meals`;

export const getUserMealsApi = (search) => api.get(`${MEALS_API}?search=${search}`);

export const createMealApi = (meal) => api.post(MEALS_API, meal);
