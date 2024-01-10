import { FansText, FansView } from "@components/controls";
import tw from "@lib/tailwind";
import { IFansTabs } from "@usertypes/components";
import { ColorStyle2 } from "@usertypes/styles";
import { Colors } from "@usertypes/types";
import React from "react";
import { TouchableOpacity } from "react-native";

const FansTabs: IFansTabs = (props) => {
	const {
		value,
		data,
		viewStyle,
		tabStyle,
		onChangeValue: trigChangeValue,
	} = props;

	const tabStyle_ = {
		activeBorderColor: "purple-a8" as Colors,
		...tabStyle,
	};

	return (
		<FansView height="tabs" flexDirection="row" margin={viewStyle?.margin}>
			{data.map((item, index) => {
				const { gap, icon, id = index, text } = item;

				const isActive = id === value;

				const handlePress = () => trigChangeValue(id as never);

				return (
					<FansView
						key={index}
						alignItems="center"
						border={{ b: isActive ? 2 : 1 }}
						borderColor={
							isActive ? tabStyle_.activeBorderColor : "grey-f0"
						}
						flex="1"
						flexDirection="row"
						gap={gap}
						justifyContent="center"
						position="relative"
					>
						{icon}
						<FansText
							color={isActive ? "black" : "grey-70"}
							fontFamily={
								isActive ? "inter-semibold" : "inter-medium"
							}
							fontSize={17}
						>
							{text}
						</FansText>
						<TouchableOpacity
							style={tw.style("w-full h-full", "absolute")}
							onPress={handlePress}
						/>
					</FansView>
				);
			})}
		</FansView>
	);
};

export default FansTabs;
