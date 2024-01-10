import React from "react";
import { Text } from "react-native";

import tw from "@lib/tailwind";
import { IFypText } from "@usertypes/components";
import {
	getFontSizeStyle,
	getLetterSpacingStyle,
	getLineHeightStyle,
	getTextColorStyle,
	getFontWeightStyle,
	getMarginStyle,
} from "@usertypes/styles";

export const FypText: IFypText = (props) => {
	const {
		style,
		color,
		fontWeight = 400,
		fontSize,
		letterSpacing,
		lineHeight,
		textAlign,
		textDecorationLine,
		textTransform,
		fontFamily,
		children,
		margin,
		...props_
	} = props;

	const styles = [];
	styles.push(getFontWeightStyle(fontWeight, fontFamily));
	color && styles.push(getTextColorStyle(color));
	fontSize && styles.push(getFontSizeStyle(fontSize));
	letterSpacing && styles.push(getLetterSpacingStyle(letterSpacing));
	lineHeight && styles.push(getLineHeightStyle(lineHeight));
	textAlign && styles.push(`text-${textAlign}`);
	textDecorationLine && styles.push(textDecorationLine);
	textTransform && styles.push(textTransform);
	margin && styles.push(getMarginStyle(margin));

	return (
		<Text
			style={[tw.style(styles), style, { overflow: "hidden" }]}
			{...props_}
		>
			{children}
		</Text>
	);
};

export default FypText;
