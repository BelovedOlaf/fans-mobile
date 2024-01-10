// import React module
import React from "react";
import Svg, { G, Path } from "react-native-svg";

interface FansSvgProps {
	size?: number;
	width?: number;
	height?: number;
	color?: string;
}

const QuestionMarkInCircleSvg = ({ ...props }: FansSvgProps) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		viewBox="0 0 14.23 14.226"
	>
		<G
			id="Group_53401"
			data-name="Group 53401"
			transform="translate(-877.315 -227.511)"
		>
			<Path
				id="Path_47262"
				data-name="Path 47262"
				d="M884.446,227.511a7.113,7.113,0,1,0,7.1,7.129A7.118,7.118,0,0,0,884.446,227.511Zm-.027,13.277a6.164,6.164,0,1,1,6.177-6.149A6.169,6.169,0,0,1,884.419,240.788Z"
				fill="#b1b1b1"
			/>
			<circle
				id="Ellipse_1897"
				data-name="Ellipse 1897"
				cx="0.608"
				cy="0.608"
				r="0.608"
				transform="translate(883.745 237.437)"
				fill="#b1b1b1"
			/>
			<Path
				id="Path_47263"
				data-name="Path 47263"
				d="M890.078,234.506a2.066,2.066,0,0,0-2.163,1.686.539.539,0,0,0,.146.4.524.524,0,0,0,.376.158c.241,0,.378-.114.475-.4a1.131,1.131,0,0,1,1.2-.847,1.1,1.1,0,0,1,1.2,1.13,1.055,1.055,0,0,1-.948,1.11c-.748.151-.8.248-.8.78v1.22a.533.533,0,1,0,1.065,0v-1.034a2.118,2.118,0,0,0,1.814-2.162A2.168,2.168,0,0,0,890.078,234.506Z"
				transform="translate(-5.736 -3.785)"
				fill="#b1b1b1"
			/>
		</G>
	</Svg>
);

export default QuestionMarkInCircleSvg;
