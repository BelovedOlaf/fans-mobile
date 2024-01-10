import React from "react";
import { View } from "react-native";
import { Divider as RNDivider } from "react-native-paper";

import { FansView } from "@components/controls";
import tw from "@lib/tailwind";
import { IFansDivider } from "@usertypes/components";
import { ColorStyle1 } from "@usertypes/styles";

const FansDivider: IFansDivider = (props) => {
	const { size = 1, color, vertical = false, style, ver1 } = props;

	const styles = ["bg-fans-grey"];
	styles.push(vertical ? `w-[${size}px]` : `h-[${size}px]`);
	vertical && styles.push("h-full");
	color && styles.push(`bg-${color}`);

	if (ver1)
		return (
			<FansView
				style={[tw.style("h-[1px]", "bg-fans-grey"), props.style]}
			/>
		);

	return vertical ? (
		<View style={[tw.style(styles), props.style]} />
	) : (
		<RNDivider style={[tw.style(styles), props.style]} />
	);
};

const FansDivider1: IFansDivider = (props) => {
	return <FansView background={ColorStyle1.Grey} {...props} />;
};

export const FansHorizontalDivider: IFansDivider = (props) => {
	const { width = "full", height = 1, ...props_ } = props;

	return <FansDivider1 width={width} height={height} {...props_} />;
};

export const FansVerticalDivider: IFansDivider = (props) => {
	const { width = 1, height = "full", ...props_ } = props;

	return <FansDivider1 width={width} height={height} {...props_} />;
};

export default FansDivider;
