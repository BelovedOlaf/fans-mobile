import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

export default function OutlinedPlaySvg({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="0 0 9.671 10.546">
			<Path
				d="M171.478,741.951a1.321,1.321,0,0,0,0-2.5l-5.313-3.067c-1.191-.687-2.165-.125-2.165,1.25v6.134c0,1.375.974,1.938,2.165,1.25Z"
				transform="translate(-163.35 -735.428)"
				fill="none"
				stroke={props.color ?? "#707070"}
				strokeWidth="1.3"
			/>
		</Svg>
	);
}
