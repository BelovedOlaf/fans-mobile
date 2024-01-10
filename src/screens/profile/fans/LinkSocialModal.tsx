import RoundButton from "@components/common/RoundButton";
import { FansGap, FansText, FansView } from "@components/controls";
import { FansTextInput3 } from "@components/controls/TextInput";
import tw from "@lib/tailwind";
import React, { useState } from "react";
import { View, TextInput, Button, Modal } from "react-native";

interface LinkSocialModalProps {
	visible: boolean;
	onClose: () => void;
	onLink: (username: string) => void;
	icon: JSX.Element;
	socialNetworkName: string;
}

const LinkSocialModal: React.FC<LinkSocialModalProps> = ({
	visible,
	onClose,
	onLink,
	icon,
	socialNetworkName,
}) => {
	const [username, setUsername] = useState("");

	const handleLink = () => {
		onLink(username);
		setUsername("");
		onClose();
	};

	return (
		<Modal visible={visible} animationType="slide" transparent>
			<View
				style={{
					flex: 1,
					justifyContent: "flex-end",
					backgroundColor: "rgba(0,0,0,0.5)",
				}}
			>
				<View
					style={{
						backgroundColor: "white",
						padding: 20,
						borderRadius: 20,
					}}
				>
					<FansView>
						<FansText
							textAlign="center"
							fontFamily="inter-semibold"
							fontSize={22}
						>
							Link social media
						</FansText>
						<FansGap height={34} />
					</FansView>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 10,
						}}
					>
						<FansGap height={34} />
						<View style={{ marginRight: 10 }}>
							<FansView
								style={tw.style("p-[10px]", "rounded-full")}
							>
								{icon}
							</FansView>
						</View>
						<FansTextInput3
							value={username}
							grow
							placeholder={socialNetworkName + " username"}
							onChangeText={(text) => setUsername(text)}
						/>
					</View>
					<FansGap height={34} />
					<RoundButton onPress={handleLink}>Link</RoundButton>
					<FansGap height={34} />
				</View>
			</View>
		</Modal>
	);
};

export default LinkSocialModal;
