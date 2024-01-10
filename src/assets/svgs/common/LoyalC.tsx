// import react module
import React from "react";
import Svg, { G, Path, Rect, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const LoyalPng = (props: FansSvgProps) => {
	const { color, height, size, width, ...props_ } = props;

	return (
		<Svg
			width={width ?? size}
			height={height ?? size}
			viewBox="0 0 28.078 28.078"
			{...props_}
		>
			<Path
				d="M56.125,17.918h7.914L50,3.879v7.914Z"
				transform="translate(-35.961 -3.879)"
				fill={color ?? "#50ddc2"}
			/>
			<Path
				d="M17.918,11.793V3.879L3.879,17.918h7.914Z"
				transform="translate(-3.879 -3.879)"
				fill={color ?? "#b7f7ea"}
			/>
			<Path
				d="M56.125,50,50,56.125v7.914L64.039,50Z"
				transform="translate(-35.961 -35.961)"
				fill={color ?? "#23c9b1"}
			/>
			<Path
				d="M11.793,50H3.879L17.918,64.039V56.125Z"
				transform="translate(-3.879 -35.961)"
				fill={color ?? "#50ddc2"}
			/>
			<Rect
				width="8.662"
				height="8.662"
				transform="matrix(0.707, -0.707, 0.707, 0.707, 7.914, 14.039)"
				fill={color ?? "#92efdd"}
			/>
		</Svg>
	);
};

export default LoyalPng;
