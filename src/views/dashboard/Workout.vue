<template>
	<div class="container p-6">
		<div class="tile is-ancestor">
			<div class="tile is-parent">
				<div class="tile is-child box">
					<button
						class="button is-primary is-block"
						@click="isAddExerciseModalVisible = true">Add new exercise
					</button>
					<table class="table mb-6">
						<thead>
						<tr>
							<th class="table__name">Exercise</th>
							<th>Set 1</th>
							<th>Set 2</th>
							<th>Set 3</th>
							<th>Set 4</th>
							<th>Set 5</th>
							<th>Set 6</th>
							<th>Set 7</th>
							<th>Set 8</th>
						</tr>
						</thead>
						<tbody>
						<tr
							v-for="({ name, sets }, exerciseIndex) in dayExercises"
							:key="`${name}${exerciseIndex}`">
							<td @click="editExercise({name, sets}, exerciseIndex)">{{ name }}</td>
							<td
								v-for="({weight, repetitions}, setIndex) in sets"
								:key="`${weight}${repetitions}${name}`"
								class="table__set"
								@click="startSetEditing({name, exerciseSets: sets, setIndex, exerciseIndex})"
							>{{ repetitions }} x {{ weight }} kg
							</td>
						</tr>
						</tbody>
					</table>

				</div>
			</div>
		</div>
		<AddNewExerciseModal
			v-if="isAddExerciseModalVisible"
			@close="isAddExerciseModalVisible = false"
		/>
		<EditSetModal
			v-if="iseEditSetModalVisible"
			@close="iseEditSetModalVisible = false"
		/>
	</div>
</template>

<script>
import { exerciseStore } from '@/store/exerciseStore';
import AddNewExerciseModal from '@/views/dashboard/modals/AddNewExerciseModal.vue';
import EditSetModal from '@/views/dashboard/modals/EditSetModal.vue';

export default {
	components: { EditSetModal, AddNewExerciseModal },
	setup() {
		const {
			isAddExerciseModalVisible, iseEditSetModalVisible, dayExercises, startSetEditing, editExercise,
		} = exerciseStore();

		console.log(dayExercises);

		return {
			dayExercises,
			isAddExerciseModalVisible,
			iseEditSetModalVisible,
			editExercise,
			startSetEditing,
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

	&__set {
		&:hover {
			background-color: aliceblue;
			cursor: pointer;
		}
	}
}
</style>
