/** @type {import('@expo/config').AppJSONConfig} */
export default {
	expo: {
		name: "FYP.Fans",
		slug: "fyp-fans",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./src/assets/icon.png",
		userInterfaceStyle: "light",
		scheme: "fypfans",
		splash: {
			resizeMode: "contain",
			backgroundColor: "#FFF4EE",
		},
		assetBundlePatterns: ["**/*"],
		plugins: [
			["expo-router", {}],
			[
				"expo-image-picker",
				{
					photosPermission:
						"The app accesses your photos to let you share them with your friends.",
				},
			],
			[
				"expo-camera",
				{
					cameraPermission:
						"Allow $(PRODUCT_NAME) to access your camera.",
				},
			],
			[
				"expo-document-picker",
				{
					iCloudContainerEnvironment: "Production",
				},
			],
			[
				"expo-media-library",
				{
					photosPermission:
						"Allow $(PRODUCT_NAME) to access your photos.",
					savePhotosPermission:
						"Allow $(PRODUCT_NAME) to save photos.",
					isAccessMediaLocationEnabled: true,
				},
			],
			[
				"expo-av",
				{
					microphonePermission:
						"Allow $(PRODUCT_NAME) to access your microphone.",
				},
			],
			["sentry-expo", {}],
		],
		ios: {
			bundleIdentifier: "fans.fyp.app",
			supportsTablet: true,
			UIBackgroundModes: ["audio"],
			infoPlist: {
				NSAppTransportSecurity: {
					NSAllowsArbitraryLoads: true,
				},
			},
			// "googleServicesFile": "./GoogleService-Info.plist"
		},
		android: {
			package: "fans.fyp.app",
			adaptiveIcon: {
				foregroundImage: "./src/assets/adaptive-icon.png",
				backgroundColor: "#FFF4EE",
			},
			// "googleServicesFile": "./google-services.json"
		},
		web: {
			favicon: "./src/assets/logo.png",
			// bundler: "metro",
			display: "standalone",
			startUrl: "/posts",
			orientation: "portrait",
			themeColor: "#A854F5",
			splash: {
				image: "./src/assets/logo.png",
				resizeMode: "contain",
				backgroundColor: "#A854F5",
			},
		},
		// "plugins": ["@react-native-google-signin/google-signin"],
		extra: {
			eas: {
				projectId: "bfd48e23-724f-47b0-a2db-379be0f15fb1",
			},
		},
	},
};
