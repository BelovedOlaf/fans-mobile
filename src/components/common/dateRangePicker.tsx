import { View, Pressable } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import React, { FC } from "react";
import moment from "moment";

import tw from "@lib/tailwind";
import { FansText } from "@components/controls";
import { IDateRange } from "@usertypes/types";

interface Props {
	value: IDateRange;
	onChangeValue: (val: IDateRange) => void;
	hasError?: boolean;
}

const DateRangePicker: FC<Props> = (props) => {
	const { value, onChangeValue, hasError } = props;
	const [open, setOpen] = React.useState(false);

	const onDismiss = React.useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const onConfirm = React.useCallback(
		(range: IDateRange) => {
			setOpen(false);
			onChangeValue(range);
		},
		[setOpen, onChangeValue],
	);
	return (
		<View>
			<Pressable
				style={tw.style(
					"h-[42px] bg-fans-grey rounded-[42px] flex-row items-center pl-5",
					hasError ? "border border-fans-red" : "",
				)}
				onPress={() => setOpen(true)}
			>
				<FansText color="grey-70" fontSize={18} lineHeight={24}>
					{value.startDate && value.endDate
						? `${moment(value.startDate).format(
								"MM/DD/YYYY",
						  )} ~ ${moment(value.endDate).format("MM/DD/YYYY")}`
						: "MM/DD/YYYY"}
				</FansText>
			</Pressable>
			<DatePickerModal
				locale="en"
				mode="range"
				visible={open}
				onDismiss={onDismiss}
				startDate={value.startDate}
				endDate={value.endDate}
				onConfirm={onConfirm}
			/>
		</View>
	);
};

export default DateRangePicker;
