import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

import ProfileScreen from "./profileScreen";
import PreviewScreen from "./previewScreen";
import PostInteractiveScreen from "./postInteractiveScreen";

import { FansText } from "@components/controls";

import { CreatorProfileNavigationStacks } from "@usertypes/navigations";
import { useAppContext, CommonActionType } from "@context/useAppContext";

const Stack = createNativeStackNavigator<CreatorProfileNavigationStacks>();

const CreatorProfileLayout = () => {
	const { username } = useLocalSearchParams();
	const { dispatch } = useAppContext();

	useEffect(() => {
		dispatch.setCommon({
			type: CommonActionType.setCreatorUsername,
			data: username as string,
		});
	}, [username]);

	return (
		<Stack.Navigator
			initialRouteName="Creator"
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
				name="Creator"
				component={ProfileScreen}
				initialParams={{ username: username as string }}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Preview"
				component={PreviewScreen}
				initialParams={{ username: username as string }}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Post"
				component={PostInteractiveScreen}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
};

export default CreatorProfileLayout;
