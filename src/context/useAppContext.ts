import React, { useContext } from "react";
import { AppContext, IAppContext } from "./appContext";

import { CommonActionType } from "./reducer/commonReducer";
import { ProfileActionType } from "./reducer/profileReducer";
import { PostsActionType } from "./reducer/postsReducer";
import { ModalActionType } from "./reducer/modalReducer";
import { UserActionType } from "./reducer/userReducer";
import { StoryActionType } from "./reducer/storyReducer";

export const useAppContext = (): IAppContext => {
	const ctx = useContext(AppContext);
	if (!ctx) {
		throw new Error(
			"useAppContext must be used within a AppContext.Provider",
		);
	}
	return ctx;
};

export {
	CommonActionType,
	ProfileActionType,
	PostsActionType,
	ModalActionType,
	UserActionType,
	StoryActionType,
};
