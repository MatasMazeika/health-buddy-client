import { api } from '@/api/api';

const NEWSFEED_API = `${process.env.VUE_APP_API_URL}/newsfeed`;
const NEWSFEED_LIKE_API = `${NEWSFEED_API}/like`;
const NEWSFEED_COMMENT_API = `${NEWSFEED_API}/comment`;

export const getPostsApi = () => api.get(NEWSFEED_API);

export const addPostApi = (post) => api.post(NEWSFEED_API, post);

export const editPostApi = (post) => api.post(NEWSFEED_API, post);

export const likePostApi = (post) => api.post(NEWSFEED_LIKE_API, post);

export const unlikePostApi = (post) => api.delete(NEWSFEED_LIKE_API, { data: { ...post } });

export const addCommentApi = ({ comment, postId }) => api.post(NEWSFEED_COMMENT_API, { comment, postId });

export const editCommentApi = ({ comment, commentId }) => api.patch(NEWSFEED_COMMENT_API, { comment, commentId });

export const deleteCommentApi = ({ commentId }) => api.delete(NEWSFEED_COMMENT_API, { data: { commentId } });
