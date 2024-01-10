import { IFansSvg } from "@usertypes/components";
import React from "react";
import Svg, { G, Line, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

export default function CloseSvg({ ...props }: FansSvgProps) {
	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox="0 0 10.504 10.503"
		>
			<G transform="translate(-364.468 -335.505)">
				<Path
					d="M10419.076,2234.112l9.09,9.088"
					transform="translate(-10053.901 -1897.9)"
					fill="none"
					stroke={props.color ?? "#707070"}
					strokeLinecap="round"
					strokeWidth="1"
				/>
				<Path
					d="M0,0,9.089,9.088"
					transform="translate(365.175 345.301) rotate(-90)"
					fill="none"
					stroke={props.color ?? "#707070"}
					strokeLinecap="round"
					strokeWidth="1"
				/>
			</G>
		</Svg>
	);
}

export const Close0Svg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;

	return (
		<Svg viewBox="0 0 9.429 9.428">
			<G
				transform="translate(-646.338 -320.839)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.2"
			>
				<Line
					x2="7.731"
					y2="7.731"
					transform="translate(647.187 321.687)"
				/>
				<Line
					y1="7.731"
					x2="7.731"
					transform="translate(647.187 321.687)"
				/>
			</G>
		</Svg>
	);
};

export const Close2Svg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;

	return (
		<Svg viewBox="0 0 9.476 9.476">
			<G
				transform="translate(1.202 1.202)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.7"
			>
				<Line x2="7.072" y2="7.072" transform="translate(0 0)" />
				<Line
					id="Line_116"
					data-name="Line 116"
					y1="7.072"
					x2="7.072"
					transform="translate(0 0)"
				/>
			</G>
		</Svg>
	);
};

export const Close1Svg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;

	return (
		<Svg viewBox="0 0 13.577 13.576">
			<G
				transform="translate(1.061 1.061)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeWidth="1.5"
			>
				<Path d="M0,0,11.455,11.454" transform="translate(0.001)" />
				<Path
					d="M0,0,11.455,11.454"
					transform="translate(0 11.455) rotate(-90)"
				/>
			</G>
		</Svg>
	);
};

export const Close3Svg = (props: FansSvgProps) => {
	const { color = "currentColor" } = props;

	return (
		<Svg viewBox="0 0 14.384 14.384">
			<G
				transform="translate(0.849 0.849)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeWidth={1.2}
			>
				<Line x2="12.687" y2="12.687" />
				<Line y1="12.687" x2="12.687" />
			</G>
		</Svg>
	);
};

export const Close4Svg = (props: FansSvgProps) => {
	const { color = "currentColor" } = props;

	return (
		<Svg viewBox="0 0 11.025 11.025">
			<G
				transform="translate(0.849 0.849)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeWidth="1.2"
			>
				<Line x2="9.328" y2="9.328" />
				<Line y1="9.328" x2="9.328" />
			</G>
		</Svg>
	);
};
