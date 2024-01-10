import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { FansGap, FansText, FansView, FansDivider } from "@components/controls";
import DropdownSelect from "@components/common/dropdownSelect";
import DropdownSelectReadOnly from "@components/common/dropdownSelectReadOnly";
import { generateTimeFrames } from "../../../helper/HoursGenerator";
import { RoundButtonType } from "@usertypes/commonEnums";
import RoundButton from "@components/common/RoundButton";
import tw from "@lib/tailwind";
import { Trash2Svg } from "@assets/svgs/common";

import { IProfileSettings, ISelectData } from "@usertypes/types";

import { timezones } from "@constants/timezones";
import {
	updateVideoSettings,
	getUserSettings,
} from "@helper/endpoints/profile/apis";
import { ProfileActionType, useAppContext } from "@context/useAppContext";

const minutesBefore = ["1", "5", "10", "15"];

interface Interval {
	start: string;
	end: string;
}

interface Day {
	name: string;
	intervals: Interval[];
	startTime: string;
	endTime: string;
}

export interface Timeframe {
	startTime: string;
	endTime: string;
	dayOfTheWeek: string;
}

const initialDays = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

const initialTimeframes: Timeframe[] = initialDays.map((day) => ({
	startTime: "",
	endTime: "",
	dayOfTheWeek: day,
}));

const Step2: React.FC = () => {
	const { state, dispatch } = useAppContext();
	const [days, setDays] = useState<Timeframe[]>(initialTimeframes);

	const { timeZone, timeframes, bufferBetweenCalls } =
		state.profile.settings.video;
	const { video } = state.profile.settings;

	const [isSubmitted, setIsSubmitted] = useState(false);

	const updateSettings = async (updatedSettings: IProfileSettings) => {
		const response = await updateVideoSettings(updatedSettings);

		if (response.ok) {
			fetchProfileSettings();
		}
	};

	const fetchProfileSettings = async () => {
		const response = await getUserSettings();
		if (response.ok) {
			const profileSettings = response.data;
			dispatch.setProfile({
				type: ProfileActionType.updateSettings,
				data: profileSettings,
			});
		}
	};

	const handleChangeField = async (name: string, val: string | number) => {
		const updatedSettings = {
			...state.profile.settings,
			video: {
				...video,
				[name]: val,
			},
		};

		await updateSettings(updatedSettings);
	};

	const addInterval = async (dayIndex: number) => {
		if (days[dayIndex].startTime && days[dayIndex].endTime) {
			const newInterval: Timeframe = {
				startTime: days[dayIndex].startTime,
				endTime: days[dayIndex].endTime,
				dayOfTheWeek: days[dayIndex].dayOfTheWeek,
			};

			const updatedTimeframes = [...timeframes];
			updatedTimeframes.push(newInterval);

			const updatedSettings = {
				...state.profile.settings,
				video: {
					...video,
					timeframes: updatedTimeframes,
				},
			};
			await updateSettings(updatedSettings);
		}
	};

	const removeInterval = async (dayIndex: number, intervalIndex: number) => {
		const updatedDays = [...days];

		// Update the timeframes state
		const updatedTimeframes = [...timeframes];
		updatedTimeframes.splice(intervalIndex, 1);

		const updatedSettings = {
			...state.profile.settings,
			video: {
				...video,
				timeframes: updatedTimeframes,
			},
		};
		await updateSettings(updatedSettings);
	};

	const convertIntervalsToSelectData = (
		intervals: string[],
	): ISelectData[] => {
		return intervals.map((interval) => ({
			label: interval,
			data: interval,
		}));
	};

	const convertMinutesBeforeToSelectData = (
		intervals: string[],
	): ISelectData[] => {
		return intervals.map((interval) => {
			const label =
				interval === "1" ? `${interval} minute` : `${interval} minutes`;
			return {
				label,
				data: interval,
			};
		});
	};

	const intervals = generateTimeFrames(10);
	const intervalSelectData = convertIntervalsToSelectData(intervals);

	const renderIntervals = (dayIndex: number, dayOfTheWeek: string) => {
		const availableEndTimeOptions = intervals.slice(
			intervals.indexOf(days[dayIndex].startTime) + 1,
		);

		const filteredObjects = timeframes.filter(
			(obj) => obj.dayOfTheWeek === dayOfTheWeek,
		);

		return (
			<View style={{ flex: 1 }}>
				<ScrollView>
					<FansGap height={15} />

					{filteredObjects.map((interval, index) => (
						<View
							key={index}
							style={{
								flex: 1,
								flexDirection: "row",
								alignItems: "center",
								marginRight: 18,
							}}
						>
							<View style={{ flex: 1 }}>
								<DropdownSelectReadOnly
									data={[
										{
											label: interval.startTime,
											data: interval.startTime,
										},
									]}
									search={false}
									value={interval.startTime}
									setSelected={(val) => {}}
								/>
							</View>
							<View style={{ flex: 1, marginLeft: 18 }}>
								<DropdownSelectReadOnly
									data={[
										{
											label: interval.endTime,
											data: interval.endTime,
										},
									]}
									search={false}
									value={interval.endTime}
									setSelected={(val) => {}}
								/>
							</View>
							<View style={{ marginLeft: 18 }}>
								<TouchableOpacity
									style={tw.style(
										"flex-row justify-start items-center gap-5 py-4",
									)}
									onPress={() =>
										removeInterval(dayIndex, index)
									}
								>
									<FansView width={11.87} height={14.76}>
										<Trash2Svg
											color={tw.color("fans-red")}
										/>
									</FansView>
								</TouchableOpacity>
							</View>
						</View>
					))}
				</ScrollView>

				<View style={{ flexDirection: "column" }}>
					<FansGap height={15} />

					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-start",
						}}
					>
						<View style={{ flex: 1 }}>
							<DropdownSelect
								data={intervalSelectData}
								value={days[dayIndex].startTime}
								search={false}
								setSelected={(val) => {
									const updatedDays = [...days];
									updatedDays[dayIndex].startTime = val;
									setDays(updatedDays);
								}}
								customBoxStyles="border-fans-purple"
							/>
						</View>
						<View style={{ flex: 1, marginLeft: 18 }}>
							<DropdownSelect
								data={intervalSelectData.filter((time) =>
									availableEndTimeOptions.includes(
										time.label,
									),
								)}
								value={days[dayIndex].endTime}
								search={false}
								setSelected={(val) => {
									const updatedDays = [...days];
									updatedDays[dayIndex].endTime = val;
									setDays(updatedDays);
								}}
								customBoxStyles="border-fans-purple"
							/>
						</View>
					</View>
					<FansGap height={12} />

					<RoundButton
						variant={RoundButtonType.OUTLINE_PRIMARY}
						onPress={() => addInterval(dayIndex)}
					>
						Add New Interval
					</RoundButton>
					<FansGap height={34} />
				</View>
			</View>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<FansView>
				<FansView>
					<FansGap height={34} />
					<FansText
						textAlign="center"
						fontFamily="inter-semibold"
						fontSize={27}
					>
						Availability
					</FansText>
					<FansGap height={12} />
					<FansText textAlign="center" fontSize={16}>
						Fans or clients will only be able to book between the
						selected range of dates
					</FansText>
				</FansView>
				<FansGap height={42} />
			</FansView>
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Time Zone
				</FansText>
				<FansGap height={12} />
			</FansView>
			<FansView>
				<DropdownSelect
					data={timezones}
					value={timeZone}
					setSelected={(val) => handleChangeField("timeZone", val)}
					hasError={isSubmitted && timeZone === ""}
				/>
			</FansView>
			<FansGap height={33.4} />
			<FansDivider />
			<FansView>
				<FansGap height={28.5} />
				<FansText fontFamily="inter-semibold" fontSize={19}>
					Timeframes
				</FansText>
				<FansGap height={28.5} />
				{initialDays.map((day, index) => (
					<View key={index}>
						<FansText fontFamily="inter-semibold" fontSize={17}>
							{day}
						</FansText>
						{renderIntervals(index, day)}
					</View>
				))}
			</FansView>
			<FansGap height={10} />
			<FansDivider />
			<FansView>
				<FansGap height={31.4} />
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Buffer between calls (optional)
				</FansText>
				<FansGap height={12} />
				<FansText style={tw.style("text-[#707070]")}>
					Set a predefined period before and after each video call,
					allowing for preparation and rest
				</FansText>
				<FansGap height={15.9} />
				<FansView>
					<DropdownSelect
						data={convertMinutesBeforeToSelectData(minutesBefore)}
						value={bufferBetweenCalls.toString()}
						setSelected={(val) => {
							handleChangeField(
								"bufferBetweenCalls",
								parseInt(val, 10),
							);
						}}
						hasError={
							isSubmitted && bufferBetweenCalls.toString() === ""
						}
						search={false}
					/>
				</FansView>
			</FansView>
			<FansGap height={39.9} />
		</View>
	);
};

export default Step2;
