<template>
	<div>
		<div
			v-for="mealType in MEAL_TYPES"
			:key="mealType">
			<div class="is-flex is-align-items-center">
				<p class="is-size-4 meal-type is-align-content-flex-end mr-2">{{ mealType }}</p>
				<button
					class="button is-primary is-small"
					@click="setAddFoodModalVisible(true, mealType)">
					<span class="icon is-small">
						<i class="fas fa-plus"></i>
					</span>
					<span>Add food</span>
				</button>
			</div>
			<table class="table mb-6">
				<thead>
				<tr>
					<th class="table__name">Name</th>
					<th>Calories</th>
					<th>Protein</th>
					<th>Carbs</th>
					<th>Fat</th>
				</tr>
				</thead>
				<tbody>
				<tr
					v-for="({ name, calories, protein, carbs, fat }, index) in consumedUserFood[mealType]"
					:key="`${name}${index}`">
					<td>{{ name }}</td>
					<td>{{ calories }}</td>
					<td>{{ protein }} g.</td>
					<td>{{ carbs }} g.</td>
					<td>{{ fat }} g.</td>
				</tr>
				</tbody>
			</table>
		</div>
		<AddFoodModal
			@close="setAddFoodModalVisible(false)"
			v-if="isAddFoodModalVisible"
		/>
	</div>
</template>

<script>
import { ref } from 'vue';
import AddFoodModal from '@/views/dashboard/modals/AddFoodModal.vue';
import { addFoodStore } from '@/store/addFoodStore';
import { userDataStore } from '@/store/userDataStore';

const MEAL_TYPES = ['breakfast', 'lunch', 'supper', 'snacks'];

export default {
	components: { AddFoodModal },
	setup() {
		const { selectedFood } = addFoodStore();
		const { consumedUserFood } = userDataStore();
		const isAddFoodModalVisible = ref(false);

		const setAddFoodModalVisible = (value, mealType = 'breakfast') => {
			isAddFoodModalVisible.value = value;
			selectedFood.value.timeOfDay = mealType;
		};

		return {
			consumedUserFood,
			setAddFoodModalVisible,
			isAddFoodModalVisible,
			MEAL_TYPES,
		};
	},
};
</script>

<style scoped lang="scss">
.table {
	width: 100%;

	th, tr {
		text-align: left;
	}

	&__name {
		width: 50%;
	}
}

.meal-type {
	text-transform: capitalize;
	text-align: left;
}
</style>
