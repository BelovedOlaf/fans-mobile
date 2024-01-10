import React, { FC } from "react";
import { Dialog, Portal } from "react-native-paper";
import { View, Platform, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSharedValue } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import tw from "@lib/tailwind";

interface Props {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	dialogWrapperStyle?: string;
	topLineStyle?: string;
	paddingBottom?: number;
}

const DialogSheet: FC<Props> = (props) => {
	const {
		open,
		onClose,
		dialogWrapperStyle,
		children,
		topLineStyle,
		paddingBottom,
	} = props;
	const insets = useSafeAreaInsets();

	const positionY = useSharedValue(0);

	const panGesture = Gesture.Pan()
		.onBegin((e) => {
			positionY.value = e.translationY;
		})
		.onEnd((e) => {
			if (positionY.value < e.translationY) {
				onClose();
			}
		});

	return (
		<Portal>
			<Dialog
				visible={open}
				onDismiss={onClose}
				style={tw.style(
					"px-0 mx-0 mb-0 mt-auto w-full md:my-auto md:mx-auto md:max-w-100",
					dialogWrapperStyle,
				)}
			>
				<Dialog.Content
					style={[
						tw.style(
							"bg-white px-0 pb-0 rounded-t-[32px] md:rounded-t-[14px] md:rounded-[15px] mt-0",
						),
						{
							paddingBottom: paddingBottom ?? insets.bottom,
						},
					]}
				>
					<GestureDetector gesture={panGesture}>
						<Pressable
							style={tw.style("pt-4 md:pt-5 cursor-pointer")}
						>
							<View
								style={tw.style(
									"w-[38px] h-1 bg-[rgba(112,112,112,0.4)] rounded-[4px] mx-auto mb-[18px] md:rounded-t-[15px] md:rounded-b-[15px]",
									Platform.OS !== "web" && "hidden",
									topLineStyle,
								)}
							></View>
						</Pressable>
					</GestureDetector>

					{children}
				</Dialog.Content>
			</Dialog>
		</Portal>
	);
};

export default DialogSheet;
