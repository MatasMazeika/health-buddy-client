<template>
	<FullScreenLoader v-if="isLoadingUserData"/>
	<template v-else>
		<Navigation/>
		<router-view />
	</template>
</template>

<script>
import { userDataStore } from '@/store/userDataStore';
import FullScreenLoader from '@/components/FullScreenLoader.vue';
import Navigation from '@/views/dashboard/Navigation.vue';

export default {
	name: 'Dashboard',
	components: {
		Navigation, FullScreenLoader,
	},
	setup() {
		const {
			initUser,
			isLoadingUserData,
		} = userDataStore();

		initUser();

		return {
			isLoadingUserData,
		};
	},
};
</script>
