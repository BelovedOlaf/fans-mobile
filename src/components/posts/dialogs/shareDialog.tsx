import {
	CommentSvg,
	CopyLinkSvg,
	InstagramSvg,
	NotInterestedSvg,
	SaveVideoSvg,
	SnapchatSvg,
	WarningSvg,
	WhatsappSvg,
} from "@assets/svgs/common";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import { FansDivider } from "@components/controls";
import { FypNullableView, FypText } from "@components/common/base";

import tw from "@lib/tailwind";
import { useFeatureGates } from "@state/featureGates";

import React, { FC } from "react";
import {
	ImageBackground,
	ScrollView,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
} from "react-native";

interface ShareOptionProps extends TouchableOpacityProps {
	title: string;
	icon: React.ReactNode;
	background: string;
}

export const ShareOption: FC<ShareOptionProps> = (props) => {
	const { title, icon, background, ...other } = props;

	return (
		<TouchableOpacity style={tw.style("items-center")} {...other}>
			<View
				style={tw.style(
					"w-[46px] h-[46px] rounded-full items-center justify-center relative",
					background,
				)}
			>
				{icon}
			</View>
			<Text
				style={tw.style(
					"text-[14px] text-black leading-[21px] text-center mt-2 max-w-[70px]",
				)}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

interface Props {
	open: boolean;
	onClose: () => void;
	onCopyLink?: () => void;
}

const ShareDialog: FC<Props> = (props) => {
	const { open, onClose, onCopyLink } = props;
	const featureGates = useFeatureGates();

	return (
		<BottomSheetWrapper open={open} onClose={onClose}>
			<View style={tw.style("pb-4")}>
				<FypText
					fontSize={19}
					lineHeight={26}
					fontWeight={700}
					textAlign="center"
					style={tw.style("mb-[35px]")}
				>
					Share to
				</FypText>

				<ScrollView
					horizontal
					contentContainerStyle={{
						paddingHorizontal: 18,
						columnGap: 20,
						justifyContent: "flex-start",
					}}
					showsHorizontalScrollIndicator={false}
				>
					<ShareOption
						title="Copy link"
						background="bg-fans-purple"
						onPress={onCopyLink}
						icon={
							<CopyLinkSvg
								width={24.35}
								height={24.36}
								color="#fff"
							/>
						}
					/>
					<FypNullableView
						visible={featureGates.has(
							"2023_11_story_share_options",
						)}
					>
						<ShareOption
							title="SMS"
							background="bg-[#6d83f7]"
							icon={
								<CommentSvg
									width={24.94}
									height={24.94}
									color="#fff"
								/>
							}
						/>

						<TouchableOpacity style={tw.style("items-center")}>
							<ImageBackground
								style={tw.style(
									"w-[46px] h-[46px] rounded-full items-center justify-center",
								)}
								source={require("@assets/images/posts/instagram-bg.png")}
								resizeMode="cover"
							>
								<InstagramSvg
									width={24.43}
									height={24.46}
									color="#fff"
								/>
							</ImageBackground>
							<Text
								style={tw.style(
									"text-[14px] text-black leading-[21px] text-center mt-2",
								)}
							>
								Instagram
							</Text>
						</TouchableOpacity>

						<ShareOption
							title="Whatsapp"
							background="bg-[#65d072]"
							icon={
								<WhatsappSvg
									width={24.74}
									height={24.75}
									color="#fff"
								/>
							}
						/>
						<ShareOption
							title="Snapchat"
							background="bg-[#fffc00]"
							icon={
								<SnapchatSvg
									width={25.91}
									height={24.94}
									color="#000"
								/>
							}
						/>
					</FypNullableView>
				</ScrollView>
				<FypNullableView
					visible={featureGates.has("2023_11_story_share_options")}
				>
					<FansDivider style={tw.style("mt-4 mb-[22px]")} />

					<ScrollView
						horizontal
						contentContainerStyle={{
							paddingHorizontal: 18,
							columnGap: 20,
							justifyContent: "flex-start",
						}}
						showsHorizontalScrollIndicator={false}
					>
						<ShareOption
							title="Report"
							background="bg-fans-grey"
							icon={
								<WarningSvg
									width={24.02}
									height={21.69}
									color="#000"
								/>
							}
						/>
						<ShareOption
							title="Not Interested"
							background="bg-fans-grey"
							icon={
								<NotInterestedSvg
									width={27}
									height={24.76}
									color="#000"
								/>
							}
						/>
						<ShareOption
							title="Save video"
							background="bg-fans-grey"
							icon={
								<SaveVideoSvg
									width={17.33}
									height={26}
									color="#000"
								/>
							}
						/>
					</ScrollView>
				</FypNullableView>
			</View>
		</BottomSheetWrapper>
	);
};

export default ShareDialog;
