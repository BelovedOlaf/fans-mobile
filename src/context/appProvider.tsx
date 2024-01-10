import { defaultSubscriptions } from "@constants/common";
import { LOADING_DIALOG_ID } from "@constants/modal";
import * as apis from "@helper/endpoints";
import { AuthState, authAtom, authStateAtom } from "@state/auth";
import { useRefreshNotifications } from "@state/notifications";
import { StorageKeyTypes } from "@usertypes/commonEnums";
import { setObjectStorage } from "@utils/storage";
import React, { FC, ReactNode, useReducer } from "react";
import { useSetRecoilState } from "recoil";
import { AppContext } from "./appContext";
import {
	CommonAction,
	CommonActionType,
	CommonReducer,
} from "./reducer/commonReducer";
import {
	ModalAction,
	ModalActionType,
	ModalReducer,
} from "./reducer/modalReducer";
import { PostReducer, PostsAction } from "./reducer/postsReducer";
import {
	ProfileAction,
	ProfileActionType,
	ProfileReducer,
} from "./reducer/profileReducer";
import { StoryReducer } from "./reducer/storyReducer";
import { UserAction, UserActionType, UserReducer } from "./reducer/userReducer";
import { commonInitialState } from "./state/commonState";
import { modalInitialState } from "./state/modalState";
import { postsInitialState } from "./state/postsState";
import { profileInitialState } from "./state/profileState";
import { storyInitialState } from "./state/storyState";
import { userInitialState } from "./state/userState";

interface Props {
	children?: ReactNode;
}

interface AppProviderSetters {
	setCommon: React.Dispatch<CommonAction>;
	setProfile: React.Dispatch<ProfileAction>;
	setPosts: React.Dispatch<PostsAction>;
	setUser: React.Dispatch<UserAction>;
	setModal: React.Dispatch<ModalAction>;
}

export const wsAppProviderAccess: AppProviderSetters = {
	setCommon: () => {},
	setProfile: () => {},
	setPosts: () => {},
	setUser: () => {},
	setModal: () => {},
};

const AppProvider: FC<Props> = (props) => {
	const { children } = props;

	const setAuth = useSetRecoilState(authAtom);
	const setAuthState = useSetRecoilState(authStateAtom);
	const [profile, setProfile] = useReducer(
		ProfileReducer,
		profileInitialState,
	);
	const [common, setCommon] = useReducer(CommonReducer, commonInitialState);
	const [posts, setPosts] = useReducer(PostReducer, postsInitialState);
	const [user, setUser] = useReducer(UserReducer, userInitialState);
	const [modal, setModal] = useReducer(ModalReducer, modalInitialState);
	const [story, setStory] = useReducer(StoryReducer, storyInitialState);
	const refreshNotifications = useRefreshNotifications();

	wsAppProviderAccess.setCommon = setCommon;
	wsAppProviderAccess.setProfile = setProfile;
	wsAppProviderAccess.setPosts = setPosts;
	wsAppProviderAccess.setUser = setUser;
	wsAppProviderAccess.setModal = setModal;

	const fetchUserInfo = async () => {
		setAuthState(AuthState.Loading);
		const res = await apis.auth.authUserInfo();
		if (res.ok) {
			await setObjectStorage(StorageKeyTypes.UserInfo, {
				id: res.data.id,
				avatar: res.data.avatar,
				email: res.data.email,
				username: res.data.username,
				phonenumber: res.data.phonenumber,
				type: res.data.type,
				profileId: res.data.profile?.id ?? "",
				displayName: res.data.profile?.displayName ?? "",
			});
			setUser({
				type: UserActionType.updateUserInfo,
				payload: { data: res.data },
			});
			setAuth({
				username: res.data.username,
				email: res.data.email,
			});
			setAuthState(AuthState.Authenticated);
		} else {
			setAuthState(AuthState.Unauthenticated);
		}

		return res;
	};

	const fetchProfile = async () => {
		const resp = await apis.profile.getProfile();
		if (!resp.ok) return;

		refreshNotifications();

		const {
			socialLinks,
			subscriptions,

			..._otherInfos
		} = resp.data;
		const profileData = _otherInfos;

		setProfile({
			type: ProfileActionType.updateProfile,
			data: {
				...profileData,
				subscriptions:
					subscriptions.length > 0
						? subscriptions
						: [defaultSubscriptions],
			},
		});
		if (socialLinks.length > 0) {
			setProfile({
				type: ProfileActionType.updateSocialLinks,
				data: socialLinks,
			});
		}
	};

	const fetchSuggestedCreators = async () => {
		const resp = await apis.profile.getSuggestedProfiles();
		if (resp.ok) {
			setCommon({
				type: CommonActionType.setSuggestedCreators,
				data: resp.data.profiles,
			});
		}
	};

	const setShowLoading = () => {
		setModal({
			type: ModalActionType.showModal,
			data: { id: LOADING_DIALOG_ID, show: true },
		});
	};

	const setHideLoading = () => {
		setModal({
			type: ModalActionType.showModal,
			data: { id: LOADING_DIALOG_ID, show: false },
		});
	};

	return (
		<AppContext.Provider
			value={{
				state: {
					profile,
					common,
					posts,
					user,
					modal,
					story,
				},
				dispatch: {
					setShowLoading,
					setHideLoading,
					setProfile,
					setCommon,
					setPosts,
					setUser,
					setModal,
					setStory,
					fetchUserInfo,
					fetchProfile,
					fetchSuggestedCreators,
				},
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
