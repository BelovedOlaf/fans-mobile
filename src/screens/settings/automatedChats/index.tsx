import { NativeStackScreenProps } from "@react-navigation/native-stack";

export { default as AutomatecChatsScreen } from "./AutomatedChats";
export { default as AutomatedChatsLayout } from "./Layout";
export { default as MessageCreateScreen } from "./MessageCreate";
export { default as MessageImageScreen } from "./MessageImage";

export type AutomatedChatsNativeStackParams = {
	AutomatedChats: undefined;
	MessageImage: { type: "Welcome" | "Custom" };
	MessageCreate: { type: "Welcome" | "Custom" };
};
export type AutomatedChatsNativeStackScreens =
	keyof AutomatedChatsNativeStackParams;
export type AutomatedChatsNativeStackScreenProps<
	T extends AutomatedChatsNativeStackScreens,
> = NativeStackScreenProps<AutomatedChatsNativeStackParams, T>;
