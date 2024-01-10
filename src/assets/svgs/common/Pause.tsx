import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	size?: number;
}

export default function PauseSvg({ ...props }: FansSvgProps) {
	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			viewBox="0,0,256,256"
			{...props}
		>
			<G
				fill={props.color}
				fillRule="nonzero"
				stroke="none"
				strokeWidth="1"
				strokeLinecap="butt"
				strokeLinejoin="miter"
				strokeMiterlimit="10"
				strokeDasharray=""
				strokeDashoffset="0"
				fontFamily="none"
				fontWeight="none"
				fontSize="none"
			>
				<G transform="scale(8.53333,8.53333)">
					<Path d="M8,4c-1.105,0 -2,0.895 -2,2v18c0,1.105 0.895,2 2,2h2c1.105,0 2,-0.895 2,-2v-18c0,-1.105 -0.895,-2 -2,-2zM20,4c-1.105,0 -2,0.895 -2,2v18c0,1.105 0.895,2 2,2h2c1.105,0 2,-0.895 2,-2v-18c0,-1.105 -0.895,-2 -2,-2z"></Path>
				</G>
			</G>
		</Svg>
	);
}
