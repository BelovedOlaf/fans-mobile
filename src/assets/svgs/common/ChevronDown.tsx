// import react module
import { IFansSvg } from "@usertypes/components";
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	size?: number;
}

const ChevronDownSvg = (props: FansSvgProps) => {
	const { color, height, size, width, ...props_ } = props;

	return (
		<Svg
			width={width ?? size}
			height={height ?? size}
			viewBox="0 0 14 7"
			{...props_}
		>
			<Path
				d="M0,0,7,7,14,0"
				fill="none"
				stroke={color ?? "currentColor"}
				strokeLinecap="round"
				strokeWidth="1"
			/>
		</Svg>
	);
};

export default ChevronDownSvg;
