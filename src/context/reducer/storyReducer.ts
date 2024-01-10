import { IStoryState } from "@context/state/storyState";

export enum StoryActionType {
	updateStoryState,
}

export type StoryAction = {
	type: StoryActionType.updateStoryState;
	data: Partial<IStoryState>;
};

export function StoryReducer(
	state: IStoryState,
	action: StoryAction,
): IStoryState {
	const { type, data } = action;

	switch (type) {
		case StoryActionType.updateStoryState:
			return {
				...state,
				...data,
			};
		default:
			return state;
	}
}
