import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import Dashboard from '@/views/dashboard/Dashboard.vue';
import Workout from '@/views/dashboard/Workout.vue';
import DailyFood from '@/views/dashboard/DailyFood.vue';
import Newsfeed from '@/views/newsfeed/Newsfeed.vue';
import UserSettings from '@/views/settings/UserSettings.vue';
import Creator from '@/views/creator/Creator';

export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';

export const DASHBOARD_ROUTE = '/dashboard';

const routes = [
	{
		path: '/',
		redirect: LOGIN_ROUTE,
	},
	{
		path: LOGIN_ROUTE,
		name: 'Login',
		component: Login,
	},
	{
		path: REGISTER_ROUTE,
		name: 'Register',
		component: Register,
	},
	{
		path: DASHBOARD_ROUTE,
		name: 'Dashboard',
		component: Dashboard,
		children: [{
			path: 'workout',
			component: Workout,
		}, {
			path: 'food',
			component: DailyFood,
		}, {
			path: 'creator',
			component: Creator,
		}, {
			path: 'newsfeed',
			component: Newsfeed,
		},
		{
			path: 'settings',
			component: UserSettings,
		},
		],
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
