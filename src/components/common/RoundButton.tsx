import React, { useMemo } from "react";
import tw from "@lib/tailwind";
import { Button } from "react-native-paper";
import { ComponentSizeTypes } from "@usertypes/commonEnums";

// import base modules
import { RoundButtonType } from "@usertypes/commonEnums";
import { Colors } from "@usertypes/enums";

type Props = {
	variant?: RoundButtonType;
	color?: string;
	customStyles?: string;
	children?: React.ReactNode;
	size?: ComponentSizeTypes;
} & React.ComponentProps<typeof Button>;

const RoundButton = ({
	variant = RoundButtonType.PRIMARY,
	color = "#000",
	customStyles = "",
	children,
	size = ComponentSizeTypes.lg,
	...props
}: Props) => {
	const componentStyles = useMemo(() => {
		const styles: {
			buttonColor: string;
			textColor: string;
			styles: string[];
			labelStyle: string[];
		} = {
			buttonColor: "",
			textColor: "",
			styles: ["rounded-[28px]"],
			labelStyle: [
				"leading-[23px]",
				size === ComponentSizeTypes.md
					? "text-[17px] m-0"
					: "text-[19px]",
				size === ComponentSizeTypes.md
					? "font-semibold"
					: "font-inter-bold",
			],
		};

		styles.styles.push(customStyles);

		switch (variant) {
			case RoundButtonType.PRIMARY:
				styles.buttonColor = "#A854F5";
				styles.textColor = "white";
				styles.styles.push("border-[1px]");
				styles.styles.push("border-[#A854F5]");
				break;
			case RoundButtonType.SECONDARY:
				styles.buttonColor = Colors.Green;
				styles.textColor = "white";
				break;
			case RoundButtonType.OUTLINE:
				styles.buttonColor = "";
				styles.textColor = color;
				styles.styles.push(`border-[${color}]`);
				break;
			case RoundButtonType.OUTLINE_PRIMARY:
				styles.buttonColor = "";
				styles.textColor = "#A854F5";
				styles.styles.push("border-[#A854F5]");
				break;
			case RoundButtonType.OUTLINE_WHITE:
				styles.buttonColor = "";
				styles.textColor = "white";
				styles.styles.push("border-white");
				break;
			case RoundButtonType.CONTAINED_WHITE:
				styles.buttonColor = "#fff";
				styles.textColor = "#A854F5";
				styles.styles.push("border-[1px]");
				styles.styles.push("border-[#fff]");
				break;
			case RoundButtonType.OUTLINE_RED:
				styles.buttonColor = "";
				styles.textColor = "#eb2121";
				styles.styles.push("border-[#eb2121] border-[1px]");
				break;
			case RoundButtonType.OUTLINE_SECONDARY:
				styles.buttonColor = "";
				styles.textColor = Colors.Green;
				styles.styles.push(`border-[${Colors.Green}] border-[1px]`);
				break;
		}

		if (props.disabled) {
			styles.styles.push("opacity-50");
			styles.styles.push(`bg-[${styles.buttonColor}]`);
			styles.labelStyle.push(`text-[${styles.textColor}]`);
		}

		return styles;
	}, [variant, !!props.disabled, size, customStyles]);

	const mode = useMemo<"contained" | "outlined" | "text">(() => {
		if (variant === RoundButtonType.PRIMARY) return "contained";
		else if (
			variant === RoundButtonType.OUTLINE ||
			variant === RoundButtonType.OUTLINE_PRIMARY ||
			variant === RoundButtonType.OUTLINE_WHITE
		)
			return "outlined";
		else return "text";
	}, [variant]);

	return (
		<Button
			{...props}
			style={tw.style(componentStyles.styles)}
			contentStyle={tw`${
				size === ComponentSizeTypes.md
					? "h-[34px] my-0 mx-[17px]"
					: "h-[42px]"
			}`}
			buttonColor={componentStyles.buttonColor}
			textColor={componentStyles.textColor}
			labelStyle={tw.style(componentStyles.labelStyle)}
			mode={mode}
		>
			{children}
		</Button>
	);
};

export default RoundButton;
