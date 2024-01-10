import React, { useEffect, useState } from "react";
import {
	View,
	TouchableOpacity,
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native";
import {
	FansGap,
	FansText,
	FansView,
	FansDivider,
	FansButton3,
} from "@components/controls";

import { IProfileSettings } from "@usertypes/types";

import {
	updateVideoSettings,
	getUserSettings,
	updateFanProfileSettings,
} from "@helper/endpoints/profile/apis";
import { ProfileActionType, useAppContext } from "@context/useAppContext";
import {
	Check2Svg,
	Close2Svg,
	DiscordSvg,
	TikTokSvg,
	Twitter2Svg,
	YouTubeSvg,
	TitleSvg,
	InstagramSvg,
	TikTokFanProfileSvg,
	SingleGem,
	DiamondTextLogoSvg,
	SearchSvg,
	CloseSvg,
	SnapchatSvg,
	TwitterSvg,
} from "@assets/svgs/common";
import tw from "@lib/tailwind";
import { Colors } from "@usertypes/enums";
import { SocialMediaTypes } from "@constants/socialMediaTypes";
import RoundButton from "@components/common/RoundButton";
import { RoundButtonType } from "@usertypes/commonEnums";
import LinkSocialModal from "./LinkSocialModal";

import Instagram from "@assets/svgs/coloured/Instagram";
import Tiktok from "@assets/svgs/coloured/Tiktok";
import Discord from "@assets/svgs/coloured/Discord";
import X from "@assets/svgs/coloured/X";
import Snapchat from "@assets/svgs/coloured/Snapchat";
import Youtube from "@assets/svgs/coloured/Youtube";
import Facebook from "@assets/svgs/coloured/Facebook";
import Twitch from "@assets/svgs/coloured/Twitch";
import Kick from "@assets/svgs/coloured/Kick";
import Telegram from "@assets/svgs/coloured/Telegram";
import Reddit from "@assets/svgs/coloured/Reddit";
import Linkedin from "@assets/svgs/coloured/Linkedin";

//import Snapchat from "@components/socialIcons/snapchat";

type SocialMediaItem = {
	id: string;
	icon: JSX.Element;
	title: string;
	value?: string; // Assuming value is optional, adjust if necessary
};

const SocialMediaIcons = [
	{
		id: "instagram",
		icon: <Instagram size={46} />,
		title: "Instagram",
	},
	{
		id: "discord",
		icon: <Discord size={46} color={Colors.White} />,
		title: "Discord",
	},
	{
		id: "tiktok",
		icon: <Tiktok size={46} color={Colors.White} />,
		title: "Tiktok",
	},
	{
		id: "x",
		icon: <X size={46} color={Colors.White} />,
		title: "X",
	},
	{
		id: "snapshat",
		icon: <Snapchat size={46} color={Colors.Black} />,
		title: "Snapshat",
	},
	{
		id: "youtube",
		icon: <Youtube size={46} color={Colors.White} />,
		title: "Youtube",
	},
	{
		id: "facebook",
		icon: <Facebook size={46} color={Colors.White} />,
		title: "Facebook",
	},
	{
		id: "twitch",
		icon: <Twitch size={46} color={Colors.White} />,
		title: "Twitch",
	},
	{
		id: "kick",
		icon: <Kick size={46} color={Colors.White} />,
		title: "Kick",
	},
	{
		id: "telegram",
		icon: <Telegram size={46} color={Colors.White} />,
		title: "Telegram",
	},
	{
		id: "reddit",
		icon: <Reddit size={46} color={Colors.White} />,
		title: "Reddit",
	},
	{
		id: "linkedin",
		icon: <Linkedin size={46} color={Colors.White} />,
		title: "Linkedin",
	},
];

const Step2: React.FC = () => {
	const { state, dispatch } = useAppContext();
	const [showAll, setShowAll] = useState(false);
	const { settings } = state.profile;
	const socialMedias = settings?.fanProfile?.socialMedias;

	console.log("socialMedias");

	console.log(socialMedias);

	const socialMediaArray = (): SocialMediaItem[] => {
		return SocialMediaIcons.map((socialMedia) => {
			const socialMediaValue = socialMedias.find(
				(media) => media.id === socialMedia.id,
			);

			const value = socialMediaValue ? socialMediaValue.value : ""; // Default value if socialMediaValue is undefined

			return {
				id: socialMedia.id,
				title: socialMedia.title,
				icon: socialMedia.icon,
				value: value,
			};
		});
	};

	const displayedSocialMedia = showAll
		? socialMediaArray()
		: socialMediaArray().slice(0, 5);

	const handleShowMore = () => {
		setShowAll(true);
	};

	const [showModal, setShowModal] = useState(false);
	const [selectedSocialMedia, setSelectedSocialMedia] =
		useState<SocialMediaItem | null>(null);

	const handleLinkModal = (socialMediaItem: SocialMediaItem) => {
		setSelectedSocialMedia(socialMediaItem);
		setShowModal(true);
	};

	const handleUnlinkModal = (socialMediaItem: SocialMediaItem) => {
		setSelectedSocialMedia(socialMediaItem);
		handleLink("");
	};

	const handleLink = async (username: string) => {
		if (selectedSocialMedia) {
			const updatedSocialMedias = socialMedias.map((socialMedia) => {
				if (socialMedia.id === selectedSocialMedia.id) {
					return {
						...socialMedia,
						value: username,
					};
				}
				return socialMedia;
			});

			const updatedFanProfile = {
				...state.profile.settings.fanProfile,
				socialMedias: updatedSocialMedias,
			};

			const updatedSettings = {
				...state.profile.settings,
				fanProfile: updatedFanProfile,
			};
			console.log("updatedSettings");
			console.log(updatedSettings);
			const data = await updateSettings(updatedSettings);

			// Close modal after linking
			setShowModal(false);
		}
	};

	const updateSettings = async (updatedSettings: IProfileSettings) => {
		const response = await updateFanProfileSettings(updatedSettings);

		if (response.ok) {
			fetchProfileSettings();
		}
	};

	const fetchProfileSettings = async () => {
		const response = await getUserSettings();
		if (response.ok) {
			const profileSettings = response.data;
			dispatch.setProfile({
				type: ProfileActionType.updateSettings,
				data: profileSettings,
			});
		}
	};

	useEffect(() => {
		fetchProfileSettings();
	}, []);

	const renderSocialMediaItem = (socialMediaItem: SocialMediaItem) => {
		return (
			<React.Fragment key={socialMediaItem.id}>
				<FansView
					style={tw.style(
						"flex-row gap-[10px] items-center",
						"my-[15px]",
					)}
				>
					<FansView style={tw.style("p-[10px]", "rounded-full")}>
						{socialMediaItem.icon}
					</FansView>
					<FansView style={tw.style("grow")}>
						<FansText fontFamily="inter-semibold" fontSize={19}>
							{socialMediaItem.title}
						</FansText>
						<FansText
							style={tw.style("text-[12px] text-fans-grey-dark")}
						>
							{socialMediaItem.value}
						</FansText>
					</FansView>
					<FansButton3
						width={106.5}
						title={socialMediaItem.value ? "Unlink" : "Link"}
						buttonStyle={true && { backgroundColor: "white" }}
						textStyle1={true && { color: "purple" }}
						onPress={() =>
							socialMediaItem.value
								? handleUnlinkModal(socialMediaItem)
								: handleLinkModal(socialMediaItem)
						}
					/>
				</FansView>
				<FansDivider />
			</React.Fragment>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<FansView>
				<FansView>
					<FansGap height={34} />
					<FansText
						textAlign="center"
						fontFamily="inter-semibold"
						fontSize={27}
					>
						Link social media
					</FansText>
					<FansGap height={12} />
					<FansText textAlign="center" fontSize={16}>
						Link your socials. They will appear on your profile, for
						those who'd like to know more about you
					</FansText>
				</FansView>
				<FansGap height={42} />
				<>
					{displayedSocialMedia.map(
						(socialMediaItem: SocialMediaItem) =>
							socialMediaItem
								? renderSocialMediaItem(socialMediaItem)
								: null,
					)}

					{selectedSocialMedia && (
						<>
							<LinkSocialModal
								visible={showModal}
								onClose={() => setShowModal(false)}
								onLink={handleLink}
								icon={selectedSocialMedia.icon}
								socialNetworkName={selectedSocialMedia.title}
							/>
						</>
					)}
				</>
			</FansView>

			{!showAll && (
				<View>
					<RoundButton
						variant={RoundButtonType.OUTLINE_PRIMARY}
						onPress={handleShowMore}
					>
						Show more
					</RoundButton>
				</View>
			)}

			<FansGap height={39.9} />
		</View>
	);
};

export default Step2;
