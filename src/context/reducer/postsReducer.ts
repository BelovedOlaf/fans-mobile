import { defaultPostFormData } from "@constants/defaultFormData";
import {
	IPostModal,
	IPostsState,
	ILiveModal,
	IMediaModal,
} from "@context/state/postsState";
import { ICategory, IPost, IPostForm } from "@usertypes/types";

export enum PostsActionType {
	updateCategories,
	initPostForm,
	updatePostForm,
	updatePosts,
	updatePost,
	updatePostModal,
	updateLiveModal,
	updateMediaModal,
}

export type PostsAction =
	| { type: PostsActionType.updateCategories; data: ICategory[] }
	| { type: PostsActionType.initPostForm; data: IPostForm }
	| { type: PostsActionType.updatePostForm; data: Partial<IPostForm> }
	| { type: PostsActionType.updatePosts; data: IPost[] }
	| { type: PostsActionType.updatePost; data: { post: IPost } }
	| { type: PostsActionType.updatePostModal; data: Partial<IPostModal> }
	| { type: PostsActionType.updateLiveModal; data: Partial<ILiveModal> }
	| { type: PostsActionType.updateMediaModal; data: Partial<IMediaModal> };

export function PostReducer(
	state: IPostsState,
	action: PostsAction,
): IPostsState {
	const { type, data } = action;

	switch (type) {
		case PostsActionType.updateCategories:
			return {
				...state,
				categories: data,
			};

		case PostsActionType.initPostForm:
			return {
				...state,
				postForm: defaultPostFormData,
			};
		case PostsActionType.updatePostForm:
			return {
				...state,
				postForm: {
					...state.postForm,
					...data,
				},
			};
		case PostsActionType.updatePosts:
			return {
				...state,
				posts: data,
			};
		case PostsActionType.updatePost:
			return {
				...state,
				posts: state.posts.map((p) =>
					p.id === data.post.id
						? {
								...p,
								...data.post,
						  }
						: p,
				),
			};
		case PostsActionType.updatePostModal:
			return {
				...state,
				modal: { ...state.modal, ...data },
			};
		case PostsActionType.updateLiveModal:
			return {
				...state,
				liveModal: { ...state.liveModal, ...data },
			};
		case PostsActionType.updateMediaModal:
			return {
				...state,
				mediaModal: { ...state.mediaModal, ...data },
			};
		default:
			return state;
	}
}
