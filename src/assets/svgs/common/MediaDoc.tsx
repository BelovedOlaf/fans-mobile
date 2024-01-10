import React from "react";
import Svg, { G, Rect, Line, SvgProps } from "react-native-svg";

export default function MediaDocSvg({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="0 0 18.6 19.6">
			<G transform="translate(0.833 1.109)">
				<Rect
					width="17"
					height="18"
					rx="4"
					transform="translate(-0.033 -0.309)"
					fill="none"
					stroke="#000"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.6"
				/>
				<Line
					x2="10.083"
					transform="translate(3.278 12.189)"
					fill="none"
					stroke="#000"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.6"
				/>
			</G>
		</Svg>
	);
}
