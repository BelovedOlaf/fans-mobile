import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const PostMailSvg = ({ ...props }: FansSvgProps) => {
	return (
		<Svg
			width={props.size ?? props.width}
			height={props.size ?? props.height}
			viewBox="0 0 23.73 18.999"
		>
			<Path
				d="M329.972,645.821a2.079,2.079,0,0,1-1.315-.452l-6.205-5.077a.756.756,0,1,1,.958-1.17l6.205,5.077a.632.632,0,0,0,.715,0l6.205-5.077a.756.756,0,1,1,.958,1.17l-6.205,5.077A2.079,2.079,0,0,1,329.972,645.821Z"
				transform="translate(-318.107 -633.779)"
				stroke={props.color ?? "#000"}
				strokeWidth="0.1"
			/>
			<Path
				d="M337.7,652.949H321.931a3.986,3.986,0,0,1-3.981-3.981V637.931a3.986,3.986,0,0,1,3.981-3.981H337.7a3.986,3.986,0,0,1,3.981,3.981v11.037A3.986,3.986,0,0,1,337.7,652.949Zm-15.767-17.344a2.328,2.328,0,0,0-2.326,2.326v11.037a2.328,2.328,0,0,0,2.326,2.326H337.7a2.328,2.328,0,0,0,2.326-2.326V637.931a2.328,2.328,0,0,0-2.326-2.326Z"
				transform="translate(-317.95 -633.95)"
			/>
		</Svg>
	);
};

export default PostMailSvg;
