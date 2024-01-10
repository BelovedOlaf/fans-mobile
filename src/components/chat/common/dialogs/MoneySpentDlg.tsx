import React, { FC } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import tw from "@lib/tailwind";
import { SnapPoints } from "@usertypes/commonEnums";

interface Props {
	open: boolean;
	onClose: () => void;
	onSubmit: Function;
}

const MoneySpentDlg: FC<Props> = (props) => {
	const { open, onClose, onSubmit } = props;
	return (
		<BottomSheetWrapper
			open={open}
			onClose={onClose}
			snapPoint={SnapPoints.Fourty}
		>
			<View style={tw.style("flex px-[20px] gap-5 py-4")}>
				<View>
					<Text style={tw.style("text-center font-bold text-4")}>
						Money spent
					</Text>
				</View>
				<View style={tw.style("flex flex-row gap-3")}>
					<View style={tw.style("gap-3 flex-1")}>
						<Text style={tw.style("text-4")}>Minimum</Text>
						<TextInput
							style={tw.style("bg-gray-200 rounded-full h-10")}
						/>
					</View>
					<View style={tw.style("gap-3 flex-1")}>
						<Text style={tw.style("text-4")}>Maximum</Text>
						<TextInput
							style={tw.style("bg-gray-200 rounded-full h-10")}
						/>
					</View>
				</View>
				<View>
					<TouchableOpacity
						style={tw.style("bg-purple-500 p-3 rounded-full")}
					>
						<Text
							style={tw.style(
								"text-white text-center text-4 font-bold",
							)}
						>
							Search
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</BottomSheetWrapper>
	);
};

export default MoneySpentDlg;
