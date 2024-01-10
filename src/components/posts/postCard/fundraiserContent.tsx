import React, { FC, useState } from "react";
import tw from "@lib/tailwind";
import { View, Image, Pressable } from "react-native";
import { Popover } from "react-native-popable";

import { UserSvg } from "@assets/svgs/common";
import { cdnURL } from "@helper/Utils";
import { IFypPostContent } from "@usertypes/components";

const FundraiserContent: IFypPostContent = (props) => {
	const { data } = props;
	const [showTooltip, setShowTooltip] = useState(false);
	const [width, setWidth] = useState(100);

	const handleToggleTooltip = () => {
		if (showTooltip) {
			setShowTooltip(false);
		} else {
			setShowTooltip(true);
			setTimeout(() => setShowTooltip(false), 1000);
		}
	};

	return (
		<View
			style={tw.style("relative")}
			onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
		>
			<Pressable
				onPress={handleToggleTooltip}
				style={[{ height: width }, tw.style("m-0")]}
			>
				<Image
					source={{
						uri: cdnURL(data.thumb?.url),
					}}
					style={[{ height: width }, tw.style("w-full")]}
				/>

				<View
					style={tw.style(
						"absolute w-6 h-6 flex items-center justify-center bg-[rgba(0,0,0,0.5)] rounded-full bottom-[20px] left-[17px]",
					)}
				>
					<UserSvg width={11.4} height={11.6} />
				</View>
			</Pressable>
			<Popover
				visible={showTooltip}
				style={{
					top: 394 / 2,
					left: (width - 150) / 2,
					width: 150,
					position: "absolute",
				}}
			>
				@morning_cafe
			</Popover>
		</View>
	);
};

export default FundraiserContent;
