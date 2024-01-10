// import React module
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	colorFans?: string;
	fill?: string;
	size?: number;
}

const DoubleCheckSvg = ({ ...props }: FansSvgProps) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		viewBox="0 0 16.785 9.396"
	>
		<G transform="translate(-75.766 -522.722)">
			<Path
				d="M12882.783,3586.627l3.971,3.945,7.259-7.842"
				transform="translate(-12806.239 -3059.23)"
				fill="none"
				stroke={props.color ?? "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.1"
			/>
			<Path
				d="M12886.754,3590.572l7.259-7.842"
				transform="translate(-12802.239 -3059.23)"
				fill="none"
				stroke={props.color ?? "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.1"
			/>
		</G>
	</Svg>
);

export default DoubleCheckSvg;
