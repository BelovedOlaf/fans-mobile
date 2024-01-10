import React from "react";
import { Dialog, Portal } from "react-native-paper";
import { View, Text } from "react-native";
import tw from "@lib/tailwind";
import RoundButton from "../RoundButton";
import {
	ConfirmDialogIconTypes,
	RoundButtonType,
} from "@usertypes/commonEnums";

type Props = {
	icon?: ConfirmDialogIconTypes;
	onClose?: Function;
	title: string;
	text?: string;
	onConfirm?: Function;
	showCancelButton?: boolean;
};

export default function ConfirmDialog({
	icon = ConfirmDialogIconTypes.SUCCESS,
	onClose = () => {},
	title = "",
	text = "",
	onConfirm = () => {},
	showCancelButton = false,
}: Props) {
	return (
		<Portal>
			<Dialog
				visible={true}
				onDismiss={() => {
					onClose();
				}}
			>
				<View style={tw.style("flex gap-4 py-3 px-6")}>
					<Text
						style={tw.style(
							"text-2xl font-inter-semibold text-black text-center",
						)}
					>
						{title}
					</Text>
					{text && (
						<Text
							style={tw.style(
								"text-lg font-inter-regular text-center",
							)}
						>
							{text}
						</Text>
					)}
					<View
						style={tw.style(
							"flex-row gap-4 items-center justify-center",
						)}
					>
						<RoundButton
							onPress={() => {
								onConfirm();
								onClose();
							}}
						>
							Ok
						</RoundButton>
						{showCancelButton && (
							<RoundButton
								variant={RoundButtonType.OUTLINE_WHITE}
							>
								Cancel
							</RoundButton>
						)}
					</View>
				</View>
			</Dialog>
		</Portal>
	);
}
