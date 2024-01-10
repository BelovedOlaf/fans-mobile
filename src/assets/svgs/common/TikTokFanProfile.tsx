// import react module
import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import tw from "@lib/tailwind";
import { IFansSvg } from "@usertypes/components";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

export default function TikTokFanProfileSvg({ ...props }: FansSvgProps) {
	const { color } = props;

	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox="0 0 16.961 19.339"
			fill={color}
		>
			<Path
				d="M465.723,715.558c-.212-.023-.424-.044-.634-.071a5.841,5.841,0,0,1-2.928-1.218,5.934,5.934,0,0,1-.793-8.67,5.905,5.905,0,0,1,3.521-1.935,5.762,5.762,0,0,1,1.788-.03c.036.005.074.016.119.026v3.176c-.061-.012-.114-.021-.164-.033a2.854,2.854,0,1,0,2.055,3.42,3.517,3.517,0,0,0,.076-.806q0-6.463.009-12.927v-.239c.82-.021,2.445-.043,3.145-.019a4.862,4.862,0,0,0,1.456,3.41,8.676,8.676,0,0,0,3.413,1.42s.037,2.221,0,3.2a8.042,8.042,0,0,1-4.859-1.724c0,.106,0,.181,0,.255q.01,3.327.019,6.654a5.808,5.808,0,0,1-.313,2.005,5.957,5.957,0,0,1-4.288,3.916,4.994,4.994,0,0,1-1.081.162,1.194,1.194,0,0,0-.163.028Z"
				transform="translate(-459.842 -696.219)"
			/>
		</Svg>
	);
}
