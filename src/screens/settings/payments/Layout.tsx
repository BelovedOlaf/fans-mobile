import {
	NativeStackScreenProps,
	createNativeStackNavigator,
} from "@react-navigation/native-stack";
import {
	SettingsNativeStackParams,
	SettingsPaymentsStackParams,
} from "@usertypes/navigations";
import React from "react";
import AddPaymentMethodScreen from "./AddPaymentMethod";
import PaymentsScreen from "./Payments";
import { FansGap, FansSvg, FansText, FansView } from "@components/controls";
import { ChevronLeft1Svg } from "@assets/svgs/common";
import { useRouter } from "expo-router";

const PaymentsNavigator =
	createNativeStackNavigator<SettingsPaymentsStackParams>();

const PaymentsLayout = (
	props: NativeStackScreenProps<SettingsNativeStackParams, "Payments">,
) => {
	const router = useRouter();

	return (
		<PaymentsNavigator.Navigator
			screenOptions={{
				header: (props) => {
					const { navigation } = props;

					const handlePress = () => {
						if (navigation.canGoBack()) {
							navigation.goBack();
						} else {
							if (router.canGoBack()) {
								router.back();
							} else {
								router.replace({
									pathname: "posts",
									params: { screen: "Home" },
								});
							}
						}
					};

					return (
						<FansView
							height={{ xs: 64, lg: 103 }}
							alignItems="center"
							backgroundColor="white"
							border={{ b: 1 }}
							borderColor="grey-f0"
							flexDirection="row"
							padding={{ x: 24 }}
						>
							<FansView
								touchableOpacityProps={{ onPress: handlePress }}
								width={40}
								height={40}
								padding={{ x: 4, y: 12 }}
							>
								<FansSvg
									width={8}
									height={16}
									svg={ChevronLeft1Svg}
									color1="grey-70"
								/>
							</FansView>
							<FansGap viewStyle={{ flex: "1" }} />
							<FansText fontFamily="inter-bold" fontSize={19}>
								Payments
							</FansText>
							<FansGap viewStyle={{ flex: "1" }} />
							<FansGap width={40} />
						</FansView>
					);
				},
			}}
		>
			<PaymentsNavigator.Screen
				name="Payments"
				component={PaymentsScreen}
			/>
			<PaymentsNavigator.Screen
				name="AddPaymentMethod"
				component={AddPaymentMethodScreen}
			/>
		</PaymentsNavigator.Navigator>
	);
};

export default PaymentsLayout;
