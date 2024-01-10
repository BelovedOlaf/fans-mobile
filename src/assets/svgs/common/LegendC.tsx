// import react module
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const LegendPng = (props: FansSvgProps) => {
	const { color, height, size, width, ...props_ } = props;

	return (
		<Svg
			width={width ?? size}
			height={height ?? size}
			viewBox="0 0 19.277 27.183"
			{...props_}
		>
			<G>
				<Path
					d="M29.623,9.841v-5.5h0L19.985,9.5l5.138,2.75Z"
					transform="translate(-19.985 -4.341)"
					fill={color ?? "#ffdc6e"}
				/>
				<Path
					d="M54.5,12.25,59.638,9.5,50,4.341v5.5Z"
					transform="translate(-40.362 -4.341)"
					fill={color ?? "#fab547"}
				/>
				<Path
					d="M25.122,24.42l-5.138-2.75V38.537l5.138-2.75Z"
					transform="translate(-19.985 -16.512)"
					fill={color ?? "#fab547"}
				/>
				<Path
					d="M25.122,69.092l-5.138,2.75L29.623,77V71.5Z"
					transform="translate(-19.985 -49.817)"
					fill={color ?? "#f98c28"}
				/>
				<Path
					d="M64.016,24.42V35.787l5.138,2.75V21.67Z"
					transform="translate(-49.877 -16.512)"
					fill={color ?? "#f98c28"}
				/>
				<Path
					d="M50,71.5V77l9.638-5.159L54.5,69.092Z"
					transform="translate(-40.362 -49.817)"
					fill={color ?? "#fa7142"}
				/>
				<Path
					d="M35.984,25.225V36.592L40.485,39l4.5-2.409V25.225l-4.5-2.409Z"
					transform="translate(-30.847 -17.317)"
					fill={color ?? "#fcce59"}
				/>
			</G>
		</Svg>
	);
};

export default LegendPng;
