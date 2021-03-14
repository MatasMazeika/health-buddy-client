<template>
	<article class="panel is-primary">
		<div>
			<div class="panel-block">
				<p
					class="control has-icons-left"
					:class="{
						'is-loading': isLoadingUserMeals
					}"
				>
					<input
						class="input is-normal"
						type="text"
						placeholder="Enter food name"
						v-model.trim="mealSearchText"
					>
					<span class="icon is-left">
					<i
						class="fas fa-search"
						aria-hidden="true"></i>
					</span>
				</p>
			</div>
		</div>
		<div class="search-container">
			<a
				class="panel-block is-active"
				v-for="meal in userMeals"
				:key="meal.id"
				@click="$emit('select-meal', meal)"
			>
				<span class="panel-icon">
					<i class="fas fa-drumstick-bite"></i>
				</span>
				<span>
					{{ meal.mealName }}
				</span>
			</a>
		</div>
	</article>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { mealsStore } from '@/store/mealsStore';

export default defineComponent({
	name: 'MealSearch',
	setup() {
		const {
			mealSearchText, userMeals, isLoadingUserMeals, getUserMeals,
		} = mealsStore();

		getUserMeals();

		return {
			mealSearchText,
			userMeals,
			isLoadingUserMeals,
		};
	},
});
</script>

<style scoped lang="scss">
.search-container {
	height: 165px;
	overflow-y: auto;
}
</style>
