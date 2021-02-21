const DAILY_PERCENTAGE_CARBS = 0.4;
const DAILY_PERCENTAGE_PROTEIN = 0.3;
const DAILY_PERCENTAGE_FAT = 0.2;
const CALORIES_IN_PROTEIN = 4;
const CALORIES_IN_CARBS = 4;
const CALORIES_IN_FAT = 9;

export const calculateDailyCaloricIntake = ({
	sex, weight, height, activity, age,
}) => {
	const isMale = sex === 'male';
	const weightMultiplier = isMale ? 13.7516 : 9.5634;
	const heightMultiplier = isMale ? 5.0033 : 1.8496;
	const ageMultiplier = isMale ? 6.755 : 4.6756;
	const startValue = isMale ? 66.473 : 655.0955;

	return Math.round(
		(startValue + (weightMultiplier * weight) + (heightMultiplier * height) - (ageMultiplier * age)) * activity,
	);
};

export const calculateMacrocaloricIntake = (calories) => {
	const protein = Math.round((calories * DAILY_PERCENTAGE_PROTEIN) / CALORIES_IN_PROTEIN);
	const carbs = Math.round((calories * DAILY_PERCENTAGE_CARBS) / CALORIES_IN_CARBS);
	const fat = Math.round((calories * DAILY_PERCENTAGE_FAT) / CALORIES_IN_FAT);

	return {
		protein,
		carbs,
		fat,
	};
};
