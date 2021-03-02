import { DateTime } from 'luxon';

export interface CreatedAgo {
	seconds: number | 'now',
}

export interface Like {
	username: string
	postId: number
}

export interface Comment {
	username: string
	postId: number
	avatar: string
	comment: string
	createdAt: any
	createdAgo: CreatedAgo
}

export interface Post {
	id: number
	text: string
	username: string
	avatar: string
	createAt: Date
	createdAgo: CreatedAgo
	likes: Like[]
	comments: Comment[]
}
