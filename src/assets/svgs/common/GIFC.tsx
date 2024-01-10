// import react module
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const GIFSvg = (props: FansSvgProps) => {
	const { color, height, size, width, ...props_ } = props;

	return (
		<Svg
			width={width ?? size}
			height={height ?? size}
			viewBox="0 0 32.5 32.5"
			{...props_}
		>
			<G transform="translate(0.05 0.05)">
				<Path
					d="M449.946,355.3H427.054a4.759,4.759,0,0,0-4.754,4.754v22.891a4.759,4.759,0,0,0,4.754,4.754h17.609a1.236,1.236,0,0,0,.872-.361l8.8-8.8a1.235,1.235,0,0,0,.361-.872V360.054A4.759,4.759,0,0,0,449.946,355.3Zm2.289,21.852-8.082,8.082h-17.1a2.291,2.291,0,0,1-2.289-2.289V360.054a2.291,2.291,0,0,1,2.289-2.289h22.891a2.291,2.291,0,0,1,2.289,2.289Z"
					transform="translate(-422.3 -355.3)"
					fill={color ?? "currentColor"}
					stroke={color ?? "currentColor"}
					strokeWidth="0.1"
				/>
				<Path
					d="M444.492,365.3h-3.522a4.745,4.745,0,0,0-4.719,4.4,5.358,5.358,0,0,1-3.742-.127,6.952,6.952,0,0,1-3.09-2.543l-.035-.051a1.213,1.213,0,0,0-1.7-.266l-.062.044a1.19,1.19,0,0,0-.225,1.671,10.244,10.244,0,0,0,1.02,1.238,8.4,8.4,0,0,0,6.086,2.765l.542,0a.663.663,0,0,0,.092-.011,1.03,1.03,0,0,1,.162-.016c.31-.04.616-.1.917-.169v1.333a1.233,1.233,0,0,0,2.465,0v-3.522a2.291,2.291,0,0,1,2.289-2.289h3.522a1.233,1.233,0,0,0,0-2.465Z"
					transform="translate(-418.608 -347.692)"
					fill={color ?? "currentColor"}
					stroke={color ?? "currentColor"}
					strokeWidth="0.1"
				/>
				<Path
					d="M428.426,363.708a1.6,1.6,0,0,0,1.6-1.592v0a1.6,1.6,0,1,0-1.6,1.594Z"
					transform="translate(-418.854 -351.333)"
					fill={color ?? "currentColor"}
					stroke={color ?? "currentColor"}
					strokeWidth="0.1"
				/>
				<Path
					d="M435.656,363.708h0a1.6,1.6,0,0,0,0-3.194h-.007a1.6,1.6,0,0,0,.007,3.194Z"
					transform="translate(-413.352 -351.333)"
					fill={color ?? "currentColor"}
					stroke={color ?? "currentColor"}
					strokeWidth="0.1"
				/>
			</G>
		</Svg>
	);
};

export default GIFSvg;
