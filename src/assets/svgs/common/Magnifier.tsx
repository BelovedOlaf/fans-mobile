import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
export default function SvgComponent({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="0 0 15.556 15.676">
			<G
				id="Icon_feather-search"
				data-name="Icon feather-search"
				transform="translate(1 1)"
			>
				<Path
					id="Path_1"
					data-name="Path 1"
					d="M15.255,9.878A5.378,5.378,0,1,1,9.878,4.5,5.378,5.378,0,0,1,15.255,9.878Z"
					transform="translate(-4.5 -4.5)"
					fill="none"
					stroke="#000"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
				/>
				<Path
					id="Path_2"
					data-name="Path 2"
					d="M28.468,28.588l-3.493-3.613"
					transform="translate(-15.326 -15.326)"
					fill="none"
					stroke="#000"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
				/>
			</G>
		</Svg>
	);
}
