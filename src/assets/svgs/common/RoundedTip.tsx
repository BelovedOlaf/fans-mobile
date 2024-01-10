import React from "react";
import Svg, { G, Path, SvgProps, Circle } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const RoundedTipSvg = ({ ...props }: FansSvgProps) => {
	return (
		<Svg
			width={props.size ?? props.width}
			height={props.size ?? props.height}
			viewBox="0 0 23 23"
		>
			<G transform="translate(-217 -780)">
				<G
					transform="translate(217 780)"
					fill="none"
					stroke={props.color ?? "#000"}
					strokeWidth="1.5"
				>
					<Circle cx="11.5" cy="11.5" r="11.5" stroke="none" />
					<Circle cx="11.5" cy="11.5" r="10.75" fill="none" />
				</G>
				<Path
					d="M608.132,756.5c-1.7-.363-2.092-.77-2.092-1.5v-.022c0-.694.638-1.244,1.641-1.244a3.223,3.223,0,0,1,1.993.672.405.405,0,0,0,.253.077.418.418,0,0,0,.419-.418.448.448,0,0,0-.187-.353,3.859,3.859,0,0,0-2.179-.751v-1.549a.361.361,0,1,0-.723,0v1.571a2.177,2.177,0,0,0-2.087,2.073v.022c0,1.266.815,1.839,2.588,2.224,1.619.342,2,.749,2,1.465v.022c0,.76-.683,1.31-1.718,1.31a3.5,3.5,0,0,1-2.433-.914.387.387,0,0,0-.265-.1.421.421,0,0,0-.418.43.393.393,0,0,0,.165.33,4.54,4.54,0,0,0,2.164.976v1.623a.361.361,0,0,0,.723,0v-1.565l.031,0c1.531,0,2.632-.859,2.632-2.18v-.022C610.643,757.5,609.85,756.872,608.132,756.5Z"
					transform="translate(-379.428 34.45)"
					stroke={props.color ?? "#000"}
					strokeWidth="0.6"
				/>
			</G>
		</Svg>
	);
};

export default RoundedTipSvg;
