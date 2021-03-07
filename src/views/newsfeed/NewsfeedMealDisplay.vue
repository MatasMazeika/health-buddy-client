<template>
	<div v-if="mealName !== ''">
		<div class="is-flex is-flex-direction-column is-align-items-flex-start">
			<p class="has-text-weight-bold mb-1">{{ mealName }}</p>
			<div class="tags are-medium has-text-centered is-justify-content-center">
				<span class="tag is-info">Total calories: {{ totalCalories }}</span>
				<span class="tag is-info">Total carbs: {{ totalCarbs }} g.</span>
				<span class="tag is-info">Total protein: {{ totalProtein }} g.</span>
				<span class="tag is-info">Total fat: {{ totalFat }} g.</span>
				<span class="tag is-info">Overall weight: {{ totalAmount }} g.</span>
			</div>
		</div>
		<div class="is-flex is-flex-direction-column is-align-items-flex-start ml-6 mt-2">
			<div
				v-for="mealFood in mealFoods"
				:key="`${mealFood.id}${mealFood.name}`"
				class="has-text-left"
			>
				<p class="mb-1">{{ mealFood.name }}</p>
				<div class="tags are-small has-text-centered is-justify-content-center mb-2">
					<span class="tag is-primary">Calories: {{ mealFood.calories }}</span>
					<span class="tag is-primary">Carbs: {{ mealFood.carbs }} g.</span>
					<span class="tag is-primary">Protein: {{ mealFood.protein }} g.</span>
					<span class="tag is-primary">Fat: {{ mealFood.fat }} g.</span>
					<span class="tag is-primary">Weight: {{ mealFood.amount }} g.</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {
	ref, defineComponent, computed, PropType,
} from 'vue';
import { MealFood } from '@/store/interface/mealsInterface';

export default defineComponent({
	props: {
		mealName: {
			type: String,
			required: true,
		},
		mealFoods: {
			type: Array as PropType<MealFood[]>,
			required: true,
		},
		totalCarbs: {
			type: Number,
			required: true,
		},
		totalProtein: {
			type: Number,
			required: true,
		},
		totalFat: {
			type: Number,
			required: true,
		},
		totalCalories: {
			type: Number,
			required: true,
		},
		totalAmount: {
			type: Number,
			required: true,
		},
	},
	mounted() {
		console.log(this.mealFoods);
	},
});
</script>
