// import react module
import React from "react";
import tw from "@lib/tailwind";
import Svg, { G, Path, SvgProps } from "react-native-svg";
import { IFansSvg } from "@usertypes/components";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const StarSvg = (props: FansSvgProps) => {
	const {
		size,
		width = size,
		height = size,
		color = "currentColor",
		fill = "transparent",
		...props_
	} = props;

	return (
		<Svg width={width} height={height} viewBox="0 0 12.081 11.618">
			<Path
				d="M444.159,301a.8.8,0,0,1,.736.481l.759,1.539c.13.265.265.528.39.795a.429.429,0,0,0,.356.259q1.293.183,2.587.373a.8.8,0,0,1,.452,1.379c-.616.6-1.231,1.206-1.852,1.8a.484.484,0,0,0-.156.474c.15.847.294,1.695.439,2.543a.8.8,0,0,1-1.161.862q-1.154-.6-2.3-1.213a.473.473,0,0,0-.489,0c-.752.4-1.509.8-2.263,1.194a.813.813,0,0,1-.806.013.789.789,0,0,1-.4-.841c.146-.852.289-1.7.441-2.554a.492.492,0,0,0-.158-.483q-.928-.891-1.844-1.795a.793.793,0,0,1,0-1.187,1.064,1.064,0,0,1,.6-.219l2.449-.352a.426.426,0,0,0,.342-.261c.379-.776.764-1.549,1.145-2.324A.8.8,0,0,1,444.159,301Z"
				transform="translate(-438.125 -300.5)"
				fill="none"
				stroke={tw.color(color)}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1"
			/>
		</Svg>
	);
};

export const Star1Svg = (props: FansSvgProps) => {
	const { color } = props;

	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox="0 0 24.71 23.749"
		>
			<Path
				d="M450.117,301a1.655,1.655,0,0,1,1.528,1l1.576,3.2c.271.55.55,1.1.81,1.651a.89.89,0,0,0,.74.538q2.686.381,5.372.774a1.655,1.655,0,0,1,.938,2.863c-1.279,1.251-2.556,2.5-3.845,3.743a1,1,0,0,0-.325.985c.312,1.758.61,3.52.912,5.281a1.656,1.656,0,0,1-2.412,1.79q-2.4-1.252-4.782-2.518a.981.981,0,0,0-1.015,0c-1.562.834-3.135,1.652-4.7,2.479a1.688,1.688,0,0,1-1.673.028,1.638,1.638,0,0,1-.821-1.747c.3-1.769.6-3.538.917-5.3a1.021,1.021,0,0,0-.329-1q-1.927-1.85-3.83-3.727a1.646,1.646,0,0,1,.008-2.464,2.208,2.208,0,0,1,1.241-.456c1.7-.242,3.39-.489,5.086-.731a.885.885,0,0,0,.711-.543c.787-1.612,1.586-3.218,2.377-4.827A1.664,1.664,0,0,1,450.117,301Z"
				transform="translate(-437.775 -300.15)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.7"
			/>
		</Svg>
	);
};

export default StarSvg;
