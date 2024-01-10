import { IModalState, ModalState } from "@context/state/modalState";

export interface ModalAction {
	type: ModalActionType;
	data: unknown;
}

export enum ModalActionType {
	showModal,
	resetModals,
}

export function ModalReducer(
	state: IModalState,
	action: ModalAction,
): IModalState {
	const { type, data } = action;
	switch (type) {
		case ModalActionType.showModal:
			return {
				...state,
				modals: [
					...state.modals.filter(
						(m) => m.id !== (data as ModalState)?.id,
					),
					data as ModalState,
				].filter((a) => a.show),
			};
		case ModalActionType.resetModals:
			return {
				...state,
				modals: [],
			};
		default:
			return state;
	}
}
