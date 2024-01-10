import { defaultProfileStateData } from "@constants/common";
import {
	IHighlight,
	IMedia,
	IPlayList,
	IPost,
	IProfile,
	IProfileSettings,
} from "@usertypes/types";

export interface IProfileState extends IProfile {
	playlists: IPlayList[];
	medias: IMedia[];
	posts: IPost[];
	highlights: IHighlight[];

	addedPostIds: string[];
	highlightForm: IHighlight;
	settings: IProfileSettings;
}

export const profileInitialState: IProfileState = {
	...defaultProfileStateData,
};
