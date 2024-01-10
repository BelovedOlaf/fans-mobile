import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLocalSearchParams } from "expo-router";

import PostDetailScreen from "./postDetailScreen";

import { FansText } from "@components/controls";

import { PostDetailNavigationStacks } from "@usertypes/navigations";

const Stack = createNativeStackNavigator<PostDetailNavigationStacks>();

const Layout = () => {
	const { id } = useLocalSearchParams();
	return (
		<Stack.Navigator
			initialRouteName="Detail"
			screenOptions={{
				headerTitleAlign: "center",
				headerTitle: ({ children }) => (
					<FansText fontFamily="inter-bold" fontSize={19}>
						{children}
					</FansText>
				),
			}}
		>
			<Stack.Screen
				name="Detail"
				component={PostDetailScreen}
				options={{
					headerShown: false,
				}}
				initialParams={{ id: id as string }}
			/>
		</Stack.Navigator>
	);
};

export default Layout;
