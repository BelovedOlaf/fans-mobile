// import React module
import React from "react";
import Svg, { G, Line, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const PlusSvg = ({ ...props }: FansSvgProps) => {
	const { width, height, size, ...props_ } = props;
	return (
		<Svg
			width={width ?? size}
			height={height ?? size}
			{...props_}
			viewBox="0 0 20.049 20.049"
		>
			<G transform="translate(10.024 1.5) rotate(45)">
				<Line
					x2="12.055"
					y2="12.055"
					fill={props.color ?? "currentColor"}
					stroke={props.color ?? "currentColor"}
					strokeLinecap="round"
					strokeWidth="1.5"
				/>
				<Line
					y1="12.055"
					x2="12.055"
					fill={props.color ?? "currentColor"}
					stroke={props.color ?? "currentColor"}
					strokeLinecap="round"
					strokeWidth="1.5"
				/>
			</G>
		</Svg>
	);
};

export default PlusSvg;
