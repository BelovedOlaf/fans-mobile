import React from "react";

import { ChevronDown1Svg } from "@assets/svgs/common";
import { Camera1Svg } from "@assets/svgs/common/Camera";
import {
	FansGap,
	FansImage2,
	FansScreen2,
	FansSvg,
	FansText,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { TouchableOpacity } from "react-native";
import { AutomatedChatsNativeStackScreenProps } from ".";

const MessageImageScreen = (
	props: AutomatedChatsNativeStackScreenProps<"MessageImage">,
) => {
	const { route, navigation } = props;
	const { type } = route.params;
	const isWelcome = type === "Welcome";

	navigation.setOptions({
		headerRight: () => (
			<FansView flexDirection="row">
				<TouchableOpacity onPress={handlePressNext}>
					<FansText
						color="purple"
						fontFamily="inter-bold"
						fontSize={17}
					>
						Next
					</FansText>
				</TouchableOpacity>
				<FansGap width={18} />
			</FansView>
		),
		title: isWelcome ? "Welcome message" : "Top fans message",
	});

	const handlePressNext = () => {
		navigation.navigate("MessageCreate", route.params);
	};

	const images = [
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
	];

	return (
		<FansScreen2 contentStyle={tw.style("p-[0px]")}>
			<FansImage2
				source={{ uri: "https://i.postimg.cc/J7vXYBL0/image.png" }}
				viewStyle={{ aspectRatio: "square" }}
			/>
			<FansGap height={11} />
			<FansView alignItems="center" flexDirection="row">
				<FansGap width={18} />
				<FansView alignItems="center" flexDirection="row" gap={8} grow>
					<FansText fontFamily="inter-bold" fontSize={19}>
						Recents
					</FansText>
					<FansSvg width={8.27} height={4.14} svg={ChevronDown1Svg} />
				</FansView>
				<FansView
					height={34}
					style={tw.style("px-[17px]")}
					alignItems="center"
					backgroundColor="grey-f0"
					borderRadius="full"
					justifyContent="center"
				>
					<FansText fontSize={17}>Select multiple</FansText>
				</FansView>
				<FansGap width={7} />
				<FansView
					width={34}
					height={34}
					alignItems="center"
					backgroundColor="grey-f0"
					borderRadius="full"
					justifyContent="center"
				>
					<FansSvg width={17.11} height={15.44} svg={Camera1Svg} />
				</FansView>
				<FansGap width={17} />
			</FansView>
			<FansGap height={9} />
			<FansView flexDirection="row" flexWrap="wrap">
				{images.map((item, index) => (
					<FansImage2
						key={index}
						source={{
							uri: item,
						}}
						viewStyle={{
							aspectRatio: "square",
							borderColor: "white",
							flexBasis: "1/4",
						}}
					/>
				))}
			</FansView>
		</FansScreen2>
	);
};

export default MessageImageScreen;
