import { ref, computed } from 'vue';
import { api } from '@/api/api';
import cloneDeep from 'lodash.clonedeep';
import { Exercise, Set } from './interface/exerciseInterface';

const EXERCISE_API = `${process.env.VUE_APP_API_URL}/exercise`;
const EDIT_SET_API = `${EXERCISE_API}/set`;

const addExerciseApi = (exercise: Exercise) => api.post(EXERCISE_API, exercise);
const editExerciseApi = (exercise: Exercise) => api.patch(EXERCISE_API, exercise);
const editSetApi = (set: Set) => api.patch(EDIT_SET_API, set);

const dayExercises = ref<Exercise[]>([]);

const exercise = ref<Set>({
	set: 1,
	repetitions: 10,
	weight: 20,
	name: '',
	unit: 'kg',
	id: null,
	dailyExerciseId: null,
});

const currentAddingSets = ref<Set[]>([]);
const currentEditingSetIndex = ref(0);
const currentEditingExerciseIndex = ref<number>(0);

const isEditingExercise = ref<boolean>(false);
const isAddExerciseModalVisible = ref<boolean>(false);
const iseEditSetModalVisible = ref<boolean>(false);

export const exerciseStore = () => {
	const isSaveExerciseAllowed = computed(() => currentAddingSets.value.length > 0 && exercise.value.name !== null);

	const startSetEditing = ({
		id, name, exerciseSets, exerciseIndex, setIndex,
	}: {id: number, name: string, exerciseSets: Set[], exerciseIndex: number, setIndex: number}) => {
		iseEditSetModalVisible.value = true;

		currentEditingSetIndex.value = setIndex;
		currentEditingExerciseIndex.value = exerciseIndex;
		exercise.value = { name, id, ...exerciseSets[setIndex] };
	};

	const resetExerciseInput = () => {
		exercise.value = {
			set: 1,
			repetitions: 10,
			weight: 20,
			name: '',
			unit: 'kg',
			id: null,
			dailyExerciseId: null,
		};
		currentAddingSets.value = [];
		currentEditingSetIndex.value = 1;
		currentEditingExerciseIndex.value = 1;
	};

	const addSetToCurrentAddingSets = () => {
		currentAddingSets.value.push({
			set: currentAddingSets.value.length + 1,
			weight: exercise.value.weight,
			unit: exercise.value.unit,
			repetitions: exercise.value.repetitions,
		});
	};

	const setEditExercise = (editingExercise: Exercise, exerciseIndex: number) => {
		const exerciseClone = cloneDeep(editingExercise);
		console.log(exerciseClone);
		isEditingExercise.value = true;
		currentEditingExerciseIndex.value = exerciseIndex;
		currentAddingSets.value = exerciseClone.sets;
		exercise.value.name = exerciseClone.name;
		exercise.value.id = exerciseClone.id;
		isAddExerciseModalVisible.value = true;
	};

	const setDayExercises = (exercises: Exercise[]) => {
		dayExercises.value = exercises;
	};

	// eslint-disable-next-line no-shadow
	const addToDailyExerciseList = (exercise: Exercise) => {
		if (isEditingExercise.value) {
			dayExercises.value[currentEditingExerciseIndex.value].sets = [
				...dayExercises.value[currentEditingExerciseIndex.value].sets,
				...exercise.sets,
			];

			dayExercises.value[currentEditingExerciseIndex.value].name = exercise.name;
		} else {
			dayExercises.value.push(exercise);
		}
	};

	const addExercise = async () => {
		const notAddedSets = currentAddingSets.value.filter((set) => !set.id);

		try {
			const { data } = await addExerciseApi({ name: exercise.value.name, sets: notAddedSets });

			console.log(data);

			addToDailyExerciseList(data);
			resetExerciseInput();
		} catch (error) {
			console.error(error);
		} finally {
			isAddExerciseModalVisible.value = false;
		}
	};

	const editExercise = async () => {
		const notAddedSets = currentAddingSets.value.filter((set) => !set.id);

		try {
			const { data } = await editExerciseApi({
				name: exercise.value.name,
				sets: notAddedSets,
				id: exercise.value.id,
			});

			console.log(data);

			addToDailyExerciseList(data);
			resetExerciseInput();
		} catch (error) {
			console.error(error);
		} finally {
			isAddExerciseModalVisible.value = false;
			isEditingExercise.value = false;
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
		isEditingExercise,
		setDayExercises,
		setEditExercise,
		editExercise,
		startSetEditing,
		editSet,
		addSetToCurrentAddingSets,
		addExercise,
	};
};
