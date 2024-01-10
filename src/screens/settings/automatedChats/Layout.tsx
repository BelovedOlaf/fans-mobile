import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { FansGap, FansSvg, FansText, FansView } from "@components/controls";
import {
	AutomatecChatsScreen,
	AutomatedChatsNativeStackParams,
	MessageCreateScreen,
	MessageImageScreen,
} from "@screens/settings/automatedChats";
import { SettingsNativeStackScreenProps } from "@usertypes/navigations";
import { ChevronLeft1Svg } from "@assets/svgs/common";
import { useRouter } from "expo-router";

const AutomatedChatsNavigator =
	createNativeStackNavigator<AutomatedChatsNativeStackParams>();

const AutomatedChatsLayout = (
	props: SettingsNativeStackScreenProps<"AutomatedChats">,
) => {
	const router = useRouter();

	return (
		<AutomatedChatsNavigator.Navigator
			screenOptions={{
				header: (props) => {
					const { navigation } = props;

					const handlePress = () => {
						if (navigation.canGoBack()) {
							navigation.goBack();
						} else {
							if (router.canGoBack()) {
								router.back();
							} else {
								router.replace({
									pathname: "posts",
									params: { screen: "Home" },
								});
							}
						}
					};

					return (
						<FansView
							height={{ xs: 64, lg: 103 }}
							alignItems="center"
							backgroundColor="white"
							border={{ b: 1 }}
							borderColor="grey-f0"
							flexDirection="row"
							padding={{ x: 24 }}
						>
							<FansView
								touchableOpacityProps={{ onPress: handlePress }}
								width={40}
								height={40}
								padding={{ x: 4, y: 12 }}
							>
								<FansSvg
									width={8}
									height={16}
									svg={ChevronLeft1Svg}
									color1="grey-70"
								/>
							</FansView>
							<FansGap viewStyle={{ flex: "1" }} />
							<FansText fontFamily="inter-bold" fontSize={19}>
								Automated chats
							</FansText>
							<FansGap viewStyle={{ flex: "1" }} />
							<FansGap width={40} />
						</FansView>
					);
				},
			}}
		>
			<AutomatedChatsNavigator.Screen
				name="AutomatedChats"
				component={AutomatecChatsScreen}
				options={{ title: "Automated chats" }}
			/>
			<AutomatedChatsNavigator.Screen
				name="MessageImage"
				component={MessageImageScreen}
			/>
			<AutomatedChatsNavigator.Screen
				name="MessageCreate"
				component={MessageCreateScreen}
			/>
		</AutomatedChatsNavigator.Navigator>
	);
};

export default AutomatedChatsLayout;
