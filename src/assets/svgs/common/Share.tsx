// import react module
import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type Props = {
	size?: number;
} & SvgProps;

const ShareSvg = ({ ...props }: Props) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		viewBox="0 0 19.135 13.335"
	>
		<Path
			d="M432.039,801.769h-.28c-3.02,0-6.04-.011-9.059,0a5.1,5.1,0,0,0-3.712,1.46,4.52,4.52,0,0,0-1.245,3.155,3.342,3.342,0,0,1-.021.43.862.862,0,0,1-1.71-.174,6.164,6.164,0,0,1,4.743-6.323,8.367,8.367,0,0,1,2.02-.267c2.975-.028,5.95-.013,8.924-.013h.338c-.107-.113-.171-.184-.238-.251q-1.992-1.993-3.985-3.984a.857.857,0,0,1-.246-.934.814.814,0,0,1,.717-.572.825.825,0,0,1,.711.249q2.87,2.867,5.738,5.74a.833.833,0,0,1,0,1.23q-2.863,2.875-5.738,5.738a.861.861,0,1,1-1.209-1.226q2-2.006,4-4C431.861,801.957,431.927,801.886,432.039,801.769Z"
			transform="translate(-415.959 -794.242)"
			stroke={props.color ?? "currentColor"}
			strokeWidth="0.1"
		/>
	</Svg>
);

export default ShareSvg;
