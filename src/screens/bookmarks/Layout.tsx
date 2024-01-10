import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BookmarksNavigationStacks } from "@usertypes/route";
import React from "react";
import CollectionsScreen from "./Collections";

const Stack = createNativeStackNavigator<BookmarksNavigationStacks>();

const Layout = () => (
	<Stack.Navigator initialRouteName="COLLECTIONS">
		<Stack.Screen
			name="COLLECTIONS"
			component={CollectionsScreen}
			options={{
				headerShown: false,
			}}
		/>
	</Stack.Navigator>
);

export default Layout;
