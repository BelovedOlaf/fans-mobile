import React from "react";
import Svg, { G, Path, Circle, SvgProps } from "react-native-svg";

export default function RoundedPlusSvg({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="0 0 25 25">
			<G
				id="Ellipse_1685"
				data-name="Ellipse 1685"
				fill="none"
				stroke={props.color ?? "#707070"}
				strokeWidth="1"
			>
				<Circle cx="12.5" cy="12.5" r="12.5" stroke="none" />
				<Circle cx="12.5" cy="12.5" r="12" fill="none" />
			</G>
			<G
				id="Group_49587"
				data-name="Group 49587"
				transform="translate(-7.912 -489.955) rotate(45)"
			>
				<Path
					d="M10419.076,2234.112l9.3,9.3"
					transform="translate(-10053.901 -1897.9)"
					fill="none"
					stroke={props.color ?? "#707070"}
					strokeLinecap="round"
					strokeWidth="1"
				/>
				<Path
					d="M0,0,9.3,9.3"
					transform="translate(365.175 345.512) rotate(-90)"
					fill="none"
					stroke={props.color ?? "#707070"}
					strokeLinecap="round"
					strokeWidth="1"
				/>
			</G>
		</Svg>
	);
}
