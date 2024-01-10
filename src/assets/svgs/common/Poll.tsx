import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

export default function PollSvg({ ...props }: FansSvgProps) {
	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox="0 0 33.101 32.995"
		>
			<G transform="translate(1.109 1.099)">
				<Path
					d="M393.162,1156.287c-.036.144-.074.29-.111.435a3.6,3.6,0,0,1-3.515,2.761q-11.826.007-23.648,0a3.62,3.62,0,0,1-.324-7.225c.149-.014.3-.012.451-.012q11.7,0,23.406-.006a3.665,3.665,0,0,1,3.69,3.039.35.35,0,0,0,.05.1Z"
					transform="translate(-362.27 -1140.466)"
					fill="none"
					stroke={props.color ?? "#a854f5"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2.2"
				/>
				<Path
					d="M372.56,1144.5c2.251,0,4.5-.011,6.754,0a3.611,3.611,0,0,1,.407,7.19,4.209,4.209,0,0,1-.57.044q-6.588,0-13.177,0a3.616,3.616,0,0,1-.2-7.23c2.26-.028,4.523-.006,6.785-.006Z"
					transform="translate(-362.27 -1144.495)"
					fill="none"
					stroke={props.color ?? "#a854f5"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2.2"
				/>
				<Path
					d="M367.42,1167.23c-.543,0-1.084.009-1.627,0a3.617,3.617,0,0,1,.041-7.233c1.064-.018,2.13-.026,3.194,0a3.615,3.615,0,0,1,.763,7.133,5.6,5.6,0,0,1-1.046.1c-.441.015-.883,0-1.326,0Z"
					transform="translate(-362.272 -1136.44)"
					fill="none"
					stroke={props.color ?? "#a854f5"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2.2"
				/>
			</G>
		</Svg>
	);
}
