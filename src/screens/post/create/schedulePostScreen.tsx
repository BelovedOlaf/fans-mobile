import { View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import moment from "moment";

import CustomTopNavBar from "@components/common/customTopNavBar";
import { ScheduleForm } from "@components/posts/share";
import { useAppContext, PostsActionType } from "@context/useAppContext";
import { PostsNavigationStacks } from "@usertypes/navigations";

import {
	IHoursAndMinutes,
	ICalendarDate,
	IScheduleForm,
} from "@usertypes/types";

export const defaultForm = {
	startDate: undefined,
	time: {
		hours: 0,
		minutes: 0,
	},
	timezone: "GMT +0:00",
};

const SchedulePostScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "Schedule">,
) => {
	const { navigation } = props;

	const insets = useSafeAreaInsets();

	const { state, dispatch } = useAppContext();
	const { postForm } = state.posts;

	const [scheduleForm, setScheduleForm] =
		useState<IScheduleForm>(defaultForm);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const onChangeField = (
		name: string,
		val: string | IHoursAndMinutes | ICalendarDate,
	) => {
		setScheduleForm({
			...scheduleForm,
			[name]: val,
		});
	};

	const handleSave = () => {
		setIsSubmitted(true);
		if (!scheduleForm.startDate || scheduleForm.timezone === "") {
			return;
		}
		const postbody = {
			startDate: moment(scheduleForm.startDate)
				.utcOffset("+000", true)
				.format(),
			endDate: moment(scheduleForm.startDate)
				.utcOffset("+000", true)
				.format(),
			timezone: scheduleForm.timezone,
		};
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				schedule: postbody,
			},
		});
		navigation.goBack();
	};

	useEffect(() => {
		setScheduleForm({
			...scheduleForm,
			timezone: postForm.schedule.timezone,
			startDate: postForm.schedule.startDate
				? new Date(postForm.schedule.startDate.split("T")[0])
				: undefined,
		});
	}, []);

	return (
		<View
			style={{
				paddingTop: insets.top,
				flex: 1,
				backgroundColor: "#fff",
				position: "relative",
			}}
		>
			<CustomTopNavBar
				title="Schedule post"
				onClickLeft={() => navigation.goBack()}
				onClickRight={() => {}}
			/>
			<ScrollView style={tw.style("pt-6 px-[18px]")}>
				<ScheduleForm
					data={scheduleForm}
					isSubmitted={isSubmitted}
					onChangeField={onChangeField}
					handleSave={handleSave}
				/>
			</ScrollView>
		</View>
	);
};

export default SchedulePostScreen;
