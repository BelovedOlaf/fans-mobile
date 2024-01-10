import React from "react";
import { Image } from "react-native";

import { FansText, FansIconButton, FansView } from "@components/controls";
import { FypModal } from "@components/common/base";
import RoundButton from "../RoundButton";
import TextButton from "@components/common/TextButton";
import { CloseSvg } from "@assets/svgs/common";

import tw from "@lib/tailwind";
import { FAIR_TRANSACTION_DIALOG_ID } from "@constants/modal";
import { ModalState } from "@context/state/modalState";
import { useAppContext, ModalActionType } from "@context/useAppContext";
import { RoundButtonType } from "@usertypes/commonEnums";
import FansLink from "../link";

const FairTransactionDialog = () => {
	const { state, dispatch } = useAppContext();
	const modals = state.modal.modals;
	const modal = modals.find(
		(m) => m.id === FAIR_TRANSACTION_DIALOG_ID,
	) as ModalState;
	const visible = !!modal && modal.show;

	const handleClose = () => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: FAIR_TRANSACTION_DIALOG_ID, show: false },
		});
	};

	const onContactSupport = () => {};

	const onLearnMore = () => {};

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
						source={require("@assets/images/common/transactions.png")}
						width={87.7}
						height={81.15}
					/>
				</FansView>
				<FansText
					fontSize={23}
					lineHeight={31}
					style={tw.style("text-center font-bold mb-[18px]")}
				>
					IMPORTANT READ: {"\n"} Fair Transactions
				</FansText>
				<FansView gap={30} margin={{ b: 24 }}>
					<FansText
						fontSize={16}
						lineHeight={21}
						style={tw.style("text-center")}
					>
						If you are unhappy by a purchase,{" "}
						<FansLink url="https://support.fyp.fans/">
							CONTACT US
						</FansLink>
						, not your bank, and we will FULLY REFUND YOU, without
						any questions asked.
					</FansText>
					<FansText
						fontSize={16}
						lineHeight={21}
						style={tw.style("text-center")}
					>
						At FYP.Fans, trust and community safety are central. If
						you face transaction issues, please contact our support
						before initiating a chargeback through your bank.
					</FansText>
					<FansText
						fontSize={16}
						lineHeight={21}
						style={tw.style("text-center")}
					>
						Direct chargebacks without prior communication will lead
						to permanent account termination. We appreciate your
						understanding and cooperation.
					</FansText>
				</FansView>

				<FansView gap={8}>
					<RoundButton
						onPress={onLearnMore}
						variant={RoundButtonType.OUTLINE_PRIMARY}
					>
						Learn more
					</RoundButton>
					<RoundButton onPress={onContactSupport}>
						Contact Support
					</RoundButton>
					<TextButton onPress={handleClose}>Close</TextButton>
				</FansView>
			</FansView>
		</FypModal>
	);
};

export default FairTransactionDialog;
