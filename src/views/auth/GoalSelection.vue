<template>
	<div>
		<p class="is-size-2 mb-2">{{ getCurrentMultiplierText }}</p>
		<button
			v-for="(goal, index) in WEEKLY_GOAL"
			:key="goal.gain"
			class="button is-info"
			:class="{
				'is-active': goal.multiplier === gainMultiplier,
				'mr-1': index !== Object.keys(WEEKLY_GOAL).length - 1
			}"
			@click="setGainMultiplier(goal.multiplier)"
		>
			{{ goal.gain }}
		</button>
		<div class="mt-5">
			<button
				@click="setPreviousStep"
				class="button is-primary is-light">Change information
			</button>
			<button
				@click="setNextStep"
				class="button is-primary">Confirm goal
			</button>
		</div>
	</div>
</template>

<script>
import { computed } from 'vue';
import { useCaloryCalculation, WEEKLY_GOAL } from '@/views/auth/useCaloryCalculation';

export default {
	name: 'GoalSelection',
	setup() {
		const {
			gainMultiplier, setGainMultiplier, setNextStep, setPreviousStep,
		} = useCaloryCalculation();

		const getCurrentMultiplierText = computed(
			() => Object.values(WEEKLY_GOAL).find((goal) => goal.multiplier === gainMultiplier.value).text,
		);

		return {
			getCurrentMultiplierText,
			setGainMultiplier,
			gainMultiplier,
			WEEKLY_GOAL,
			setNextStep,
			setPreviousStep,
		};
	},
};
</script>
