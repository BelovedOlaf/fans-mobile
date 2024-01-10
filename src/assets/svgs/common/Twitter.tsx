// import react module
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const TwitterSvg = (props: FansSvgProps) => {
	const { color, height, size, width, ...props_ } = props;

	return (
		<Svg
			width={width ?? size}
			height={height ?? size}
			viewBox="0 0 13.8 11.211"
			{...props_}
		>
			<Path
				d="M458.417,685.151a8.082,8.082,0,0,0,12.4-6.831c0-.111,0-.222-.007-.332a6.334,6.334,0,0,0,1.405-1.442,6.556,6.556,0,0,1-1.6.416h0a3,3,0,0,0,1.231-1.574,9.941,9.941,0,0,1-1.376.573c-.133.044-.272.087-.416.128a2.835,2.835,0,0,0-4.832,2.578,8.533,8.533,0,0,1-5.82-2.943s-1.355,1.85.807,3.753a2.919,2.919,0,0,1-1.222-.365,2.692,2.692,0,0,0,2.241,2.814,2.6,2.6,0,0,1-1.251.052,2.8,2.8,0,0,0,2.607,1.978,5.445,5.445,0,0,1-4.164,1.192Z"
				transform="translate(-458.416 -675.191)"
				fill={color ?? "currentColor"}
			/>
		</Svg>
	);
};

export default TwitterSvg;
