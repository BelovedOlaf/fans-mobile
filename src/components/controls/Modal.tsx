import React from "react";
import { Modal, TouchableOpacity, ScrollView } from "react-native";

import { FansView } from "@components/controls";
import tw from "@lib/tailwind";
import { FansModalProps, IFansModal } from "@usertypes/components";

const FansModal: React.FC<FansModalProps> = (props) => {
	const { visible, children, onClose } = props;

	return (
		<Modal transparent visible={visible}>
			<TouchableOpacity activeOpacity={1} onPress={onClose}>
				<FansView
					style={tw.style(
						"w-screen h-screen",
						"bg-fans-black/31",
						"flex justify-center items-center",
						"px-[18px]",
					)}
				>
					<TouchableOpacity activeOpacity={1}>
						<FansView
							style={tw.style(
								"w-full",
								"bg-white",
								"rounded-[15px]",
							)}
						>
							{children}
						</FansView>
					</TouchableOpacity>
				</FansView>
			</TouchableOpacity>
		</Modal>
	);
};

export const FansModal1: IFansModal = (props) => {
	const { visible, children, onClose: trigClose } = props;

	return (
		<Modal transparent visible={visible}>
			<FansView
				width="screen"
				height="screen"
				touchableOpacityProps={{ activeOpacity: 1, onPress: trigClose }}
				alignItems="center"
				backgroundColor={{ color: "black", opacity: 31 }}
				justifyContent="center"
				padding={{ x: 18 }}
			>
				<FansView
					width={{ lg: 433 }}
					touchableOpacityProps={{ activeOpacity: 1 }}
					backgroundColor="white"
					borderRadius={15}
					padding={{ x: 16, t: 25, b: 27 }}
				>
					{children}
				</FansView>
			</FansView>
		</Modal>
	);
};

export const FansModal2: IFansModal = (props) => {
	const { visible, children, modalStyle, onClose: handleClose } = props;

	const modalStyle_ = {
		padding: 17,
		...modalStyle,
	};

	return (
		<Modal transparent visible={visible}>
			<FansView
				width="screen"
				height="screen"
				touchableOpacityProps={{
					activeOpacity: 1,
					onPress: handleClose,
				}}
				backgroundColor={{ color: "black", opacity: 31 }}
				justifyContent="center"
				padding={{ x: 17 }}
			>
				<FansView
					width={{ lg: 433 }}
					touchableOpacityProps={{ activeOpacity: 1 }}
					alignItems={modalStyle_?.alignItems}
					alignSelf={{ xs: "stretch", lg: "center" }}
					backgroundColor="white"
					borderRadius={15}
					padding={modalStyle_.padding}
				>
					{children}
				</FansView>
			</FansView>
		</Modal>
	);
};

export const FansModal3: IFansModal = (props) => {
	const {
		width,
		height,
		visible,
		children,
		modalStyle,
		onClose: handleClose,
	} = props;

	const modalStyle_ = {
		padding: 17,
		...modalStyle,
	};

	return (
		<Modal transparent visible={visible}>
			<FansView
				width="screen"
				height="screen"
				touchableOpacityProps={{
					activeOpacity: 1,
					onPress: handleClose,
				}}
				backgroundColor={{ color: "black", opacity: 31 }}
				justifyContent="center"
				padding={{ x: 17 }}
			>
				<FansView
					width={width}
					height={height}
					touchableOpacityProps={{ activeOpacity: 1 }}
					alignItems={modalStyle_?.alignItems}
					alignSelf={{ xs: "stretch", lg: "center" }}
					backgroundColor="white"
					borderRadius={15}
					padding={modalStyle_.padding}
				>
					{children}
				</FansView>
			</FansView>
		</Modal>
	);
};

export default FansModal;
