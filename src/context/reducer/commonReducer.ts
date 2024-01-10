import {
	ICommonState,
	ISendTipModal,
	ISendTipSuccessModal,
	ISubscribeModal,
	ILayoutSidebar,
} from "@context/state/commonState";
import { IMedia, IProfile } from "@usertypes/types";

export enum CommonActionType {
	setSuggestedCreators,
	toggleSidebar,
	toggleSendTipModal,
	toggleNewPostTypesModal,
	toggleSendTipSuccessModal,
	toggleSubscribeModal,
	toggleLayoutSidebar,
	setCreatorUsername,
	toggleCreateNewReferralLinkModal,
	toggleEditReferralLinkModal,
	toggleViewAnalyticsModal,
	setPostMedias,
}

export type CommonAction =
	| { type: CommonActionType.setSuggestedCreators; data: IProfile[] }
	| { type: CommonActionType.toggleSidebar; data: boolean }
	| {
			type: CommonActionType.toggleSendTipModal;
			data: Partial<ISendTipModal>;
	  }
	| { type: CommonActionType.toggleNewPostTypesModal; data: boolean }
	| {
			type: CommonActionType.toggleSendTipSuccessModal;
			data: Partial<ISendTipSuccessModal>;
	  }
	| {
			type: CommonActionType.toggleSubscribeModal;
			data: Partial<ISubscribeModal>;
	  }
	| {
			type: CommonActionType.toggleLayoutSidebar;
			data: Partial<ILayoutSidebar>;
	  }
	| {
			type: CommonActionType.setCreatorUsername;
			data: string;
	  }
	| {
			type: CommonActionType.toggleCreateNewReferralLinkModal;
			data: boolean;
	  }
	| {
			type: CommonActionType.toggleEditReferralLinkModal;
			data: boolean;
	  }
	| {
			type: CommonActionType.toggleViewAnalyticsModal;
			data: boolean;
	  }
	| {
			type: CommonActionType.setPostMedias;
			data: IMedia[];
	  };

export function CommonReducer(
	state: ICommonState,
	action: CommonAction,
): ICommonState {
	const { type, data } = action;

	switch (type) {
		// case CommonActionType.toggleLoading:
		// 	return {
		// 		...state,
		// 		loading: data,
		// 	};
		case CommonActionType.setSuggestedCreators:
			return {
				...state,
				suggestedCreators: data,
			};
		case CommonActionType.toggleSidebar:
			return {
				...state,
				openSidebar: data,
			};
		case CommonActionType.toggleSendTipModal:
			return {
				...state,
				sendTipModal: {
					...state.sendTipModal,
					...data,
				},
			};
		case CommonActionType.toggleNewPostTypesModal:
			return {
				...state,
				openNewPostTypesModal: data,
			};
		case CommonActionType.toggleSendTipSuccessModal:
			return {
				...state,
				sendTipSuccessModal: {
					...state.sendTipSuccessModal,
					...data,
				},
			};
		case CommonActionType.toggleSubscribeModal:
			return {
				...state,
				subscribeModal: {
					...state.subscribeModal,
					...data,
				},
			};
		case CommonActionType.toggleLayoutSidebar:
			return {
				...state,
				layoutSidebar: {
					...state.layoutSidebar,
					...data,
				},
			};
		case CommonActionType.setCreatorUsername:
			return {
				...state,
				creatorUsername: data,
			};
		case CommonActionType.toggleCreateNewReferralLinkModal:
			return {
				...state,
				openCreateNewReferralLinkModal: data,
			};
		case CommonActionType.toggleEditReferralLinkModal:
			return {
				...state,
				openEditReferralLinkModal: data,
			};
		case CommonActionType.toggleViewAnalyticsModal:
			return {
				...state,
				openViewAnalyticsModal: data,
			};
		case CommonActionType.setPostMedias:
			return {
				...state,
				postMedias: data,
			};
		default:
			return state;
	}
}
