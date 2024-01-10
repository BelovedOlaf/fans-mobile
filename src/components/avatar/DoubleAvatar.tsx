import { cdnURL } from "@helper/Utils";
import tw from "@lib/tailwind";
import React from "react";
import { Image, View } from "react-native";
import IconAvatar from "./IconAvatar";
import { IconType } from "./Icons";

const defaultAvatar = require("@assets/images/default-avatar.png");

interface DoubleAvatarProps {
	image1?: string;
	image2?: string;
	icon?: IconType;
}

const DoubleAvatar = ({ image1, image2, icon }: DoubleAvatarProps) => {
	return (
		<View style={tw.style("w-[50px] h-[50px] relative")}>
			{
				<Image
					source={image1 ? { uri: cdnURL(image1) } : defaultAvatar}
					resizeMode="cover"
					style={tw.style("w-6/8 h-6/8 rounded-full")}
				/>
			}
			{
				<Image
					source={image2 ? { uri: cdnURL(image2) } : defaultAvatar}
					resizeMode="cover"
					style={tw.style(
						"w-6/8 h-6/8 rounded-full absolute top-1/5 left-1/5 border-white border-2",
					)}
				/>
			}
			{icon && (
				<View
					style={tw.style(
						"absolute -bottom-1 right-0 w-3/6 h-3/6 bg-gray-200 p-[3px] rounded-full border-white border-2 justify-center items-center",
					)}
				>
					<IconAvatar icon={icon} size="14px" />
				</View>
			)}
		</View>
	);
};

export default DoubleAvatar;
