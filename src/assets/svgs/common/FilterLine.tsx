import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	colorFans?: string;
	fill?: string;
	size?: number;
}

const FilterLineSvg = ({ ...props }: FansSvgProps) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		viewBox="0 0 20.106 23.244"
	>
		<G transform="translate(-140.615 265.904) rotate(-90)">
			<Path
				d="M247.222,151.072V141.5a.882.882,0,1,0-1.765,0v9.575a3.665,3.665,0,0,0,0,7.122v1.645a.882.882,0,1,0,1.765,0v-1.645a3.665,3.665,0,0,0,0-7.122Zm-.882,5.476a1.915,1.915,0,1,1,1.915-1.915A1.917,1.917,0,0,1,246.34,156.548Z"
				fill={props.color ?? "currentColor"}
			/>
			<Path
				d="M265.222,151.072V141.5a.882.882,0,1,0-1.765,0v9.575a3.665,3.665,0,0,0,0,7.122v1.645a.882.882,0,1,0,1.765,0v-1.645a3.665,3.665,0,0,0,0-7.122Zm-.882,5.476a1.915,1.915,0,1,1,1.915-1.915A1.917,1.917,0,0,1,264.34,156.548Z"
				transform="translate(-2.116)"
				fill={props.color ?? "currentColor"}
			/>
			<Path
				d="M256.222,143.142V141.5a.882.882,0,1,0-1.765,0v1.645a3.665,3.665,0,0,0,0,7.122v9.575a.882.882,0,1,0,1.765,0v-9.575a3.665,3.665,0,0,0,0-7.122Zm-.882,5.476a1.915,1.915,0,1,1,1.915-1.915A1.917,1.917,0,0,1,255.34,148.618Z"
				transform="translate(-1.058)"
				fill={props.color ?? "currentColor"}
			/>
		</G>
	</Svg>
);

export default FilterLineSvg;
