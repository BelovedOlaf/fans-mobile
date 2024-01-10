import React from "react";
import Svg, { G, Line, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	size?: number;
}

export default function ThreeLineSvg({ ...props }: FansSvgProps) {
	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox="0 0 22.33 19.056"
		>
			<G transform="translate(-672.72 -47.017)">
				<Line
					x2="20.23"
					transform="translate(673.77 48.067)"
					fill="none"
					stroke={props.color ?? "#fff"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2.1"
				/>
				<Line
					x2="20.23"
					transform="translate(673.77 56.545)"
					fill="none"
					stroke={props.color ?? "#fff"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2.1"
				/>
				<Line
					x2="20.23"
					transform="translate(673.77 65.023)"
					fill="none"
					stroke={props.color ?? "#fff"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2.1"
				/>
			</G>
		</Svg>
	);
}
