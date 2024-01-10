import { View, Text, Image } from "react-native";
import React, { FC, useCallback } from "react";
import tw from "@lib/tailwind";
import { Modal, Portal, IconButton } from "react-native-paper";

import RoundButton from "@components/common/RoundButton";
import { CloseSvg } from "@assets/svgs/common";
import { RoundButtonType } from "@usertypes/commonEnums";
import { ModalActionType, useAppContext } from "@context/useAppContext";
import { BLOCK_CREATOR_MODAL_ID } from "@constants/modal";
import { ModalState } from "@context/state/modalState";
import { useRouter } from "expo-router";
import { blockProfile } from "@helper/endpoints/profile/apis";
import Toast from "react-native-toast-message";
import { FansSvg, FansText } from "@components/controls";
import { SubmitImage } from "@assets/svgs";

const BlockCreatorModal: FC = () => {
	const { state, dispatch } = useAppContext();
	const router = useRouter();
	const modal = state.modal.modals.find(
		(m) => m.id === BLOCK_CREATOR_MODAL_ID,
	) as ModalState<{ profileId: string; username: string }>;
	const { profileId, username } = modal?.payload ?? {};

	const handleClose = useCallback(() => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: BLOCK_CREATOR_MODAL_ID, show: false },
		});
	}, []);

	const handleSubmit = useCallback(async () => {
		if (profileId) {
			const resp = await blockProfile(null, {
				id: profileId,
			});
			if (resp.ok) {
				dispatch.setModal({
					type: ModalActionType.showModal,
					data: { id: BLOCK_CREATOR_MODAL_ID, show: false },
				});
			} else {
				Toast.show({
					type: "error",
					text1: resp.data.message,
				});
			}
		}
	}, [profileId, username]);

	return (
		<Portal>
			<Modal
				visible={!!modal && modal.show}
				onDismiss={handleClose}
				contentContainerStyle={tw.style(
					"lg:w-[741px]",
					"lg:self-center",
					"bg-white rounded-[15px]",
					"mx-[15px]",
				)}
			>
				<View style={tw.style("flex gap-[10px]", "mx-4 my-5")}>
					<IconButton
						icon={() => (
							<CloseSvg width={9.33} height={9.33} color="#fff" />
						)}
						mode="contained"
						containerColor="rgba(0,0,0,0.3)"
						style={tw.style(
							"w-[25px] h-[25px] absolute top-[0px] right-[0px]",
						)}
						onPress={handleClose}
					/>
					<View style={tw.style("self-center")}>
						<FansSvg width={81.26} height={78} svg={SubmitImage} />
					</View>
					<FansText
						fontFamily="inter-bold"
						fontSize={23}
						textAlign="center"
					>
						Submitted
					</FansText>
					<FansText
						fontFamily="inter-semibold"
						fontSize={17}
						style={tw.style("my-2")}
					>
						Current status
					</FansText>
					<FansText>
						We've received your report and have temporarily
						concealed the contentious post from your view
					</FansText>
					<FansText
						fontFamily="inter-semibold"
						fontSize={17}
						style={tw.style("my-2")}
					>
						Next steps
					</FansText>
					<FansText>
						Our team will need a few days to assess your report, but
						rest assured we are working on it
					</FansText>
					<FansText style={tw.style("mt-4 mb-2")}>
						Prevent @{username} from following you, seeing your
						posts, or messaging you by blocking them, which will
						also disable their tweets and notifications from
						appearing to you
					</FansText>
					<RoundButton
						variant={RoundButtonType.OUTLINE}
						color="#F00"
						onPress={handleSubmit}
					>
						Block @{username}
					</RoundButton>
				</View>
			</Modal>
		</Portal>
	);
};

export default BlockCreatorModal;
