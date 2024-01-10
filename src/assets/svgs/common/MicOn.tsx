// import react module
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

type Props = {
	size?: number;
} & SvgProps;

export default ({ ...props }: Props) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		viewBox="0 0 17.012 20.875"
	>
		<G transform="translate(0.1 0.105)">
			<Path
				d="M784.665,83.645q0,1.633,0,3.265a4.452,4.452,0,0,1-1.541,3.479,4.313,4.313,0,0,1-3.728,1.087,4.439,4.439,0,0,1-3.608-3.065,4.138,4.138,0,0,1-.233-1.422c0-2.238-.011-2.548,0-4.786a4.479,4.479,0,0,1,3.171-4.327,4.562,4.562,0,0,1,5.936,4.385C784.667,83.366,784.665,82.541,784.665,83.645Zm-1.423.014c0-1.18.029-.433-.007-1.612a3.13,3.13,0,0,0-4.144-2.814,3.186,3.186,0,0,0-2.127,3.072c.016,2.169,0,2.409.008,4.577a3.91,3.91,0,0,0,.091.842,3.131,3.131,0,0,0,6.172-.571C783.265,85.989,783.241,84.824,783.242,83.66Z"
				transform="translate(-771.705 -77.642)"
				fill={props.color ?? "currentColor"}
				stroke={props.color ?? "currentColor"}
				strokeWidth="0.2"
			/>
			<Path
				d="M780.682,95.693v1.523h.259q1.346,0,2.691,0a1.692,1.692,0,0,1,.32.023.694.694,0,0,1,.567.729.712.712,0,0,1-.628.658c-.031,0-.062,0-.092,0q-3.829,0-7.657,0a.7.7,0,0,1-.194-1.383,1.557,1.557,0,0,1,.341-.031c.9,0,1.794,0,2.691,0h.266V95.692c-.148-.02-.3-.039-.448-.062a8.323,8.323,0,0,1-5.274-2.938,8.152,8.152,0,0,1-1.811-3.815,12.3,12.3,0,0,1-.151-1.507.706.706,0,1,1,1.409-.056,7.915,7.915,0,0,0,.267,1.883,6.985,6.985,0,0,0,12.581,1.925,7.011,7.011,0,0,0,1.139-3.752.709.709,0,1,1,1.413.014,9,9,0,0,1-.282,2.066,8.375,8.375,0,0,1-2.122,3.731,8.282,8.282,0,0,1-3.683,2.2c-.41.119-.838.174-1.258.256C780.916,95.663,780.8,95.675,780.682,95.693Z"
				transform="translate(-771.561 -77.964)"
				fill={props.color ?? "currentColor"}
				stroke={props.color ?? "currentColor"}
				strokeWidth="0.2"
			/>
		</G>
	</Svg>
);
