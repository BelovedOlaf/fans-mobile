import { MessageInput } from "@components/chat";
import { FansGap, FansScreen2 } from "@components/controls";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChatNativeStackParams } from "@usertypes/navigations";
import React from "react";

const NewMessageScreen = (
	props: NativeStackScreenProps<ChatNativeStackParams, "NewMessage">,
) => {
	return (
		<FansScreen2>
			<FansGap grow />
			<MessageInput isTipAndPhotoVisible={false} />
		</FansScreen2>
	);
};

export default NewMessageScreen;
