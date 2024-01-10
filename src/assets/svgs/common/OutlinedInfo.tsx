import React from "react";
import Svg, { G, Path, Line, SvgProps } from "react-native-svg";

type Props = {
	size?: number;
} & SvgProps;

export default function OutlinedInfoSvg({ ...props }: Props) {
	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox="0 0 14.334 14.331"
		>
			<G transform="translate(-189.69 -601.967)">
				<G transform="translate(196.857 606.026)">
					<Line
						y2="4.095"
						fill="none"
						stroke={props.color ?? "#fff"}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.3"
					/>
					<Line
						transform="translate(0 6.37)"
						fill="none"
						stroke={props.color ?? "#fff"}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.3"
					/>
				</G>
				<Path
					d="M884.448,227.511a7.115,7.115,0,1,0,7.1,7.131A7.12,7.12,0,0,0,884.448,227.511Zm-.028,13.281a6.166,6.166,0,1,1,6.179-6.151A6.171,6.171,0,0,1,884.421,240.792Z"
					transform="translate(-687.575 374.506)"
					fill={props.color ?? "#fff"}
					stroke={props.color ?? "#fff"}
					strokeWidth="0.1"
				/>
			</G>
		</Svg>
	);
}
