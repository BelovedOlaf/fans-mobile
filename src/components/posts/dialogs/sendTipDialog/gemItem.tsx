import tw from "@lib/tailwind";
import clsx from "clsx";
import React, { FC } from "react";
import {
	Image,
	ImageSourcePropType,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Title from "@components/common/Title";

interface Props {
	title: string;
	price?: number;
	titleColor?: string;
	onSelect: () => void;
	isSelected: boolean;
	// icon: React.FC<FansSvgProps>;
	icon: ImageSourcePropType;
}

const GemItem: FC<Props> = (props) => {
	const { title, price, titleColor, onSelect, isSelected } = props;

	const iconClasses = clsx(
		"rounded-full items-center justify-center relative border border-fans-grey w-[72px] h-[72px]",
		{
			"bg-fans-purple-light": isSelected,
		},
	);

	return (
		<View>
			<TouchableOpacity style={tw.style(iconClasses)} onPress={onSelect}>
				{isSelected && (
					<Image
						source={require("@assets/images/posts/gem-border.png")}
						style={tw.style("w-full h-full absolute left-0 top-0")}
					/>
				)}
				{/* <props.icon size={41.2} /> */}
				<Image
					source={props.icon}
					style={tw.style("w-[41.2px] h-[41.2px]")}
					resizeMode="cover"
				/>
			</TouchableOpacity>
			<View style={tw.style("mt-2")}>
				<Title style={`text-center ${titleColor}`}>{title}</Title>
				{price && (
					<Text
						style={tw.style(
							"text-[14px] leading-[19px] font-medium text-center",
						)}
					>
						{`$${price}`}
					</Text>
				)}
			</View>
		</View>
	);
};

export default GemItem;
