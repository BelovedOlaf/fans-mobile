import React from "react";
import { TouchableOpacity } from "react-native";

import { ChevronRight1Svg, Robot1Svg } from "@assets/svgs/common";
import {
	FansButton3,
	FansGap,
	FansImage2,
	FansScreen2,
	FansSvg,
	FansText,
	FansTextInput4,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { AutomatedChatsNativeStackScreenProps } from "@screens/settings/automatedChats";
import { getColorStyle } from "@usertypes/styles";

const MessageCreateScreen = (
	props: AutomatedChatsNativeStackScreenProps<"MessageCreate">,
) => {
	const { route, navigation } = props;
	const { type } = route.params;
	const isWelcome = type === "Welcome";

	navigation.setOptions({
		headerRight: () => (
			<FansView flexDirection="row">
				<TouchableOpacity onPress={handlePressCreate}>
					<FansText
						color="purple"
						fontFamily="inter-bold"
						fontSize={17}
					>
						Create
					</FansText>
				</TouchableOpacity>
				<FansGap width={18} />
			</FansView>
		),
		title: isWelcome ? "Welcome message" : "Top fans message",
	});

	const handlePressCreate = () => {
		navigation.navigate("AutomatedChats");
	};

	const image = "https://i.postimg.cc/J7vXYBL0/image.png";

	return (
		<FansScreen2>
			<FansGap height={27.3} />
			<FansImage2
				width={95}
				height={95}
				source={{ uri: image }}
				viewStyle={{ alignSelf: "center", borderRadius: 7 }}
			/>
			<FansGap height={14} />
			<FansTextInput4
				height={128}
				viewStyle={{ borderRadius: 7 }}
				textInputStyle={{
					multiline: true,
					placeholder: "Write a message",
					placeholderTextColor: getColorStyle("black"),
					style: tw.style("my-[13px]", "self-stretch"),
				}}
			/>
			<FansGap height={14} />
			<FansButton3
				width={171.86}
				title="AI Caption"
				icon={
					<FansSvg
						width={19.75}
						height={12.35}
						svg={Robot1Svg}
						color1="purple"
					/>
				}
				buttonStyle={{
					alignSelf: "center",
					backgroundColor: "white",
					gap: 7.2,
				}}
				textStyle1={{ color: "purple" }}
			/>
			<FansGap height={24} />
			{[
				"Add poll",
				"Tag people",
				"Add giveaway",
				"Add location",
				"Add fundraiser",
			].map((item, index) => {
				return (
					<FansView
						height={52}
						alignItems="center"
						flexDirection="row"
						gap={4}
						justifyContent="between"
					>
						<FansText fontSize={18}>{item}</FansText>
						<FansSvg
							width={6.14}
							height={12.28}
							svg={ChevronRight1Svg}
							color1="grey-70"
						/>
					</FansView>
				);
			})}
		</FansScreen2>
	);
};

export default MessageCreateScreen;
