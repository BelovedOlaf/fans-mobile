import tw from "@lib/tailwind";
import clsx from "clsx";
import React, { FC, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

import { CheckSvg } from "@assets/svgs/common";
import { FypVideo } from "@components/common/base";
import { cdnURL } from "@helper/Utils";
import { ResizeMode } from "@usertypes/commonEnums";

interface Props {
	colSpan: number;
	onPress: () => void;
	orderNumber?: number;
	orderAble?: boolean;
	selectAble?: boolean;
	style?: string;
	uri: string;
	isVideo?: boolean;
	sizeRate?: number;
}

const ImagePostChip: FC<Props> = (props) => {
	const {
		colSpan,
		onPress,
		orderNumber,
		orderAble,
		style,
		uri,
		selectAble,
		isVideo,
		sizeRate = 1,
	} = props;

	const isSelected = (orderNumber ?? 0) > 0;

	const [width, setWidth] = useState(0);

	const size = `w-1/${colSpan} h-[${width * sizeRate}px]`;

	console.log("ImagePostChip.uri", uri);

	return (
		<Pressable
			style={tw.style(clsx("relative border border-white", size, style))}
			onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
			onPress={onPress}
		>
			{isVideo ? (
				<FypVideo
					source={{
						uri: cdnURL(uri),
					}}
					style={tw.style("w-full h-full")}
					resizeMode={ResizeMode.CONTAIN}
					videoStyle={tw.style("mx-auto")}
				/>
			) : (
				<Image
					source={{
						uri: cdnURL(uri),
					}}
					style={tw.style("w-full h-full")}
					resizeMode="cover"
				/>
			)}

			{orderAble || selectAble ? (
				<View
					style={tw.style(
						clsx(
							"absolute top-2 right-2 w-5 h-5 rounded-full flex-row items-center justify-center bg-[rgba(0,0,0,0.5)] border border-white",
							{
								"bg-fans-purple border-0": isSelected,
							},
						),
					)}
				>
					{isSelected && orderAble && (
						<Text
							style={tw.style(
								"text-[14px] leading-[19px] text-white",
							)}
						>
							{orderNumber}
						</Text>
					)}
					{isSelected && selectAble && (
						<CheckSvg width={13.4} height={10} color="#fff" />
					)}
				</View>
			) : null}
		</Pressable>
	);
};

export default ImagePostChip;
