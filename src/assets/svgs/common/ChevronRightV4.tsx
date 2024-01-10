import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const ChevronRightSvg = (props: FansSvgProps) => {
	const { color = "currentColor" } = props;

	return (
		<Svg
			viewBox="0 0 7.834 13.972"
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
		>
			<G transform="translate(0.849 13.124) rotate(-90)">
				<Path
					d="M9297.483,3389.547l-6.139,6.137-6.137-6.137"
					transform="translate(-9285.208 -3389.547)"
					fill="none"
					stroke={color}
					strokeLinecap="round"
					strokeWidth="1.2"
				/>
			</G>
		</Svg>
	);
};

export default ChevronRightSvg;
