import React from "react";
import { TouchableOpacity, View } from "react-native";

import tw from "@lib/tailwind";
import { FansIconButtonComponent } from "@usertypes/components";

const FansIconButton: FansIconButtonComponent = (props) => {
	const { children, size, containerColor, ...props_ } = props;
	return (
		<TouchableOpacity {...props_}>
			<View
				style={[
					tw.style(
						"w-fans-iconbutton h-fans-iconbutton",
						"bg-fans-grey",
						"flex justify-center items-center",
						"rounded-full",
					),
					{
						width: size,
						height: size,
						backgroundColor: containerColor,
					},
				]}
			>
				{children}
			</View>
		</TouchableOpacity>
	);
};

export default FansIconButton;
