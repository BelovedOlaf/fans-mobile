import React from "react";
import { ScrollView, View } from "react-native";

import tw from "@lib/tailwind";
import { IFansScreen } from "@usertypes/components";
import { Colors } from "@usertypes/enums";
import { isDesktop, osSelect } from "@utils/global";
import {
	AlignItemsStyle,
	AlignSelfStyle,
	HeightStyle,
	Padding1Style,
	WidthStyle,
	getAlignItemsStyle,
	getAlignSelfStyle,
	getFlexDirectionStyle,
	getHeightStyle,
	getMaxWidthStyle,
	getPaddingStyle,
	getWidthStyle,
} from "@usertypes/styles";

const FansScreen1: IFansScreen = (props) => {
	const { style, contentStyle, ...props_ } = props;

	const styles = [];
	styles.push("h-screen");
	styles.push("bg-fans-white");

	const contentStyles = [];
	contentStyles.push("flex");
	contentStyles.push("px-[17px] py-[23px]");

	return (
		<ScrollView
			style={[tw.style(styles), style]}
			contentContainerStyle={[tw.style(contentStyles), contentStyle]}
			showsVerticalScrollIndicator={false}
			{...props_}
		/>
	);
};

export const FansScreen2: IFansScreen = (props) => {
	const { style, contentStyle, ...props_ } = props;

	const styles = [];
	styles.push("h-screen");
	styles.push("bg-fans-white");

	const contentStyles = [];
	contentStyles.push("w-full");
	contentStyles.push("grow");
	contentStyles.push("px-[17px] py-[23px] lg:p-[0px]");
	contentStyles.push("self-center");

	return (
		<ScrollView
			style={[tw.style(styles), style]}
			contentContainerStyle={[tw.style(contentStyles), contentStyle]}
			showsVerticalScrollIndicator={false}
			{...props_}
		/>
	);
};

export const FansScreen3: IFansScreen = (props) => {
	const { screenStyle, style, contentStyle, contentStyle1, ...props_ } =
		props;

	const styles = [];
	styles.push("w-full");
	styles.push("bg-fans-white");

	const screenStyle_ = {
		alignItems: "center" as AlignItemsStyle,
		...screenStyle,
	};
	{
		const { alignItems } = screenStyle_;
	}

	const contentStyles = [];
	{
		const contentStyle1_ = {
			width: "full" as WidthStyle,
			height: "full" as HeightStyle,
			alignSelf: "center" as AlignSelfStyle,
			padding: { xs: { x: 17, y: 23 } } as Padding1Style,
			...contentStyle1,
		};
		const {
			width,
			height,
			maxWidth,
			alignSelf,
			flexDirection,
			grow,
			padding,
		} = contentStyle1_;
		width && contentStyles.push(getWidthStyle(width));
		height && contentStyles.push(getHeightStyle(height));
		maxWidth && contentStyles.push(getMaxWidthStyle(maxWidth));
		alignSelf && contentStyles.push(getAlignSelfStyle(alignSelf));
		flexDirection &&
			contentStyles.push(getFlexDirectionStyle(flexDirection));
		grow && contentStyles.push("grow");
		padding && contentStyles.push(getPaddingStyle(padding));
	}

	return (
		<ScrollView
			style={[tw.style(styles), style]}
			contentContainerStyle={[tw.style(contentStyles), contentStyle]}
			showsVerticalScrollIndicator={false}
			{...props_}
		/>
	);
};

export const FansScreen4: IFansScreen = (props) => {
	const { screenStyle, style, contentStyle, contentStyle1, ...props_ } =
		props;

	const styles = [];
	styles.push("w-full");
	styles.push("bg-fans-white");

	const screenStyle_ = {
		alignItems: "center" as AlignItemsStyle,
		...screenStyle,
	};
	{
		const { alignItems } = screenStyle_;
	}

	const contentStyles = [];
	{
		const contentStyle1_ = {
			width: "full" as WidthStyle,
			alignSelf: "center" as AlignSelfStyle,
			padding: { xs: { x: 17, y: 23 } } as Padding1Style,
			...contentStyle1,
		};
		const { width, maxWidth, alignSelf, flexDirection, grow, padding } =
			contentStyle1_;
		width && contentStyles.push(getWidthStyle(width));
		maxWidth && contentStyles.push(getMaxWidthStyle(maxWidth));
		alignSelf && contentStyles.push(getAlignSelfStyle(alignSelf));
		flexDirection &&
			contentStyles.push(getFlexDirectionStyle(flexDirection));
		grow && contentStyles.push("grow");
		padding && contentStyles.push(getPaddingStyle(padding));

		console.log(padding, getPaddingStyle(padding));
	}

	return (
		<ScrollView
			style={[tw.style(styles), style]}
			contentContainerStyle={[tw.style(contentStyles), contentStyle]}
			showsVerticalScrollIndicator={false}
			{...props_}
		/>
	);
};

export default FansScreen1;
