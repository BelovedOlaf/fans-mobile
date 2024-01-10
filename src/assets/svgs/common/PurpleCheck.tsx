import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

export default function PurpleCheckSvg({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="0 26.45 25 25">
			<G>
				<Path
					d="M0 38.9a12.5 12.5 0 1 1 0 .1z"
					fill="#a854f5"
					fillRule="evenodd"
				/>
				<Path
					d="m6.544 39.396 3.97 3.945 7.26-7.841"
					strokeLinejoin="round"
					strokeLinecap="round"
					stroke="#fff"
					fill="transparent"
				/>
			</G>
		</Svg>
	);
}
