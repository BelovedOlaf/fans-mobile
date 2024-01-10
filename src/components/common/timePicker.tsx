import { View, Pressable } from "react-native";
import React, { FC } from "react";
// import DateTimePicker from "@react-native-community/datetimepicker";
import { TimePickerModal } from "react-native-paper-dates";

import tw from "@lib/tailwind";
import { FansText } from "@components/controls";

import { IHoursAndMinutes } from "@usertypes/types";

interface Props {
	value: IHoursAndMinutes;
	onChangeValue: (value: IHoursAndMinutes) => void;
	hasError?: boolean;
}

const TimePicker: FC<Props> = (props) => {
	const { value, onChangeValue, hasError } = props;
	const [open, setOpen] = React.useState(false);

	const onDismiss = React.useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const onConfirm = React.useCallback(
		(hoursAndMinutes: IHoursAndMinutes) => {
			setOpen(false);
			onChangeValue(hoursAndMinutes);
		},
		[open],
	);

	return (
		<View>
			<Pressable
				style={tw.style(
					"h-[42px] bg-fans-grey rounded-[42px] flex-row items-center pl-5",
					hasError ? "border border-fans-grey" : "",
				)}
				onPress={() => setOpen(true)}
			>
				<FansText color="grey-70" fontSize={18} lineHeight={24}>
					{`${value.hours
						.toString()
						.padStart(2, "0")} : ${value.minutes
						.toString()
						.padStart(2, "0")}`}
				</FansText>
			</Pressable>
			<TimePickerModal
				visible={open}
				onDismiss={onDismiss}
				onConfirm={onConfirm}
				hours={value.hours}
				minutes={value.minutes}
			/>
		</View>
	);
};

export default TimePicker;
