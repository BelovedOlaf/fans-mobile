import { IFansSvg } from "@usertypes/components";
import React from "react";
import Svg, { G, Line, Path, SvgProps } from "react-native-svg";

export default function SvgComponent({ ...props }: SvgProps) {
	return (
		<Svg fill="currentColor" {...props} viewBox="0 0 14.95 14.999">
			<G id="Group_50055" data-name="Group 50055">
				<Path
					id="Path_45915"
					data-name="Path 45915"
					d="M11.61,9.2l-1.6-2.472L6.144,12.476l3.42-.374Z"
					transform="translate(-6.144 -6.733)"
					fill="#ecd9fc"
				/>
				<Path
					id="Path_45916"
					data-name="Path 45916"
					d="M63.834,12.1l3.42.374L63.393,6.733,61.789,9.2Z"
					transform="translate(-52.304 -6.733)"
					fill="#a386fc"
				/>
				<Path
					id="Path_45917"
					data-name="Path 45917"
					d="M34.421,9.2l1.6-2.472H28.8L30.4,9.2Z"
					transform="translate(-24.937 -6.733)"
					fill="#caacf9"
				/>
				<Path
					id="Path_45918"
					data-name="Path 45918"
					d="M9.565,38.234l-3.42.374,7.475,9.256V43.518Z"
					transform="translate(-6.144 -32.865)"
					fill="#c39bf9"
				/>
				<Path
					id="Path_45919"
					data-name="Path 45919"
					d="M54.055,38.234,50,43.518v4.346l7.475-9.256Z"
					transform="translate(-42.525 -32.865)"
					fill="#986eff"
				/>
				<Path
					id="Path_45920"
					data-name="Path 45920"
					d="M28.257,21.234l-2.045,2.9,4.055,5.284,4.055-5.284-2.045-2.9Z"
					transform="translate(-22.791 -18.763)"
					fill="#d9c2f9"
				/>
			</G>
		</Svg>
	);
}

export const Diamond1Svg: IFansSvg = (props) => {
	const { color } = props;

	return (
		<Svg viewBox="0 0 13.804 13.94">
			<G
				transform="translate(0.504 0.451)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="0.9"
			>
				<Path
					d="M982.083,265.706a1.789,1.789,0,0,0-1.325-.706h-4.77a1.79,1.79,0,0,0-1.324.706l-2.508,3.731a1.227,1.227,0,0,0,.06,1.367l5.624,6.964a.659.659,0,0,0,1.068,0l5.624-6.964a1.228,1.228,0,0,0,.059-1.367Z"
					transform="translate(-971.975 -265.001)"
				/>
				<Path
					d="M980.053,274.5l1.4-2.079h3.133l1.4,2.079-2.964,3.67Z"
					transform="translate(-976.619 -269.266)"
				/>
				<Line
					x1="1.388"
					y2="2.646"
					transform="translate(8.087 0.328)"
				/>
				<Line x1="3.4" y1="0.118" transform="translate(9.362 5.1)" />
				<Line y1="3.826" transform="translate(6.387 8.925)" />
				<Line y1="0.118" x2="3.378" transform="translate(0.033 5.1)" />
				<Line
					x1="1.365"
					y1="2.646"
					transform="translate(3.321 0.328)"
				/>
			</G>
		</Svg>
	);
};
