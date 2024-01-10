import { Image, Pressable } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import clsx from "clsx";

import { IRoleIcon } from "@usertypes/types";

interface Props {
	onSelect: () => void;
	isSelected: boolean;
	data: IRoleIcon;
}

const RoleIconButton: FC<Props> = (props) => {
	const { data, onSelect, isSelected } = props;

	return (
		<Pressable
			style={tw.style(
				clsx(
					"border relative border-fans-grey w-11 h-11 rounded-full flex-row items-center justify-center",
					{ "border-0": isSelected },
				),
			)}
			onPress={onSelect}
		>
			<Image
				source={data.icon}
				style={{
					width: data.width,
					height: data.height,
				}}
			/>
			{isSelected ? (
				<Image
					source={require("@assets/images/posts/gem-border.png")}
					style={tw.style("w-full h-full absolute top-0 left-0")}
				/>
			) : null}
		</Pressable>
	);
};

export default RoleIconButton;
