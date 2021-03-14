<template>
	<div class="is-flex is-flex-direction-column has-text-left">
		<div class="field mr-2 is-fullwidth mb-4">
			<label class="label">Name</label>
			<input
				class="input"
				placeholder="Food name"
				v-model.number="addFoodData.name"
			>
		</div>
		<div class="is-flex is-justify-content-center mb-4">
			<div class="control has-icons-right amount-input mr-2">
				<label class="label">Calories</label>
				<input
					class="input"
					placeholder="Total consume amount"
					v-model.number="addFoodData.calories"
				>
				<span class="icon is-small gram-input-postfix">g.</span>
			</div>
			<div class="control has-icons-right amount-input mr-2">
				<label class="label">Carbs</label>
				<input
					class="input"
					placeholder="Total consume amount"
					v-model.number="addFoodData.carbs"
				>
				<span class="icon is-small gram-input-postfix">g.</span>
			</div>
			<div class="control has-icons-right amount-input mr-2">
				<label class="label">Protein</label>
				<input
					class="input"
					placeholder="Protein amount"
					v-model.number="addFoodData.protein"
				>
				<span class="icon is-small gram-input-postfix">g.</span>
			</div>
			<div class="field mr-2">
				<div class="control has-icons-right amount-input">
					<label class="label">Fat</label>
					<input
						class="input"
						placeholder="Fats amount"
						v-model.number="addFoodData.fat"
					>
					<span class="icon is-small gram-input-postfix">g.</span>
				</div>
			</div>
			<div class="control has-icons-right amount-input">
				<label class="label">Amount</label>
				<input
					class="input"
					placeholder="Carbohydrates amount"
					v-model.number="addFoodData.amount"
				>
				<span class="icon is-small gram-input-postfix">g.</span>
			</div>
		</div>
		<div>
			<label class="label macro-label">Protein {{ addFoodData.protein }}g
				<span class="has-text-primary ml-2">({{ enteredFoodPercentages.protein }}%)</span></label>
			<progress
				class="progress is-small is-primary"
				:value="enteredFoodPercentages.protein"
				max="100">
			</progress>
			<label class="label macro-label">Carbohydrates {{ addFoodData.carbs }}g
				<span class="has-text-info ml-2">({{ enteredFoodPercentages.carbs }}%)</span></label>
			<progress
				class="progress is-small is-info"
				:value="enteredFoodPercentages.carbs"
				max="100">
			</progress>
			<label class="label macro-label">Fat {{ addFoodData.fat }}g
				<span class="has-text-danger ml-2">({{ enteredFoodPercentages.fat }}%)</span></label>
			<progress
				class="progress is-small is-danger"
				:value="enteredFoodPercentages.fat"
				max="100">
			</progress>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { addFoodStore } from '@/store/addFoodStore';

export default defineComponent({
	setup() {
		const { addFoodData, enteredFoodPercentages, selectedFoodWithAmount } = addFoodStore();

		return {
			addFoodData,
			enteredFoodPercentages,
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
