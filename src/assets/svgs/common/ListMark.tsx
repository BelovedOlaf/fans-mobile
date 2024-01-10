import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";

interface FansSvgProps {
	size?: number;
	width?: number;
	height?: number;
	color?: string;
}

const ListMarkSvg = ({ ...props }: FansSvgProps) => {
	const { size, width, height, color } = props;
	return (
		<Svg
			width={width ?? size}
			height={height ?? size}
			viewBox="0 0 11.899 11.904"
			{...props}
		>
			<Path
				d="M231.216,460.375q-.686.027-1.373.074a2.918,2.918,0,0,1-3.195-2.091c-.152-.433-.309-.863-.476-1.29a.941.941,0,0,0-1.078-.691.953.953,0,0,0-.733,1.081q.031.686.076,1.373a2.882,2.882,0,0,1-1.95,3.079c-.474.186-.954.354-1.433.528a.945.945,0,0,0-.686,1.081.921.921,0,0,0,1.016.729c.529-.021,1.057-.051,1.586-.077a2.857,2.857,0,0,1,2.882,1.844c.222.558.411,1.129.638,1.684a.877.877,0,0,0,1.013.544.886.886,0,0,0,.732-.919c-.011-.52-.036-1.039-.072-1.556a2.9,2.9,0,0,1,2.036-3.083c.462-.16.918-.336,1.374-.511a.92.92,0,0,0-.357-1.8Z"
				transform="translate(-220.35 -456.359)"
				fill={color ?? "#a854f5"}
			/>
		</Svg>
	);
};

export default ListMarkSvg;
