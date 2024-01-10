import { View, Pressable } from "react-native";
import React, { FC, useCallback } from "react";
import { DatePickerModal } from "react-native-paper-dates";

import tw from "@lib/tailwind";
import { FansText } from "@components/controls";
import { ICalendarDate } from "@usertypes/types";

interface Props {
	value: ICalendarDate;
	onChangeValue: (val: ICalendarDate) => void;
	hasError?: boolean;
}

const DatePicker: FC<Props> = (props) => {
	const { value, onChangeValue, hasError } = props;
	const [open, setOpen] = React.useState(false);

	const onDismissSingle = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const onConfirmSingle = useCallback(
		(params: { date: ICalendarDate }) => {
			setOpen(false);
			onChangeValue(params.date);
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
					{value ? `${value.toJSON().split("T")[0]}` : "MM/DD/YYYY"}
				</FansText>
			</Pressable>
			<DatePickerModal
				locale="en"
				mode="single"
				visible={open}
				onDismiss={onDismissSingle}
				date={value}
				onConfirm={onConfirmSingle}
			/>
		</View>
	);
};

export default DatePicker;
