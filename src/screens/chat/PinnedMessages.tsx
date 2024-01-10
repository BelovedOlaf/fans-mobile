import { FansImage, FansText, FansView } from "@components/controls";
import tw from "@lib/tailwind";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { stickData } from "../../assets/dummyData/chat";
import PinCard from "../fansChat/PinCard";

const PinnedMessagesScreen = () => {
	return (
		<View>
			<Stack.Screen
				options={{
					headerTitleAlign: "left",
					headerTitle: () => (
						<View
							style={tw.style("flex-row gap-[10px] items-center")}
						>
							<View style={tw.style("relative")}>
								<FansView
									style={tw.style(
										"w-[34px] h-[34px]",
										"rounded-full",
									)}
								>
									<FansImage
										source={require("@assets/images/default-avatar.png")}
										resizeMode="cover"
									/>
								</FansView>
								<View
									style={tw.style(
										"w-[11px] h-[11px]",
										"absolute right-0 bottom-0",
										"bg-fans-green",
										"border-[2px] border-white rounded-full",
									)}
								/>
							</View>
							<FansText fontFamily="inter-semibold" fontSize={16}>
								Jane Love
							</FansText>
						</View>
					),
					headerRight: () => (
						<FansView padding={{ r: 18.2 }}>
							<FansText
								color="purple-a8"
								fontFamily="inter-bold"
								fontSize={17}
							>
								Done
							</FansText>
						</FansView>
					),
				}}
			/>
			<ScrollView style={tw.style("bg-white")}>
				{stickData.map((item, i) => (
					<PinCard key={i} item={item} />
				))}
			</ScrollView>
		</View>
	);
};

export default PinnedMessagesScreen;
