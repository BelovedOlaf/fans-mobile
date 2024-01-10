import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
	CompositeScreenProps,
	NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type StackRoutesParams = {
	Welcome: undefined;
	"Tab Navigator": NavigatorScreenParams<TabNavigatorParamList>;
	Login: undefined;
	Register: undefined;
	"Verify Account": undefined;
	"Reset password": undefined;
	"Create new password": undefined;
	"Check your email": undefined;
	"Analyze your fans level": undefined;
	"Post Design": undefined;
	Notification: undefined;
	Search: undefined;
	Story: undefined;
	Profile: undefined;
	Interactive: undefined;

	CreatorProfileNameScreen: undefined;
	CreatorProfilePageStyleScreen: undefined;
	CreatorProfileScreen: undefined;

	"Chat Fans View": undefined;
	Chat: undefined;
};

export type RootStackScreenProps<T extends keyof StackRoutesParams> =
	NativeStackScreenProps<StackRoutesParams, T>;

export type TabNavigatorParamList = {
	Post: { name: string };
	Notifications: { name: string };
	About: { name: string };
	MessagesStack: { name: string };
	Profile: { name: string };
};

export type MessagesStackParamList = {
	MESSAGES: undefined;
	SEARCH_USER: undefined;
	SEND_MESSAGE: { id: number };
	MEDIA_LIST: undefined;
	PIN_MESSAGE: undefined;
	CREATE_NOTE: undefined;
};

export type BookmarksNavigationStacks = {
	COLLECTIONS: undefined;
};

export type TabNavigatorScreenProps<T extends keyof TabNavigatorParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<TabNavigatorParamList, T>,
		RootStackScreenProps<keyof StackRoutesParams>
	>;
