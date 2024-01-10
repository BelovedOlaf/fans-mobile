import React from "react";
import Svg, { G, Line, SvgProps } from "react-native-svg";

export default function FilterSvg({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="0 0 18.559 15.847">
			<G transform="translate(0.9 0.9)">
				<Line
					x2="16.759"
					transform="translate(0 0)"
					fill="none"
					stroke={props.color ?? "#000"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.8"
				/>
				<Line
					x2="11.741"
					transform="translate(0 7.023)"
					fill="none"
					stroke={props.color ?? "#000"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.8"
				/>
				<Line
					x2="6.723"
					transform="translate(0 14.047)"
					fill="none"
					stroke={props.color ?? "#000"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.8"
				/>
			</G>
		</Svg>
	);
}
