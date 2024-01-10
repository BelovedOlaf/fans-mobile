import React, { useState } from "react";

// import base modules
import { CloseSvg, Warning2Svg } from "@assets/svgs/common";
import {
	FansButton,
	FansButton3,
	FansGap,
	FansHorizontalDivider,
	FansText,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { IFansModal } from "@usertypes/components";
import { FansModal3 } from "@components/controls/Modal";
import { IconButton } from "react-native-paper";
import { View } from "react-native";

const DeleteLinkModal: IFansModal = (props) => {
	const { visible, onClose, onSubmit, ...props_ } = props;

	const handlePressCancel = () => onClose();
	const handlePressDelete = () => onSubmit(undefined);

	return (
		<FansModal3 {...props}>
			<View
				style={tw.style(
					"absolute right-[15px] top-[15px] md:flex w-7.5 h-7.5",
				)}
			>
				<IconButton
					icon={() => <CloseSvg size={13.2} color="#fff" />}
					containerColor="rgba(0,0,0,0.3)"
					style={tw.style("m-0 w-7.5 h-7.5 ")}
					onPress={onClose}
				/>
			</View>

			<FansView
				style={tw.style("flex items-center", "mx-[20px] my-[15px]")}
			>
				<FansView style={tw.style("w-[76.58px] h-[68.62px]")}>
					<Warning2Svg colorFans="fans-red" />
				</FansView>
				<FansGap height={22} />
				<FansHorizontalDivider width={{ lg: 358, xs: "full" }} />
				<FansGap height={18} />
				<FansText style={tw.style("font-inter-bold", "text-[23px]")}>
					Warning
				</FansText>
				<FansGap height={18} />
				<FansText
					style={tw.style("text-[16px] text-center leading-[21px]")}
				>
					Removing this link will stop all{"\n"}
					future incoming revenue
				</FansText>
				<FansGap height={{ lg: 34.5, xs: 25 }} />
				<FansView
					style={tw.style(
						"w-full h-[42px]",
						"flex-row gap-[14px] justify-between",
					)}
				>
					<FansButton3
						buttonStyle={{
							backgroundColor: "white",
							borderColor: "red-eb",
						}}
						textStyle1={{
							color: "red-eb",
						}}
						title="Cancel"
						onPress={handlePressCancel}
						height={42}
						style={tw.style("px-[0] flex-1")}
					/>

					<FansButton
						title="Delete"
						colorFans="fans-red"
						onPress={handlePressDelete}
						style={{ flex: 1, height: 42 }}
						containerStyle={tw.style("text-19px")}
					/>
					{/* </FansView> */}
				</FansView>
			</FansView>
		</FansModal3>
	);
};

export default DeleteLinkModal;
