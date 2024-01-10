import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import {
	PrivacyNativeStackParams,
	PrivacyScreen,
} from "@screens/settings/privacy";
import { SettingsNativeStackScreenProps } from "@usertypes/navigations";

const PrivacyNavigator = createNativeStackNavigator<PrivacyNativeStackParams>();

const PrivacyLayout = (props: SettingsNativeStackScreenProps<"Privacy">) => {
	return (
		<PrivacyNavigator.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<PrivacyNavigator.Screen name="Privacy" component={PrivacyScreen} />
		</PrivacyNavigator.Navigator>
	);
};

export default PrivacyLayout;
