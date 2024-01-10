import { View, TouchableOpacity, Text, TextInput } from "react-native";
import React, { FC, useState } from "react";
import tw from "@lib/tailwind";
import {
	ImageSvg,
	OutlineCamera,
	PlusSvg,
	SendSvg,
	CloseSvg,
	VoiceRecordSvg,
	CircledDollarSvg,
} from "@assets/svgs/common";
import SendConfirmDialog from "@components/common/dialog/SendConfirmDialog";
import { Colors } from "@usertypes/enums";

interface Props {
	value: string;
	onChange: (val: string) => void;
	setOpenAddDialog: (val: boolean) => void;
}

const ChatForm: FC<Props> = (props) => {
	const { value, onChange, setOpenAddDialog } = props;
	const [isFocus, setFocus] = useState(false);
	const [confirmModal, setConfirmModal] = useState(false);
	const [payAlert, setPayAlert] = useState(false);

	return (
		<View style={tw.style("flex-row items-center")}>
			<View
				style={tw.style(
					"bg-fans-grey",
					"flex-row gap-[10px] items-center",
					"p-[4px]",
					"rounded-full",
				)}
			>
				<View
					style={tw.style(
						"bg-fans-purple",
						"p-[9px]",
						"rounded-full",
					)}
				>
					<OutlineCamera size={16} color={Colors.White} />
				</View>
				<TextInput
					placeholder="Message..."
					value={value}
					onChangeText={onChange}
					onFocus={() => setFocus(true)}
					style={tw.style(
						"text-[18px] text-fans-grey-dark w-[180px]",
					)}
				/>
				<VoiceRecordSvg size={21} color={Colors.Grey} />
			</View>
			{/*
			<View style={tw.style("flex-1 relative")}>
				<TextInput
					placeholder="Message..."
					value={value}
					onChangeText={onChange}
					onFocus={() => setFocus(true)}
					style={tw.style(
						"text-[18px] leading-6 text-black py-2 bg-fans-grey rounded-[21px] pl-[42px] pr-2",
					)}
					multiline
				/>
				<TouchableOpacity
					style={tw.style(
						`flex justify-center items-center w-[34px] h-[34px] rounded-full absolute left-1 bottom-1 ${
							isfocus ? "bg-transparent" : "bg-fans-purple"
						}`,
					)}
				>
					<OutlineCamera
						size={16}
						style={tw.style(
							`${isfocus ? "text-fans-purple" : "text-white"}`,
						)}
					/>
				</TouchableOpacity>

				{isfocus ? (
					<TouchableOpacity
						style={tw.style(
							"flex justify-center items-center w-[34px] h-[34px] rounded-full absolute right-1 bottom-1 bg-fans-purple",
						)}
						onPress={() => {
							onSend();
						}}
					>
						<SendSvg width={34} height={34} style={tw.style("")} />
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						style={tw.style(
							"flex justify-center items-center w-[34px] h-[34px] rounded-full absolute right-1 bottom-1 bg-transparent",
						)}
					>
						<VoiceRecordSvg size={21} color={Colors.Grey} />
					</TouchableOpacity>
				)}
						</View>*/}
			<TouchableOpacity
				style={tw.style(
					"flex justify-center items-center w-[34px] h-[34px] rounded-full",
				)}
				onPress={() => {
					onChange("");
					setOpenAddDialog(true);
				}}
			>
				<CircledDollarSvg width={21} height={21} color={"black"} />
			</TouchableOpacity>
			<TouchableOpacity
				style={tw.style(
					"flex justify-center items-center w-[34px] h-[34px] rounded-full",
				)}
			>
				<ImageSvg width={19} height={19} color={"black"} />
			</TouchableOpacity>
			{confirmModal && (
				<SendConfirmDialog
					title={"Confirm paying $5 to send"}
					text=""
					onConfirm={() => {}}
					onClose={() => setConfirmModal(false)}
				/>
			)}
			{payAlert && (
				<View
					style={tw.style(
						"bg-black flex-row justify-between items-center bg-fans-purple absolute top-[-45px] left-[0px] py-[10px] px-[23px] w-full",
					)}
				>
					<Text style={tw.style("text-white")}>
						Messages to Jane Love cost $5 per
					</Text>
					<TouchableOpacity onPress={() => setPayAlert(false)}>
						<CloseSvg width={11} height={11} />
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default ChatForm;
