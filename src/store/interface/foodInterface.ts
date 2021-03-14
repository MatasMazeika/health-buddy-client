export type TimeOfDay = 'breakfast' | 'lunch' | 'supper' | 'snacks'

export interface Food {
	id?: number | null
	name: string
	carbs: number
	fat: number
	protein: number
	calories: number
	unit: string
	amount: number
}

export interface ConsumedFood {
	amount: number
	calories: number
	carbs: number
	createdAt?: Date
	fat: number
	foodId: number | null
	id?: number | null
	name: string
	protein: number
	timeOfDay: TimeOfDay
	unit: string
	updatedAt?: Date
	userId?: number
}

export interface ConsumedUserFood {
	breakfast: ConsumedFood[],
	lunch: ConsumedFood[],
	supper: ConsumedFood[],
	snacks: ConsumedFood[],
}
