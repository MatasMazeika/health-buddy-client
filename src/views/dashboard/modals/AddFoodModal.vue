<template>
	<div
		class="modal is-active">
		<div class="modal-background"></div>
		<div class="modal-content">
			<div class="box">
				<label class="label has-text-left">Enter food:</label>
				<input
					class="input is-normal"
					:class="{
					'is-loading': isLoadingUserFood
					}"
					type="text"
					placeholder="Enter food name"
					v-model.trim="foodName"
				>
				<div class="mt-2 mb-6">
					<p
						v-for="food in uniqueLoadedFood"
						:key="`${food.name}${food.calories}`"
						class="food p-2 has-text-left"
						@click="selectFood(food)"
					>
						{{ food.name }} <span>{{ food.calories }}</span>
					</p>
				</div>
				<div class="columns">
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
					<div
						class="
						column
						is-flex
						is-flex-direction-column
						is-justify-content-center
						is-align-items-flex-start
						"
					>
						<div class="control has-icons-right amount-input">
							<input
								class="input"
								type="number"
								placeholder="Amount in grams"
								v-model.number="selectedAmount"
							>
							<span class="icon is-small gram-input-postfix">g.</span>
						</div>
						<button
							class="button is-info mt-2"
							@click="handleFoodAdd"
						>
							<span class="icon is-small">
								<i class="fas fa-check"></i>
							</span>
							<span>Add</span>
						</button>
					</div>
				</div>
			</div>
		</div>
		<button
			class="modal-close is-large"
			aria-label="close"
			@click="$emit('close')"
		/>
	</div>
</template>

<script>
import { addFoodStore } from '@/store/addFoodStore';

export default {
	props: {
		isOpen: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {
		const {
			saveFood,
			uniqueLoadedFood,
			foodName,
			loadedFood,
			isLoadingUserFood,
			selectFood,
			selectedFood,
			selectedFoodPercentages,
			selectedFoodWithAmount,
			selectedAmount,
		} = addFoodStore();

		const handleFoodAdd = () => {
			saveFood();
			emit('close');
		};

		return {
			handleFoodAdd,
			saveFood,
			uniqueLoadedFood,
			foodName,
			loadedFood,
			isLoadingUserFood,
			selectFood,
			selectedFood,
			selectedFoodPercentages,
			selectedFoodWithAmount,
			selectedAmount,
		};
	},
};
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
