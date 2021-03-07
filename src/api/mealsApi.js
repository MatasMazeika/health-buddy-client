import { api } from '@/api/api';

const MEALS_API = `${process.env.VUE_APP_API_URL}/meals`;

export const getUserMealsApi = () => api.get(MEALS_API);

export const createMealApi = (meal) => api.post(MEALS_API, meal);
