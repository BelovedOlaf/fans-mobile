import { CheckBadgeSvg, PlusSvg } from "@assets/svgs/common";
import RoundButton from "@components/common/RoundButton";
import { FansText, FansView } from "@components/controls";
import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";
import React from "react";
import { Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import ReferralLink from "./ReferralLink";

interface CreatorCardProps {
	back_img: string;
	avatar_img: string;
	revenue: number;
	full_name: string;
	nick_name: string;
	verified?: boolean;
	description: string;
}

const CreatorCard: React.FC<CreatorCardProps> = ({
	back_img,
	avatar_img,
	revenue,
	full_name,
	nick_name,
	verified,
	description,
}) => {
	return (
		<FansView borderRadius={16} style={tw.style("border border-[#dedede]")}>
			<Image
				source={{
					uri: back_img,
				}}
				style={tw.style("w-full h-[80px] rounded-t-[16px]")}
			/>
			<FansView style={tw.style("absolute top-4 right-4")}>
				<FansView
					width={49}
					height={26}
					background="white"
					borderRadius={26}
					center
				>
					<FansText
						fontFamily="inter-semibold"
						fontSize={14}
						lineHeight={19}
					>
						{revenue}%
					</FansText>
				</FansView>
			</FansView>
			<FansView style={tw.style("p-[18px] -top-10 gap-5 -mb-10")}>
				<FansView style={tw.style("flex-row gap-3")}>
					<FansView
						size={79}
						borderRadius={40}
						style={tw.style("border-[4px] border-white")}
					>
						<Image
							source={{
								uri: avatar_img,
							}}
							style={tw.style("rounded-full w-full h-full")}
						/>
					</FansView>
					<FansView style={tw.style("top-7")}>
						<FansView center style={tw.style("flex-row gap-2")}>
							<FansText
								fontFamily="inter-bold"
								fontSize={19}
								lineHeight={26}
							>
								{full_name}
							</FansText>
							{verified && (
								<CheckBadgeSvg size={15.66} color="#A854F5" />
							)}
						</FansView>
						<FansText color="grey-70" fontSize={16} lineHeight={21}>
							{nick_name}
						</FansText>
					</FansView>
				</FansView>
				<FansText fontSize={16} lineHeight={21}>
					{description}
				</FansText>
				<RoundButton variant={RoundButtonType.SECONDARY}>
					Join Program
				</RoundButton>
			</FansView>
		</FansView>
	);
};

interface CreatorCard1Props {
	back_img: ImageSourcePropType;
	avatar_img: ImageSourcePropType;
	earning: number;
	popularity: number;
	full_name: string;
	nick_name: string;
	verified?: boolean;
	onPressCreateLink?: () => void;
}

export const CreatorCard1: React.FC<CreatorCard1Props> = ({
	back_img,
	avatar_img,
	earning,
	popularity,
	full_name,
	nick_name,
	verified,
	onPressCreateLink,
}) => {
	return (
		<FansView borderRadius={16} style={tw.style("border border-[#dedede]")}>
			<Image
				source={back_img}
				style={tw.style("w-full h-[80px] rounded-t-[16px]")}
			/>
			<FansView style={tw.style("absolute top-[18px] left-[18px]")}>
				<FansView
					style={tw.style(
						"bg-[#edfaea] rounded-full px-[12px] py-[2px]",
					)}
				>
					<FansText color="green-4d" fontSize={14} lineHeight={19}>
						EARNED ${earning}
					</FansText>
				</FansView>
			</FansView>
			<FansView style={tw.style("absolute top-[18px] right-[18px]")}>
				<FansView
					style={tw.style(
						"bg-[#edfaea] rounded-full px-[8px] py-[2px]",
					)}
				>
					<FansText color="green-4d" fontSize={14} lineHeight={19}>
						{popularity}%
					</FansText>
				</FansView>
			</FansView>
			<FansView
				style={tw.style("p-[18px] -top-[36px] gap-[9px] -mb-[36px]")}
			>
				<FansView style={tw.style("flex-row gap-[14px]")}>
					<FansView
						size={79}
						borderRadius={40}
						style={tw.style("border-[4px] border-white")}
					>
						<Image
							source={avatar_img}
							style={tw.style("w-full h-full rounded-full")}
						/>
					</FansView>
					<FansView style={tw.style("top-[28px]")}>
						<FansView center style={tw.style("flex-row gap-[7px]")}>
							<FansText
								fontFamily="inter-bold"
								fontSize={19}
								lineHeight={26}
							>
								{full_name}
							</FansText>
							{verified && (
								<CheckBadgeSvg size={15.66} color="#a854f5" />
							)}
						</FansView>
						<FansText color="grey-70" fontSize={16} lineHeight={21}>
							{nick_name}
						</FansText>
					</FansView>
				</FansView>
				<ReferralLink link="fyp.fans/henry/1345" />

				<RoundButton
					variant={RoundButtonType.SECONDARY}
					onPress={onPressCreateLink}
				>
					<FansView center style={tw.style("flex-row gap-2")}>
						<PlusSvg size={12.71} />
						<FansText
							fontFamily="inter-bold"
							fontSize={19}
							lineHeight={26}
						>
							Create link
						</FansText>
					</FansView>
				</RoundButton>
				<RoundButton variant={RoundButtonType.OUTLINE_SECONDARY}>
					View content
				</RoundButton>
			</FansView>
		</FansView>
	);
};

export default CreatorCard;
