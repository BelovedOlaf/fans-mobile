// import React module
import React from "react";
import Svg, { G, Line, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	size?: number;
}

const SortDescSvg = (props: FansSvgProps) => {
	const { color, height, size, width, ...props_ } = props;

	return (
		<Svg
			width={width ?? size}
			height={height ?? size}
			viewBox="0 0 18.559 15.847"
			{...props_}
		>
			<G transform="translate(0.9 0.9)">
				<G transform="translate(0 0)">
					<Line
						x2="6.723"
						transform="translate(0 0)"
						fill="none"
						stroke={color ?? "currentColor"}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.8"
					/>
					<Line
						x2="11.741"
						transform="translate(0 7.023)"
						fill="none"
						stroke={color ?? "currentColor"}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.8"
					/>
					<Line
						x2="16.759"
						transform="translate(0 14.047)"
						fill="none"
						stroke={color ?? "currentColor"}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.8"
					/>
				</G>
			</G>
		</Svg>
	);
};

export default SortDescSvg;
