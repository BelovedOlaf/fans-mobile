import { Sidebar } from "@components/common";
import {
	FansScreen2,
	FansText,
	FansVerticalDivider,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NotificationsNavigationStacks } from "@usertypes/navigations";
import React from "react";
import { useDeviceContext } from "twrnc";
import NotificationsScreen from "./Notifications";
import AppLayout from "@components/common/layout/layout";
import { LayoutRightContents } from "@components/common/layout";

const Stack = createNativeStackNavigator<NotificationsNavigationStacks>();

const NotificationsNavigator = () => (
	<Stack.Navigator
		initialRouteName="Notifications"
		screenOptions={{
			headerTitleAlign: "center",
			headerTitle: ({ children }) => (
				<FansText fontFamily="inter-bold" fontSize={23}>
					{children}
				</FansText>
			),
		}}
	>
		<Stack.Screen name="Notifications" component={NotificationsScreen} />
	</Stack.Navigator>
);

const NotificationsLayout = () => {
	useDeviceContext(tw);

	return (
		<AppLayout>
			<NotificationsNavigator />
			<LayoutRightContents />
		</AppLayout>
	);
};

export default NotificationsLayout;
