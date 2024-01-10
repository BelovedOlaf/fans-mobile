import { Stack } from "expo-router";

import React from "react";

import tw from "@lib/tailwind";
import { GetPaidScreen, PayoutSetupScreen } from "@screens/profile/edit";
import AnalyticsScreen from "./Analytics";
import FindReferralProgramsScreen from "./FindReferralPrograms";
import {
	FansGap,
	FansScreen3,
	FansVerticalDivider,
} from "@components/controls";
import { MobileSidebar } from "@components/common/layout";
import { Sidebar } from "@components/common";

// const ReferralProgramNativeStackNavigator =
// 	createNativeStackNavigator<ReferralProgramNativeStackParams>();

const ReferralProgramNavigator = () => {
	return (
		<Stack
			screenOptions={{
				headerBackImageSource: require("@assets/images/back.png"),
				headerTitleAlign: "center",
				headerTitleStyle: tw.style(
					"font-inter-bold",
					"text-[19px] lg:text-[23px]",
				),
			}}
		>
			<Stack.Screen
				name="ReferralProgram"
				// component={ReferralScreen}
				options={{ title: "" }}
			/>
			<Stack.Screen
				name="FindReferralPrograms"
				// component={FindReferralProgramsScreen}
				options={{ title: "Find referral programs" }}
			/>
			<Stack.Screen
				name="ReferAndEarn"
				// component={ReferAndEarnScreen}
				options={{ title: "Refer and earn" }}
			/>
			<Stack.Screen
				name="ReferralsDashboard"
				// component={ReferralsDashboardScreen}
				options={{ title: "Referrals dashboard" }}
			/>
			<Stack.Screen
				name="GetPaid"
				// component={GetPaidScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="PayoutSetup"
				// component={PayoutSetupScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="ReferralAnalytics"
				// component={AnalyticsScreen}
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
};

const ReferralProgramLayout = () => {
	return tw.prefixMatch("lg") ? (
		<FansScreen3 contentStyle1={{ flexDirection: "row", padding: 0 }}>
			<FansGap width={130} />
			<Sidebar />
			<FansVerticalDivider />
			<ReferralProgramNavigator />
		</FansScreen3>
	) : (
		<ReferralProgramNavigator />
	);
};

export default ReferralProgramLayout;
