import React from "react";
import Svg, {
	Defs,
	ClipPath,
	Path,
	Pattern,
	Image,
	G,
	SvgProps,
	Circle,
} from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

export default function Tiktok({ ...props }: FansSvgProps) {
	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox={`0 0 ${props.size} ${props.size}`}
		>
			<G data-name="Group 52675" transform="translate(-159 -474)">
				<Circle
					data-name="Ellipse 1710"
					cx={23}
					cy={23}
					r={23}
					transform="translate(159 474)"
				/>
				<Path
					data-name="Path 45841"
					d="M467.244 720.564c-.267-.029-.533-.055-.8-.089a7.351 7.351 0 01-3.685-1.533 7.469 7.469 0 01-1-10.913 7.433 7.433 0 014.431-2.436 7.255 7.255 0 012.251-.037c.046.006.093.02.15.033v4c-.076-.015-.143-.026-.207-.042a3.593 3.593 0 102.587 4.3 4.434 4.434 0 00.1-1.015q0-8.135.011-16.271v-.3c.189-.052 3.5-.07 3.958-.024a6.181 6.181 0 006.129 6.079c.057.164.075 3.6.018 3.943a10.08 10.08 0 01-6.134-2.08v.32l.024 8.375a7.313 7.313 0 01-.393 2.524 7.5 7.5 0 01-5.4 4.929 6.289 6.289 0 01-1.361.2 1.517 1.517 0 00-.2.036z"
					transform="translate(-288.531 -211.386)"
					fill="#fff"
				/>
			</G>
		</Svg>
	);
}
