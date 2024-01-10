// import React module
import { IFansSvg } from "@usertypes/components";
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const SearchSvg = ({ ...props }: FansSvgProps) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		viewBox="0 0 15.556 15.676"
	>
		<G transform="translate(1 1)">
			<Path
				d="M15.255,9.878A5.378,5.378,0,1,1,9.878,4.5,5.378,5.378,0,0,1,15.255,9.878Z"
				transform="translate(-4.5 -4.5)"
				fill="none"
				stroke={props.color ?? "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
			<Path
				d="M28.468,28.588l-3.493-3.613"
				transform="translate(-15.326 -15.326)"
				fill="none"
				stroke={props.color ?? "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
		</G>
	</Svg>
);

export const Search1Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 15.556 15.676">
			<G
				transform="translate(1 1)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			>
				<Path
					d="M15.255,9.878A5.378,5.378,0,1,1,9.878,4.5,5.378,5.378,0,0,1,15.255,9.878Z"
					transform="translate(-4.5 -4.5)"
				/>
				<Path
					d="M28.468,28.588l-3.493-3.613"
					transform="translate(-15.326 -15.326)"
				/>
			</G>
		</Svg>
	);
};

export const Search2Svg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;

	return (
		<Svg viewBox="0 0 26.8 27.022">
			<G
				transform="translate(1 1)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			>
				<Path
					d="M24.456,14.478A9.978,9.978,0,1,1,14.478,4.5,9.978,9.978,0,0,1,24.456,14.478Z"
					transform="translate(-4.5 -4.5)"
				/>
				<Path
					d="M31.457,31.679l-6.482-6.7"
					transform="translate(-7.071 -7.071)"
				/>
			</G>
		</Svg>
	);
};

export default SearchSvg;
