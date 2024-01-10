import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useLocalSearchParams } from "expo-router";

import HighlightStoryScreen from "./highlightStoryScreen";
import CreatorStoriesScreen from "./creatorStoriesScreen";
import ProfileStoriesScreen from "./profileStoriesScreen";
import { StoriesNavigationStacks } from "@usertypes/navigations";

const Stack = createNativeStackNavigator<StoriesNavigationStacks>();

const StoriesLayout = () => {
	const params = useLocalSearchParams();

	return (
		<Stack.Navigator
			initialRouteName="Highlight"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="Highlight"
				component={HighlightStoryScreen}
				options={{
					headerShown: false,
				}}
				initialParams={{
					highlightId: params.highlightId as string,
					userId: params.userId as string,
				}}
			/>
			<Stack.Screen
				name="Creator"
				component={CreatorStoriesScreen}
				options={{
					headerShown: false,
				}}
				initialParams={{
					userId: params.userId as string,
				}}
			/>
			<Stack.Screen
				name="Profile"
				component={ProfileStoriesScreen}
				options={{
					headerShown: false,
				}}
				initialParams={{
					userId: params.userId as string,
				}}
			/>
		</Stack.Navigator>
	);
};

export default StoriesLayout;
