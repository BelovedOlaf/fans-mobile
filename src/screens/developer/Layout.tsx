import {
	NavigationContainer,
	useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";

import { FansGap, FansSvg, FansText, FansView } from "@components/controls";
import { DeveloperNativeStackParams } from "@screens/developer";
import DeveloperPortalScreen from "./DeveloperPortal";
import GettingStartedScreen from "./GettingStarted";
import Sidebar from "./Sidebar";
import ApplicationsLayout from "./applications/Layout";
import { ChevronLeft1Svg } from "@assets/svgs/common";

const DeveloperNativeStack =
	createNativeStackNavigator<DeveloperNativeStackParams>();

const DeveloperLayout = () => {
	const navigationRef =
		useNavigationContainerRef<DeveloperNativeStackParams>();
	const [path, setPath] = useState<string>();

	return (
		<NavigationContainer
			ref={navigationRef}
			independent={true}
			onStateChange={(state) => {
				setPath(navigationRef.getCurrentRoute()?.name);
			}}
		>
			<Sidebar navigationRef={navigationRef} path={path}>
				<DeveloperNativeStack.Navigator
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
									padding={{ xs: { x: 17.8 }, lg: 0 }}
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
									<FansText
										fontFamily="inter-bold"
										fontSize={19}
									>
										{title}
									</FansText>
									<FansGap viewStyle={{ flex: "1" }} />
								</FansView>
							);
						},
					}}
				>
					<DeveloperNativeStack.Screen
						name="DeveloperPortal"
						component={DeveloperPortalScreen}
						options={{ headerShown: false }}
					/>
					<DeveloperNativeStack.Screen
						name="Applications"
						component={ApplicationsLayout}
						options={{ title: "Applications" }}
					/>
					<DeveloperNativeStack.Screen
						name="GettingStarted"
						component={GettingStartedScreen}
						options={{ title: "Getting Started" }}
					/>
				</DeveloperNativeStack.Navigator>
			</Sidebar>
		</NavigationContainer>
	);
};

export default DeveloperLayout;

/*return isDesktop ? (
		<View style={tw.style("h-full", "flex-row justify-center")}>
			<View style={tw.style("w-[356px]", "flex")}>
				<FansGap style={tw.style("h-[64px]")} />
				<View style={tw.style("flex-row gap-[10px] items-center")}>
					<View style={tw.style("w-[22px] h-[20px]")}>
						<DiamondPng />
					</View>
					<FansText
						style={tw.style(
							"font-inter-bold",
							"text-fans-purple",
							"uppercase",
						)}
					>
						Developer Portal
					</FansText>
				</View>
				<FansGap style={tw.style("h-[56px]")} />
				<TouchableOpacity onPress={handlePressApplications}>
					<View style={tw.style("h-[68px]", "justify-center")}>
						<Text
							style={tw.style("font-inter-medium", "text-[20px]")}
						>
							Applications
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={handlePressDocumentation}>
					<View style={tw.style("h-[68px]", "justify-center")}>
						<FansText style={tw.style("text-[18px]")}>
							Documentation
						</FansText>
					</View>
				</TouchableOpacity>
				{isDocumentation && (
					<>
						<FansGap style={tw.style("h-[40px]")} />
						<FansDivider />
						<FansGap style={tw.style("h-[20px]")} />
						<View style={tw.style("h-[68px]", "justify-center")}>
							<Text
								style={tw.style(
									"font-inter-medium",
									"text-[20px]",
								)}
							>
								Intro
							</Text>
						</View>
						<TouchableOpacity onPress={handlePressGettingStarted}>
							<View
								style={tw.style("h-[68px]", "justify-center")}
							>
								<Text
									style={tw.style(
										"font-inter-medium",
										"text-[20px]",
									)}
								>
									Getting started
								</Text>
							</View>
						</TouchableOpacity>
						<View style={tw.style("h-[68px]", "justify-center")}>
							<Text
								style={tw.style(
									"font-inter-medium",
									"text-[20px]",
								)}
							>
								Subscription Endpoints
							</Text>
						</View>
						<View style={tw.style("h-[68px]", "justify-center")}>
							<Text
								style={tw.style(
									"font-inter-medium",
									"text-[20px]",
								)}
							>
								User Endpoints
							</Text>
						</View>
						<View style={tw.style("h-[68px]", "justify-center")}>
							<Text
								style={tw.style(
									"font-inter-medium",
									"text-[20px]",
								)}
							>
								Webhoooks
							</Text>
						</View>
					</>
				)}
			</View>
			<FansDivider vertical />
			<FansGap style={tw.style("w-[80px]")} />
			<View style={tw.style("min-w-[1200px]")}>
				<DeveloperNavigator />
			</View>
		</View>
	) : (
		<DeveloperNavigator />
	);*/
