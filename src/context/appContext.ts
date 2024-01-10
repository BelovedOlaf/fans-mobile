import { Response } from "@helper/RequesterBase";
import { AuthUserInfoRespBody } from "@helper/endpoints/auth/schemas";
import { createContext } from "react";
import { CommonAction } from "./reducer/commonReducer";
import { ModalAction } from "./reducer/modalReducer";
import { PostsAction } from "./reducer/postsReducer";
import { ProfileAction } from "./reducer/profileReducer";
import { StoryAction } from "./reducer/storyReducer";
import { UserAction } from "./reducer/userReducer";
import { ICommonState } from "./state/commonState";
import { IModalState } from "./state/modalState";
import { IPostsState } from "./state/postsState";
import { IProfileState } from "./state/profileState";
import { IStoryState } from "./state/storyState";
import { IUserState } from "./state/userState";

export interface IAppState {
	profile: IProfileState;
	common: ICommonState;
	posts: IPostsState;
	user: IUserState;
	modal: IModalState;
	story: IStoryState;
}

export interface IAppDispatch {
	setProfile: (action: ProfileAction) => void;
	setCommon: (action: CommonAction) => void;
	setPosts: (action: PostsAction) => void;
	setUser: (action: UserAction) => void;
	setModal: (action: ModalAction) => void;
	setStory: (action: StoryAction) => void;
	fetchUserInfo: () => Promise<Response<AuthUserInfoRespBody>>;
	fetchProfile: () => Promise<void>;
	setShowLoading: () => void;
	setHideLoading: () => void;
	fetchSuggestedCreators: () => void;
	// setBookmarkPostIds: () => void;
}

export interface IAppContext {
	state: IAppState;
	dispatch: IAppDispatch;
}

export const AppContext = createContext<IAppContext | undefined>(undefined);
