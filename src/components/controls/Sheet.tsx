import React, { Fragment, useEffect, useRef } from "react";
import { Modal, TouchableOpacity } from "react-native";

import { FansView } from "@components/controls";
import tw from "@lib/tailwind";
import { IFansSheet } from "@usertypes/components";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useDeviceContext } from "twrnc";
import { getPaddingStyle } from "@usertypes/styles";

const FansSheet: IFansSheet = (props) => {
	const { children, visible, onClose: trigClose } = props;

	return (
		<Modal transparent visible={visible}>
			<FansView
				width="screen"
				height="screen"
				style={tw.style("bg-black/31")}
			>
				<TouchableOpacity
					style={tw.style("grow", "justify-end sm:justify-center")}
					activeOpacity={1}
					onPress={trigClose}
				>
					<FansView
						style={tw.style(
							"rounded-[15px]",
							"self-stretch sm:self-center",
						)}
						backgroundColor="white"
					>
						<TouchableOpacity activeOpacity={1}>
							{children}
						</TouchableOpacity>
					</FansView>
				</TouchableOpacity>
			</FansView>
		</Modal>
	);
};

export const FansSheet1: IFansSheet = (props) => {
	const {
		width,
		height = 20,
		children,
		visible,
		sheetStyle,
		onClose: handleClose,
	} = props;

	const sheetStyle_ = { padding: { x: 33, y: 20 }, ...sheetStyle };

	useDeviceContext(tw);

	const sheetRef = useRef<BottomSheetModal>(null);
	useEffect(() => {
		visible ? sheetRef.current?.present() : sheetRef.current?.close();
	}, [visible]);

	return (
		<Modal transparent visible={visible}>
			<FansView
				width="screen"
				height="screen"
				touchableOpacityProps={{ onPress: handleClose }}
				alignItems="center"
				backgroundColor={{ color: "black", opacity: 31 }}
				justifyContent={{ xs: "end", md: "center" }}
			>
				<FansView touchableOpacityProps={{ activeOpacity: 1 }}>
					{tw.prefixMatch("md") ? (
						<FansView
							width={width}
							height={height}
							backgroundColor="white"
							borderRadius={15}
							overflow="hidden"
							padding={sheetStyle_.padding}
						>
							{children}
						</FansView>
					) : (
						<BottomSheetModalProvider>
							<BottomSheetModal
								ref={sheetRef}
								enableContentPanningGesture={false}
								enableHandlePanningGesture={false}
								snapPoints={[height as number]}
								style={tw.style("px-[17px]")}
							>
								{children}
							</BottomSheetModal>
						</BottomSheetModalProvider>
					)}
				</FansView>
			</FansView>
		</Modal>
	);

	return (
		<Modal transparent visible={visible}>
			<FansView
				width="screen"
				height="screen"
				backgroundColor={{ color: "black", opacity: 31 }}
			>
				{/*<TouchableOpacity
					style={tw.style("grow", "justify-end sm:justify-center")}
					activeOpacity={1}
					onPress={handleClose}
				>
					<FansView
						style={tw.style(
							"rounded-[15px]",
							"self-stretch sm:self-center",
						)}
						backgroundColor="white"
					>
						<TouchableOpacity activeOpacity={1}>
							{children}
						</TouchableOpacity>
					</FansView>
						</TouchableOpacity>*/}
			</FansView>
		</Modal>
	);
};

export const FansSheet2: IFansSheet = (props) => {
	const {
		width,
		height = 20,
		children,
		visible,
		sheetStyle,
		onClose: handleClose,
	} = props;

	const sheetStyle_ = {
		padding: { xs: { x: 17 }, lg: { x: 33, y: 20 } },
		...sheetStyle,
	};

	useDeviceContext(tw);

	const sheetRef = useRef<BottomSheetModal>(null);
	useEffect(() => {
		visible ? sheetRef.current?.present() : sheetRef.current?.close();
	}, [visible]);

	const snapPoint =
		typeof height === "number"
			? height
			: typeof height === "object" && "xs" in height
			? height.xs
			: 0;

	return (
		<Modal transparent visible={visible}>
			<FansView
				width="screen"
				height="screen"
				touchableOpacityProps={{ onPress: handleClose }}
				alignItems="center"
				backgroundColor={{ color: "black", opacity: 31 }}
				justifyContent={{ xs: "end", md: "center" }}
			>
				<FansView touchableOpacityProps={{ activeOpacity: 1 }}>
					{tw.prefixMatch("lg") ? (
						<FansView
							width={width}
							height={height}
							backgroundColor="white"
							borderRadius={15}
							overflow="hidden"
							padding={sheetStyle_.padding}
						>
							{children}
						</FansView>
					) : (
						<BottomSheetModalProvider>
							<BottomSheetModal
								ref={sheetRef}
								enableContentPanningGesture={false}
								enableHandlePanningGesture={false}
								handleIndicatorStyle={tw.style(
									"w-[34px]",
									"bg-fans-grey-70/40",
								)}
								snapPoints={[snapPoint as number]}
							>
								<FansView {...sheetStyle_}>{children}</FansView>
							</BottomSheetModal>
						</BottomSheetModalProvider>
					)}
				</FansView>
			</FansView>
		</Modal>
	);
};

export default FansSheet;
