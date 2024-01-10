import { IProfile, IStory } from "@usertypes/types";
import { defaultProfileStateData } from "@constants/common";

export interface IStoryState {
	profilePreview: IProfile;
	highlightStory: {
		profile?: IProfile;
		stories: IStory[];
	};
	storiesFeed: IProfile[];
}

export const storyInitialState: IStoryState = {
	highlightStory: {
		stories: [],
	},
	profilePreview: defaultProfileStateData,
	storiesFeed: [],
};
