<template>
	<div
		class="modal is-active">
		<div class="modal-background"></div>
		<div class="modal-content box">
			<FoodSearch @select-food="addFoodToCurrentAddingMealFoods($event)"/>
			<div class="is-flex is-flex-direction-column has-text-left">
				<div v-if="isAddNewFoodInputVisible">
					<div class="field mr-2 is-fullwidth mb-4">
						<label class="label">Name</label>
						<input
							class="input"
							placeholder="Food name"
							v-model.number="mealFoodData.name"
						>
					</div>
					<div class="is-flex is-justify-content-center mb-4">
						<div class="control has-icons-right amount-input mr-2">
							<label class="label">Calories</label>
							<input
								class="input"
								placeholder="Total consume amount"
								v-model.number="mealFoodData.calories"
							>
							<span class="icon is-small gram-input-postfix">g.</span>
						</div>
						<div class="control has-icons-right amount-input mr-2">
							<label class="label">Carbs</label>
							<input
								class="input"
								placeholder="Total consume amount"
								v-model.number="mealFoodData.carbs"
							>
							<span class="icon is-small gram-input-postfix">g.</span>
						</div>
						<div class="control has-icons-right amount-input mr-2">
							<label class="label">Protein</label>
							<input
								class="input"
								placeholder="Protein amount"
								v-model.number="mealFoodData.protein"
							>
							<span class="icon is-small gram-input-postfix">g.</span>
						</div>
						<div class="field mr-2">
							<div class="control has-icons-right amount-input">
								<label class="label">Fat</label>
								<input
									class="input"
									placeholder="Fats amount"
									v-model.number="mealFoodData.fat"
								>
								<span class="icon is-small gram-input-postfix">g.</span>
							</div>
						</div>
						<div class="control has-icons-right amount-input">
							<label class="label">Amount</label>
							<input
								class="input"
								placeholder="Carbohydrates amount"
								v-model.number="mealFoodData.amount"
							>
							<span class="icon is-small gram-input-postfix">g.</span>
						</div>
					</div>
				</div>
				<div class="field">
					<div class="control">
						<span class="label">Meal name</span>
						<input
							class="input"
							placeholder="Meal name"
							v-model.trim="mealName"
						>
					</div>
				</div>
				<div
					v-for="(mealFood, index) in currentAddingMealFoods"
					:key="mealFood.name"
					class="is-flex is-align-items-center"
				>
					<div class="is-flex is-flex-direction-column mb-2">
						<p class="has-text-weight-bold">
							{{ mealFood.name }}
							<button
								class="delete"
								@click="removeCurrentAddingMealFoodByIndex(index)"/>
						</p>
						<div>
							<span class="pr-2 microcalories">Calories {{
									currentAddingMealFoodsMultipliedWithAmount[index].calories
								}}</span>
							<span class="pr-2 microcalories">Protein {{
									currentAddingMealFoodsMultipliedWithAmount[index].protein
								}}g.
							</span>
							<span class="pr-2 microcalories">Carbs {{
									currentAddingMealFoodsMultipliedWithAmount[index].carbs
								}}g.
							</span>
							<span class="microcalories">Fat {{
									currentAddingMealFoodsMultipliedWithAmount[index].fat
								}}g.
							</span>
						</div>
					</div>
					<div class="field mr-2 margin-left-auto">
						<div class="control has-icons-right amount-input">
							<input
								class="input"
								placeholder="Fats amount"
								v-model.number="mealFood.amount"
							>
							<span class="icon is-small gram-input-postfix">g.</span>
						</div>
					</div>
				</div>
				<div class="mt-6">
					<label class="label macro-label">Protein {{ currentAddingMealMicrocaloriesSum.protein }}g
						<span class="has-text-primary ml-2">({{
								currentAddingMealFoodsPercentage.protein
							}}%)</span></label>
					<progress
						class="progress is-small is-primary"
						:value="currentAddingMealFoodsPercentage.protein"
						max="100">
					</progress>
					<label class="label macro-label">Carbohydrates {{ currentAddingMealMicrocaloriesSum.carbs }}g
						<span class="has-text-info ml-2">({{ currentAddingMealFoodsPercentage.carbs }}%)</span></label>
					<progress
						class="progress is-small is-info"
						:value="currentAddingMealFoodsPercentage.carbs"
						max="100">
					</progress>
					<label class="label macro-label">Fat {{ currentAddingMealMicrocaloriesSum.fat }}g
						<span class="has-text-danger ml-2">({{ currentAddingMealFoodsPercentage.fat }}%)</span></label>
					<progress
						class="progress is-small is-danger"
						:value="currentAddingMealFoodsPercentage.fat"
						max="100">
					</progress>
				</div>
			</div>
			<button
				class="button is-primary mt-6"
				@click="createMeal">Create meal
			</button>
		</div>
		<button
			class="modal-close is-large"
			aria-label="close"
			@click="$emit('close')"
		/>
	</div>
</template>

<script>
import { ref, computed } from 'vue';
import { addFoodStore } from '@/store/addFoodStore';
import { mealsStore } from '@/store/mealsStore';
import FoodSearch from '@/components/FoodSearch';

export default {
	name: 'CreateMealModal',
	components: {
		FoodSearch,
	},
	props: {
		isOpen: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {
		const {
			mealName,
			mealFoodData,
			currentAddingMealFoods,
			currentAddingMealMicrocaloriesSum,
			currentAddingMealFoodsPercentage,
			currentAddingMealFoodsMultipliedWithAmount,
			createMeal,
			addFoodToCurrentAddingMealFoods,
			removeCurrentAddingMealFoodByIndex,
		} = mealsStore();
		const isAddNewFoodInputVisible = ref(false);

		const setAddNewFoodInputVisible = (value) => {
			isAddNewFoodInputVisible.value = value;
		};

		return {
			addFoodToCurrentAddingMealFoods,
			setAddNewFoodInputVisible,
			removeCurrentAddingMealFoodByIndex,
			createMeal,
			mealName,
			currentAddingMealFoodsMultipliedWithAmount,
			currentAddingMealFoods,
			isAddNewFoodInputVisible,
			mealFoodData,
			currentAddingMealMicrocaloriesSum,
			currentAddingMealFoodsPercentage,
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

.microcalories {
	font-weight: 300;
	font-size: 12px;
}

.margin-left-auto {
	margin-left: auto;
}
</style>
