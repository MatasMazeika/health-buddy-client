<template>
	<div class="container">
		<div class="tile is-ancestor">
			<div class="tile is-4 is-vertical is-parent">
				<div class="tile is-child">
					<article class="panel is-primary">
						<div class="is-flex is-align-items-center is-justify-content-space-between panel-heading">
							<span>Your meals</span>
							<button
								class="button is-info"
								@click="setCreateMealModalOpen(true)">Create new meal
							</button>
						</div>
						<p class="panel-tabs">
							<a class="is-active">Recent</a>
							<a>All</a>
						</p>
						<div class="panel-block">
							<p class="control has-icons-left">
								<input
									class="input is-primary"
									type="text"
									placeholder="Search">
								<span class="icon is-left">
								<i
									class="fas fa-search"
									aria-hidden="true"></i>
								</span>
							</p>
						</div>
						<a
							class="panel-block is-active"
							v-for="meal in userMeals"
							:key="meal.id"
							@click="setSelectedMeal(meal)"
						>
							<span class="panel-icon">
								<i class="fas fa-drumstick-bite"></i>
							</span>
							<span>
								{{ meal.mealName }}
							</span>
							<div class="ml-6">
								Calories {{ meal.totalCalories }}
							</div>
						</a>
					</article>
				</div>
			</div>
			<div class="tile is-parent">
				<div class="tile is-child box">
					<p class="title">Selected meal</p>
					<div class="tags are-medium has-text-centered is-justify-content-center">
						<span class="tag is-info">Total calories {{ selectedMeal.totalCalories }}</span>
						<span class="tag is-info">Total proteins {{ selectedMeal.totalProtein }} g.</span>
						<span class="tag is-info">Total fats {{ selectedMeal.totalFat }} g.</span>
						<span class="tag is-info">Total carbs {{ selectedMeal.totalCarbs }} g.</span>
						<span class="tag is-info">Total amount {{ selectedMeal.totalAmount }} g.</span>
					</div>
					<table class="table mb-6 is-fullwidth has-text-left">
						<thead>
						<tr>
							<th class="table__name">Name</th>
							<th>Calories</th>
							<th>Protein</th>
							<th>Carbs</th>
							<th>Fat</th>
							<th>Amount</th>
						</tr>
						</thead>
						<tbody>
						<tr
							v-for="(mealFood, index) in selectedMeal.mealFoods"
							:key="`${mealFood.name}${index}`">
							<td>{{ mealFood.name }}</td>
							<td>{{ mealFood.calories }}</td>
							<td>{{ mealFood.protein }} g.</td>
							<td>{{ mealFood.carbs }} g.</td>
							<td>{{ mealFood.fat }} g.</td>
							<td>{{ mealFood.amount }} g.</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<CreateMealModal
			v-if="isCreateMealModalOpen"
			@close="setCreateMealModalOpen(false)"/>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { mealsStore } from '@/store/mealsStore';
import CreateMealModal from '@/views/dashboard/modals/CeateMealModal.vue';

export default defineComponent({
	components: { CreateMealModal },
	setup() {
		const {
			userMeals, selectedMeal, setSelectedMeal, getUserMeals,
		} = mealsStore();
		const isCreateMealModalOpen = ref(false);

		const setCreateMealModalOpen = (value) => {
			isCreateMealModalOpen.value = value;
		};

		getUserMeals();

		return {
			userMeals,
			selectedMeal,
			isCreateMealModalOpen,
			setSelectedMeal,
			getUserMeals,
			setCreateMealModalOpen,
		};
	},
});
</script>
