import tw from "@lib/tailwind";
import React, { FC, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import { SnapPoints } from "@usertypes/commonEnums";

interface Props {
	open: boolean;
	onClose: () => void;
	onSubmit: (value: string) => void;
}

const CreateNoteDlg: FC<Props> = (props) => {
	const { open, onClose, onSubmit } = props;
	const [discount, setDiscount] = useState("10%");
	const [months, setMonths] = useState("6");

	return (
		<BottomSheetWrapper
			open={open}
			onClose={onClose}
			snapPoint={SnapPoints.Sixty}
		>
			<View style={tw.style("flex px-[20px] gap-3")}>
				{/* title */}
				<View
					style={tw.style(
						"flex flex-row justify-center items-center my-[20px]",
					)}
				>
					<Text style={tw.style("text-[20px] text-center font-bold")}>
						Create note
					</Text>
				</View>
				<View>
					<TextInput
						style={tw.style(
							"bg-gray-200 h-[45px] rounded-full p-3",
						)}
						placeholder="Title"
					/>
				</View>
				<View>
					<TextInput
						style={tw.style(
							"bg-gray-200 h-[45px] rounded-lg p-3 h-30",
						)}
						placeholder="Type a note..."
						multiline
					/>
				</View>
				<TouchableOpacity
					style={tw.style(
						"h-10 bg-purple-500 rounded-full flex flex-row items-center justify-center gap-2",
					)}
				>
					<Text style={tw.style("text-4 text-white font-bold")}>
						Create note
					</Text>
				</TouchableOpacity>
			</View>
		</BottomSheetWrapper>
	);
};

export default CreateNoteDlg;
