import tw from "@lib/tailwind";
import React, { FC, useState } from "react";
import { View } from "react-native";

import { CheckBadgeSvg } from "@assets/svgs/common";
import MessageInput from "@components/chat/MessageInput";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import { FansGap, FansImage, FansText, FansView } from "@components/controls";
import { SnapPoints } from "@usertypes/commonEnums";
import { Colors } from "@usertypes/enums";

interface Props {
	data: { name: string; text: string };
	open: boolean;
	onClose: () => void;
	onSubmit: (value: string) => void;
}

const AddNoteDialog: FC<Props> = (props) => {
	const { data, open, onClose, onSubmit } = props;
	const { name, text } = data;

	const [message, setMessage] = useState("");

	const handleSubmit = () => {
		onSubmit(message);
	};

	return (
		<BottomSheetWrapper
			open={open}
			onClose={onClose}
			snapPoint={SnapPoints.Fourty}
		>
			<View style={tw.style("bg-white", "flex items-center")}>
				<FansGap height={30} />
				<FansView style={tw.style("w-[95px] h-[95px]")}>
					<FansImage
						source={require("@assets/images/default-avatar.png")}
					/>
				</FansView>
				<FansGap height={8} />
				<View style={tw.style("flex-row gap-[6px] items-center")}>
					<FansText fontFamily="inter-bold" fontSize={19}>
						{name}
					</FansText>
					<CheckBadgeSvg width={15.66} height={15} />
				</View>
				<FansGap height={1} />
				<FansText color="grey-70" fontSize={16}>
					Shared a note:
				</FansText>
				<FansGap height={29} />
				<FansView width={212}>
					<FansText fontSize={18} textAlign="center">
						{text}
					</FansText>
				</FansView>
				<FansGap height={35} />
				<FansView style={tw.style("w-full px-[18px]")}>
					<MessageInput textonly />
				</FansView>
			</View>
		</BottomSheetWrapper>
	);
};

export default AddNoteDialog;
