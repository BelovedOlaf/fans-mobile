// import React module
import { IFansSvg } from "@usertypes/components";
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const BlockSvg = ({ ...props }: FansSvgProps) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		{...props}
		viewBox="0 0 17.161 17.156"
	>
		<Path
			d="M-35.109,802.5a8.384,8.384,0,0,0-8.4,8.359,8.384,8.384,0,0,0,8.362,8.4,8.384,8.384,0,0,0,8.4-8.359A8.383,8.383,0,0,0-35.109,802.5Zm0,1.118a7.256,7.256,0,0,1,4.651,1.708l-10.224,10.224a7.208,7.208,0,0,1-1.711-4.682A7.266,7.266,0,0,1-35.105,803.621Zm-.036,14.52a7.241,7.241,0,0,1-4.658-1.709l10.224-10.224a7.2,7.2,0,0,1,1.71,4.691A7.265,7.265,0,0,1-35.142,818.141Z"
			transform="translate(43.708 -802.303)"
			fill={props.color ?? "currentColor"}
		/>
	</Svg>
);

export const Block1Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 11.267 11.264">
			<Path
				d="M-37.962,802.5a5.536,5.536,0,0,0-5.546,5.52,5.536,5.536,0,0,0,5.522,5.544,5.536,5.536,0,0,0,5.546-5.52A5.535,5.535,0,0,0-37.962,802.5Zm0,.738a4.791,4.791,0,0,1,3.071,1.128l-6.751,6.751a4.76,4.76,0,0,1-1.13-3.092A4.8,4.8,0,0,1-37.959,803.241Zm-.024,9.588a4.781,4.781,0,0,1-3.076-1.128l6.751-6.751a4.752,4.752,0,0,1,1.129,3.1A4.8,4.8,0,0,1-37.983,812.829Z"
				transform="translate(43.608 -802.403)"
				fill={color}
				stroke={color}
				strokeWidth="0.2"
			/>
		</Svg>
	);
};

export const Block2Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 13.238 13.235">
			<Path
				d="M-37.024,802.5a6.472,6.472,0,0,0-6.484,6.453,6.472,6.472,0,0,0,6.455,6.482,6.472,6.472,0,0,0,6.483-6.453A6.471,6.471,0,0,0-37.024,802.5Zm0,.863a5.6,5.6,0,0,1,3.59,1.318l-7.893,7.892a5.564,5.564,0,0,1-1.321-3.614A5.609,5.609,0,0,1-37.022,803.366Zm-.028,11.208a5.589,5.589,0,0,1-3.6-1.319l7.892-7.893a5.555,5.555,0,0,1,1.32,3.621A5.608,5.608,0,0,1-37.05,814.575Z"
				transform="translate(43.658 -802.353)"
				fill={color}
				stroke={color}
				strokeWidth="0.3"
			/>
		</Svg>
	);
};

export const Block3Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 14.664 14.66" width={15} height={15}>
			<Path
				d="M-36.31,802.5a7.185,7.185,0,0,0-7.2,7.164,7.185,7.185,0,0,0,7.166,7.2,7.185,7.185,0,0,0,7.2-7.164A7.184,7.184,0,0,0-36.31,802.5Zm0,.958a6.218,6.218,0,0,1,3.986,1.463l-8.762,8.762a6.177,6.177,0,0,1-1.467-4.012A6.227,6.227,0,0,1-36.307,803.461Zm-.031,12.443a6.205,6.205,0,0,1-3.992-1.464l8.762-8.762A6.167,6.167,0,0,1-30.1,809.7,6.226,6.226,0,0,1-36.338,815.9Z"
				transform="translate(43.658 -802.353)"
				fill={color}
				stroke={color}
				strokeWidth="0.3"
			/>
		</Svg>
	);
};

export default BlockSvg;
