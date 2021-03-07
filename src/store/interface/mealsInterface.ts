export interface MealFood {
	id: number | null
	name: string
	carbs: number
	fat: number
	protein: number
	calories: number
	unit: string
	amount: number
}

export interface Meal {
	id: number | null
	mealFoods: MealFood[]
	mealName: string
	totalCarbs: number
	totalProtein: number
	totalFat: number
	totalCalories: number
	totalAmount: number
}
