import tw from "@lib/tailwind";
import { IFansChips } from "@usertypes/components";
import { Colors } from "@usertypes/enums";
import { ColorStyle1, ColorStyle2 } from "@usertypes/styles";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import FansGap from "./Gap";
import FansSvg from "./Svg";
import { FansText } from "@components/controls";
import { FansView } from "./View";

const FansChips: IFansChips = (props) => {
	const {
		data,
		activeColor: colorView = Colors.Purple,
		value: selected,
		onChangeValue: onSelect,
	} = props;

	return (
		<ScrollView
			horizontal
			contentContainerStyle={tw.style(
				"flex-row gap-[7px] justify-between items-center",
			)}
			showsHorizontalScrollIndicator={false}
			style={tw.style("max-h-fans-selectgroup")}
		>
			{data.map((item, index) => {
				const {
					badge,
					color: textColor,
					icon: Icon,
					iconNode,
					id,
					text,
				} = item;
				const isActive = index === selected;

				const stylesView = [
					"h-fans-selectgroup",
					"flex-row gap-[5px] items-center",
					"rounded-full",
				];
				stylesView.push(
					isActive ? `bg-[${colorView}]` : "bg-fans-grey",
				);
				stylesView.push(text ? "px-[15px]" : "px-[11px]");

				return (
					<TouchableOpacity
						key={index}
						onPress={() => onSelect && onSelect(index as never)}
					>
						<View style={tw.style(stylesView)}>
							{iconNode}
							{Icon && (
								<Icon
									color={
										textColor ??
										(isActive ? Colors.White : Colors.Black)
									}
									size={12}
								/>
							)}
							{text && (
								<FansText
									style={tw.style(
										isActive ? "text-white" : "",
									)}
								>
									{item.text}
								</FansText>
							)}
							{badge && (
								<View
									style={tw.style(
										"h-fans-selectgroup-badge",
										isActive
											? "bg-white"
											: "bg-fans-purple",
										"flex justify-center",
										"px-[4px]",
										"rounded-full",
									)}
								>
									<FansText
										color={isActive ? "purple-a8" : "white"}
										fontFamily="inter-bold"
										fontSize={11}
									>
										{badge}
									</FansText>
								</View>
							)}
						</View>
					</TouchableOpacity>
				);
			})}
		</ScrollView>
	);
};

export const FansChips1: IFansChips = (props) => {
	const { data, activeColor1, selected, onChangeValue: onSelect } = props;

	return (
		<FansView style={tw.style("flex-row gap-[7px]")}>
			{data.map((item, index) => {
				const {
					badge,
					color: textColor,
					icon: Icon,
					iconNode,
					id,
					text,
				} = item;
				const isActive = index === selected;

				const stylesView = [
					"h-fans-selectgroup",
					"flex-row gap-[5px] items-center",
					"rounded-full",
				];
				stylesView.push(text ? "px-[17px]" : "px-[11px]");

				const handlePress = () => onSelect && onSelect(index as never);

				return (
					<TouchableOpacity key={index} onPress={handlePress}>
						<FansView
							background={
								isActive ? activeColor1 : ColorStyle1.Grey
							}
							style={tw.style(stylesView)}
						>
							<FansText color={isActive ? "white" : undefined}>
								{text}
							</FansText>
							{badge && (
								<View
									style={tw.style(
										"h-fans-selectgroup-badge",
										isActive
											? "bg-white"
											: "bg-fans-purple",
										"flex justify-center",
										"px-[4px]",
										"rounded-full",
									)}
								>
									<FansText
										color={isActive ? "purple-a8" : "white"}
										fontFamily="inter-bold"
										fontSize={11}
									>
										{badge}
									</FansText>
								</View>
							)}
						</FansView>
					</TouchableOpacity>
				);
			})}
		</FansView>
	);
};

export const FansChips2: IFansChips = (props) => {
	const { data, value, onChangeValue: trigSelect } = props;

	return (
		<FansView flexDirection="row" gap={7}>
			{data.map((item, index) => {
				const { id = index, text } = item;

				const stylesView = [];
				stylesView.push("px-[17px]");

				const handlePress = () => trigSelect(id as never);

				const isActive = id === value;

				return (
					<FansView
						height="chips"
						style={tw.style(stylesView)}
						alignItems="center"
						backgroundColor={isActive ? "purple" : "grey-f0"}
						borderRadius="full"
						flexDirection="row"
					>
						<TouchableOpacity key={index} onPress={handlePress}>
							<FansText
								color={isActive ? "white" : undefined}
								fontSize={17}
							>
								{text}
							</FansText>
						</TouchableOpacity>
					</FansView>
				);
			})}
		</FansView>
	);
};

export const FansChips3: IFansChips = (props) => {
	const {
		data,
		value,
		viewStyle,
		chipsStyle,
		onChangeValue: trigSelect,
		onContentSizeChange,
		onLayout,
		onScroll,
		scrollEventThrottle,
		scrollRef,
	} = props;

	const chipsStyle_ = {
		backgroundColor: "purple-a8" as ColorStyle2,
		...chipsStyle,
	};

	return (
		<FansView
			{...viewStyle}
			scrollViewProps={{
				contentContainerStyle: tw.style("flex-row gap-[7px]"),
				horizontal: true,
				showsHorizontalScrollIndicator: false,
				onContentSizeChange: onContentSizeChange,
				onLayout: onLayout,
				onScroll: onScroll,
				scrollEventThrottle: scrollEventThrottle,
			}}
			scrollRef={scrollRef}
		>
			{data.map((item, index) => {
				const { id = index, iconNode, gap, text } = item;

				const isActive = id === value;

				const handlePress = () => trigSelect(id as never);

				return (
					<FansView
						key={index}
						height="chips"
						touchableOpacityProps={{ onPress: handlePress }}
						alignItems="center"
						backgroundColor={
							isActive ? chipsStyle_.backgroundColor : "grey-f0"
						}
						borderRadius="full"
						flexDirection="row"
						padding={{ x: 14 }}
					>
						{iconNode}
						<FansGap width={gap} />
						<FansText
							color={isActive ? "white" : undefined}
							fontSize={17}
						>
							{text}
						</FansText>
					</FansView>
				);
			})}
		</FansView>
	);
};

export const FansChips4: IFansChips = (props) => {
	const {
		data,
		value,
		viewStyle1,
		chipsStyle,
		onChangeValue: trigSelect,
	} = props;

	const chipsStyle_ = {
		backgroundColor: "purple-a8" as ColorStyle2,
		...chipsStyle,
	};

	return (
		<FansView
			scrollViewProps={{
				contentContainerStyle: tw.style("flex-row gap-[7px]"),
				horizontal: true,
				showsHorizontalScrollIndicator: false,
			}}
			margin={viewStyle1?.margin}
			padding={viewStyle1?.padding}
		>
			{data.map((item, index) => {
				const { id = index, icon1, gap, text } = item;

				const isActive = id === value;

				const handlePress = () => trigSelect(id as never);

				return (
					<FansView
						key={index}
						height="chips"
						touchableOpacityProps={{ onPress: handlePress }}
						alignItems="center"
						backgroundColor={
							isActive ? chipsStyle_.backgroundColor : "grey-f0"
						}
						borderRadius="full"
						flexDirection="row"
						padding={{ x: 14 }}
					>
						{icon1 && (
							<FansSvg
								{...icon1}
								color1={isActive ? "white" : "black"}
							/>
						)}
						<FansGap width={gap} />
						<FansText
							color={isActive ? "white" : undefined}
							fontSize={17}
						>
							{text}
						</FansText>
					</FansView>
				);
			})}
		</FansView>
	);
};

export default FansChips;
