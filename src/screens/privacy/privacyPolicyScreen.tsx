import { View, ScrollView, Platform } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import tw from "@lib/tailwind";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { privacyContent } from "@constants/privacy";

const source = {
	html: privacyContent,
};

const PrivacyPolicyScreen = () => {
	const { width } = useWindowDimensions();
	const insets = useSafeAreaInsets();

	return (
		<View style={[tw.style("flex-1 bg-white"), { paddingTop: insets.top }]}>
			<ScrollView
				contentContainerStyle={[
					tw.style("flex-1"),
					{
						paddingHorizontal: 18,
					},
				]}
			>
				<View style={tw.style("pb-10")}>
					{Platform.OS === "web" ? (
						<RenderHtml contentWidth={width} source={source} />
					) : (
						<WebView
							style={tw.style("flex-1 w-full")}
							originWhitelist={["*"]}
							source={{ html: privacyContent }}
						/>
					)}
				</View>
			</ScrollView>
		</View>
	);
};

export default PrivacyPolicyScreen;
