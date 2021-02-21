<template>
	<article class="post media has-text-left">
		<figure class="media-left">
			<p class="image is-64x64">
				<img
					class="img-max-height-fit"
					:src="avatar">
			</p>
		</figure>
		<div class="media-content">
			<div class="content">
				<p>
					<strong>@{{ username }}</strong> <small>{{ createdAgoText }}</small>
					<br>
					{{ text }}
				</p>
			</div>
			<nav class="level is-mobile">
				<div class="level-left">
					<a
						class="level-item"
						@click="setIsCommenting(true)"
					>
						<span class="icon is-small"><i class="fas fa-reply"></i></span>
					</a>
					<a
						class="post__likes level-item"
						:class="{
							'post__likes--has-liked': hasLikedPost
						}"
						@click="$emit('post-liked', {postId: id, hasLikedPost})"
					>
						<small class="mr-1">{{ likeCount }}</small>
						<span class="icon is-small"><i class="fas fa-heart"></i></span>
					</a>
				</div>
			</nav>
			<Comment
				v-for="comment in comments"
				:key="comment.id"
			/>
			<div
				class="field is-relative"
				v-if="isCommenting"
			>
				<div class="media-right post__close-btn">
					<button
						class="delete"
						@click="setIsCommenting(false)"
					/>
				</div>
				<p class="control mb-2">
					<textarea
						class="post__comment-input textarea"
						placeholder="Write a post"
						ref="myTextArea"
						v-model.trim="content"
					/>
				</p>
				<button
					class="button is-info is-small"
					@click="handleCommentAdd">Submit
				</button>
			</div>
		</div>
	</article>
</template>

<script>
import { ref } from 'vue';
import { userDataStore } from '@/store/userDataStore';
import TextareaAutosize from 'vue-textarea-autosize';
import Comment from '@/views/newsfeed/Comment.vue';
import { useTextArea } from '@/use/useTextArea';
import { useNewsfeedStore } from '@/store/newsfeedStore';

export default {
	name: 'Post',
	components: { Comment },
	props: {
		text: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			required: true,
		},
		createdAgo: {
			type: Object,
			required: true,
		},
		id: {
			type: Number,
			required: true,
		},
		likes: {
			type: Array,
			required: true,
		},
		comments: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		const { userDetails } = userDataStore();
		const { addComment } = useNewsfeedStore();
		const { myTextArea, content } = useTextArea();
		const comment = ref('');
		const isCommenting = ref(false);

		const resetCommentInput = () => {
			comment.value = '';
		};

		const setIsCommenting = (value) => {
			isCommenting.value = value;

			if (!value) {
				resetCommentInput();
			}
		};

		const handleCommentAdd = () => {
			addComment(content.value, props.id);
		};

		return {
			userDetails,
			comment,
			isCommenting,
			myTextArea,
			content,
			handleCommentAdd,
			setIsCommenting,
		};
	},
	computed: {
		likeCount: ({ likes }) => likes.length,
		hasLikedPost: ({ likes, userDetails }) => {
			console.log(likes);
			return !!likes.find((like) => like.username === userDetails.username);
		},
		createdAgoText: ({ createdAgo }) => {
			console.log(createdAgo);
			if (createdAgo.seconds && createdAgo.seconds === 'now') {
				return 'Just now';
			}

			const time = Object.entries(createdAgo);

			return `${Math.round(time[0][1])} ${time[0][0]} ago`;
		},
	},
};
</script>

<style scoped lang="scss">
.post {
	&__likes {
		&--has-liked {
			color: #ef584a;
		}
	}

	&__comment-input {
		min-height: 3rem;
	}

	&__close-btn {
		position: absolute;
		right: -10px;
		z-index: 1;
		top: -10px;
	}
}

.textarea {
	resize: none;
}
</style>
