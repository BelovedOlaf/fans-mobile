import tw from "@lib/tailwind";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Modal, Portal } from "react-native-paper";

import { LOADING_DIALOG_ID } from "@constants/modal";
import { ModalState } from "@context/state/modalState";
import { useAppContext } from "@context/useAppContext";

const LoadingModal = () => {
	const { state } = useAppContext();
	const modals = state.modal.modals;
	const modal = modals.find((m) => m.id === LOADING_DIALOG_ID) as ModalState<{
		postId: string;
	}>;
	const visible = !!modal && modal.show;

	const [dotIndex, setDotIndex] = useState(0);

	useEffect(() => {
		if (visible) {
			const interval = setInterval(() => {
				setDotIndex(dotIndex === 2 ? 0 : dotIndex + 1);
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [dotIndex, visible]);

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={() => {}}
				contentContainerStyle={[tw.style("shadow-none mx-auto")]}
				style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
			>
				<View>
					<ActivityIndicator color={"white"} size={"large"} />
				</View>
			</Modal>
		</Portal>
	);
};

export default LoadingModal;
