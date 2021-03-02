<template>
	<div class="container p-6 has-text-centered">
		<div class="news-feed">
			<article class="media mb-6">
				<figure class="media-left">
					<p class="image is-64x64">
						<img
							class="img-max-height-fit"
							:src="userDetails.avatar">
					</p>
				</figure>
				<div class="media-content">
					<div class="field">
						<p class="control">
							<textarea
								class="textarea"
								placeholder="Write a post"
								v-model.trim="postText"
							></textarea>
						</p>
					</div>
					<nav class="level">
						<div class="level-left">
							<div class="is-flex is-align-items-center">
								<a
									class="button is-info mr-5"
									@click="addPost">Submit</a>
								<a class="mr-5">Add a workout</a>
								<a>Add a eaten food</a>
							</div>
						</div>
					</nav>
				</div>
			</article>
			<div class="news-feed__posts">
				<Post
					v-for="{ id, text, username, likes, avatar, createdAgo, comments } in posts"
					:key="id"
					:text="text"
					:username="username"
					:id="id"
					:likes="likes"
					:avatar="avatar"
					:createdAgo="createdAgo"
					:comments="comments"
					@post-liked="handlePostLike($event)"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { userDataStore } from '@/store/userDataStore';
import { useNewsfeedStore } from '@/store/newsfeedStore';
import Post from '@/views/newsfeed/Post.vue';

export default {
	name: 'Newsfeed',
	components: { Post },
	setup() {
		const { userDetails } = userDataStore();
		const {
			posts, postText, addPost, editPost, getPosts, likePost, unlikePost,
		} = useNewsfeedStore();

		getPosts();

		const handlePostLike = ({ postId, hasLikedPost }) => {
			console.log(hasLikedPost);
			console.log(postId);
			const postIndex = posts.value.findIndex((postData) => postData.id === postId);

			if (hasLikedPost) {
				unlikePost(postId, postIndex);
			} else {
				likePost(postId, postIndex);
			}
		};

		return {
			userDetails,
			postText,
			posts,
			addPost,
			editPost,
			handlePostLike,
		};
	},
};
</script>

<style scoped lang="scss">
.news-feed {
	max-width: 900px;
	margin-left: auto;
	margin-right: auto;
}
</style>
