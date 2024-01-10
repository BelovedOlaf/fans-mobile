import React from "react";
import { Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw from "@lib/tailwind";
import { useRouter } from "expo-router";

import { ChevronLeftSvg } from "@assets/svgs/common";
import { FansText } from "@components/controls";
import PrivacyPolicyScreen from "./privacyPolicyScreen";

import { PrivacyPolicyNavigationStacks } from "@usertypes/navigations";

const Stack = createNativeStackNavigator<PrivacyPolicyNavigationStacks>();

const Layout = () => {
	const router = useRouter();

	return (
		<Stack.Navigator
			initialRouteName="Privacy"
			screenOptions={{
				headerTintColor: "#000",
				headerStyle: tw.style("bg-white hidden"),
			}}
		>
			<Stack.Screen
				name="Privacy"
				component={PrivacyPolicyScreen}
				options={{
					headerTitleAlign: "center",
					// headerTitle: () => (
					// 	<FansText style={tw.style("font-bold")} fontSize={19}>
					// 		Privacy Policy
					// 	</FansText>
					// ),
					headerTitle: "Privacy Policy",
					headerTitleStyle: tw.style("text-[19px] font-bold"),
					headerLeft: () => (
						<Pressable
							style={tw.style("pl-[15px]")}
							onPress={() => router.back()}
						>
							<ChevronLeftSvg size={12} />
						</Pressable>
					),
				}}
			/>
		</Stack.Navigator>
	);
};

export default Layout;
