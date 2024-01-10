import React from "react";
import { Image } from "react-native";

import { FansText, FansIconButton, FansView } from "@components/controls";
import { FypModal } from "@components/common/base";
import RoundButton from "../RoundButton";
import TextButton from "@components/common/TextButton";
import { CloseSvg } from "@assets/svgs/common";

import tw from "@lib/tailwind";
import { NOTICE_CHARGEBACKS_DIALOG_ID } from "@constants/modal";
import { ModalState } from "@context/state/modalState";
import { useAppContext, ModalActionType } from "@context/useAppContext";

const NoticeChargeBackDialog = () => {
	const { state, dispatch } = useAppContext();
	const modals = state.modal.modals;
	const modal = modals.find(
		(m) => m.id === NOTICE_CHARGEBACKS_DIALOG_ID,
	) as ModalState;
	const visible = !!modal && modal.show;

	const handleClose = () => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: NOTICE_CHARGEBACKS_DIALOG_ID, show: false },
		});
	};

	const onContactSupport = () => {};

	return (
		<FypModal
			visible={visible}
			onDismiss={handleClose}
			width={{ xs: "full", lg: 400 }}
		>
			<FansView position="relative" padding={{ x: 18, t: 38, b: 14 }}>
				<FansIconButton
					size={25}
					containerColor="rgba(0,0,0,0.3)"
					style={tw.style("absolute top-[13.5px] right-4")}
					onPress={handleClose}
				>
					<CloseSvg size={10} color="#fff" />
				</FansIconButton>
				<FansView style={tw.style("mx-auto")} margin={{ b: 18 }}>
					<Image
						source={require("@assets/images/common/charge-back.png")}
						width={80}
						height={80}
					/>
				</FansView>
				<FansText
					fontSize={23}
					lineHeight={31}
					style={tw.style("text-center font-bold mb-[22px]")}
				>
					Notice on Chargebacks
				</FansText>
				<FansView gap={10} margin={{ b: 24 }}>
					<FansText
						fontSize={16}
						lineHeight={21}
						style={tw.style("text-center")}
					>
						Dear [User’s First Name],
					</FansText>
					<FansText
						fontSize={16}
						lineHeight={21}
						style={tw.style("text-center")}
					>
						We’ve noted a chargeback initiated by you. Frequent
						chargebacks adversely affect our platform and community.
					</FansText>
					<FansText
						fontSize={16}
						lineHeight={21}
						style={tw.style("text-center")}
					>
						Further chargebacks will lead to the permanent
						termination of your FYP.Fans account for the trust and
						safety of all members.
					</FansText>
					<FansText
						fontSize={16}
						lineHeight={21}
						style={tw.style("text-center")}
					>
						If you have concerns, please contact our support first.
						We’re here to help.
					</FansText>
				</FansView>

				<RoundButton onPress={onContactSupport}>
					Contact Support
				</RoundButton>
				<TextButton onPress={handleClose}>Close</TextButton>
			</FansView>
		</FypModal>
	);
};

export default NoticeChargeBackDialog;
