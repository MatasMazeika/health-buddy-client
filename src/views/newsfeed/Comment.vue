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
					<strong>@{{ username }}</strong> <small>{{createdAgoText}}</small>
					<br>
					{{ comment }}
				</p>
			</div>
			<nav class="level is-mobile">
				<div class="level-left">
					<a class="level-item">
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
		</div>
	</article>
</template>

<script>
import { ref, defineComponent, computed } from 'vue';

export default defineComponent({
	name: 'Comment',
	props: {
		comment: {
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
	},
	setup(props) {
		const createdAgoText = computed(() => {
			if (props.createdAgo.seconds && props.createdAgo.seconds === 'now') {
				return 'Just now';
			}

			const time = Object.entries(props.createdAgo);

			return `${Math.round(time[0][1])} ${time[0][0]} ago`;
		});

		return {
			createdAgoText,
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
}
</style>
