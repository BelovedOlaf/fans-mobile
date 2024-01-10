// import React module
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const BookmarkSvg = ({ ...props }: FansSvgProps) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		viewBox="0 0 16.061 20.04"
		{...props}
	>
		<Path
			id="Path_45791"
			data-name="Path 45791"
			d="M287.078,710.7c0,2.626,0,4.341,0,6.967a1.39,1.39,0,0,1-1.484,1.45,1.427,1.427,0,0,1-.965-.459q-1.974-1.98-3.954-3.955a.9.9,0,0,0-1.451,0q-1.984,1.983-3.969,3.966a1.413,1.413,0,0,1-2.017.048,1.359,1.359,0,0,1-.416-1.019c0-.582,0-1.164,0-1.747,0-4.67,0-8.429,0-13.1a1.738,1.738,0,0,1,1.18-1.749,2.035,2.035,0,0,1,.618-.1q5.333-.008,10.666,0a1.748,1.748,0,0,1,1.794,1.763c.008.408,0,.818,0,1.226Q287.078,707.345,287.078,710.7Z"
			transform="translate(-271.918 -700.1)"
			fill="none"
			stroke={props.color ?? "#000"}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.8"
		/>
	</Svg>
);

export default BookmarkSvg;
