import { isUndefined, max } from "lodash";

import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import tw from "@lib/tailwind";
import { IFansView } from "@usertypes/components";
import {
	getAlignItemsStyle,
	getAlignSelfStyle,
	getBackgroundColorStyle,
	getBorderColorStyle,
	getBorderRadiusStyle,
	getBorderStyle,
	getDisplayStyle,
	getGapStyle,
	getHeightStyle,
	getJustifyContentStyle,
	getMarginStyle,
	getMaxWidthStyle,
	getPaddingStyle,
	getPlacementStyle,
	getWidthStyle,
} from "@usertypes/styles";

export const FansView: IFansView = (props) => {
	const {
		size,
		width = size,
		height = size,
		maxWidth,
		style,
		scrollViewProps,
		scrollRef,
		touchableOpacityProps,
		children,
		alignItems,
		alignSelf,
		aspectRatio,
		border,
		borderColor,
		bottom,
		display,
		flex,
		flexBasis,
		flexDirection,
		flexWrap,
		gap,
		justifyContent,
		margin,
		opacity,
		overflow,
		padding,
		placement,
		position,
		right,
		top,

		background,
		backgroundColor,
		borderRadius,
		center,
		grow,
		...props_
	} = props;

	const styles = [];
	!isUndefined(width) && styles.push(getWidthStyle(width));
	!isUndefined(height) && styles.push(getHeightStyle(height));
	!isUndefined(maxWidth) && styles.push(getMaxWidthStyle(maxWidth));
	alignItems && styles.push(getAlignItemsStyle(alignItems));
	alignSelf && styles.push(getAlignSelfStyle(alignSelf));
	aspectRatio && styles.push(`aspect-${aspectRatio}`);
	background && styles.push(`bg-${background}`);
	backgroundColor && styles.push(getBackgroundColorStyle(backgroundColor));
	borderColor && styles.push(border ? getBorderStyle(border) : "border");
	borderColor && styles.push(getBorderColorStyle(borderColor));
	borderRadius && styles.push(getBorderRadiusStyle(borderRadius));
	!isUndefined(bottom) && styles.push(`bottom-[${bottom}px]`);
	center && styles.push("justify-center items-center");
	display && styles.push(getDisplayStyle(display));
	flex && styles.push(`flex-${flex}`);
	flexBasis && styles.push(`basis-${flexBasis}`);
	flexDirection && styles.push(`flex-${flexDirection}`);
	flexWrap && styles.push(`flex-${flexWrap}`);
	gap && styles.push(getGapStyle(gap));
	grow && styles.push("grow");
	justifyContent && styles.push(getJustifyContentStyle(justifyContent));
	margin && styles.push(getMarginStyle(margin));
	opacity && styles.push(`opacity-${opacity}`);
	overflow && styles.push(`overflow-${overflow}`);
	padding && styles.push(getPaddingStyle(padding));
	placement && styles.push(getPlacementStyle(placement));
	placement && console.log(placement, getPlacementStyle(placement));
	position && styles.push(position);
	!isUndefined(right) && styles.push(`right-[${right}px]`);
	!isUndefined(top) && styles.push(`top-[${top}px]`);

	if (!isUndefined(scrollViewProps)) {
		return (
			<ScrollView
				style={[tw.style(styles), style]}
				children={children}
				ref={scrollRef}
				{...scrollViewProps}
			/>
		);
	}

	if (!isUndefined(touchableOpacityProps)) {
		return (
			<TouchableOpacity
				style={[tw.style(styles), style]}
				children={children}
				{...touchableOpacityProps}
			/>
		);
	}

	return (
		<View
			style={[tw.style(styles), style]}
			children={children}
			{...props_}
		/>
	);
};
