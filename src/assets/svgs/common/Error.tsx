import React from "react";
import Svg, { Line, G, Path, SvgProps } from "react-native-svg";

export default function ErrorSvg({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="0 0 25.106 25.1">
			<G transform="translate(-189.69 -601.967)">
				<G transform="translate(202.244 609.06)">
					<Line
						y2="7.193"
						fill="none"
						stroke={props.color ?? "currentColor"}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.7"
					/>
					<Line
						transform="translate(0 11.19)"
						fill="none"
						stroke={props.color ?? "currentColor"}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.7"
					/>
				</G>
				<Path
					d="M889.846,227.511a12.5,12.5,0,1,0,12.475,12.527A12.509,12.509,0,0,0,889.846,227.511Zm-.048,23.332a10.832,10.832,0,1,1,10.856-10.806A10.842,10.842,0,0,1,889.8,250.843Z"
					transform="translate(-687.575 374.506)"
					stroke={props.color ?? "currentColor"}
					strokeWidth="0.1"
					fill={props.color ?? "currentColor"}
				/>
			</G>
		</Svg>
	);
}
