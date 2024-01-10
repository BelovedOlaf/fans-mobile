import React from "react";
import Svg, { G, Line } from "react-native-svg";

import { IFansSvg } from "@usertypes/components";

export const SortAscSvg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;

	return (
		<Svg viewBox="0 0 18.559 15.847">
			<G
				transform="translate(0.9 0.9)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.8"
			>
				<Line x2="16.759" transform="translate(0 0)" />
				<Line x2="11.741" transform="translate(0 7.023)" />
				<Line x2="6.723" transform="translate(0 14.047)" />
			</G>
		</Svg>
	);
};

export const SortDescSvg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;

	return (
		<Svg viewBox="0 0 18.559 15.847">
			<G
				transform="translate(0.9 0.9)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.8"
			>
				<Line x2="6.723" transform="translate(0 0)" />
				<Line x2="11.741" transform="translate(0 7.023)" />
				<Line x2="16.759" transform="translate(0 14.047)" />
			</G>
		</Svg>
	);
};
