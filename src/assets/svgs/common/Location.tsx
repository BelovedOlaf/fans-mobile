import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function LocationSvg({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="0 0 13.212 13.21">
			<Path
				d="M365.855,99.3l-1.523-.349q-1.835-.418-3.669-.834a.48.48,0,0,1-.368-.254.423.423,0,0,1,.247-.586c.276-.109.554-.214.831-.32l9.042-3.478q.559-.215,1.116-.43a.483.483,0,0,1,.324-.027.42.42,0,0,1,.27.565c-.118.324-.246.646-.37.968q-1.918,5-3.837,10c-.008.021-.016.042-.024.062a.425.425,0,0,1-.824-.064c-.058-.241-.111-.484-.166-.726q-.509-2.208-1.018-4.417C365.88,99.374,365.868,99.341,365.855,99.3Z"
				transform="translate(-359.599 -92.35)"
				fill="none"
				stroke={props.color ?? "#a854f5"}
				strokeMiterlimit="10"
				strokeWidth="1.3"
			/>
		</Svg>
	);
}
