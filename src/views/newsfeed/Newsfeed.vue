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
								placeholder="appWrite a post"
								v-model.trim="postText"
							/>
						</p>
					</div>
					<NewsfeedMealDisplay
						:meal-name="selectedMealToShare.mealName"
						:meal-foods="selectedMealToShare.mealFoods"
						:total-amount="selectedMealToShare.totalAmount"
						:total-carbs="selectedMealToShare.totalCarbs"
						:total-fat="selectedMealToShare.totalFat"
						:total-protein="selectedMealToShare.totalProtein"
						:total-calories="selectedMealToShare.totalCalories"
					/>
					<MealSelection
						v-if="isShareMealSelectionVisible"
						@meal-selected="selectMealToShare($event)"
					/>
					<nav class="level">
						<div class="level-left">
							<div class="is-flex is-align-items-center">
								<a
									class="button is-info mr-5"
									@click="addPost">Submit</a>
								<a class="mr-5">Add a workout</a>
								<a @click="setShareMealSelectionVisible(true)">Share meal</a>
							</div>
						</div>
					</nav>
				</div>
			</article>
			<div class="news-feed__posts">
				<Post
					v-for="{ id, text, username, likes, avatar, createdAgo, comments, meal } in posts"
					:key="id"
					:text="text"
					:username="username"
					:id="id"
					:likes="likes"
					:avatar="avatar"
					:createdAgo="createdAgo"
					:comments="comments"
					:meal="meal"
					@post-liked="handlePostLike($event)"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { userDataStore } from '@/store/userDataStore';
import { useNewsfeedStore } from '@/store/newsfeedStore';
import Post from '@/views/newsfeed/Post.vue';
import MealSelection from '@/views/newsfeed/MealSelection.vue';
import NewsfeedMealDisplay from '@/views/newsfeed/NewsfeedMealDisplay.vue';

export default defineComponent({
	name: 'Newsfeed',
	components: { Post, MealSelection, NewsfeedMealDisplay },
	setup() {
		const { userDetails } = userDataStore();
		const {
			posts, postText, selectedMealToShare, selectMealToShare, addPost, editPost, getPosts, likePost, unlikePost,
		} = useNewsfeedStore();
		const isShareMealSelectionVisible = ref<boolean>(false);

		const setShareMealSelectionVisible = (value: boolean) => {
			isShareMealSelectionVisible.value = value;
		};

		const handlePostLike = ({ postId, hasLikedPost }: { postId: number, hasLikedPost: boolean }) => {
			const postIndex = posts.value.findIndex((postData) => postData.id === postId);

			if (hasLikedPost) {
				unlikePost(postId, postIndex);
			} else {
				likePost(postId, postIndex);
			}
		};

		getPosts();

		return {
			userDetails,
			postText,
			posts,
			selectedMealToShare,
			isShareMealSelectionVisible,
			selectMealToShare,
			setShareMealSelectionVisible,
			addPost,
			editPost,
			handlePostLike,
		};
	},
});
</script>

<style scoped lang="scss">
.news-feed {
	max-width: 900px;
	margin-left: auto;
	margin-right: auto;
}
</style>
