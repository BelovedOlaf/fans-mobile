import tw from "@lib/tailwind";
import React, { FC, useState } from "react";
import { Image, TextInput, View } from "react-native";

import RoundButton from "@components/common/RoundButton";
import Title from "@components/common/Title";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import { ComponentSizeTypes, RoundButtonType } from "@usertypes/commonEnums";

interface Props {
	open: boolean;
	onClose: () => void;
	onSubmit: (value: string) => void;
}

const SendMessageDialog: FC<Props> = (props) => {
	const { open, onClose, onSubmit } = props;

	const [message, setMessage] = useState("");

	const handleSubmit = () => {
		onSubmit(message);
	};

	return (
		<BottomSheetWrapper open={open} onClose={onClose}>
			<View style={tw.style("px-[18px] pb-5")}>
				<Title style="text-center mb-6" size={ComponentSizeTypes.lg}>
					Message Jane Love
				</Title>
				<Image
					source={require("@assets/images/posts/user-1.png")}
					alt="User"
					style={tw.style(
						"w-[79px] h-[79px] rounded-[7px] mx-auto mb-6",
					)}
					resizeMode="cover"
				/>

				<View>
					<TextInput
						editable
						multiline
						numberOfLines={4}
						maxLength={40}
						onChangeText={(text: string) => setMessage(text)}
						style={tw.style(
							"bg-fans-grey py-3 px-5 rounded-[7px] h-[128px]",
						)}
					/>
				</View>

				<RoundButton
					variant={RoundButtonType.OUTLINE_PRIMARY}
					customStyles={"mt-5"}
					onPress={handleSubmit}
				>
					Send message
				</RoundButton>
			</View>
		</BottomSheetWrapper>
	);
};

export default SendMessageDialog;
