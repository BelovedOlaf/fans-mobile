// import react module
import { IFansSvg } from "@usertypes/components";
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	colorFans?: string;
	fill?: string;
	size?: number;
}

const EditSvg = (props: FansSvgProps) => {
	const { color, height, size, width, ...props_ } = props;

	return (
		<Svg
			width={width ?? size}
			height={height ?? size}
			viewBox="0 0 14.94 15.299"
			{...props_}
		>
			<Path
				d="M596.242,629.822c-.326,1.615-.642,3.231-.974,4.921,1.638-.5,3.2-.979,4.762-1.468l7.448-7.557a2.643,2.643,0,1,0-3.928-3.533Z"
				transform="translate(-594.368 -620.344)"
				fill="none"
				stroke={color ?? "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.8"
			/>
		</Svg>
	);
};

export const Edit1Svg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;

	return (
		<Svg viewBox="0 0 12.615 12.914">
			<Path
				d="M596.084,628.434c-.273,1.353-.538,2.708-.816,4.124,1.372-.421,2.683-.821,3.991-1.23l6.242-6.334a2.215,2.215,0,1,0-3.292-2.961Z"
				transform="translate(-594.468 -620.445)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.6"
			/>
		</Svg>
	);
};

export const Edit2Svg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;

	return (
		<Svg viewBox="0 0 14.734 15.099">
			<G transform="translate(0.8 0.801)">
				<Path
					d="M596.242,629.822c-.326,1.615-.642,3.231-.974,4.921,1.638-.5,3.2-.979,4.762-1.468l7.448-7.557a2.643,2.643,0,1,0-3.928-3.533Z"
					transform="translate(-595.268 -621.245)"
					fill="none"
					stroke={color}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.6"
				/>
			</G>
		</Svg>
	);
};

export default EditSvg;
