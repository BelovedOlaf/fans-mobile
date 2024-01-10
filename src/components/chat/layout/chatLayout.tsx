import { View, SafeAreaView } from "react-native";
import React, { FC, useState } from "react";
import tw from "@lib/tailwind";
import ChatForm from "@components/chat/fansView/chatform";

interface Props {
	children: React.ReactNode;
	setOpenAddDialog: (val: boolean) => void;
}

const ChatLayout: FC<Props> = (props) => {
	const { children, setOpenAddDialog } = props;
	const [content, setContent] = useState("");

	return (
		<SafeAreaView
			style={tw.style(
				"bg-[#0000ff]",
				"flex-col",
				"relative h-full",
				"m-[20px]",
			)}
		>
			{children}
			<ChatForm
				value={content}
				onChange={(val) => setContent(val)}
				setOpenAddDialog={setOpenAddDialog}
			/>
		</SafeAreaView>
	);
};

export default ChatLayout;
