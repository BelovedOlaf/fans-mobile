import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

export default function CheckAllSvg({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="0 0 16.785 9.396">
			<G transform="translate(-75.766 -48.222)">
				<Path
					d="M12882.783,3586.627l3.971,3.945,7.259-7.842"
					transform="translate(-12806.239 -3533.73)"
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.1"
				/>
				<Path
					d="M12886.754,3590.572l7.259-7.842"
					transform="translate(-12802.239 -3533.73)"
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.1"
				/>
			</G>
		</Svg>
	);
}
