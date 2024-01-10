import React from "react";
import { G, Path, Svg } from "react-native-svg";

import { IFansSvg } from "@usertypes/components";

export const ChevronUp1Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 13.279 7.346">
			<G
				transform="translate(26.781 21.651) rotate(180)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeWidth="1"
			>
				<Path
					d="M9297.074,3389.546l-5.935,5.932-5.931-5.932"
					transform="translate(-9271 -3374.534)"
				/>
			</G>
		</Svg>
	);
};

export const ChevronUp2Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 14.839 8.48">
			<Path
				d="M12.718,6.358,6.357,0,0,6.358"
				transform="translate(1.061 1.061)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeWidth="1.5"
			/>
		</Svg>
	);
};

export const ChevronRight1Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 7.551 13.689">
			<Path
				d="M9297.483,3389.547l-6.139,6.137-6.137-6.137"
				transform="translate(-3388.84 9298.19) rotate(-90)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeWidth="1"
			/>
		</Svg>
	);
};

export const ChevronRight2Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 7.834 13.972">
			<G transform="translate(0 13.972) rotate(-90)">
				<Path
					d="M9297.483,3389.547l-6.139,6.137-6.137-6.137"
					transform="translate(-9284.36 -3388.698)"
					fill="none"
					stroke={color}
					strokeLinecap="round"
					strokeWidth="1.2"
				/>
			</G>
		</Svg>
	);
};

export const ChevronRight3Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 8.48 14.839">
			<Path
				d="M9297.927,3389.546l-6.36,6.358-6.357-6.358"
				transform="translate(-3388.486 9298.987) rotate(-90)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeWidth="1.5"
			/>
		</Svg>
	);
};

export const ChevronDown1Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 9.97 5.834">
			<Path
				d="M9293.482,3389.547l-4.138,4.137-4.137-4.137"
				transform="translate(-9284.36 -3388.698)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeWidth="1.2"
			/>
		</Svg>
	);
};

export const ChevronDown2Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 11.717 7.06">
			<Path
				d="M9294.521,3389.547l-4.656,4.656-4.657-4.656"
				transform="translate(-9284.006 -3388.344)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeWidth="1.7"
			/>
		</Svg>
	);
};

export const ChevronDown3Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 13.279 7.346">
			<Path
				d="M9297.074,3389.546l-5.935,5.932-5.931-5.932"
				transform="translate(-9284.502 -3388.839)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeWidth="1"
			/>
		</Svg>
	);
};

export const ChevronDown4Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 13.689 7.551">
			<Path
				d="M9297.483,3389.547l-6.139,6.137-6.137-6.137"
				transform="translate(-9284.501 -3388.84)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeWidth="1"
			/>
		</Svg>
	);
};

export const ChevronDown5Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 13.972 7.834">
			<Path
				d="M9297.483,3389.547l-6.139,6.137-6.137-6.137"
				transform="translate(-9284.36 -3388.698)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeWidth="1.2"
			/>
		</Svg>
	);
};

export const ChevronDown6Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 14.839 8.48">
			<Path
				d="M12.718,6.358,6.357,0,0,6.358"
				transform="translate(13.778 7.419) rotate(180)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeWidth="1.5"
			/>
		</Svg>
	);
};

export const ChevronLeft1Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 8.48 14.839">
			<Path
				d="M9297.927,3389.546l-6.36,6.358-6.357-6.358"
				transform="translate(3396.965 -9284.148) rotate(90)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeWidth="1.5"
			/>
		</Svg>
	);
};
