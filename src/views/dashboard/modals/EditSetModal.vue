<template>
	<div
		class="modal is-active">
		<div class="modal-background"></div>
		<div class="modal-content">
			<div class="box">
				<label class="label has-text-left">Exercise: {{ exercise.name }}</label>
					<label class="label has-text-left">Set: {{ exercise.set }}</label>
				<div>
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
							class="button is-success margin-left-auto"
							@click="editSet">Edit set
						</button>
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
	name: 'EditSetModal',
	setup() {
		const {
			exercise,
			editSet,
		} = exerciseStore();

		return {
			exercise,
			editSet,
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
