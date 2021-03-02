import { ref } from 'vue';
import {
	addCommentApi,
	addPostApi, editPostApi, getPostsApi, likePostApi, unlikePostApi,
} from '@/api/newsfeedApi';
import { DateTime } from 'luxon';
import { userDataStore } from '@/store/userDataStore';
import { Comment, Post } from '@/store/interface/newsfeedStoreInterface';

const posts = ref<Post[]>([]);
const postText = ref<string>('');

export const useNewsfeedStore = () => {
	const { userDetails } = userDataStore();

	const resetPostInput = () => {
		postText.value = '';
	};

	const editPostById = (postId: number, editedText: string) => {
		const postIndex = posts.value.findIndex((_post) => _post.id === postId);

		posts.value[postIndex].text = editedText;
	};

	const likePostByPostIndex = (postIndex: number, postId: number) => {
		posts.value[postIndex].likes.push({
			username: userDetails.value.username,
			postId,
		});
	};

	const removePostLikeByPostIndex = (postIndex: number) => {
		posts.value[postIndex].likes = posts.value[postIndex].likes
			.filter((like) => like.username !== userDetails.value.username);
	};

	const addPostToList = (newPost: Post) => {
		posts.value.unshift({ ...newPost, username: userDetails.value.username, avatar: userDetails.value.avatar });
	};

	const addCommentToList = (postId: number, commentText: string) => {
		const postIndex = posts.value.findIndex((_post) => _post.id === postId);

		posts.value[postIndex].comments.unshift({
			username: userDetails.value.username,
			avatar: userDetails.value.avatar,
			comment: commentText,
			createdAgo: { seconds: 'now' },
			createdAt: DateTime.local().toJSDate(),
			postId,
		});

		console.log(posts.value[postIndex].comments);
	};

	const getPosts = async () => {
		try {
			const { data } = await getPostsApi();

			console.log(data);

			posts.value = data;
		} catch (error) {
			console.error(error);
		}
	};

	const addPost = async () => {
		try {
			const { data } = await addPostApi({ text: postText.value });

			addPostToList(data);
			resetPostInput();
		} catch (error) {
			console.log(error);
		}
	};

	const editPost = async () => {
		try {
			await editPostApi({ text: postText.value });

			// editPostById();
			resetPostInput();
		} catch (error) {
			console.log(error);
		}
	};

	const likePost = async (postId: number, postIndex: number) => {
		console.log(postId);
		try {
			await likePostApi({ postId });

			likePostByPostIndex(postIndex, postId);
		} catch (error) {
			console.error(error);
		}
	};

	const unlikePost = async (postId: number, postIndex: number) => {
		try {
			console.log(postId);
			await unlikePostApi({ postId });

			removePostLikeByPostIndex(postIndex);
		} catch (error) {
			console.error(error);
		}
	};

	const addComment = async (commentText: string, postId: number) => {
		try {
			await addCommentApi({ comment: commentText, postId });

			addCommentToList(postId, commentText);
		} catch (error) {
			console.error(error);
		}
	};

	return {
		posts,
		postText,
		getPosts,
		addPost,
		addComment,
		editPost,
		likePost,
		unlikePost,
		removePostLikeByPostIndex,
	};
};
