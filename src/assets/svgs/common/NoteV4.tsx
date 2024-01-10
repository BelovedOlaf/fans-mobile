// import react module
import React from "react";
import Svg, { G, Line, Path } from "react-native-svg";
import { IFansSvg } from "@usertypes/components";

export const Note1Svg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;

	return (
		<Svg
			viewBox="0 0 17.643 17.643"
			fill="none"
			stroke={color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
		>
			<G transform="translate(0.75 0.75)">
				<Path
					d="M345.722,431.143H336.9a1.9,1.9,0,0,1-1.9-1.9V416.9a1.9,1.9,0,0,1,1.9-1.9h12.344a1.9,1.9,0,0,1,1.9,1.9v8.823Z"
					transform="translate(-335 -415)"
				/>
				<G transform="translate(10.028 9.85)">
					<Path
						d="M349.909,433.3v-1.758a1.9,1.9,0,0,1,1.9-1.9h1.759"
						transform="translate(-349.909 -429.645)"
					/>
				</G>
			</G>
		</Svg>
	);
};

export const Note2Svg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;

	return (
		<Svg
			viewBox="0 0 22.163 22.163"
			fill="none"
			stroke={color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.7"
		>
			<G transform="translate(0.85 0.85)">
				<Path
					d="M348.592,435.463H337.408A2.407,2.407,0,0,1,335,433.055V417.408A2.407,2.407,0,0,1,337.408,415h15.647a2.407,2.407,0,0,1,2.408,2.408v11.184Z"
					transform="translate(-335 -415)"
				/>
				<G transform="translate(12.712 12.487)">
					<Path
						d="M349.909,434.282v-2.229a2.407,2.407,0,0,1,2.407-2.408h2.23"
						transform="translate(-349.909 -429.645)"
					/>
				</G>
			</G>
		</Svg>
	);
};
