import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	colorFans?: string;
	fill?: string;
	size?: number;
}

export default function DashboardSvg({ ...props }: FansSvgProps) {
	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox="0 0 13.028 13.028"
		>
			<G
				id="Group_53668"
				data-name="Group 53668"
				transform="translate(-611.45 18.55)"
			>
				<Path
					fill="none"
					stroke={props.color ?? "#fff"}
					id="Path_47475"
					data-name="Path 47475"
					d="M615.63-4H613.3A1.3,1.3,0,0,0,612-2.7V-.37A1.037,1.037,0,0,0,613.037.667h2.593A1.037,1.037,0,0,0,616.667-.37V-2.963A1.037,1.037,0,0,0,615.63-4Z"
					transform="translate(0 -6.74)"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.1"
				/>
				<Path
					fill="none"
					stroke={props.color ?? "#fff"}
					id="Path_47476"
					data-name="Path 47476"
					d="M615.63-18H613.3a1.3,1.3,0,0,0-1.3,1.3v2.334a1.037,1.037,0,0,0,1.037,1.037h2.593a1.037,1.037,0,0,0,1.037-1.037v-2.593A1.037,1.037,0,0,0,615.63-18Z"
					transform="translate(0)"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.1"
				/>
				<Path
					fill="none"
					stroke={props.color ?? "#fff"}
					id="Path_47477"
					data-name="Path 47477"
					d="M629.63-4H627.3A1.3,1.3,0,0,0,626-2.7V-.37A1.037,1.037,0,0,0,627.037.667h2.593A1.037,1.037,0,0,0,630.667-.37V-2.963A1.037,1.037,0,0,0,629.63-4Z"
					transform="translate(-6.74 -6.74)"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.1"
				/>
				<Path
					fill="none"
					stroke={props.color ?? "#fff"}
					id="Path_47478"
					data-name="Path 47478"
					d="M629.63-18H627.3a1.3,1.3,0,0,0-1.3,1.3v2.334a1.037,1.037,0,0,0,1.037,1.037h2.593a1.037,1.037,0,0,0,1.037-1.037v-2.593A1.037,1.037,0,0,0,629.63-18Z"
					transform="translate(-6.74)"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.1"
				/>
			</G>
		</Svg>
	);
}
