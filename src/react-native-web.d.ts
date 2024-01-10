export * from "react-native";

declare module "react-native" {
	import { ViewStyle } from "react-native";

	interface ViewStyle {
		cursor?: string;
	}
}
