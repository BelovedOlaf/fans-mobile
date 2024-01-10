import tw from "@lib/tailwind";

import { View, Image, ImageProps, ViewStyle } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import React, { FC, useState } from "react";

interface Props extends ImageProps {
	wrapperStyle?: ViewStyle;
}

const LoadingImage: FC<Props> = (props) => {
	const { wrapperStyle, style, ...imgProps } = props;

	const [loading, setLoading] = useState(false);

	return (
		<View style={[wrapperStyle, tw.style("relative")]}>
			<Image
				{...imgProps}
				style={[tw.style("h-full w-full"), style]}
				onLoadStart={() => setLoading(true)}
				onLoadEnd={() => setLoading(false)}
			/>
			<ActivityIndicator
				animating={true}
				color="#fff"
				style={tw.style(
					"absolute top-1/2 left-1/2",
					!loading && "hidden",
				)}
			/>
		</View>
	);
};

export default LoadingImage;
