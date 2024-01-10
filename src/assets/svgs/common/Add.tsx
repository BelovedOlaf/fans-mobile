// import React module
import React from "react";
import Svg, { G, Path } from "react-native-svg";

interface FansSvgProps {
	size?: number;
	width?: number;
	height?: number;
}

const AddSvg = ({ ...props }: FansSvgProps) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		viewBox="0.5 26.95 24 24"
	>
		<G>
			<Path
				d="M.5 38.902a12 12 0 1 1 0 .096z"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="#707070"
				fill="transparent"
				strokeWidth=".96"
			/>
			<G>
				<Path
					d="M12.568 32.5v13.152"
					strokeLinejoin="round"
					strokeLinecap="round"
					stroke="#707070"
					fill="transparent"
				/>
				<Path
					d="M5.992 39.076h13.152"
					strokeLinejoin="round"
					strokeLinecap="round"
					stroke="#707070"
					fill="transparent"
				/>
			</G>
		</G>
	</Svg>
);

export default AddSvg;
