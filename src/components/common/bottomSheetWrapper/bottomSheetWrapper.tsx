import { TouchableOpacity, Platform } from "react-native";
import React, { FC, Fragment } from "react";
import tw from "@lib/tailwind";

import BottomSheet from "./bottomSheet";
import DialogSheet from "./dialogSheet";

import { SnapPoints } from "@usertypes/commonEnums";

interface Props {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	snapPoint?: SnapPoints;
	dialogWrapperStyle?: string;
	topLineStyle?: string;
	paddingBottom?: number;
}

const BottomSheetWrapper: FC<Props> = (props) => {
	const { open, onClose } = props;

	return (
		<Fragment>
			{(Platform.OS === "ios" || Platform.OS === "android") && (
				<BottomSheet {...props} />
			)}
			{open && Platform.OS !== "web" && (
				<TouchableOpacity
					onPress={onClose}
					style={tw.style(
						"absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)]",
					)}
				></TouchableOpacity>
			)}

			{Platform.OS === "web" && <DialogSheet {...props} />}
		</Fragment>
	);
};

export default BottomSheetWrapper;
