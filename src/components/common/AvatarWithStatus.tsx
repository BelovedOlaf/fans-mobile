import UserAvatar from "@components/avatar/UserAvatar";
import tw from "@lib/tailwind";
import clsx from "clsx";
import React, { FC } from "react";
import { View, Pressable } from "react-native";

interface Props {
	hasOnlineStatus?: boolean;
	isOnline?: boolean;
	avatar?: string;
	size: number;
	style?: string;
	onPress?: () => void;
}

const AvatarWithStatus: FC<Props> = (props) => {
	const { isOnline, avatar, size, hasOnlineStatus, style, onPress } = props;

	const statusStyles = clsx("absolute rounded-full border-white", {
		"w-[10px] h-[10px] bottom-0 right-0 border-[2px]": size === 30,
		"w-[11px] h-[11px] bottom-0 right-0 border-[2px]": size === 46,
		"w-[22px] h-[22px] bottom-0 right-0 border-[3px]": size === 79,
		"bg-fans-green": isOnline,
		"bg-fans-grey": !isOnline,
	});

	const withBorder = size === 79;
	const sizeWithBorder = withBorder ? size + 8 : size;

	return (
		<Pressable
			style={[
				{
					width: sizeWithBorder,
					height: sizeWithBorder,
				},
				tw.style(
					"relative rounded-full",
					withBorder ? "border-[4px] border-white" : "",
					style,
				),
			]}
			onPress={onPress}
		>
			<UserAvatar image={avatar} size={`${size}px`} />

			{hasOnlineStatus ? (
				<View style={tw.style(statusStyles)}></View>
			) : null}
		</Pressable>
	);
};

export default AvatarWithStatus;
