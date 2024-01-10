// import React module
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const MessageSvg = ({ ...props }: FansSvgProps) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		viewBox="0 0 19.447 15.77"
	>
		<G transform="translate(-11.728 -3.952)">
			<Path
				d="M328.236,644.292a1.616,1.616,0,0,1-1.022-.352l-4.824-3.947a.588.588,0,1,1,.745-.91l4.824,3.947a.491.491,0,0,0,.555,0l4.824-3.947a.588.588,0,1,1,.745.91l-4.824,3.947A1.616,1.616,0,0,1,328.236,644.292Z"
				transform="translate(-306.783 -630.477)"
			/>
			<Path
				d="M333.3,648.72H321.045a3.1,3.1,0,0,1-3.095-3.095v-8.58a3.1,3.1,0,0,1,3.095-3.095H333.3a3.1,3.1,0,0,1,3.095,3.095v8.58A3.1,3.1,0,0,1,333.3,648.72Zm-12.257-13.483a1.81,1.81,0,0,0-1.808,1.808v8.58a1.81,1.81,0,0,0,1.808,1.808H333.3a1.81,1.81,0,0,0,1.808-1.808v-8.58a1.81,1.81,0,0,0-1.808-1.808Z"
				transform="translate(-305.722 -629.497)"
			/>
		</G>
	</Svg>
);

export default MessageSvg;
