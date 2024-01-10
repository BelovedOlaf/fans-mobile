import { IProfileState } from "@context/state/profileState";
import { IBundle, ISocialLink, ISubscription } from "@usertypes/types";
import { defaultProfileStateData } from "@constants/common";
import { IProfileSettings } from "@usertypes/types";

export enum ProfileActionType {
	initProfile,
	updateProfile,
	updateSocialLinks,
	updateSubscription,
	updateBundles,
	updateSettings,
}

export type ProfileAction =
	| { type: ProfileActionType.updateSettings; data: IProfileSettings }
	| { type: ProfileActionType.initProfile; data: Partial<IProfileState> }
	| { type: ProfileActionType.updateProfile; data: Partial<IProfileState> }
	| { type: ProfileActionType.updateSocialLinks; data: ISocialLink[] }
	| {
			type: ProfileActionType.updateSubscription;
			data: Partial<ISubscription>;
	  }
	| { type: ProfileActionType.updateBundles; data: IBundle[] };

export function ProfileReducer(
	state: IProfileState,
	action: ProfileAction,
): IProfileState {
	const { type, data } = action;

	switch (type) {
		case ProfileActionType.initProfile:
			return {
				...defaultProfileStateData,
			};
		case ProfileActionType.updateProfile:
			return {
				...state,
				...data,
			};
		case ProfileActionType.updateSocialLinks:
			return {
				...state,
				socialLinks: state.socialLinks.map((socialLink) => {
					const newSocialLink = data.find(
						(cell) => cell.provider === socialLink.provider,
					);

					if (!newSocialLink) return socialLink;

					return {
						...socialLink,
						id: newSocialLink.id,
						url: newSocialLink.url,
					};
				}),
			};
		case ProfileActionType.updateSubscription:
			return {
				...state,
				subscriptions: [{ ...state.subscriptions[0], ...data }],
			};

		case ProfileActionType.updateBundles:
			return {
				...state,
				subscriptions: [
					{
						...state.subscriptions[0],
						bundles: data,
					},
				],
			};

		case ProfileActionType.updateSettings:
			return {
				...state,
				settings: {
					...action.data,
				},
			};
		default:
			return state;
	}
}
