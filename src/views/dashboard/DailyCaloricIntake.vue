<template>
	<div class="has-text-left">

		<p class="is-size-4 has-text-left mb-4">Calories:
			{{ totalConsumedUserCaloricData.calories }}
			/ {{ userCaloricData.calories }}
		</p>
		<label class="label macro-label">
			Protein {{ totalConsumedUserCaloricData.protein }}
			/
			{{ userCaloricData.protein }} g
			<span class="has-text-primary ml-2">({{ dailyMacrocaloriesConsumedPercentages.protein }}%)</span></label>
		<progress
			class="progress is-small is-primary"
			:value="dailyMacrocaloriesConsumedPercentages.protein"
			max="100">20%
		</progress>
		<label class="label macro-label">Carbohydrates {{ userCaloricData.carbs }}g
			<span class="has-text-info ml-2">({{ dailyMacrocaloriesConsumedPercentages.carbs }}%)</span></label>
		<progress
			class="progress is-small is-info"
			:value="dailyMacrocaloriesConsumedPercentages.carbs"
			max="100">20%
		</progress>
		<label class="label macro-label">Fat {{ userCaloricData.fat }}g
			<span class="has-text-danger ml-2">({{ dailyMacrocaloriesConsumedPercentages.fat }}%)</span></label>
		<progress
			class="progress is-small is-danger"
			:value="dailyMacrocaloriesConsumedPercentages.fat"
			max="100">20%
		</progress>
	</div>
</template>

<script>
import { ref, defineComponent, computed } from 'vue';
import { userDataStore } from '@/store/userDataStore';

export default defineComponent({
	name: 'DailyCaloricIntake',
	setup() {
		const { totalConsumedUserCaloricData, userCaloricData } = userDataStore();

		const dailyMacrocaloriesConsumedPercentages = computed(() => {
			const protein = Math
				.round((100 * totalConsumedUserCaloricData.value.protein) / userCaloricData.value.protein);
			const carbs = Math.round((100 * totalConsumedUserCaloricData.value.carbs) / userCaloricData.value.carbs);
			const fat = Math.round((100 * totalConsumedUserCaloricData.value.fat) / userCaloricData.value.fat);

			return {
				protein,
				carbs,
				fat,
			};
		});

		return {
			userCaloricData,
			totalConsumedUserCaloricData,
			dailyMacrocaloriesConsumedPercentages,
		};
	},
});
</script>
