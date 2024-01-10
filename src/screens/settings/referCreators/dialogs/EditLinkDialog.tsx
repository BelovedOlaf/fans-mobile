import { View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IconButton } from "react-native-paper";
import tw from "@lib/tailwind";

import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import CustomText from "@components/common/customText";
import {
	FansButton3,
	FansGap,
	FansText,
	FansTextInput3,
	FansView,
} from "@components/controls";
import { CloseSvg, PhonewithCashSvg } from "@assets/svgs/common";
import { useAppContext, CommonActionType } from "@context/useAppContext";
import RoundButton from "@components/common/RoundButton";
import { RoundButtonType } from "@usertypes/commonEnums";
import DeleteLinkModal from "../modal/DeleteLinkModal";
import * as apis from "@helper/endpoints";
import { CreatorReferral } from "@usertypes/types";

const EditLinkDialog = (props: {
	referral: CreatorReferral;
	onDeleteLink: () => void;
}) => {
	const { state, dispatch } = useAppContext();
	const { openEditReferralLinkModal } = state.common;

	const [newLink, setNewLink] = useState(props.referral.code ?? "");
	const [loading, setLoading] = useState(false);
	const [isDeleteLinkModalOpened, setDeleteLinkModalOpened] = useState(false);

	useEffect(() => {
		setNewLink(props.referral.code ?? "");
	}, [props, props.referral, props.referral.code]);

	const open = useMemo(
		() => (openEditReferralLinkModal ? true : false),
		[openEditReferralLinkModal],
	);

	const onClose = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleEditReferralLinkModal,
			data: false,
		});
	};

	const handleSaveLink = useCallback(async () => {
		if (newLink) {
			setLoading(true);
			await apis.profile.updateReferralLink(
				{
					code: newLink,
				},
				{
					id: props.referral.id,
				},
			);

			setLoading(false);
			onClose();
		}
	}, [newLink]);

	const handleDeleteLink = () => {
		setDeleteLinkModalOpened(true);
	};

	const handleCloseDeleteLinkModal = () => {
		setDeleteLinkModalOpened(false);
	};
	const handleSubmitDeleteLinkModal = async () => {
		handleCloseDeleteLinkModal();

		setLoading(true);
		const resp = await apis.profile.deleteReferralLink(
			{},
			{ id: props.referral.id },
		);

		setLoading(false);
		onClose();

		if (resp.ok) {
			props.onDeleteLink();
		}
	};

	return (
		<BottomSheetWrapper
			open={open}
			onClose={onClose}
			dialogWrapperStyle="md:max-w-[740px]"
			topLineStyle="md:hidden"
		>
			<View style={tw.style("pb-3 md:pb-0 px-[19px] md:px-[32px]")}>
				<View
					style={tw.style(
						"relative md:pb-[34px] md:pt-[15px] items-center",
					)}
				>
					<View
						style={tw.style(
							"hidden absolute right-[0px] top-[6px] md:flex w-7.5 h-7.5",
						)}
					>
						<IconButton
							icon={() => <CloseSvg size={13.2} color="#fff" />}
							containerColor="rgba(0,0,0,0.3)"
							style={tw.style("m-0 w-7.5 h-7.5 ")}
							onPress={onClose}
						/>
					</View>

					<PhonewithCashSvg width={70.6} height={65.3} />

					<FansGap height={20} />

					<CustomText
						size="xl"
						style="font-bold text-center md:text-[23px] md:leading-[31px]"
					>
						Edit referral link
					</CustomText>

					<FansGap height={13} />

					<FansText
						fontFamily="inter-regular"
						fontSize={16}
						textAlign="center"
					>
						Earn LIFETIME 10% on creators income when they sign up
						with your link
					</FansText>

					<FansGap height={{ xs: 21, lg: 37.6 }} />

					<FansView
						width="full"
						flexDirection="row"
						alignItems="center"
					>
						<FansText fontSize={18}>fyp.fans/?r=</FansText>
						<FansGap width={10} />
						<FansTextInput3
							grow
							value={newLink}
							onChangeText={setNewLink}
						/>
					</FansView>

					<FansGap height={23} />

					<RoundButton
						disabled={loading || newLink.length === 0}
						variant={RoundButtonType.SECONDARY}
						customStyles="w-full"
						onPress={handleSaveLink}
					>
						<FansView
							style={tw.style(
								"flex flex-row items-center gap-[10px]",
							)}
						>
							<FansText
								fontSize={19}
								style={tw.style("font-inter-bold")}
							>
								Save link
							</FansText>
						</FansView>
					</RoundButton>

					<FansGap height={9} />

					<FansButton3
						disabled={loading}
						buttonStyle={{
							backgroundColor: "white",
							borderColor: "red-eb",
						}}
						textStyle1={{
							color: "red-eb",
						}}
						title="Delete link"
						onPress={handleDeleteLink}
						height={42}
						style={{ width: "100%" }}
					/>

					<DeleteLinkModal
						visible={isDeleteLinkModalOpened}
						onClose={handleCloseDeleteLinkModal}
						onSubmit={handleSubmitDeleteLinkModal}
					/>
				</View>
			</View>
		</BottomSheetWrapper>
	);
};

export default EditLinkDialog;
