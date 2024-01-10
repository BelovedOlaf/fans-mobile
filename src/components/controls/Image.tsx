import React from "react";
import { Image, ImageProps } from "react-native";

// import base modules
import tw from "@lib/tailwind";
import { IFansImage } from "@usertypes/components";
import { FansView } from "./View";

interface FansImageProps extends ImageProps {
	size?: number;
	original?: boolean;
	rounded?: boolean;
}

const FansImage = React.memo((props: FansImageProps) => {
	const {
		height,
		resizeMode = "contain",
		size,
		style,
		width,
		original = false,
		rounded = false,
		...props_
	} = props;

	const styles = [""];

	(width || size) && styles.push(`w-[${width ?? size}px]`);
	(height || size) && styles.push(`h-[${height ?? size}px]`);
	!original && styles.push("w-full h-full");
	rounded && styles.push("rounded-full");

	return (
		<Image
			style={[tw.style(styles), style]}
			resizeMode={resizeMode}
			{...props_}
		/>
	);
});

export const FansImage1: IFansImage = React.memo((props) => {
	const { source, resizeMode = "contain", ...props_ } = props;

	return (
		<FansView {...props_}>
			<Image
				source={source}
				style={tw.style("w-full h-full")}
				resizeMode={resizeMode}
			/>
		</FansView>
	);
});

export const FansImage2: IFansImage = React.memo((props) => {
	const { width, height, source, viewStyle, imageStyle } = props;

	return (
		<FansView
			width={width}
			height={height}
			overflow="hidden"
			{...viewStyle}
		>
			<Image
				source={source}
				style={tw.style("w-full h-full")}
				resizeMode={imageStyle?.resizeMode}
			/>
		</FansView>
	);
});

export default FansImage;
