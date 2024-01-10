import { Sidebar } from "@components/common";
import {
	FansGap,
	FansScreen2,
	FansText,
	FansVerticalDivider,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import {
	EventListenerCallback,
	NavigationContainer,
	NavigationContainerEventMap,
	useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NoteScreen } from "@screens/chat";
import {
	ChatNativeStackParams,
	ChatNativeStackScreens,
} from "@usertypes/navigations";
import React, { useEffect } from "react";
import { useDeviceContext } from "twrnc";
import CameraScreen from "./Camera";
import ChatScreen from "./Chat";
import FanAnalysisScreen from "./FanAnalysis";
import GalleryScreen from "./Gallery";
import MessageSelectScreen from "./MessageSelect";
import MessagesScreen, { MessagesScreenContent } from "./Messages";
import NewMessageScreen from "./NewMessage";
import PinnedMessagesScreen from "./PinnedMessages";
import { SelectChat } from "./SelectChat";
import SendMessageScreen from "./SendMessage";
import ShareNoteScreen from "./ShareNote";
import { useLocalSearchParams, useRouter, useSegments } from "expo-router";
import { firstParam } from "@utils/common";

const ChatNativeStack = createNativeStackNavigator<ChatNativeStackParams>();

const ChatNavigator = (props: { isMobile: boolean }) => {
	return (
		<ChatNativeStack.Navigator
			initialRouteName={"Messages"}
			screenOptions={{
				headerTitleAlign: "center",
				headerTitle: ({ children }) => (
					<FansText
						fontFamily="inter-bold"
						fontSize={19}
						textAlign="center"
					>
						{children}
					</FansText>
				),
			}}
		>
			<ChatNativeStack.Screen name="Camera" component={CameraScreen} />
			<ChatNativeStack.Screen
				name="Chat"
				component={ChatScreen}
				options={{
					animation: "slide_from_right",
				}}
			/>
			<ChatNativeStack.Screen
				name="FanAnalysis"
				component={FanAnalysisScreen}
				options={{ title: "Fan analysis" }}
			/>
			<ChatNativeStack.Screen name="Gallery" component={GalleryScreen} />
			<ChatNativeStack.Screen
				name="Messages"
				component={props.isMobile ? MessagesScreen : SelectChat}
			/>
			<ChatNativeStack.Screen
				name="MessageSelect"
				component={MessageSelectScreen}
				options={{ title: "Messages" }}
			/>
			<ChatNativeStack.Screen
				name="NewMessage"
				component={NewMessageScreen}
				options={{ title: "New message to selected" }}
			/>
			<ChatNativeStack.Screen
				name="PinnedMessages"
				component={PinnedMessagesScreen}
			/>
			<ChatNativeStack.Screen
				name="SendMessage"
				component={SendMessageScreen}
				options={{ title: "Send message" }}
			/>
			<ChatNativeStack.Screen
				name="ShareNote"
				component={ShareNoteScreen}
				options={{ title: "Share note" }}
			/>
			<ChatNativeStack.Screen name="Notes" component={NoteScreen} />
		</ChatNativeStack.Navigator>
	);
};

const ChatLayout = () => {
	const params = useLocalSearchParams();

	useDeviceContext(tw);

	const navigationRef = useNavigationContainerRef<ChatNativeStackParams>();

	useEffect(() => {
		if (!navigationRef.current) return;

		const id = firstParam(params.id);

		if (!id) {
			navigationRef.navigate("Messages");
			return;
		}

		navigationRef.navigate("Chat", { id });
	}, [params, navigationRef.current]);

	return tw.prefixMatch("md") ? (
		<FansScreen2>
			<FansView style={tw.style("mx-[140px]")} flexDirection="row">
				<Sidebar />
				<FansVerticalDivider />
				<FansView width={434}>
					<MessagesScreenContent navigationRef={navigationRef} />
				</FansView>
				<FansVerticalDivider />
				<FansGap width={40} />
				<NavigationContainer independent ref={navigationRef}>
					<ChatNavigator isMobile={false} />
				</NavigationContainer>
			</FansView>
		</FansScreen2>
	) : (
		<NavigationContainer independent ref={navigationRef}>
			<ChatNavigator isMobile={true} />
		</NavigationContainer>
	);
};

export default ChatLayout;
