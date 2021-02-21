<template>
	<div class="container is-flex is-flex-direction-column is-justify-content-center">
		<ErrorAlert
			:errors="authErrors"
			v-if="authErrors"/>
		<div class="field">
			<label class="label">Email</label>
			<div class="control">
				<input
					class="input"
					name="email"
					type="email"
					placeholder="e.g Alex Smith"
					v-model="authInput.email"
					@input="handleAuthInput"/>
			</div>
		</div>

		<div class="field">
			<label class="label">Password</label>
			<div class="control">
				<input
					class="input"
					name="password"
					type="password"
					placeholder="e.g. alexsmith@gmail.com"
					v-model="authInput.password"/>
			</div>
		</div>

		<button
			class="button is-primary"
			:class="{
				'is-loading': isLoadingAuthentication,
			}"
			@click="handleLogin">Login
		</button>
	</div>
</template>

<script>
import ErrorAlert from '@/components/ErrorAlert.vue';
import { userStore } from '@/store/userStore';

export default {
	components: { ErrorAlert },
	setup() {
		const {
			authInput, handleAuthInput, handleLogin, authErrors, isLoadingAuthentication,
		} = userStore();

		return {
			authErrors,
			isLoadingAuthentication,
			authInput,
			handleAuthInput,
			handleLogin,
		};
	},
};
</script>
<style scoped>
.container {
	height: 100%;
	max-width: 600px;
	padding: 40px;
}
</style>
