export interface ModalState<T = unknown> {
	id: string;
	show: boolean;
	payload?: T;
}

export const modalInitialState = {
	modals: [] as ModalState[],
};

export type IModalState = typeof modalInitialState;
