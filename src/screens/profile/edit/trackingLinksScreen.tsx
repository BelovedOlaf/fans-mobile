import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import CustomTopNavBar from "@components/common/customTopNavBar";
import {
	FansView,
	FansDivider,
	FansSvg,
	FansGap,
	FansIconButton,
	FansText,
} from "@components/controls";
import RoundButton from "@components/common/RoundButton";
import SearchTextInput from "@components/common/searchTextInput";
import { CreateLinkModal } from "@components/profiles";
import {
	PlusSvg,
	SortDescSvg,
	SortAscSvg,
	CopyLinkSvg,
	CopySvg,
	TrashSvg,
	CalendarSvg,
	UserSvg,
	CursorSvg,
} from "@assets/svgs/common";

import tw from "@lib/tailwind";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import {
	TextAlignStyle,
	ColorStyle1,
	FontFamilyStyle,
} from "@usertypes/styles";
import { RoundButtonType } from "@usertypes/commonEnums";

import React, { FC, useState } from "react";
import { ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated, { PinwheelIn, PinwheelOut } from "react-native-reanimated";

interface TrackingLinkPropertyProps {
	title: string;
	value: string;
	icon: React.ReactNode;
}

export const TrackingLinkProperty: FC<TrackingLinkPropertyProps> = (props) => {
	const { title, value, icon } = props;
	return (
		<FansView
			flexDirection="row"
			alignItems="center"
			justifyContent="between"
		>
			<FansView flexDirection="row" alignItems="center">
				<FansView
					width={18}
					margin={{ r: 8 }}
					justifyContent="center"
					alignItems="center"
				>
					{icon}
				</FansView>
				<FansText
					color="grey-70"
					fontSize={16}
					lineHeight={21}
					style={tw.style("font-medium")}
				>
					{title}
				</FansText>
			</FansView>
			<FansText
				fontSize={15}
				lineHeight={20}
				style={tw.style("font-semibold")}
			>
				{value}
			</FansText>
		</FansView>
	);
};

export const TrackingLink: FC = () => {
	return (
		<FansView
			border={1}
			borderRadius={15}
			borderColor="grey-f0"
			padding={16}
		>
			<FansView
				border={1}
				borderRadius={42}
				height={42}
				borderColor="grey-de"
				alignItems="center"
				padding={4}
				flexDirection="row"
				margin={{ b: 20 }}
			>
				<FansView
					width={34}
					height={34}
					background={ColorStyle1.Purple}
					borderRadius={34}
					alignItems="center"
					justifyContent="center"
					margin={{ r: 8 }}
				>
					<CopyLinkSvg size={17.7} color="#fff" />
				</FansView>
				<FansView flex="1">
					<FansText fontSize={16} lineHeight={21}>
						fyp.fans/henry/1234
					</FansText>
				</FansView>
				<FansView gap={7} flexDirection="row">
					<FansIconButton size={34} containerColor="#f0f0f0">
						<CopySvg size={16.3} color="#000" />
					</FansIconButton>
					<FansIconButton size={34} containerColor="#f0f0f0">
						<TrashSvg size={15} color="#eb2121" />
					</FansIconButton>
				</FansView>
			</FansView>

			<FansView gap={10}>
				<TrackingLinkProperty
					title="DATE Created"
					value="OCT 3, 2023"
					icon={<CalendarSvg size={18} color="#707070" />}
				/>
				<FansDivider color="fans-grey-f0" />
				<TrackingLinkProperty
					title="SUBSCRIBERS"
					value="590"
					icon={
						<UserSvg width={15.43} height={15.71} color="#707070" />
					}
				/>
				<FansDivider color="fans-grey-f0" />
				<TrackingLinkProperty
					title="CLICKS"
					value="1750"
					icon={<CursorSvg size={16} color="#707070" />}
				/>
			</FansView>
		</FansView>
	);
};

const TrackingLinksScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "TrackingLinks">,
) => {
	const { navigation } = props;
	const [openLinkModal, setOpenLinkModal] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");

	const handlePressSort = () => {
		setOrderBy(orderBy === "asc" ? "desc" : "asc");
	};

	return (
		<AppLayout
			title="Edit Profile | FYP.Fans"
			description="FYP.Fans allows creators to make an income doing what they love!"
		>
			<FansView flex="1">
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title="Tracking links"
							onClickLeft={() => navigation.goBack()}
						/>
						<FansView padding={{ x: 18, t: 24 }}>
							<FansText
								fontSize={16}
								lineHeight={21}
								style={tw.style("mb-11", "text-center")}
							>
								Create and share separate links for your
								campaigns
							</FansText>
							<RoundButton
								variant={RoundButtonType.OUTLINE_PRIMARY}
								onPress={() => setOpenLinkModal(true)}
							>
								<FansSvg
									svg={PlusSvg}
									size={12.7}
									color="#a854f5"
									style={tw.style("mr-2.5")}
								/>
								Craete new tracking link
							</RoundButton>

							<FansView margin={{ t: 24, b: 24 }}>
								<SearchTextInput
									value={searchText}
									onChangeText={setSearchText}
								/>
							</FansView>
							<FansView
								touchableOpacityProps={{
									onPress: handlePressSort,
								}}
								flexDirection="row"
								margin={{ b: 28 }}
							>
								<FansSvg
									width={16.76}
									height={14.05}
									svg={
										orderBy === "asc"
											? SortAscSvg
											: SortDescSvg
									}
									color={tw.color(ColorStyle1.GreyDark)}
								/>
								<FansGap width={13.2} />
								<Animated.View
									entering={PinwheelIn}
									exiting={PinwheelOut}
								>
									<FansText
										color="grey-70"
										fontFamily="inter-medium"
										fontSize={17}
									>
										{orderBy === "asc"
											? "Newest first"
											: "Oldest first"}
									</FansText>
								</Animated.View>
							</FansView>

							<FansView gap={10}>
								<TrackingLink />
								<TrackingLink />
							</FansView>
						</FansView>
					</LayoutContentsContainer>
				</ScrollView>
			</FansView>
			<CreateLinkModal
				visible={openLinkModal}
				onClose={() => setOpenLinkModal(false)}
			/>
		</AppLayout>
	);
};

export default TrackingLinksScreen;
