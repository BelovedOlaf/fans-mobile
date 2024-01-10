import { cdnURL } from "@helper/Utils";
import tw from "@lib/tailwind";
import React from "react";
import { View, Image } from "react-native";
import IconAvatar from "./IconAvatar";
import { IconType } from "./Icons";

const defaultAvatar = require("@assets/images/default-avatar.png");

interface AvatarProps {
	image?: string;
	icon?: IconType;
	size?: string;
}

const UserAvatar = ({ image, icon, size = "50px" }: AvatarProps) => {
	const sizeInt = parseFloat(size.split("px")[0]);
	return (
		<View
			style={tw.style(
				`w-[${size}] h-[${size}] relative bg-white rounded-full items-center justify-center`,
			)}
		>
			<Image
				source={image ? { uri: cdnURL(image) } : defaultAvatar}
				resizeMode="cover"
				style={tw.style("w-full rounded-full h-full")}
			/>
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

export default UserAvatar;
