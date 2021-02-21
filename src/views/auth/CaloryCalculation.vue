<template>
	<div>
		<div class="field">
			<div class="control">
				<label class="label">Sex</label>
				<label class="radio">
					<input
						type="radio"
						value="male"
						v-model="calculationData.sex"
						:checked="calculationData.sex === 'male'"
					>
					Male
				</label>
				<label class="radio">
					<input
						type="radio"
						value="female"
						v-model="calculationData.sex"
					>
					Female
				</label>
			</div>
		</div>
		<div class="field">
			<label class="label">Weight</label>
			<div class="control">
				<input
					class="input"
					type="text"
					placeholder="Enter your weight"
					v-model.number.trim="calculationData.weight"
				>
			</div>
		</div>
		<div class="field">
			<label class="label">Height</label>
			<div class="control">
				<input
					class="input"
					type="text"
					placeholder="Enter your height"
					v-model.number.trim="calculationData.height"
				>
			</div>
		</div>
		<div class="field">
			<label class="label">Age</label>
			<div class="control">
				<input
					class="input"
					type="text"
					placeholder="Enter your age"
					v-model.number.trim="calculationData.age"
				>
			</div>
		</div>
		<div class="field">
			<label class="label">Physical activity</label>
			<div class="control">
				<div class="select">
					<select v-model="calculationData.activity">
						<option
							v-for="(activity) in ACTIVITIES"
							:key="activity.title"
							:value="activity.value"
							selected
						>
							{{ activity.title }}
						</option>
					</select>
				</div>
			</div>
		</div>
		<button
			class="button is-primary"
			@click="handleCaloryCalculation(), setNextStep()">Calculate calories
		</button>
	</div>
</template>

<script>
import { ACTIVITIES, useCaloryCalculation } from '@/views/auth/useCaloryCalculation';

export default {
	name: 'CaloryCalculation',
	setup() {
		const {
			step,
			calculationData,
			setCalculationData,
			setNextStep,
			setPreviousStep,
			handleCaloryCalculation,
		} = useCaloryCalculation();

		return {
			step,
			calculationData,
			setCalculationData,
			setNextStep,
			setPreviousStep,
			handleCaloryCalculation,
			ACTIVITIES,
		};
	},
};
</script>

<style scoped>
.field {
	text-align: left;
}
</style>
