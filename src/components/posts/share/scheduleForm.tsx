import RoundButton from "@components/common/RoundButton";
import DropdownSelect from "@components/common/dropdownSelect";
import { FansText } from "@components/controls";
import DatePicker from "@components/common/datePicker";
import TimePicker from "@components/common/timePicker";
import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";
import React, { FC } from "react";
import { View } from "react-native";
import { timezones } from "@constants/timezones";

import {
	IHoursAndMinutes,
	ICalendarDate,
	IScheduleForm,
} from "@usertypes/types";

interface Props {
	data: IScheduleForm;
	isSubmitted: boolean;
	onChangeField: (
		name: string,
		val: string | IHoursAndMinutes | ICalendarDate,
	) => void;
	handleSave: () => void;
}

const ScheduleForm: FC<Props> = (props) => {
	const { data, onChangeField, handleSave, isSubmitted } = props;
	return (
		<View>
			<FansText
				fontSize={16}
				lineHeight={21}
				style={tw.style("text-center mb-11")}
			>
				Pre-plan posts for automatic publishing to maintain a consistent
				content flow
			</FansText>

			<View style={tw.style("mb-[30px]")}>
				<FansText
					fontSize={17}
					lineHeight={22}
					style={tw.style("mb-4 font-semibold")}
				>
					Start time
				</FansText>
				<DatePicker
					value={data.startDate}
					onChangeValue={(val) => onChangeField("startDate", val)}
					hasError={isSubmitted && !data.startDate}
				/>
			</View>

			<View style={tw.style("mb-[30px]")}>
				<FansText
					fontSize={17}
					lineHeight={22}
					style={tw.style("font-semibold mb-[15px]")}
				>
					Time
				</FansText>
				<TimePicker
					value={data.time}
					onChangeValue={(val) => onChangeField("time", val)}
				/>
			</View>

			<View style={tw.style("mb-[30px]")}>
				<FansText
					fontSize={17}
					lineHeight={22}
					style={tw.style("font-semibold mb-[15px]")}
				>
					Time Zone
				</FansText>
				<DropdownSelect
					data={timezones}
					value={data.timezone}
					setSelected={(val) => onChangeField("timezone", val)}
					hasError={isSubmitted && data.timezone === ""}
				/>
			</View>
			<View>
				<RoundButton
					variant={RoundButtonType.OUTLINE_PRIMARY}
					onPress={handleSave}
				>
					Schedule post
				</RoundButton>
			</View>
		</View>
	);
};

export default ScheduleForm;
