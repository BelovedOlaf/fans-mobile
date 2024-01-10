import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const ChevronLeftSvg = ({ ...props }: FansSvgProps) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		{...props}
		viewBox="0 0 8.541 14.679"
	>
		<Path
			d="M9297.483,3389.547l-6.139,6.137-6.137-6.137"
			transform="translate(3396.886 -9284.007) rotate(90)"
			fill="none"
			stroke={props.color ?? "#707070"}
			strokeLinecap="round"
			strokeWidth="1.7"
		/>
	</Svg>
);

export default ChevronLeftSvg;
