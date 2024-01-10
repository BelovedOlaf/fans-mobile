// import react module
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const ElitePng = (props: FansSvgProps) => {
	const { color, height, size, width, ...props_ } = props;

	return (
		<Svg
			width={width ?? size}
			height={height ?? size}
			viewBox="0 0 25.338 22.46"
			{...props_}
		>
			<Path
				d="M12.261,50h-5.4L13.2,61.23l2.7-4.782Z"
				transform="translate(-6.865 -38.77)"
				fill={color ?? "#24a2ff"}
			/>
			<Path
				d="M31.13,17.427H38.4l2.7-4.782H28.433Z"
				transform="translate(-22.098 -12.644)"
				fill={color ?? "#24a2ff"}
			/>
			<Path
				d="M31.13,71.448l-2.7,4.782H41.1l-2.7-4.782Z"
				transform="translate(-22.098 -53.77)"
				fill={color ?? "#2d6bf6"}
			/>
			<Path
				d="M15.9,17.427l-2.7-4.782L6.865,23.874h5.4Z"
				transform="translate(-6.865 -12.644)"
				fill={color ?? "#94d0fc"}
			/>
			<Path
				d="M66.02,23.874h5.4L65.08,12.644l-2.7,4.782Z"
				transform="translate(-46.077 -12.644)"
				fill={color ?? "#2d6bf6"}
			/>
			<Path
				d="M62.383,56.448l2.7,4.782L71.415,50h-5.4Z"
				transform="translate(-46.077 -38.77)"
				fill={color ?? "#161fe4"}
			/>
			<Path
				d="M28.871,41.448h7.274L39.782,35l-3.637-6.448H28.871L25.234,35Z"
				transform="translate(-19.839 -23.77)"
				fill={color ?? "#64c7f9"}
			/>
		</Svg>
	);
};

export default ElitePng;
