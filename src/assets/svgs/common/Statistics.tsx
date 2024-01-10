import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	size?: number;
}

export default function StatisticsSvg({ ...props }: FansSvgProps) {
	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox="0 0 17.349 17.294"
		>
			<G transform="translate(0.75 16.594) rotate(-90)">
				<Path
					d="M15.842,1.641c-.019-.074-.038-.149-.057-.223A1.844,1.844,0,0,0,13.982,0Q7.917,0,1.853,0a1.857,1.857,0,0,0-.166,3.706c.076.007.154.006.232.006q6,0,12,0a1.88,1.88,0,0,0,1.892-1.559.185.185,0,0,1,.026-.054Z"
					transform="translate(0.002 6.04)"
					fill="none"
					stroke={props.color ?? "#000"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
				/>
				<Path
					d="M5.275,3.713c1.155,0,2.309.006,3.464,0A1.852,1.852,0,0,0,8.948.024,2.174,2.174,0,0,0,8.656,0Q5.277,0,1.9,0a1.855,1.855,0,0,0-.1,3.708c1.159.014,2.32,0,3.48,0Z"
					transform="translate(0.003 12.078)"
					fill="none"
					stroke={props.color ?? "#000"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
				/>
				<Path
					d="M2.64,0c-.278,0-.556,0-.834,0a1.855,1.855,0,0,0,.021,3.71c.546.009,1.092.013,1.638,0A1.854,1.854,0,0,0,3.857.054,2.882,2.882,0,0,0,3.32,0C3.094,0,2.867,0,2.64,0Z"
					fill="none"
					stroke={props.color ?? "#000"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
				/>
			</G>
		</Svg>
	);
}
