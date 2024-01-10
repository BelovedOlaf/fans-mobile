import { IFansSvg } from "@usertypes/components";
import React from "react";
import Svg, { G, Line, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	size?: number;
}

const WarningSvg = ({ ...props }: FansSvgProps) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		viewBox="0 0 26.88 24.372"
	>
		<G transform="translate(-325.55 -701.1)">
			<Path
				d="M335.983,703.736l-9.023,15.627a3.473,3.473,0,0,0,3.008,5.209h18.044a3.472,3.472,0,0,0,3.007-5.209L342,703.736A3.472,3.472,0,0,0,335.983,703.736Z"
				transform="translate(0 0)"
				fill="none"
				stroke={props.color ?? "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.8"
			/>
			<G transform="translate(338.991 709.945)">
				<Line
					y2="6.495"
					fill="none"
					stroke={props.color ?? "currentColor"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.9"
				/>
				<Line
					transform="translate(0 10.103)"
					fill="none"
					stroke={props.color ?? "currentColor"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.9"
				/>
			</G>
		</G>
	</Svg>
);

export const Warning1Svg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;

	return (
		<Svg viewBox="0 0 18.088 16.427">
			<G
				transform="translate(-325.712 -701.25)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
			>
				<Path d="M332.768,703.148,326.8,713.482a2.3,2.3,0,0,0,1.989,3.445h11.932a2.3,2.3,0,0,0,1.989-3.445l-5.966-10.334A2.3,2.3,0,0,0,332.768,703.148Z" />
				<G transform="translate(334.757 707.254)">
					<Line y2="4.295" />
					<Line transform="translate(0 6.681)" />
				</G>
			</G>
		</Svg>
	);
};

export const WarningCircledSvg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 14.334 14.331">
			<G transform="translate(-189.69 -601.967)" stroke={color}>
				<G
					transform="translate(196.857 606.026)"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.3"
				>
					<Line y2="4.095" />
					<Line transform="translate(0 6.37)" />
				</G>
				<Path
					d="M884.448,227.511a7.115,7.115,0,1,0,7.1,7.131A7.12,7.12,0,0,0,884.448,227.511Zm-.028,13.281a6.166,6.166,0,1,1,6.179-6.151A6.171,6.171,0,0,1,884.421,240.792Z"
					transform="translate(-687.575 374.506)"
					fill={color}
					strokeWidth="0.1"
				/>
			</G>
		</Svg>
	);
};

export default WarningSvg;
