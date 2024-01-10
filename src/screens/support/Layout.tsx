import {
	FansGap,
	FansScreen3,
	FansSvg,
	FansText,
	FansVerticalDivider,
	FansView,
} from "@components/controls";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ContactUsScreen from "./ContactUs";
import LawEnforcementGuideScreen from "./LawEnforcementGuide";
import { SupportNativeStackParams } from "@screens/support";
import { ChevronLeft1Svg } from "@assets/svgs/common";
import { NavigationContainer } from "@react-navigation/native";
import tw from "@lib/tailwind";
import { Sidebar } from "@components/common";
import { useDeviceContext } from "twrnc";

const ContactNativeStackNavigator =
	createNativeStackNavigator<SupportNativeStackParams>();

const SupportNativeStack = () => (
	<ContactNativeStackNavigator.Navigator
		screenOptions={{
			header: (props) => {
				const { navigation, options } = props;
				const { title } = options;

				const handlePress = () => navigation.goBack();

				return (
					<FansView
						height={{ xs: 64, lg: 103 }}
						alignItems="center"
						backgroundColor="white"
						border={{ b: 1 }}
						borderColor="grey-f0"
						flexDirection="row"
						padding={{ x: 17.8 }}
					>
						<FansView
							touchableOpacityProps={{
								onPress: handlePress,
							}}
							flex="1"
						>
							<FansSvg
								width={6.36}
								height={12.72}
								svg={ChevronLeft1Svg}
								color1="grey-70"
							/>
						</FansView>
						<FansText fontFamily="inter-bold" fontSize={19}>
							{title}
						</FansText>
						<FansView flex="1" />
					</FansView>
				);
			},
		}}
	>
		<ContactNativeStackNavigator.Screen
			name="ContactUs"
			component={ContactUsScreen}
			options={{ title: "Contact us" }}
		/>
		<ContactNativeStackNavigator.Screen
			name="LawEnforcementGuide"
			component={LawEnforcementGuideScreen}
			options={{ title: "Low enforcement guide" }}
		/>
	</ContactNativeStackNavigator.Navigator>
);

const SupportLayout = () => {
	useDeviceContext(tw);

	return tw.prefixMatch("lg") ? (
		<FansScreen3 contentStyle1={{ padding: 0 }}>
			<FansView style={tw.style("mx-[140px]")} flexDirection="row" grow>
				<Sidebar />
				<FansVerticalDivider />
				<FansGap width={170} />
				<FansView grow>
					<NavigationContainer independent>
						<SupportNativeStack />
					</NavigationContainer>
				</FansView>
			</FansView>
		</FansScreen3>
	) : (
		<SupportNativeStack />
	);
};

export default SupportLayout;
