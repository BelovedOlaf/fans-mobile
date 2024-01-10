import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLocalSearchParams } from "expo-router";

import PlaylistDetailScreen from "./playlistDetailScreen";
import { FansText } from "@components/controls";

import { PlaylistNavigationStacks } from "@usertypes/navigations";

const Stack = createNativeStackNavigator<PlaylistNavigationStacks>();

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
				component={PlaylistDetailScreen}
				initialParams={{ id: id as string }}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
};

export default Layout;
