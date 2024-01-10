// import React module
import { IFansSvg } from "@usertypes/components";
import React from "react";
import Svg, { G, Path, Rect, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const MailSvg = ({ ...props }: FansSvgProps) => {
	const {
		size,
		width = size,
		height = size,
		color = "currentColor",
		fill = "transparent",
		...props_
	} = props;
	return (
		<Svg width={width} height={height} viewBox="0 0 18.33 14.697">
			<Rect
				width="18.03"
				height="14.397"
				rx="3"
				transform="translate(0.15 0.15)"
				fill={fill}
				stroke={color}
			/>
			<Path
				d="M328.165,644.229a1.6,1.6,0,0,1-1.01-.347l-4.767-3.9a.581.581,0,1,1,.736-.9l4.767,3.9a.485.485,0,0,0,.549,0l4.767-3.9a.581.581,0,1,1,.736.9l-4.767,3.9A1.6,1.6,0,0,1,328.165,644.229Z"
				transform="translate(-319 -634.927)"
				fill={fill}
				stroke={color}
			/>
			<Path
				d="M333.122,648.547H321.009a3.063,3.063,0,0,1-3.059-3.059v-8.479a3.063,3.063,0,0,1,3.059-3.059h12.113a3.063,3.063,0,0,1,3.059,3.059v8.479A3.063,3.063,0,0,1,333.122,648.547Zm-12.113-13.325a1.789,1.789,0,0,0-1.787,1.787v8.479a1.788,1.788,0,0,0,1.787,1.787h12.113a1.788,1.788,0,0,0,1.787-1.787v-8.479a1.789,1.789,0,0,0-1.787-1.787Z"
				transform="translate(-317.9 -633.9)"
				fill={fill}
				stroke={color}
			/>
		</Svg>
	);
};

export const Mail1Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 18.33 14.697">
			<G stroke={color}>
				<Path
					d="M328.165,644.229a1.6,1.6,0,0,1-1.01-.347l-4.767-3.9a.581.581,0,1,1,.736-.9l4.767,3.9a.485.485,0,0,0,.549,0l4.767-3.9a.581.581,0,1,1,.736.9l-4.767,3.9A1.6,1.6,0,0,1,328.165,644.229Z"
					transform="translate(-319 -634.927)"
					strokeWidth="0.2"
				/>
				<Path
					d="M333.122,648.547H321.009a3.063,3.063,0,0,1-3.059-3.059v-8.479a3.063,3.063,0,0,1,3.059-3.059h12.113a3.063,3.063,0,0,1,3.059,3.059v8.479A3.063,3.063,0,0,1,333.122,648.547Zm-12.113-13.325a1.789,1.789,0,0,0-1.787,1.787v8.479a1.788,1.788,0,0,0,1.787,1.787h12.113a1.788,1.788,0,0,0,1.787-1.787v-8.479a1.789,1.789,0,0,0-1.787-1.787Z"
					transform="translate(-317.9 -633.9)"
					strokeWidth="0.1"
				/>
			</G>
		</Svg>
	);
};

export const Mail2Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 19.447 15.77">
			<G
				transform="translate(-11.728 -3.952)"
				storke={color}
				strokeWidth="0.1"
			>
				<Path
					d="M328.236,644.292a1.616,1.616,0,0,1-1.022-.352l-4.824-3.947a.588.588,0,1,1,.745-.91l4.824,3.947a.491.491,0,0,0,.555,0l4.824-3.947a.588.588,0,1,1,.745.91l-4.824,3.947A1.616,1.616,0,0,1,328.236,644.292Z"
					transform="translate(-306.783 -630.477)"
				/>
				<Path
					d="M333.3,648.72H321.045a3.1,3.1,0,0,1-3.095-3.095v-8.58a3.1,3.1,0,0,1,3.095-3.095H333.3a3.1,3.1,0,0,1,3.095,3.095v8.58A3.1,3.1,0,0,1,333.3,648.72Zm-12.257-13.483a1.81,1.81,0,0,0-1.808,1.808v8.58a1.81,1.81,0,0,0,1.808,1.808H333.3a1.81,1.81,0,0,0,1.808-1.808v-8.58a1.81,1.81,0,0,0-1.808-1.808Z"
					transform="translate(-305.722 -629.497)"
					strokeWidth="1"
				/>
			</G>
		</Svg>
	);
};

export default MailSvg;
