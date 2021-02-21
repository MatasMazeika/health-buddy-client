import { ref } from 'vue';
import {
	addCommentApi,
	addPostApi, editPostApi, getPostsApi, likePostApi, unlikePostApi,
} from '@/api/newsfeedApi';
import { userDataStore } from '@/store/userDataStore';

const posts = ref([]);
const postText = ref('');

export const useNewsfeedStore = () => {
	const { userDetails } = userDataStore();

	const resetPostInput = () => {
		postText.value = '';
	};

	const editPostById = (postId, editedText) => {
		const postIndex = posts.value.findIndex((_post) => _post.id === postId);

		posts.value[postIndex].text = editedText;
	};

	const likePostByPostIndex = (postIndex) => {
		posts.value[postIndex].likes.push({
			username: userDetails.value.username,
		});
	};

	const removePostLikeByPostIndex = (postIndex) => {
		posts.value[postIndex].likes = posts.value[postIndex].likes
			.filter((like) => like.username !== userDetails.value.username);
	};

	const addPostToList = (newPost) => {
		posts.value.unshift({ ...newPost, username: userDetails.value.username, avatar: userDetails.value.avatar });
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

			editPostById();
			resetPostInput();
		} catch (error) {
			console.log(error);
		}
	};

	const likePost = async (postId, postIndex) => {
		console.log(postId);
		try {
			await likePostApi({ postId });

			likePostByPostIndex(postIndex);
		} catch (error) {
			console.error(error);
		}
	};

	const unlikePost = async (postId, postIndex) => {
		try {
			console.log(postId);
			await unlikePostApi({ postId });

			removePostLikeByPostIndex(postIndex);
		} catch (error) {
			console.error(error);
		}
	};

	const addComment = async (comment, postId) => {
		try {
			await addCommentApi({ comment, postId });
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
