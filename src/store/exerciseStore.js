import { ref, computed } from 'vue';
import { api } from '@/api/api';
import cloneDeep from 'lodash.clonedeep';

const EXERCISE_API = `${process.env.VUE_APP_API_URL}/exercise`;

const addExerciseApi = (exercise) => api.post(EXERCISE_API, exercise);
const editSetApi = (set) => api.patch(EXERCISE_API, set);

const dayExercises = ref([]);

const exercise = ref({
	set: null,
	repetitions: 10,
	weight: 20,
	name: null,
	id: null,
	unit: 'kg',
});
const currentAddingSets = ref([]);
const currentEditingSetIndex = ref(null);
const currentEditingExerciseIndex = ref(null);

const isAddExerciseModalVisible = ref(false);
const iseEditSetModalVisible = ref(false);

export const exerciseStore = (props, context) => {
	const isSaveExerciseAllowed = computed(() => currentAddingSets.value.length > 0 && exercise.value.name !== null);

	const startSetEditing = ({
		name, exerciseSets, exerciseIndex, setIndex,
	}) => {
		iseEditSetModalVisible.value = true;

		currentEditingSetIndex.value = setIndex;
		currentEditingExerciseIndex.value = exerciseIndex;
		exercise.value = { name, ...exerciseSets[setIndex] };
	};

	const resetExerciseInput = () => {
		exercise.value = {
			set: null,
			repetitions: 20,
			weight: 20,
			name: null,
			unit: 'kg',
		};
		currentAddingSets.value = [];
		currentEditingSetIndex.value = null;
		currentEditingExerciseIndex.value = null;
	};

	const addSetToCurrentAddingSets = () => {
		currentAddingSets.value.push({
			set: currentAddingSets.value.length + 1,
			weight: exercise.value.weight,
			unit: exercise.value.unit,
			repetitions: exercise.value.repetitions,
		});
	};

	const editExercise = (editingExercise, exerciseIndex) => {
		const exerciseClone = cloneDeep(editingExercise);
		currentEditingExerciseIndex.value = exerciseIndex;
		currentAddingSets.value = exerciseClone.sets;
		exercise.value.name = exerciseClone.name;
		isAddExerciseModalVisible.value = true;
	};

	const addToDailyExerciseList = ({ name, sets }) => {
		if (currentEditingExerciseIndex.value !== null) {
			dayExercises.value[currentEditingExerciseIndex.value].sets = [
				...dayExercises.value[currentEditingExerciseIndex.value].sets,
				...sets,
			];
		} else {
			dayExercises.value.push({
				name,
				sets,
			});
		}
	};

	const addExercise = async () => {
		const notAddedSets = currentAddingSets.value.filter((set) => !set.id);

		try {
			const { data } = await addExerciseApi({ name: exercise.value.name, sets: notAddedSets });

			addToDailyExerciseList(data);
			resetExerciseInput();
		} catch (error) {
			console.error(error);
		} finally {
			isAddExerciseModalVisible.value = false;
		}
	};

	const editSet = async () => {
		try {
			await editSetApi(exercise.value);

			dayExercises
				.value[currentEditingExerciseIndex.value].sets[currentEditingSetIndex.value]
				.weight = exercise.value.weight;
			dayExercises
				.value[currentEditingExerciseIndex.value].sets[currentEditingSetIndex.value]
				.repetitions = exercise.value.repetitions;

			resetExerciseInput();
		} catch (error) {
			console.error(error);
		} finally {
			iseEditSetModalVisible.value = false;
		}
	};

	return {
		dayExercises,
		exercise,
		currentAddingSets,
		isAddExerciseModalVisible,
		iseEditSetModalVisible,
		isSaveExerciseAllowed,
		editExercise,
		startSetEditing,
		editSet,
		addSetToCurrentAddingSets,
		addExercise,
	};
};
