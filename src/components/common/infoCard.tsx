import tw from "@lib/tailwind";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
	text: string;
	style?: { [key: string]: React.CSSProperties };
}

const FansInfoCard: FC<Props> = (props) => {
	const { text, style } = props;
	return (
		<View
			style={tw.style(
				"px-5 py-4.5 bg-[#f6edff] rounded-[15px] flex-row justify-center items-center mb-8 gap-4",
			)}
		>
			<Text
				style={{
					...tw.style("text-fans-purple text-[16px] text-center"),
					...style,
				}}
			>
				<Text
					style={tw.style(
						"text-[12px] text-fans-purple border rounded-full px-[6px] border-fans-purple mr-3",
					)}
				>
					!
				</Text>
				{text}
			</Text>
		</View>
	);
};

export default FansInfoCard;
