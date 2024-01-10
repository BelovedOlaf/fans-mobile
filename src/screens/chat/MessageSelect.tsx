import {
	CheckSvg,
	OpenedMailSvg,
	PlusSvg,
	Trash2Svg,
} from "@assets/svgs/common";
import UserAvatar from "@components/avatar/UserAvatar";
import {
	FansChips,
	FansDivider,
	FansScreen1,
	FansScreen3,
	FansText,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Colors } from "@usertypes/enums";
import { ChatNativeStackParams } from "@usertypes/navigations";
import { Stack } from "expo-router";
import React, { Fragment, useState } from "react";
import { TouchableOpacity, View } from "react-native";

interface IMessage {
	id: number;
	isSelected: boolean;
	name: string;
	text: string;
	avatar?: string;
	unread?: number;
}

interface IItem {
	data: IMessage;
	onSelect: (index: number) => void;
}

const Item = (props: IItem) => {
	const { data, onSelect } = props;
	const { id, isSelected, name, text, avatar, unread } = data;

	const styles = ["border", "p-[6.5px]", "rounded-full"];
	styles.push(isSelected ? "bg-fans-purple" : "bg-fans-white");
	styles.push(isSelected ? "border-transparent" : "border-fans-grey-dark");

	const handlePressSelect = () => {
		onSelect(id);
	};

	return (
		<TouchableOpacity onPress={handlePressSelect}>
			<View style={tw.style("flex-row gap-[20px] items-center")}>
				<View style={tw.style(styles)}>
					{isSelected ? (
						<CheckSvg size={12} color={Colors.White} />
					) : (
						<PlusSvg size={12} />
					)}
				</View>
				<View style={tw.style("flex-row gap-[10px] items-center")}>
					<View style={tw.style("relative")}>
						<UserAvatar size="46px" image={avatar} />
						<View
							style={tw.style(
								"w-[11px] h-[11px]",
								"absolute right-[0px] bottom-[1px]",
								"bg-fans-green",
								"border-[2px] border-white rounded-full",
							)}
						/>
					</View>
					<View style={tw.style("flex", "grow")}>
						<View
							style={tw.style(
								"flex-row justify-between items-center",
							)}
						>
							<View
								style={tw.style(
									"flex-row gap-[20px] items-center",
								)}
							>
								<FansText
									fontFamily={
										typeof unread !== "undefined" && unread
											? "inter-semibold"
											: "inter-medium"
									}
									fontSize={19}
								>
									{name}
								</FansText>
								{!!unread && (
									<View
										style={tw.style(
											"bg-fans-purple",
											"px-[4px]",
											"rounded-full",
										)}
									>
										<FansText
											color="white"
											fontFamily="inter-bold"
											fontSize={11}
										>
											{unread}
										</FansText>
									</View>
								)}
							</View>
						</View>
						<View
							style={tw.style("flex-row gap-[5px] items-center")}
						>
							<FansText
								color="grey-70"
								fontFamily={
									typeof unread !== "undefined" && unread
										? "inter-semibold"
										: undefined
								}
								fontSize={16}
							>
								{text}
							</FansText>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const MessageSelectScreen = (
	props: NativeStackScreenProps<ChatNativeStackParams, "MessageSelect">,
) => {
	const { navigation } = props;

	const items = [
		{ text: "Select all" },
		{
			text: "Mark as read",
			iconNode: (
				<FansView style={tw.style("w-[16.48px] h-[15.59px]")}>
					<OpenedMailSvg />
				</FansView>
			),
		},
		{
			color: Colors.Red,
			text: "",
			iconNode: (
				<FansView style={tw.style("w-[11.87px] h-[14.76px]")}>
					<Trash2Svg color={tw.color("fans-red")} />
				</FansView>
			),
		},
	];

	const [messages, setMessages] = useState<IMessage[]>([
		{
			id: 0,
			isSelected: false,
			name: "Jonathan Streem",
			text: "Sure! We'll definitely...",
			unread: 12,
		},
		{
			id: 1,
			isSelected: false,
			name: "Jane Love",
			text: "You: Alright!",
		},
		{
			id: 2,
			isSelected: false,
			name: "Jose Esperanza",
			text: "Good news! I'm happy to...",
			unread: 5,
		},
		{
			id: 3,
			isSelected: false,
			name: "Ramiro Altamiglia",
			text: "Check this out",
		},
		{
			id: 4,
			isSelected: false,
			name: "Ann Liu",
			text: "Okay",
		},
		{
			id: 5,
			isSelected: false,
			name: "Jane Love",
			text: "You: Alright!",
		},
		{
			id: 6,
			isSelected: false,
			name: "Jane Love",
			text: "You: Alright!",
		},
	]);

	const handlePressCancel = () => {
		navigation.goBack();
	};

	const handlePressSave = () => {
		navigation.goBack();
	};

	const handleSelect = (index: number) => {
		if (index === 2) {
			const newMessages = [
				...messages.filter((message) => !message.isSelected),
			];
			setMessages(newMessages);
		}
	};

	const handleSelectedItem = (index: number) => {
		const newMessages = [...messages];
		newMessages[index].isSelected = !newMessages[index].isSelected;
		setMessages(newMessages);
	};

	return (
		<FansScreen3>
			<Stack.Screen
				options={{
					headerLeft: () => (
						<View style={tw.style("ml-[20px]")}>
							<TouchableOpacity onPress={handlePressCancel}>
								<FansText
									color="purple-a8"
									fontFamily="inter-bold"
									fontSize={17}
								>
									Cancel
								</FansText>
							</TouchableOpacity>
						</View>
					),
					headerRight: () => (
						<View style={tw.style("mr-[20px]")}>
							<TouchableOpacity onPress={handlePressSave}>
								<FansText
									color="purple-a8"
									fontFamily="inter-bold"
									fontSize={17}
								>
									Save
								</FansText>
							</TouchableOpacity>
						</View>
					),
				}}
			/>
			<View style={tw.style("flex gap-[20px]")}>
				<FansChips data={items} onChangeValue={handleSelect} />
				<View style={tw.style("flex gap-[16px]")}>
					{messages.map((item) => (
						<Fragment key={item.id}>
							<FansDivider />
							<Item data={item} onSelect={handleSelectedItem} />
						</Fragment>
					))}
				</View>
			</View>
		</FansScreen3>
	);
};

export default MessageSelectScreen;
