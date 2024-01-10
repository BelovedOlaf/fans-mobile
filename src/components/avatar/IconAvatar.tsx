import tw from "@lib/tailwind";
import React from "react";
import { View } from "react-native";
import { IconType, icons } from "./Icons";

interface AvatarProps {
	icon: IconType;
	size?: string;
}

const IconAvatar = ({ icon, size = "50px" }: AvatarProps) => {
	const Icon = icons[icon];
	return (
		<View style={tw.style(`w-[${size}] h-[${size}] relative`)}>
			<Icon />
		</View>
	);
};

export default IconAvatar;
