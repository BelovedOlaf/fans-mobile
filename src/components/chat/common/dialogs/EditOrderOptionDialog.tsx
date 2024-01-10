import { View, Text, TouchableOpacity } from "react-native";
import React, { FC, useState } from "react";
import tw from "@lib/tailwind";

import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import { SnapPoints } from "@usertypes/commonEnums";
import {
	AttachmentSvg,
	CalendarSvg,
	DiamondOutlinedSvg,
	DollarSvg,
	ErrorSvg,
	MailSvg,
} from "@assets/svgs/common";

interface Props {
	open: boolean;
	onClose: () => void;
	onSubmit: (value: string) => void;
}

const EditOrderOptionDialog: FC<Props> = (props) => {
	const { open, onClose, onSubmit } = props;

	const [message, setMessage] = useState("");

	const handleSubmit = () => {
		onSubmit(message);
	};

	return (
		<BottomSheetWrapper
			open={open}
			onClose={onClose}
			snapPoint={SnapPoints.Fifty}
		>
			<View style={tw.style("flex p-4")}>
				<TouchableOpacity
					style={tw.style(
						"flex-row justify-start items-center gap-5 py-4",
					)}
				>
					<MailSvg
						width={24}
						height={24}
						style={tw.style("text-black")}
					/>
					<Text style={tw.style("text-[18px]")}>With tips</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={tw.style(
						"flex-row justify-start items-center gap-5 py-4",
					)}
				>
					<DollarSvg
						width={24}
						height={24}
						style={tw.style("text-black")}
					/>
					<Text style={tw.style("text-[18px]")}>Priority</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={tw.style(
						"flex-row justify-start items-center gap-5 py-4",
					)}
				>
					<ErrorSvg
						width={24}
						height={24}
						style={tw.style("text-black")}
					/>
					<Text style={tw.style("text-[18px]")}>Oldest first</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={tw.style(
						"flex-row justify-start items-center gap-5 py-4",
					)}
				>
					<CalendarSvg
						width={24}
						height={24}
						style={tw.style("text-black")}
					/>
					<Text style={tw.style("text-[18px]")}>
						With attachments
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={tw.style(
						"flex-row justify-start items-center gap-5 py-4",
					)}
				>
					<AttachmentSvg
						width={24}
						height={24}
						style={tw.style("text-black")}
					/>
					<Text style={tw.style("text-[18px]")}>Highest Level</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={tw.style(
						"flex-row justify-start items-center gap-5 py-4",
					)}
				>
					<DiamondOutlinedSvg
						width={24}
						height={24}
						style={tw.style("text-black")}
					/>
					<Text style={tw.style("text-[18px]")}>Unread</Text>
				</TouchableOpacity>
			</View>
		</BottomSheetWrapper>
	);
};

export default EditOrderOptionDialog;
