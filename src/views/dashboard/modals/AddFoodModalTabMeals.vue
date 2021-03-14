<template>
	<MealSearch @select-meal="$emit('select-meal', $event)"/>
	<NewsfeedMealDisplay
		v-if="selectedMeal.mealFoods.length > 0"
		:meal-name="selectedMeal.mealName"
		:total-calories="selectedMeal.totalCalories"
		:total-protein="selectedMeal.totalProtein"
		:total-fat="selectedMeal.totalFat"
		:total-carbs="selectedMeal.totalCarbs"
		:total-amount="selectedMeal.totalAmount"
		:meal-foods="selectedMeal.mealFoods"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { addFoodStore } from '@/store/addFoodStore';
import MealSearch from '@/components/MealSearch';
import NewsfeedMealDisplay from '@/views/newsfeed/NewsfeedMealDisplay';

export default defineComponent({
	components: {
		MealSearch,
		NewsfeedMealDisplay,
	},
	setup() {
		const {
			selectedMeal,
		} = addFoodStore();

		console.log(selectedMeal);

		return {
			selectedMeal,
		};
	},
});
</script>

<style scoped lang="scss">

</style>
