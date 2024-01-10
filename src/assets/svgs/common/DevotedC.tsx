// import react module
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	colorFans?: string;
	fill?: string;
	size?: number;
}

const DevotedPng = (props: FansSvgProps) => {
	const { color, height, size, width, ...props_ } = props;

	return (
		<Svg
			width={width ?? size}
			height={height ?? size}
			viewBox="0 0 26.161 26.247"
			{...props_}
		>
			<G transform="translate(0)">
				<Path
					d="M38.9,11.505l2.542-4.772H28.8l2.542,4.772Z"
					transform="translate(-22.041 -6.733)"
					fill={color ?? "#be9dfc"}
				/>
				<Path
					d="M66.053,16.524l5.925.259L65.221,6.733l-2.542,4.772Z"
					transform="translate(-45.817 -6.733)"
					fill={color ?? "#9486fc"}
				/>
				<Path
					d="M12.069,39.56l-5.925.259,13.08,16.2v-7.6Z"
					transform="translate(-6.144 -29.769)"
					fill={color ?? "#b588fc"}
				/>
				<Path
					d="M15.443,11.505,12.9,6.733,6.144,16.783l5.925-.259Z"
					transform="translate(-6.144 -6.733)"
					fill={color ?? "#ecd9fc"}
				/>
				<Path
					d="M57.156,39.56,50,48.42v7.6l13.08-16.2Z"
					transform="translate(-36.92 -29.769)"
					fill={color ?? "#8150f9"}
				/>
				<Path
					d="M29.383,22.733l-3.374,5.019,7.156,8.861,7.156-8.861-3.374-5.019Z"
					transform="translate(-20.084 -17.961)"
					fill={color ?? "#cfb4f9"}
				/>
			</G>
		</Svg>
	);
};

export default DevotedPng;
