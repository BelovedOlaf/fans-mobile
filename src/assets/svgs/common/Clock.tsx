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

const ClockSvg = (props: FansSvgProps) => {
	const { color, height, size, width, ...props_ } = props;

	return (
		<Svg
			width={width ?? size}
			height={height ?? size}
			viewBox="42.979 898.568 12.858 12.858"
			{...props_}
		>
			<G>
				<Path
					d="M49.458 902.34v3.04l-1.845 1.807"
					strokeLinejoin="round"
					strokeLinecap="round"
					strokeWidth="1.5"
					stroke={color ?? "currentColor"}
					fill="transparent"
				/>
				<Path
					d="M49 911.064a6.08 6.08 0 1 1 .099.006z"
					strokeLinejoin="round"
					strokeLinecap="round"
					strokeWidth="1.5"
					stroke={color ?? "currentColor"}
					fill="transparent"
				/>
			</G>
		</Svg>
	);
};

export const Clock1Svg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;

	return (
		<Svg viewBox="0 0 18.377 18.377">
			<G transform="translate(-607.749 -372.249)" fill={color}>
				<Path
					d="M614.573,385.079a.75.75,0,0,1-.525-1.286l2.184-2.139V378a.75.75,0,0,1,1.5,0v3.97a.75.75,0,0,1-.225.536l-2.409,2.359A.748.748,0,0,1,614.573,385.079Z"
					transform="translate(-0.045 -0.037)"
				/>
				<Path
					d="M7.94-.75A8.69,8.69,0,1,1-.75,7.94,8.7,8.7,0,0,1,7.94-.75Zm0,15.881A7.19,7.19,0,1,0,.75,7.94,7.2,7.2,0,0,0,7.94,15.131Z"
					transform="matrix(0.059, -0.998, 0.998, 0.059, 608.542, 388.895)"
				/>
			</G>
		</Svg>
	);
};

export default ClockSvg;
