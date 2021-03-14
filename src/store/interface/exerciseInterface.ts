export interface Set {
	set: number
	repetitions: number
	weight: number
	name?: string
	id?: number | null
	dailyExerciseId?: number | null
	unit: 'kg'
}

export interface Exercise {
	name: string | undefined
	sets: Set[]
	id?: number | null
	userId?: number
}
