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
				v-for="{ username, avatar, createdAgo, comment } in comments"
				:key="comment.id"
				:username="username"
				:avatar="avatar"
				:createdAgo="createdAgo"
				:comment="comment"
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

<script lang="ts">
import {
	ref, defineComponent, computed, PropType,
} from 'vue';
import { userDataStore } from '@/store/userDataStore';
import Comment from '@/views/newsfeed/Comment.vue';
import { useTextArea } from '@/use/useTextArea';
import { useNewsfeedStore } from '@/store/newsfeedStore';
import { CreatedAgo, Like } from '@/store/interface/newsfeedStoreInterface';

export default defineComponent({
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
			type: Object as PropType<CreatedAgo>,
			required: true,
		},
		id: {
			type: Number,
			required: true,
		},
		likes: {
			type: Array as PropType<Like[]>,
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
		const comment = ref<string>('');
		const isCommenting = ref(false);

		const resetCommentInput = () => {
			content.value = '';
		};

		const setIsCommenting = (value: boolean) => {
			isCommenting.value = value;

			if (!value) {
				resetCommentInput();
			}
		};

		const handleCommentAdd = () => {
			addComment(content.value, props.id);
			setIsCommenting(false);
		};

		const likeCount = computed(() => props.likes.length);

		const hasLikedPost = computed(() => !!props.likes
			.find((like: Like): Boolean => like.username === userDetails.value.username));

		const createdAgoText = computed(() => {
			if (props.createdAgo.seconds && props.createdAgo.seconds === 'now') {
				return 'Just now';
			}

			const time = Object.entries(props.createdAgo);

			return `${Math.round(time[0][1])} ${time[0][0]} ago`;
		});

		return {
			userDetails,
			comment,
			isCommenting,
			myTextArea,
			content,
			likeCount,
			hasLikedPost,
			createdAgoText,
			handleCommentAdd,
			setIsCommenting,
		};
	},
});
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
