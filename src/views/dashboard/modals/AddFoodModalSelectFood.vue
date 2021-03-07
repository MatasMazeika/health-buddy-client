<template>
	<div class="column">
		<p class="has-text-left mb-2">Total calories: {{ selectedFoodWithAmount.calories }}</p>
		<label class="label macro-label">Protein {{ selectedFoodWithAmount.protein }}g
			<span class="has-text-primary ml-2">({{ selectedFoodPercentages.protein }}%)</span></label>
		<progress
			class="progress is-small is-primary"
			:value="selectedFoodPercentages.protein"
			max="100">20%
		</progress>
		<label class="label macro-label">Carbohydrates {{ selectedFoodWithAmount.carbs }}g
			<span class="has-text-info ml-2">({{ selectedFoodPercentages.carbs }}%)</span></label>
		<progress
			class="progress is-small is-info"
			:value="selectedFoodPercentages.carbs"
			max="100">20%
		</progress>
		<label class="label macro-label">Fat {{ selectedFoodWithAmount.fat }}g
			<span class="has-text-danger ml-2">({{ selectedFoodPercentages.fat }}%)</span></label>
		<progress
			class="progress is-small is-danger"
			:value="selectedFoodPercentages.fat"
			max="100">20%
		</progress>
	</div>
	<div class="column is-flex is-flex-direction-column is-justify-content-center is-align-items-flex-start">
		<div class="control has-icons-right amount-input">
			<input
				class="input"
				type="number"
				placeholder="Amount in grams"
				v-model.number="addFoodData.amount"
			>
			<span class="icon is-small gram-input-postfix">g.</span>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { addFoodStore } from '@/store/addFoodStore';

export default defineComponent({
	setup() {
		const { addFoodData, selectedFoodPercentages, selectedFoodWithAmount } = addFoodStore();
		return {
			addFoodData,
			selectedFoodPercentages,
			selectedFoodWithAmount,
		};
	},
});
</script>

<style scoped lang="scss">
.food {
	cursor: pointer;

	&:hover {
		background-color: aliceblue;
	}
}

.macro-label {
	font-size: 0.7rem;
	text-align: left;
}

.progress {
	margin-bottom: 1rem;

	&.is-small {
		height: 0.3rem;
	}
}

.gram-input-postfix {
	color: black;
	right: 10px;
}

.amount-input {
	max-width: 125px;
}
</style>
