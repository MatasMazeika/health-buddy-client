<template>
	<div
		class="modal is-active">
		<div class="modal-background"></div>
		<div class="modal-content">
			<div class="box">
				<label class="label has-text-left">Exercise name:</label>
				<input
					class="input is-normal mb-4"
					type="text"
					placeholder="Enter food name"
					v-model.trim="exercise.name"
				>
				<div>
					<label class="label has-text-left">Adding set {{ currentAddingSets.length + 1 }}</label>
					<div class="is-flex is-align-items-center">
						<input
							class="slider is-fullwidth is-success"
							ref="slide"
							step="1"
							min="1"
							max="24"
							v-model="exercise.repetitions"
							type="range"
						>
						<p class="ml-2">{{ exercise.repetitions }} repetitions</p>
					</div>
					<div class="is-flex is-align-items-center">
						<input
							class="slider is-fullwidth is-success"
							ref="slide"
							step="1"
							min="1"
							max="400"
							v-model="exercise.weight"
							type="range"
						>
						<p class="ml-2">{{ exercise.weight }} kg.</p>
						<button
							class="button is-info margin-left-auto"
							@click="addSetToCurrentAddingSets">Add set
						</button>
						<button
							class="button is-success margin-left-auto"
							:disabled="!isSaveExerciseAllowed"
							@click="addExercise">Save exercise
						</button>
					</div>
				</div>
				<div>
					<label class="label has-text-left">Sets:</label>
					<div
						v-for="(set, index) in currentAddingSets"
						:key="`${set.name}${index}`"
						class="has-text-left"
					>
						<span class="mr-2">Set {{ index + 1 }} </span>
						<span class="mr-2 has-text-weight-bold">{{ set.repetitions }} x {{ set.weight }} kg</span>
					</div>
				</div>
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
import { exerciseStore } from '@/store/exerciseStore';

export default {
	setup() {
		const {
			exercise,
			currentAddingSets,
			isSaveExerciseAllowed,
			addSetToCurrentAddingSets,
			addExercise,
		} = exerciseStore();

		return {
			exercise,
			currentAddingSets,
			isSaveExerciseAllowed,
			addSetToCurrentAddingSets,
			addExercise,
		};
	},
};
</script>

<style scoped lang="scss">
.slider {
	width: 50% !important;
	margin: 12px 0 !important;
}

.margin-left-auto {
	margin-left: auto;
}
</style>
