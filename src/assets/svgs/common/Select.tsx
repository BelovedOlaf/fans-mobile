// import React module
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const SelectSvg = ({ ...props }: FansSvgProps) => {
	const { color, height, size, width, ...props_ } = props;
	return (
		<Svg
			width={width ?? size}
			height={height ?? size}
			viewBox="0 0 16.054 16.054"
			{...props_}
		>
			<G transform="translate(-8.729 -8.903)">
				<Path
					d="M12882.239,3584.132l1.9,1.9,3.059-3.3"
					transform="translate(-12869.164 -3565.801)"
					fill="none"
					stroke={color ?? "currentColor"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.2"
				/>
				<G transform="translate(-567.721 -60.047)">
					<Path
						d="M1.653-.85H9.711a2.506,2.506,0,0,1,2.5,2.5V9.711a2.506,2.506,0,0,1-2.5,2.5H1.653a2.506,2.506,0,0,1-2.5-2.5V1.653A2.506,2.506,0,0,1,1.653-.85ZM9.711,11.236a1.527,1.527,0,0,0,1.525-1.525V1.653A1.527,1.527,0,0,0,9.711.128H1.653A1.527,1.527,0,0,0,.128,1.653V9.711a1.527,1.527,0,0,0,1.525,1.525Z"
						transform="translate(577.5 72.59)"
						stroke={color ?? "currentColor"}
						strokeLinecap="round"
						strokeWidth="0.4"
					/>
					<Path
						d="M594.149,81.639a.489.489,0,0,1-.489-.489V73.092a2.967,2.967,0,0,0-2.964-2.964h-8.057a.489.489,0,1,1,0-.978H590.7a3.947,3.947,0,0,1,3.942,3.942v8.057A.489.489,0,0,1,594.149,81.639Z"
						transform="translate(-2.335)"
						stroke={color ?? "currentColor"}
						strokeLinecap="round"
						strokeWidth="0.4"
					/>
				</G>
			</G>
		</Svg>
	);
};

export default SelectSvg;
