import {
	CircledDiamondSvg,
	CircledDollarSvg,
	CommentSvg,
	CongratsSvg,
	CustomizeVideoSvg,
	GiveawaySvg,
	HeartSvg,
	ImageSvg,
	MailSvg,
	RevenueSvg,
	StarSvg,
	SubscriptionSvg,
	VideoCallSvg,
	WarningSvg,
} from "@assets/svgs/common";
import FundraisingSvg from "@assets/svgs/common/Fundraising";
import tw from "@lib/tailwind";
import { Colors } from "@usertypes/enums";
import React from "react";
import { Text } from "react-native";

export enum IconType {
	Subscription,
	Heart,
	At,
	Dollar,
	CustomizeVideo,
	Star,
	VideoCall,
	Mail,
	Giveaway,
	Fundraising,
	Image,
	Comment,
	Diamond,
	Congrats,
	Revenue,
	Warning,
}

export const icons: Record<IconType, React.ComponentType> = {
	[IconType.Subscription]: () => <SubscriptionSvg color={Colors.Purple} />,
	[IconType.Heart]: () => <HeartSvg color={Colors.Purple} />,
	[IconType.At]: () => (
		<Text style={tw.style("text-purple-500 mt-0")}>@</Text>
	),
	[IconType.Dollar]: () => <CircledDollarSvg colorFans="fans-purple" />,
	[IconType.CustomizeVideo]: () => <CustomizeVideoSvg />,
	[IconType.Star]: () => <StarSvg color="fans-purple" />,
	[IconType.VideoCall]: () => <VideoCallSvg />,
	[IconType.Mail]: () => <MailSvg color={Colors.Purple} />,
	[IconType.Giveaway]: () => <GiveawaySvg color={Colors.Purple} />,
	[IconType.Fundraising]: () => <FundraisingSvg color={Colors.Purple} />,
	[IconType.Image]: () => <ImageSvg size={12} color={Colors.Purple} />,
	[IconType.Comment]: () => <CommentSvg color="fans-purple" />,
	[IconType.Diamond]: () => <CircledDiamondSvg />,
	[IconType.Congrats]: () => <CongratsSvg />,
	[IconType.Revenue]: () => <RevenueSvg />,
	[IconType.Warning]: () => <WarningSvg color={Colors.Red} />,
};
