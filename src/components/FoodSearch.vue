<template>
	<article class="panel is-primary">
		<div class="is-flex is-align-items-center is-justify-content-space-between panel-heading">
			<b>Select Meal</b>
		</div>
		<div>
			<div class="panel-block">
				<p class="control has-icons-left">
					<input
						class="input is-normal"
						:class="{
							'is-loading': isLoadingFood
						}"
						type="text"
						placeholder="Enter food name"
						v-model.trim="foodSearch"
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
				v-for="food in foodList"
				:key="food._id"
				@click="$emit('select-food', {...food._source})"
			>
				<span class="panel-icon">
					<i class="fas fa-drumstick-bite"></i>
				</span>
				<span>
					{{ food._source.name }}
				</span>
			</a>
		</div>
	</article>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { foodStore } from '@/store/foodStore';

export default defineComponent({
	name: 'FoodSearch',
	setup() {
		const {
			getFood, foodSearch, isLoadingFood, foodList,
		} = foodStore();

		return {
			foodList,
			isLoadingFood,
			foodSearch,
			getFood,
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
