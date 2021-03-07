<template>
	<div class="dropdown is-active">
		<div class="dropdown-trigger">
			<button
				class="button"
				aria-haspopup="true"
				aria-controls="dropdown-menu"
				@click="setMealSelectionVisible(true)"
			>
				<span>Dropdown button</span>
				<span class="icon is-small">
				<i
					class="fas fa-angle-down"
					aria-hidden="true"
				/>
			</span>
			</button>
		</div>
		<div
			class="dropdown-menu"
			id="dropdown-menu"
			role="menu"
			v-if="isMealSelectionVisible"
		>
			<div class="dropdown-content">
				<a
					v-for="userMeal in userMeals"
					:key="`${userMeal.name}${userMeal.id}`"
					href="#"
					class="dropdown-item"
					@click="handleMealSelect(userMeal)"
				>
					{{ userMeal.mealName }}
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mealsStore } from '@/store/mealsStore';
import { Meal } from '@/store/interface/mealsInterface';

export default defineComponent({
	name: 'MealSelection',
	setup(props, { emit }) {
		const { getUserMeals, userMeals } = mealsStore();
		const isMealSelectionVisible = ref<boolean>(false);

		const setMealSelectionVisible = (value: boolean) => {
			if (value && isMealSelectionVisible.value === true) {
				isMealSelectionVisible.value = false;
			}

			isMealSelectionVisible.value = value;
		};

		const handleMealSelect = (meal: Meal) => {
			emit('meal-selected', meal);
			setMealSelectionVisible(false);
		};

		getUserMeals();

		return {
			userMeals,
			isMealSelectionVisible,
			getUserMeals,
			setMealSelectionVisible,
			handleMealSelect,
		};
	},
});
</script>
