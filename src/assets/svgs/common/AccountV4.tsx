import React from "react";
import Svg, { G, Path } from "react-native-svg";

interface FansSvgProps {
	size?: number;
	width?: number;
	height?: number;
	color?: string;
}

const AccountSvg = ({ ...props }: FansSvgProps) => {
	const { color = "currentColor" } = props;

	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			viewBox="0 0 22.589 23"
		>
			<G transform="translate(-750.722 -228)">
				<Path
					d="M763.257,240.977a6.488,6.488,0,1,1,6.5-6.462A6.5,6.5,0,0,1,763.257,240.977Zm.015-11.264a4.775,4.775,0,1,0,4.766,4.78A4.765,4.765,0,0,0,763.272,229.713Z"
					transform="translate(-1.252)"
					fill={color ?? "currentColor"}
				/>
				<Path
					d="M762.024,247.151c.512.036,1.027.051,1.535.113.463.056.922.156,1.378.253a11.643,11.643,0,0,1,2.815,1.011,12.944,12.944,0,0,1,5.427,5.112.861.861,0,0,1-.393,1.256.841.841,0,0,1-1-.267c-.17-.24-.315-.5-.478-.743a11.191,11.191,0,0,0-3.924-3.608,10.553,10.553,0,0,0-2.3-.954c-.488-.135-.99-.222-1.489-.312a9,9,0,0,0-2.16-.11,11.762,11.762,0,0,0-1.781.243,11.089,11.089,0,0,0-3.867,1.658,10.643,10.643,0,0,0-2.7,2.6,13.319,13.319,0,0,0-.738,1.137.874.874,0,1,1-1.5-.9,12.972,12.972,0,0,1,5.414-5.1,12.058,12.058,0,0,1,1.918-.776,12.7,12.7,0,0,1,2.019-.455A16.151,16.151,0,0,1,762.024,247.151Z"
					transform="translate(0 -3.962)"
					fill={color ?? "currentColor"}
				/>
			</G>
		</Svg>
	);
};

export default AccountSvg;
