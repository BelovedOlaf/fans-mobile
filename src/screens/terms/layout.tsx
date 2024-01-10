import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import tw from "@lib/tailwind";
import { useRouter } from "expo-router";

import { ChevronLeftSvg } from "@assets/svgs/common";
import TermsServiceScreen from "./termsServiceScreen";
import BenefitGuidelinesScreen from "./benefitGuidelinesScreen";
import CommunityGuidelinesScreen from "./communityGuidelinesScreen";
import SanctionPolicyScreen from "./sanctionPolicyScreen";
import SecurityPolicyScreen from "./securityPolicyScreen";
import CookiePolicyScreen from "./cookiePolicyScreen";
import DataAgreementScreen from "./dataAgreementScreen";
import FeeScheduleScreen from "./feeScheduleScreen";
import ReturnsPolicyScreen from "./returnsPolicyScreen";

import { TermsNavigationStacks } from "@usertypes/navigations";

const Stack = createNativeStackNavigator<TermsNavigationStacks>();

const Layout = () => {
	const router = useRouter();

	return (
		<Stack.Navigator
			initialRouteName="Terms"
			screenOptions={{
				headerTintColor: "#000",
				headerStyle: { backgroundColor: "#fff" },
				headerLeft: () => (
					<Pressable
						style={tw.style("pl-[15px]")}
						onPress={() => router.back()}
					>
						<ChevronLeftSvg size={12} />
					</Pressable>
				),
			}}
		>
			<Stack.Screen
				name="Terms"
				component={TermsServiceScreen}
				options={{
					title: "Terms of Service",
					headerTitleAlign: "center",
				}}
			/>
			<Stack.Screen
				name="Benefits"
				component={BenefitGuidelinesScreen}
				options={{
					title: "Benefits Guidelines",
					headerTitleAlign: "center",
				}}
			/>
			<Stack.Screen
				name="Community"
				component={CommunityGuidelinesScreen}
				options={{
					title: "Community Guidelines",
					headerTitleAlign: "center",
				}}
			/>
			<Stack.Screen
				name="Sanction"
				component={SanctionPolicyScreen}
				options={{
					title: "Sanction policy",
					headerTitleAlign: "center",
				}}
			/>
			<Stack.Screen
				name="Security"
				component={SecurityPolicyScreen}
				options={{
					title: "Security policy",
					headerTitleAlign: "center",
				}}
			/>
			<Stack.Screen
				name="Cookies"
				component={CookiePolicyScreen}
				options={{
					title: "Cookie policy",
					headerTitleAlign: "center",
				}}
			/>
			<Stack.Screen
				name="DataAgreement"
				component={DataAgreementScreen}
				options={{
					title: "Data Agreement",
					headerTitleAlign: "center",
				}}
			/>
			<Stack.Screen
				name="Fees"
				component={FeeScheduleScreen}
				options={{
					title: "Fee Structure",
					headerTitleAlign: "center",
				}}
			/>
			<Stack.Screen
				name="Returns"
				component={ReturnsPolicyScreen}
				options={{
					title: "Return Policy",
					headerTitleAlign: "center",
				}}
			/>
		</Stack.Navigator>
	);
};

export default Layout;
