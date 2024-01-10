import { CloseSvg, OutlinedTipSvg } from "@assets/svgs/common";
import AvatarWithStatus from "@components/common/AvatarWithStatus";
import { FansDivider, FansText } from "@components/controls";
import { CommonActionType, useAppContext } from "@context/useAppContext";
import tw from "@lib/tailwind";
import React from "react";
import { Image, View } from "react-native";
import { IconButton, Modal, Portal } from "react-native-paper";

const SendTipSuccessDialog = () => {
	const { state, dispatch } = useAppContext();
	const { avatar } = state.profile;
	const { visible, tip, creator, message } = state.common.sendTipSuccessModal;

	const handleClose = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleSendTipSuccessModal,
			data: {
				visible: false,
			},
		});
	};
	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={handleClose}
				contentContainerStyle={[
					tw.style(
						"mx-[18px] w-full mx-auto relative md:max-w-[358px]",
					),
					{
						shadowOpacity: 0,
					},
				]}
			>
				<View
					style={tw.style(
						"relative bg-white rounded-[15px] px-4 pt-6 pb-7.5",
					)}
				>
					<View style={tw.style("relative mx-auto")}>
						<AvatarWithStatus avatar={avatar ?? ""} size={78} />
						<View
							style={tw.style(
								"absolute right-[-4px] bottom-[-6px] border-[2px] border-white rounded-full bg-fans-grey w-[38px] h-[38px] items-center justify-center",
							)}
						>
							<OutlinedTipSvg size={20.5} color="#a854f5" />
						</View>
					</View>
					<FansDivider size={1} style={tw.style("my-5")} />
					<FansText
						fontSize={23}
						lineHeight={31}
						style={tw.style("font-bold text-center mb-3")}
					>
						You've sent a{"\n"} tip to {creator?.displayName ?? ""}!
					</FansText>
					<View
						style={tw.style(
							"flex-row items-center justify-center mb-3",
						)}
					>
						<Image
							source={require("@assets/images/gem.png")}
							style={tw.style("w-[30px] h-[28.5px] mr-2")}
						/>
						<FansText
							color="purple-a8"
							fontSize={42}
							lineHeight={56}
						>
							{tip}
						</FansText>
					</View>
					<FansText
						fontSize={16}
						lineHeight={21}
						style={tw.style("text-center")}
					>
						{`"${message ?? "I love your content!"}"`}
					</FansText>
					<IconButton
						icon={() => (
							<CloseSvg width={13} height={13} color="#fff" />
						)}
						containerColor="rgba(0,0,0,0.3)"
						style={tw.style(
							"m-0 w-[30px] h-[30px] absolute top-5 right-5",
						)}
						onPress={handleClose}
					/>
				</View>
			</Modal>
		</Portal>
	);
};

export default SendTipSuccessDialog;
