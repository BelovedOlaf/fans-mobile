/*import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FansChatViewScreen from "./fansChatView";
import { MessagesStackParamList } from "@usertypes/route";
import FansChatSearchUserScreen from "./fansChatSearchUser";
import FansChatScreen from "./fansChat";
import { Text } from "react-native";
import tw from "@lib/tailwind";
import { TouchableOpacity } from "react-native";
import Medias from "../chat/Gallery";
import PinMessage from "./PinMessage";
import CreateNote from "./CreateNote";
const Stack = createNativeStackNavigator<MessagesStackParamList>();

const FansChatStackScreen = () => {
	return (
		<Stack.Navigator initialRouteName="MESSAGES">
			<Stack.Screen
				name="MESSAGES"
				component={FansChatViewScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="SEARCH_USER"
				component={FansChatSearchUserScreen}
				options={{
					title: "Messages",
					headerTitle: () => (
						<Text style={tw.style("font-bold text-[23px]")}>
							Messages
						</Text>
					),
					headerTitleAlign: "center",
					headerBackTitleVisible: true,
				}}
			/>
			<Stack.Screen
				name="SEND_MESSAGE"
				component={FansChatScreen}
				options={{
					headerShown: true,
				}}
			/>
			<Stack.Screen name="MEDIA_LIST" component={Medias} />
			<Stack.Screen name="PIN_MESSAGE" component={PinMessage} />
			<Stack.Screen name="CREATE_NOTE" component={CreateNote} />
		</Stack.Navigator>
	);
};

export default FansChatStackScreen;
*/
