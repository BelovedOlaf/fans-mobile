import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	size?: number;
}

export default function PlaySvg({ ...props }: FansSvgProps) {
	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox="0 0 24.422 26.902"
		>
			<Path
				d="M185.816,753.188c3.474-2.006,3.474-5.288,0-7.294l-15.5-8.948c-3.474-2.006-6.316-.365-6.316,3.647v17.9c0,4.012,2.842,5.653,6.316,3.647Z"
				transform="translate(-164 -736.09)"
				fill={props.color ?? "#fff"}
			/>
		</Svg>
	);
}
