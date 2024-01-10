import React from "react";
import Svg, { G, Line, Path, SvgProps } from "react-native-svg";

export default function PinOutlineSvg({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="0 0 16.543 16.543">
			<G transform="translate(0.919 0.919)">
				<G transform="translate(0.917 2.64)">
					<Path
						d="M428.892,307.947c-.709.873-1.417,1.749-2.133,2.616a1.017,1.017,0,0,0-.238.853,5.223,5.223,0,0,1-.257,2.816,4.241,4.241,0,0,1-.256.533.693.693,0,0,1-1.087.164c-.032-.029-.063-.061-.095-.092q-3.406-3.407-6.814-6.813a.737.737,0,0,1-.252-.738.679.679,0,0,1,.34-.444,4.509,4.509,0,0,1,1.694-.547c.218-.025.438-.032.715-.05.283.028.622.047.958.1a.968.968,0,0,0,.8-.217q1.318-1.081,2.642-2.154"
						transform="translate(-417.738 -303.971)"
						fill="none"
						stroke="#000"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.3"
					/>
				</G>
				<Line
					x2="4.98"
					y2="4.98"
					transform="translate(9.725 0)"
					fill="none"
					stroke="#000"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.3"
				/>
				<Line
					x1="2.862"
					y2="2.862"
					transform="translate(0 11.843)"
					fill="none"
					stroke="#000"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.3"
				/>
			</G>
		</Svg>
	);
}
