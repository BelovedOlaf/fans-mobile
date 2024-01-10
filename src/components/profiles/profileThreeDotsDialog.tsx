import { FansDivider, FansText, FansView } from "@components/controls";
import { FypNullableView } from "@components/common/base";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import MenuItem from "@components/common/cardActions/menuItem";
import CustomRadio from "@components/common/customRadio";

import tw from "@lib/tailwind";
import { IconTypes, ProfileViewType } from "@usertypes/commonEnums";
import { ModalActionType, useAppContext } from "@context/useAppContext";
import { PROFILE_THREE_DOTS_DIALOG_ID } from "@constants/modal";
import { ModalState } from "@context/state/modalState";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { useFeatureGates } from "@state/featureGates";

import React, { FC, useState, useCallback, useEffect } from "react";
import { useSegments, useRouter } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Props {
	navigation?: NativeStackNavigationProp<
		ProfileNavigationStacks,
		"Profile" | "Edit",
		undefined
	>;
}

const ProfileThreeDotsDialog: FC<Props> = (props) => {
	const { navigation } = props;
	const router = useRouter();
	const segments = useSegments();
	const featureGates = useFeatureGates();

	const { state, dispatch } = useAppContext();
	const { profile } = state;
	const modals = state.modal.modals;
	const modal = modals.find(
		(m) => m.id === PROFILE_THREE_DOTS_DIALOG_ID,
	) as ModalState;
	const visible = !!modal && modal.show;

	const [viewOption, setViewOption] = useState<ProfileViewType>(
		ProfileViewType.Creator,
	);

	const handleClose = () => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: PROFILE_THREE_DOTS_DIALOG_ID, show: false },
		});
	};

	const onChangeViewingAs = useCallback((val: ProfileViewType) => {
		handleClose();
		if (val === ProfileViewType.Creator) {
			router.push({
				pathname: "profile",
				params: { screen: "Profile" },
			});
		} else if (val === ProfileViewType.Public) {
			router.push(`/${profile.profileLink.split("/").slice(-1)[0]}`);
		}
	}, []);

	const onClickEdit = useCallback(() => {
		handleClose();
		if (navigation) {
			navigation.navigate("Edit");
		} else {
			router.push({
				pathname: "profile",
				params: { screen: "Edit" },
			});
		}
	}, []);

	const onClickAnalytics = useCallback(() => {
		handleClose();
		router.push({ pathname: "settings", params: { screen: "Analytics" } });
	}, []);

	const onClickArchive = useCallback(() => {
		handleClose();
		if (navigation) {
			navigation.navigate("ArchivedPosts");
		} else {
			router.push({
				pathname: "profile",
				params: { screen: "ArchivedPosts" },
			});
		}
	}, []);

	const onClickPayouts = useCallback(() => {
		handleClose();
		if (navigation) {
			navigation.navigate("PayoutSetup");
		} else {
			router.push({
				pathname: "profile",
				params: { screen: "PayoutSetup" },
			});
		}
	}, []);

	useEffect(() => {
		const screenUrl = segments.join("/");
		if (screenUrl === "(tabs)/profile") {
			setViewOption(ProfileViewType.Creator);
		} else if (screenUrl === "(tabs)/[username]") {
			setViewOption(ProfileViewType.Public);
		} else {
			setViewOption(ProfileViewType.Members);
		}
	}, [segments.join("/")]);

	return (
		<BottomSheetWrapper open={visible} onClose={handleClose}>
			<FansView>
				<FansView>
					<MenuItem
						data={{
							title: "Edit Page",
							iconType: IconTypes.Edit,
							iconSize: 18,
							onClick: onClickEdit,
						}}
					/>
					<MenuItem
						data={{
							title: "Archived posts",
							iconType: IconTypes.ArchivedPost,
							iconSize: 24,
							onClick: onClickArchive,
						}}
					/>
					<MenuItem
						data={{
							title: "Analytics",
							iconType: IconTypes.Statistics,
							iconSize: 23,
							onClick: onClickAnalytics,
						}}
					/>
					<MenuItem
						data={{
							title: "Payouts",
							iconType: IconTypes.Fundraiser,
							iconSize: 24,
							onClick: onClickPayouts,
						}}
					/>
				</FansView>
				<FansView margin={{ t: 34 }} padding={{ x: 18 }}>
					<FansText
						fontSize={17}
						lineHeight={22}
						style={tw.style("font-semibold mb-2.5")}
					>
						Viewing as
					</FansText>
					<FansView
						height={52}
						flexDirection="row"
						alignItems="center"
					>
						<CustomRadio
							checked={viewOption === ProfileViewType.Creator}
							label="Creator"
							onPress={() =>
								onChangeViewingAs(ProfileViewType.Creator)
							}
						/>
					</FansView>
					<FypNullableView
						visible={featureGates.has(
							"2023_11_mobile_header_members_view",
						)}
					>
						<FansDivider />
						<FansView
							height={52}
							flexDirection="row"
							alignItems="center"
						>
							<CustomRadio
								checked={viewOption === ProfileViewType.Members}
								label="Members"
								onPress={() =>
									onChangeViewingAs(ProfileViewType.Members)
								}
							/>
						</FansView>
					</FypNullableView>

					<FansDivider />
					<FansView
						height={52}
						flexDirection="row"
						alignItems="center"
					>
						<CustomRadio
							checked={viewOption === ProfileViewType.Public}
							label="Public"
							onPress={() =>
								onChangeViewingAs(ProfileViewType.Public)
							}
						/>
					</FansView>
				</FansView>
			</FansView>
		</BottomSheetWrapper>
	);
};

export default ProfileThreeDotsDialog;
