import moment from "moment";

import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateRangePicker from "rn-select-date-range";

import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import tw from "@lib/tailwind";
import { SnapPoints } from "@usertypes/commonEnums";

interface Props {
	open: boolean;
	onClose: () => void;
	onSubmit: Function;
}

const FilterDuringDialog: FC<Props> = (props) => {
	const { open, onClose, onSubmit } = props;
	return (
		<BottomSheetWrapper
			open={open}
			onClose={onClose}
			snapPoint={SnapPoints.Fifty}
		>
			<View style={tw.style("flex px-[20px] gap-5 py-4")}>
				<View>
					<Text style={tw.style("font-bold text-center text-5")}>
						Search date or timeframe
					</Text>
				</View>
				<View>
					<DateRangePicker
						onSelectDateRange={(range) => {}}
						blockSingleDateSelection={true}
						responseFormat="YYYY-MM-DD"
						maxDate={moment()}
						minDate={moment().subtract(100, "days")}
						selectedDateContainerStyle={{
							height: 35,
							width: 35,
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "purple",
							borderRadius: 35 / 2,
						}}
						// selectedDateStyle={styles.selectedDateStyle}
					/>
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

export default FilterDuringDialog;
