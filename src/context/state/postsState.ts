import { ICategory, IRole, IPostForm, IPost } from "@usertypes/types";
import { PostStepTypes, MediaType } from "@usertypes/commonEnums";
import { defaultPostFormData } from "@constants/defaultFormData";

export interface IPostModal {
	visible: boolean;
	step: PostStepTypes;
}

export interface ILiveModal {
	visible: boolean;
	postId: string;
}

export interface IMediaModal {
	visible: boolean;
	avatar: string;
	displayName: string;
	mediaUrls: string[];
	mediaType: MediaType;
	index: number;
}

export interface IPostsState {
	categories: ICategory[];
	roles: IRole[];
	postForm: IPostForm;
	posts: IPost[];
	modal: IPostModal;
	liveModal: ILiveModal;
	mediaModal: IMediaModal;
}

export const postsInitialState: IPostsState = {
	categories: [],
	roles: [],
	postForm: defaultPostFormData,
	posts: [],
	modal: {
		visible: false,
		step: PostStepTypes.Empty,
	},
	liveModal: {
		visible: false,
		postId: "0",
	},
	mediaModal: {
		visible: false,
		avatar: "",
		displayName: "",
		mediaUrls: [],
		mediaType: MediaType.Image,
		index: 0,
	},
};
