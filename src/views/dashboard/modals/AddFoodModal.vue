<template>
	<div
		class="modal is-active">
		<div class="modal-background"></div>
		<div class="modal-content">
			<div class="box">
				<article class="panel is-primary">
					<div class="is-flex is-align-items-center is-justify-content-space-between panel-heading">
						<b>Select Meal</b>
					</div>
					<p class="panel-tabs">
						<a
							v-for="tab in TABS"
							:key="tab.id"
							:class="{
								'is-active': currentTab.id === tab.id
							}"
							@click="setCurrentTab(tab)"
						>
							{{ tab.title }}
						</a>
					</p>
				</article>
				<component
					:is="currentTab.component"
					@select-food="selectFood($event)"
					@select-meal="setSelectedMeal($event)"
				/>
				<footer class="modal-card-foot">
					<button
						class="button is-success"
						@click="handleFoodAdd"
					>
						Add
					</button>
					<button class="button">Cancel</button>
				</footer>
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
import { ref, computed } from 'vue';
import { addFoodStore } from '@/store/addFoodStore';
import AddFoodModalAddNewFood from '@/views/dashboard/modals/AddFoodModalAddNewFood.vue';
import AddFoodModalSelectFood from '@/views/dashboard/modals/AddFoodModalSelectFood.vue';
import FoodSearch from '@/components/FoodSearch';
import MealSearch from '@/components/MealSearch';
import AddFoodModalTabMeals from '@/views/dashboard/modals/AddFoodModalTabMeals';

const TAB_ID_ADD_FOOD = 'add-food';
const TAB_ID_MEALS = 'meals';

const TABS = [
	{
		title: 'Recent',
		component: 'AddFoodModalSelectFood',
		id: 'recent',
	},
	{
		title: 'Add food',
		component: 'AddFoodModalAddNewFood',
		id: TAB_ID_ADD_FOOD,
	},
	{
		title: 'Meals',
		id: TAB_ID_MEALS,
		component: 'AddFoodModalTabMeals',
	},
];

export default {
	components: {
		AddFoodModalSelectFood,
		AddFoodModalAddNewFood,
		AddFoodModalTabMeals,
		FoodSearch,
		MealSearch,
	},
	props: {
		isOpen: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {
		const {
			saveConsumedFood,
			addFood,
			setSelectedMeal,
			saveConsumedMeal,
			uniqueLoadedFood,
			foodName,
			loadedFood,
			isLoadingUserFood,
			selectFood,
			selectedFood,
			selectedFoodPercentages,
			selectedFoodWithAmount,
			addFoodData,
		} = addFoodStore();
		const currentTab = ref(TABS[0]);

		const isAddFoodTabOpen = computed(() => currentTab.value.id === TAB_ID_ADD_FOOD);

		const setCurrentTab = (tab) => {
			currentTab.value = tab;
		};

		const handleFoodAdd = async () => {
			if (currentTab.value.id === TAB_ID_ADD_FOOD) {
				await addFood();
			} else if (currentTab.value.id === TAB_ID_MEALS) {
				await saveConsumedMeal();
			} else {
				saveConsumedFood();
			}

			emit('close');
		};

		return {
			TABS,
			currentTab,
			handleFoodAdd,
			setSelectedMeal,
			saveConsumedFood,
			setCurrentTab,
			isAddFoodTabOpen,
			uniqueLoadedFood,
			foodName,
			loadedFood,
			isLoadingUserFood,
			selectFood,
			selectedFood,
			selectedFoodPercentages,
			selectedFoodWithAmount,
			addFoodData,
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
