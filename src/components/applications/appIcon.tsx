import { View, Image } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import { cdnURL } from "@helper/Utils";
interface Props {
	icon?: string;
	size: number;
	style?: string;
}

const AppIcon: FC<Props> = (props) => {
	const { size, icon, style } = props;

	return (
		<View
			style={[
				{
					width: size,
					height: size,
				},
				tw.style("relative rounded-full", style),
			]}
		>
			{icon ? (
				<Image
					source={{ uri: cdnURL(icon) }}
					style={tw.style("rounded-full w-full h-full")}
				/>
			) : (
				<View
					style={tw.style(
						"bg-white w-full h-full flex-row items-center justify-center",
					)}
				>
					<Image
						source={require("@assets/images/socials/default-app.png")}
					/>
				</View>
			)}
		</View>
	);
};

export default AppIcon;
