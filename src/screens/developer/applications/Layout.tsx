import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { DeveloperNativeStackScreenProps } from "@screens/developer";
import {
	AppDetailsScreen,
	DeveloperApplicationsNativeStackParams,
	MyApplicationsScreen,
} from "@screens/developer/applications";

const ApplicationsNativeStack =
	createNativeStackNavigator<DeveloperApplicationsNativeStackParams>();

const ApplicationsLayout = (
	props: DeveloperNativeStackScreenProps<"Applications">,
) => {
	return (
		<ApplicationsNativeStack.Navigator
			initialRouteName="MyApplications"
			screenOptions={{
				headerShown: false,
			}}
		>
			<ApplicationsNativeStack.Screen
				name="MyApplications"
				component={MyApplicationsScreen}
			/>
			<ApplicationsNativeStack.Screen
				name="AppDetails"
				component={AppDetailsScreen}
			/>
		</ApplicationsNativeStack.Navigator>
	);
};

export default ApplicationsLayout;
