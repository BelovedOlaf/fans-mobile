import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

export default function LargeSearch({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="0 0 26.8 27.022">
			<G transform="translate(1 1)">
				<Path
					d="M24.456,14.478A9.978,9.978,0,1,1,14.478,4.5,9.978,9.978,0,0,1,24.456,14.478Z"
					transform="translate(-4.5 -4.5)"
					fill="none"
					stroke={props.color}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
				/>
				<Path
					d="M31.457,31.679l-6.482-6.7"
					transform="translate(-7.071 -7.071)"
					fill="none"
					stroke={props.color}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
				/>
			</G>
		</Svg>
	);
}
