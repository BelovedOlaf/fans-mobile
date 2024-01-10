import { View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { IconButton } from "react-native-paper";
import tw from "@lib/tailwind";

import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import CustomText from "@components/common/customText";
import {
	FansGap,
	FansText,
	FansTextInput3,
	FansView,
} from "@components/controls";
import { CloseSvg, PhonewithCashSvg } from "@assets/svgs/common";
import { useAppContext, CommonActionType } from "@context/useAppContext";
import RoundButton from "@components/common/RoundButton";
import { RoundButtonType } from "@usertypes/commonEnums";
import { IFansModal } from "@usertypes/components";
import * as apis from "@helper/endpoints";

const CreateNewLinkDialog: IFansModal = (props) => {
	const { onSubmit } = props;

	const { state, dispatch } = useAppContext();
	const { openCreateNewReferralLinkModal } = state.common;

	const [newLink, setNewLink] = useState("");
	const [loading, setLoading] = useState(false);

	const open = useMemo(
		() => (openCreateNewReferralLinkModal ? true : false),
		[openCreateNewReferralLinkModal],
	);

	const onClose = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleCreateNewReferralLinkModal,
			data: false,
		});
	};

	const handleCreateLink = useCallback(async () => {
		if (newLink) {
			setLoading(true);
			const resp = await apis.profile.createReferralLink({
				code: newLink,
			});

			setLoading(false);
			onClose();

			if (resp.ok) {
				onSubmit(newLink);
			}
		}
	}, [newLink]);

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
						Create new referral link
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
						onPress={handleCreateLink}
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
								Create link
							</FansText>
						</FansView>
					</RoundButton>
				</View>
			</View>
		</BottomSheetWrapper>
	);
};

export default CreateNewLinkDialog;
