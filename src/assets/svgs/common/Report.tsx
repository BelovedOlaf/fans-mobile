import React from "react";
import Svg, { G, Line, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const ReportSvg = ({ ...props }: FansSvgProps) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		{...props}
		viewBox="0 0 26.88 24.372"
	>
		<G transform="translate(-325.55 -701.1)">
			<Path
				d="M335.983,703.736l-9.023,15.627a3.473,3.473,0,0,0,3.008,5.209h18.044a3.472,3.472,0,0,0,3.007-5.209L342,703.736A3.472,3.472,0,0,0,335.983,703.736Z"
				transform="translate(0 0)"
				fill="none"
				stroke={props.color ?? "#eb2121"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.8"
			/>
			<G transform="translate(338.991 709.945)">
				<Line
					y2="6.495"
					fill="none"
					stroke={props.color ?? "#eb2121"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.9"
				/>
				<Line
					transform="translate(0 10.103)"
					fill="none"
					stroke={props.color ?? "#eb2121"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.9"
				/>
			</G>
		</G>
	</Svg>
);

export default ReportSvg;
