import {
	ArchivedPostSvg,
	ChevronLeftSvg,
	CloseSvg,
	FundSvg,
	ImageSvg,
	MusicSvg,
	PollSvg,
	StorySvg,
	TextSvg,
	ThreeDotsSvg,
	VideoCallSvg,
} from "@assets/svgs/common";
import tw from "@lib/tailwind";
import { ComponentSizeTypes } from "@usertypes/commonEnums";
import React, { FC } from "react";
import { Pressable, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Title from "./Title";

interface Props {
	title: string;
	onClickLeft: () => void;
	onClickRight?: () => void;
	rightLabel?: string;
	rightLabelColor?: string;
	titleIcon?:
		| "photo"
		| "audio"
		| "poll"
		| "text"
		| "fundraiser"
		| "video"
		| "archived-post"
		| "story";
	leftIcon?: "close";
	rightIcon?: "menu";
	hideLeftIcon?: boolean;
	style?: string;
	darkMode?: boolean;
	loading?: boolean;
}

const CustomTopNavBar: FC<Props> = (props) => {
	const {
		title,
		onClickLeft,
		onClickRight,
		rightLabel,
		rightLabelColor,
		titleIcon,
		leftIcon,
		rightIcon,
		hideLeftIcon,
		style,
		darkMode = false,
		loading,
	} = props;

	const getTitleIcon = () => {
		switch (titleIcon) {
			case "photo":
				return <ImageSvg width={13.73} height={13.73} color="#000" />;
			case "video":
				return (
					<VideoCallSvg width={15.07} height={13.98} color="#000" />
				);
			case "audio":
				return <MusicSvg width={13.18} height={14.86} color="#000" />;
			case "poll":
				return <PollSvg width={15.1} height={15.1} color="#000" />;
			case "text":
				return <TextSvg width={18.81} height={13.58} color="#000" />;
			case "fundraiser":
				return <FundSvg width={9.8} height={13.83} color="#000" />;
			case "archived-post":
				return (
					<ArchivedPostSvg
						width={15.15}
						height={15.24}
						color="#000"
					/>
				);
			case "story":
				return <StorySvg width={14.58} height={14.55} color="#000" />;
			default:
				return null;
		}
	};

	const getLeftIcon = () => {
		if (hideLeftIcon) {
			return null;
		} else {
			switch (leftIcon) {
				case "close":
					return (
						<CloseSvg
							width={12.83}
							height={12.83}
							color={darkMode ? "#FFF" : "#707070"}
						/>
					);
				default:
					return (
						<ChevronLeftSvg
							width={8}
							height={14.6}
							color={darkMode ? "#FFF" : "#707070"}
						/>
					);
			}
		}
	};

	return (
		<View
			style={tw.style(
				"relative py-3 flex justify-center border-b border-fans-grey md:pb-[38px] md:pt-[35px]",
				style,
				darkMode && "border-[#2E2E2E]",
			)}
		>
			<Pressable
				style={[
					tw.style(
						"absolute left-[18px] w-6 h-6 flex items-center justify-center",
					),
					{
						transform: [{ translateX: -10 }],
					},
				]}
				onPress={onClickLeft}
			>
				{getLeftIcon()}
			</Pressable>

			<View
				style={tw.style("mx-auto flex-row items-center gap-x-[10px]")}
			>
				{getTitleIcon()}
				<Title
					size={ComponentSizeTypes.lg}
					style={`md:text-[23px] md:leading-[31px] ${
						darkMode && "text-fans-white"
					}`}
				>
					{title}
				</Title>
			</View>
			<Pressable
				style={tw.style(
					"absolute right-[18px] flex-row items-center",
					!onClickRight && "hidden",
				)}
				onPress={onClickRight}
			>
				<ActivityIndicator
					animating={!!loading}
					color="#a854f5"
					size={16}
				/>
				<Title
					style={`text-${
						rightLabelColor || "fans-purple"
					} md:text-[19px] md:leading-[26px] ml-2`}
				>
					{rightLabel}
				</Title>
			</Pressable>
			{rightIcon === "menu" ? (
				<Pressable
					style={tw.style("absolute right-[18px] h-5 justify-center")}
					onPress={onClickRight}
				>
					<ThreeDotsSvg width={17.4} height={3.55} color="#000" />
				</Pressable>
			) : null}
		</View>
	);
};

export default CustomTopNavBar;
