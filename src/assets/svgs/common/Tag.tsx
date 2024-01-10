import React from "react";
import Svg, { G, Line, SvgProps } from "react-native-svg";

export default function TagSvg({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="0 0 22.574 24.944">
			<G
				id="Group_50024"
				data-name="Group 50024"
				transform="translate(-108.025 -744.372)"
			>
				<G
					id="Group_50027"
					data-name="Group 50027"
					transform="translate(108.875 752.809)"
				>
					<Line
						id="Line_23"
						data-name="Line 23"
						x2="19.328"
						transform="translate(0 8.069)"
						fill="none"
						stroke={props.color ?? "#000"}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.7"
					/>
					<Line
						id="Line_24"
						data-name="Line 24"
						x2="19.328"
						transform="translate(1.546)"
						fill="none"
						stroke={props.color ?? "#000"}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.7"
					/>
				</G>
				<G
					id="Group_50028"
					data-name="Group 50028"
					transform="translate(113.417 745.344)"
				>
					<Line
						id="Line_25"
						data-name="Line 25"
						x1="3.628"
						y2="23"
						transform="translate(8.162)"
						fill="none"
						stroke={props.color ?? "#000"}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.7"
					/>
					<Line
						id="Line_26"
						data-name="Line 26"
						x1="3.628"
						y2="23"
						fill="none"
						stroke={props.color ?? "#000"}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.7"
					/>
				</G>
			</G>
		</Svg>
	);
}
