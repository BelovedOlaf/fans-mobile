import React from "react";
import Svg, { Line, G, Path, SvgProps } from "react-native-svg";

export default function DiamondOutlinedSvg({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="0 0 24.052 24.3">
			<G transform="translate(-971.233 -264.35)">
				<G transform="translate(971.976 265)">
					<G>
						<G>
							<Path
								d="M989.8,266.245A3.156,3.156,0,0,0,987.466,265h-8.414a3.157,3.157,0,0,0-2.336,1.245l-4.424,6.58a2.165,2.165,0,0,0,.106,2.411l9.919,12.283a1.163,1.163,0,0,0,1.884,0l9.92-12.283a2.166,2.166,0,0,0,.1-2.411Z"
								transform="translate(-971.976 -265)"
								fill="none"
								stroke={props.color ?? "currentColor"}
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.3"
							/>
						</G>
					</G>
				</G>
				<Path
					d="M980.053,276.084l2.465-3.667h5.526l2.465,3.667-5.228,6.474Z"
					transform="translate(-2.022 -1.857)"
					fill="none"
					stroke={props.color ?? "currentColor"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.3"
				/>
				<Line
					x1="2.448"
					y2="4.668"
					transform="translate(986.238 265.58)"
					fill="none"
					stroke={props.color ?? "currentColor"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.3"
				/>
				<Line
					id="Line_68"
					data-name="Line 68"
					x1="5.998"
					y1="0.209"
					transform="translate(988.487 273.996)"
					fill="none"
					stroke={props.color ?? "currentColor"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.3"
				/>
				<Line
					id="Line_69"
					data-name="Line 69"
					y1="6.747"
					transform="translate(983.239 280.744)"
					fill="none"
					stroke={props.color ?? "currentColor"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.3"
				/>
				<Line
					id="Line_70"
					data-name="Line 70"
					y1="0.209"
					x2="5.958"
					transform="translate(972.034 273.996)"
					fill="none"
					stroke={props.color ?? "currentColor"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.3"
				/>
				<Line
					id="Line_71"
					data-name="Line 71"
					x1="2.408"
					y1="4.668"
					transform="translate(977.832 265.58)"
					fill="none"
					stroke={props.color ?? "currentColor"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.3"
				/>
			</G>
		</Svg>
	);
}
