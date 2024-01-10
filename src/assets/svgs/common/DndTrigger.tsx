import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

export default function DndTriggerSvg({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="0 0 9.794 16.139">
			<G transform="translate(0)">
				<G transform="translate(9.794 0) rotate(90)">
					<Path
						d="M0,1.661A1.65,1.65,0,0,0,1.638,3.294,1.668,1.668,0,0,0,3.291,1.633,1.668,1.668,0,0,0,1.644,0,1.648,1.648,0,0,0,0,1.661Z"
						transform="translate(12.847 0)"
						fill={props.color ?? "#000"}
					/>
					<Path
						d="M1.639,0A1.663,1.663,0,0,0,0,1.639,1.663,1.663,0,0,0,1.656,3.294,1.662,1.662,0,0,0,3.294,1.656,1.661,1.661,0,0,0,1.639,0Z"
						transform="translate(6.431 0)"
						fill={props.color ?? "#000"}
					/>
					<Path
						d="M1.637,0a1.647,1.647,0,0,0,.007,3.294A1.668,1.668,0,0,0,3.291,1.66,1.667,1.667,0,0,0,1.637,0Z"
						transform="translate(0 0)"
						fill={props.color ?? "#000"}
					/>
				</G>
				<G transform="translate(3.294 0) rotate(90)">
					<Path
						d="M0,1.661A1.65,1.65,0,0,0,1.638,3.294,1.668,1.668,0,0,0,3.291,1.633,1.668,1.668,0,0,0,1.644,0,1.648,1.648,0,0,0,0,1.661Z"
						transform="translate(12.847 0)"
						fill={props.color ?? "#000"}
					/>
					<Path
						d="M1.639,0A1.663,1.663,0,0,0,0,1.639,1.663,1.663,0,0,0,1.656,3.294,1.662,1.662,0,0,0,3.294,1.656,1.661,1.661,0,0,0,1.639,0Z"
						transform="translate(6.431 0)"
						fill={props.color ?? "#000"}
					/>
					<Path
						d="M1.637,0a1.647,1.647,0,0,0,.007,3.294A1.668,1.668,0,0,0,3.291,1.66,1.667,1.667,0,0,0,1.637,0Z"
						transform="translate(0 0)"
						fill={props.color ?? "#000"}
					/>
				</G>
			</G>
		</Svg>
	);
}
