// import React module
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	size?: number;
}

const AnalyticsSvg = ({ ...props }: FansSvgProps) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		viewBox="0 0 23.396 23.472"
	>
		<G transform="translate(0.75 22.716) rotate(-90)">
			<G transform="translate(0 0)">
				<G transform="translate(0)">
					<Path
						d="M21.962,2.275c-.026-.1-.053-.206-.079-.309A2.556,2.556,0,0,0,19.385,0Q10.976,0,2.57,0a2.574,2.574,0,0,0-.23,5.138c.106.01.214.009.321.009q8.321,0,16.643,0a2.606,2.606,0,0,0,2.623-2.161.257.257,0,0,1,.036-.074Z"
						transform="translate(0.003 8.373)"
						fill="none"
						stroke={props.color ?? "currentColor"}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
					/>
					<Path
						d="M7.313,5.148c1.6,0,3.2.008,4.8,0a2.568,2.568,0,0,0,.29-5.113A3.013,3.013,0,0,0,12,0Q7.316,0,2.63,0a2.571,2.571,0,0,0-.142,5.14c1.607.02,3.216,0,4.824,0Z"
						transform="translate(0.004 16.745)"
						fill="none"
						stroke={props.color ?? "currentColor"}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
					/>
					<Path
						d="M3.66,0C3.275,0,2.89,0,2.5.005a2.572,2.572,0,0,0,.029,5.143c.757.013,1.514.018,2.271,0A2.571,2.571,0,0,0,5.347.074,4,4,0,0,0,4.6.005C4.29-.005,3.975,0,3.66,0Z"
						transform="translate(0 0)"
						fill="none"
						stroke={props.color ?? "currentColor"}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
					/>
				</G>
			</G>
		</G>
	</Svg>
);

export default AnalyticsSvg;
