import { View, Text, Pressable, PressableProps } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import * as CommonSvgs from "@assets/svgs/common";
import { FansView } from "@components/controls";

interface Props extends PressableProps {
	title: string;
}

const MenuItem: FC<Props> = (props) => {
	const { title, ...others } = props;

	const getIcon = () => {
		switch (title) {
			case "Search":
				return (
					<CommonSvgs.LargeSearch
						width={24}
						height={24}
						color="#000"
					/>
				);
			case "Subscriptions":
				return (
					<CommonSvgs.HeartSvg width={24} height={24} color="#000" />
				);
			case "Collections":
				return (
					<CommonSvgs.BookmarkSvg
						width={20}
						height={22}
						color="#000"
					/>
				);
			case "Refer creators":
				return (
					<CommonSvgs.RefferalSvg
						width={25}
						height={25}
						color="#000"
					/>
				);
			case "Settings":
				return (
					<CommonSvgs.SettingSvg
						width={25}
						height={25}
						color="#000"
					/>
				);
			case "Your cards":
				return (
					<CommonSvgs.PaymentSvg
						width={24}
						height={24}
						color="#000"
					/>
				);
			case "View profile page":
			case "Become a creator":
				return <CommonSvgs.EditUserSvg width={27.3} height={26.23} />;
			case "Support":
				return (
					<CommonSvgs.SupportSvg
						width={25}
						height={25}
						color="#000"
					/>
				);
			case "Log out":
				return (
					<CommonSvgs.LogoutSvg
						width={23.3}
						height={24}
						color="#000"
					/>
				);
			case "English":
				return (
					<CommonSvgs.LanguageSvg
						width={24}
						height={24}
						color="#000"
					/>
				);

			// settings icons
			case "Account":
				return (
					<CommonSvgs.UserSvg
						width={22.6}
						height={23}
						color="#a854f5"
					/>
				);
			case "Payments":
				return (
					<CommonSvgs.CircleTipSvg
						width={24}
						height={23}
						color="#a854f5"
					/>
				);
			case "Analytics":
				return (
					<CommonSvgs.AnalyticsSvg
						width={25}
						height={24.9}
						color="#a854f5"
					/>
				);
			case "Referral setup":
				return (
					<CommonSvgs.RefferalSvg
						width={25.52}
						height={22.86}
						color="#a854f5"
					/>
				);
			case "Privacy & Safety":
				return (
					<CommonSvgs.PrivacySvg
						width={21.33}
						height={24}
						color="#a854f5"
					/>
				);
			case "Notifications":
				return (
					<CommonSvgs.NotificationSvg
						width={22.47}
						height={25}
						color="#a854f5"
					/>
				);
			case "Discord integration":
				return (
					<CommonSvgs.IntegrationSvg
						width={24}
						height={24}
						color="#a854f5"
					/>
				);
			case "Automated chats":
				return (
					<CommonSvgs.ChatSvg
						width={23.61}
						height={23.61}
						color="#a854f5"
					/>
				);
			case "Scheduled posts":
				return (
					<CommonSvgs.CalendarSvg
						width={21.42}
						height={24}
						color="#a854f5"
					/>
				);
			default:
				null;
		}
	};

	return (
		<Pressable
			style={tw.style(
				"relative flex-row items-center h-[38px] pl-[55px] lg:pl-[62px] lg:h-13",
			)}
			{...others}
		>
			<View style={tw.style("absolute left-[15px]")}>{getIcon()}</View>
			<Text
				style={tw.style(
					"text-black flex-1 text-[14px] leading-[17px] lg:text-[18px] lg:leading-6",
				)}
			>
				{title}
			</Text>
			<FansView style={tw.style("w-[8.3px] h-[14.4px]")}>
				<CommonSvgs.ChevronRightSvg
					color={tw.color("fans-grey-dark")}
				/>
			</FansView>
		</Pressable>
	);
};

export default MenuItem;
