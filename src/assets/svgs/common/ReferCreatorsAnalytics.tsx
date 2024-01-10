// import React module
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	size?: number;
}

const ReferCreatorsAnalytics = ({ ...props }: FansSvgProps) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		viewBox="0 0 17.475 17.531"
	>
		<G transform="translate(0.7 16.826) rotate(-90)">
			<G transform="translate(0 0)">
				<G transform="translate(0)">
					<Path
						d="M16.124,1.67c-.019-.075-.039-.151-.058-.227A1.876,1.876,0,0,0,14.231,0Q8.058,0,1.886,0a1.89,1.89,0,0,0-.169,3.772c.078.007.157.006.236.006q6.109,0,12.218,0A1.913,1.913,0,0,0,16.1,2.2a.189.189,0,0,1,.026-.055Z"
						transform="translate(0.002 6.147)"
						fill="none"
						stroke={props.color ?? "currentColor"}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.4"
					/>
					<Path
						d="M5.369,3.779c1.175,0,2.351.006,3.526,0A1.885,1.885,0,0,0,9.107.024,2.212,2.212,0,0,0,8.81,0Q5.371,0,1.931,0a1.888,1.888,0,0,0-.1,3.774c1.18.015,2.361,0,3.542,0Z"
						transform="translate(0.003 12.293)"
						fill="none"
						stroke={props.color ?? "currentColor"}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.4"
					/>
					<Path
						d="M2.687,0C2.4,0,2.121,0,1.838,0A1.888,1.888,0,0,0,1.86,3.78c.555.009,1.112.013,1.667,0a1.887,1.887,0,0,0,.4-3.724A2.933,2.933,0,0,0,3.379,0C3.149,0,2.918,0,2.687,0Z"
						transform="translate(0 0)"
						fill="none"
						stroke={props.color ?? "currentColor"}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.4"
					/>
				</G>
			</G>
		</G>
	</Svg>
);

export default ReferCreatorsAnalytics;
