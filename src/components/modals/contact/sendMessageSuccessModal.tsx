import { View, Text, Image } from "react-native";
import React, { useCallback, useEffect } from "react";
import tw from "@lib/tailwind";
import { Modal, Portal, IconButton } from "react-native-paper";

import RoundButton from "@components/common/RoundButton";
import { CloseSvg } from "@assets/svgs/common";
import { RoundButtonType } from "@usertypes/commonEnums";
import { ModalActionType, useAppContext } from "@context/useAppContext";
import { SEND_MESSAGE_SUCCESS_MODAL_ID } from "@constants/modal";
import { ModalState } from "@context/state/modalState";
import { useRouter } from "expo-router";
import SubmitSvg from "@assets/svgs/common/SubmitSvg";

const SendMessageSuccessModal: React.FC = () => {
	const { state, dispatch } = useAppContext();
	const router = useRouter();
	const modals = state.modal.modals;
	const modal = modals.find(
		(m) => m.id === SEND_MESSAGE_SUCCESS_MODAL_ID,
	) as ModalState;

	const handleClose = useCallback(() => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: SEND_MESSAGE_SUCCESS_MODAL_ID, show: false },
		});
	}, []);

	const handleSubmit = useCallback(async () => {
		router.push("/");
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: SEND_MESSAGE_SUCCESS_MODAL_ID, show: false },
		});
	}, []);

	return (
		<Portal>
			<Modal
				visible={!!modal && modal.show}
				onDismiss={handleClose}
				contentContainerStyle={tw.style(
					"bg-white rounded-[15px]",
					"mx-[15px]",
				)}
			>
				<View
					style={tw.style(
						"flex gap-[10px] mx-[17px] mt-[14px] mb-[28px]",
					)}
				>
					<IconButton
						icon={() => (
							<CloseSvg width={9.33} height={9.33} color="#fff" />
						)}
						mode="contained"
						containerColor="rgba(0,0,0,0.3)"
						style={tw.style(
							"w-[25px] h-[25px] absolute top-[0px] right-[0px] m-[0px]",
						)}
						onPress={handleClose}
					/>
					<View style={tw.style("self-center mt-[24px]")}>
						<SubmitSvg size={80} />
					</View>
					<Text style={tw.style("font-bold text-xl text-center")}>
						Success!
					</Text>
					<Text style={tw.style("text-center text-lg py-4")}>
						We will review your request
						<br /> and get back to you ASAP
					</Text>

					<RoundButton
						variant={RoundButtonType.PRIMARY}
						onPress={handleSubmit}
					>
						Return to home
					</RoundButton>
				</View>
			</Modal>
		</Portal>
	);
};

export default SendMessageSuccessModal;
