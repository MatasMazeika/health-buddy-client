<template>
	<div class="container is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
		<ErrorAlert :errors="authErrors"/>
		<div v-if="currentStep === 1 || currentStep === 2">
			<p class="is-size-5 mb-3"><strong>Calories: </strong> {{ caloricDataMultiplied.calories }}</p>
			<div class="is-flex mb-3">
				<p class="is-size-5 mr-5"><strong>Protein: </strong> {{ caloricDataMultiplied.macrocalories.protein }}g.
				</p>
				<p class="is-size-5 mr-5"><strong>Carbohydrates: </strong> {{
						caloricDataMultiplied.macrocalories.carbs
					}}g.</p>
				<p class="is-size-5"><strong>Fats: </strong> {{ caloricDataMultiplied.macrocalories.fat }}g.</p>
			</div>
		</div>
		<CaloryCalculation v-if="currentStep  === 0"/>
		<GoalSelection v-if="currentStep === 1"/>
		<div v-if="currentStep === 2">
			<div class="field">
				<label class="label">username</label>
				<div class="control">
					<input
						class="input"
						type="text"
						placeholder="username"
						v-model.trim="authInput.username"
					>
				</div>
			</div>
			<div class="field">
				<label class="label">Email</label>
				<div class="control">
					<input
						class="input"
						type="email"
						placeholder="Email"
						v-model.trim="authInput.email"
					>
				</div>
			</div>
			<div class="field">
				<label class="label">Password</label>
				<div class="control">
					<input
						class="input"
						type="password"
						placeholder="Password"
						v-model.trim="authInput.password"
					/>
				</div>
			</div>
			<button
				class="button is-primary"
				:class="{
				'is-loading': isLoadingAuthentication,
			}"
				@click="handleRegistration">Register
			</button>
		</div>
	</div>
</template>

<script>
import { userStore } from '@/store/userStore';
import CaloryCalculation from '@/views/auth/CaloryCalculation.vue';
import ErrorAlert from '@/components/ErrorAlert.vue';
import { useCaloryCalculation } from '@/views/auth/useCaloryCalculation';
import GoalSelection from '@/views/auth/GoalSelection.vue';

export default {
	components: { GoalSelection, ErrorAlert, CaloryCalculation },
	setup() {
		const {
			authErrors, authInput, handleAuthInput, isLoadingAuthentication, handleRegistration,
		} = userStore();
		const {
			caloricDataMultiplied, currentStep, dailyCaloricData, hasCalculatedCalories, setNextStep, setPreviousStep,
		} = useCaloryCalculation();

		return {
			caloricDataMultiplied,
			currentStep,
			authErrors,
			isLoadingAuthentication,
			hasCalculatedCalories,
			dailyCaloricData,
			authInput,
			handleAuthInput,
			handleRegistration,
			setNextStep,
			setPreviousStep,
		};
	},
};
</script>

<style scoped>
.container {
	height: 100%;
}
</style>
