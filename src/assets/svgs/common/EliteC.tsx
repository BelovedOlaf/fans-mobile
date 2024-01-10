// import react module
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	colorFans?: string;
	fill?: string;
	size?: number;
}

const ElitePng = (props: FansSvgProps) => {
	const { color, height, size, width, ...props_ } = props;

	return (
		<Svg
			width={width ?? size}
			height={height ?? size}
			viewBox="0 0 24.935 25.017"
			{...props_}
		>
			<G transform="translate(-6.144 -6.733)">
				<Path
					d="M15.261,10.856,12.584,6.733l-6.44,9.579,5.7-.624Z"
					transform="translate(0 0)"
					fill={color ?? "#f98c28"}
				/>
				<Path
					d="M65.2,15.688l5.7.624-6.44-9.579-2.676,4.122Z"
					transform="translate(-39.825 0)"
					fill={color ?? "#fa7142"}
				/>
				<Path
					d="M38.177,10.856l2.676-4.122H28.8l2.676,4.122Z"
					transform="translate(-16.213 0)"
					fill={color ?? "#fab547"}
				/>
				<Path
					d="M11.849,38.234l-5.7.624L18.612,54.3V47.047Z"
					transform="translate(0 -22.546)"
					fill={color ?? "#fab547"}
				/>
				<Path
					d="M56.763,38.234,50,47.047V54.3L62.467,38.858Z"
					transform="translate(-31.388 -22.546)"
					fill={color ?? "#f98c28"}
				/>
				<Path
					d="M29.623,21.234l-3.411,4.833,6.763,8.813,6.763-8.813-3.411-4.833Z"
					transform="translate(-14.362 -10.379)"
					fill="#fcce59"
				/>
			</G>
		</Svg>
	);
};

export default ElitePng;
