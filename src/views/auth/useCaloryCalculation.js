import { reactive, ref, computed } from 'vue';
import { calculateDailyCaloricIntake, calculateMacrocaloricIntake } from '@/views/utils/calculateCalories';

export const ACTIVITIES = [
	{
		value: 1.2,
		title: 'Little to no exercise',
	},
	{
		value: 1.375,
		title: 'Exercise 1-3 times/week',
	},
	{
		value: 1.55,
		title: 'Exercise 4-5 times/week',
	},
	{
		value: 1.725,
		title: 'Daily exercise or intense exercise 3-4 times/week',
	},
	{
		value: 1.9,
		title: 'Intense exercise 6-7 times/week',
	},
];

export const WEEKLY_GOAL = {
	'extreme-loss': {
		text: 'Extreme weight gain',
		gain: '-1kg',
		multiplier: 0.59,
	},
	loss: {
		text: 'Extreme weight gain',
		gain: '-0.5kg',
		multiplier: 0.79,
	},
	'mild-loss': {
		text: 'Extreme weight gain',
		gain: '-0.25kg',
		multiplier: 0.9,
	},
	maintain: {
		text: 'Extreme weight gain',
		gain: '0kg',
		multiplier: 1,
	},
	'mild-gain': {
		text: 'Extreme weight gain',
		gain: '+0.25kg',
		multiplier: 1.1,
	},
	gain: {
		text: 'Weight gain',
		gain: '+0.5kg',
		multiplier: 1.21,
	},
	'extreme-gain': {
		text: 'Extreme weight gain',
		gain: '+1kg',
		multiplier: 1.41,
	},
};

const dailyCaloricData = reactive({
	calories: null,
	macrocalories: null,
});
const hasCalculatedCalories = ref(false);
const gainMultiplier = ref(1);
const currentStep = ref(0);
const calculationData = reactive({
	sex: 'male',
	weight: null,
	height: null,
	age: null,
	activity: 'none',
});

export const useCaloryCalculation = () => {
	const caloricDataMultiplied = computed(() => {
		const calories = Math.round(dailyCaloricData.calories * gainMultiplier.value);

		return {
			calories,
			macrocalories: calculateMacrocaloricIntake(calories),
		};
	});

	const setCalculationData = (event) => {
		const { target: { value, name } } = event;

		calculationData[name] = value;
	};

	const handleCaloryCalculation = () => {
		const dailyCalories = calculateDailyCaloricIntake(calculationData);

		dailyCaloricData.calories = dailyCalories * gainMultiplier.value;
		dailyCaloricData.macrocalories = calculateMacrocaloricIntake(dailyCalories);

		hasCalculatedCalories.value = true;
	};

	const setGainMultiplier = (multiplier) => {
		gainMultiplier.value = multiplier;
	};

	const setNextStep = () => {
		currentStep.value += 1;
	};

	const setPreviousStep = () => {
		currentStep.value -= 1;
	};

	return {
		caloricDataMultiplied,
		currentStep,
		setGainMultiplier,
		gainMultiplier,
		hasCalculatedCalories,
		dailyCaloricData,
		calculationData,
		setCalculationData,
		handleCaloryCalculation,
		setNextStep,
		setPreviousStep,
	};
};
