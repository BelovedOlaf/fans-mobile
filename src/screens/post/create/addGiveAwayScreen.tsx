import { View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CustomTopNavBar from "@components/common/customTopNavBar";
import { AddGiveawayForm } from "@components/posts/share";
import { useAppContext, PostsActionType } from "@context/useAppContext";
import { IGiveaway, IPickerMedia } from "@usertypes/types";
import { PostsNavigationStacks } from "@usertypes/navigations";
import { defaultAddGiveawayFormData } from "@constants/defaultFormData";

const AddGiveAwayScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "Giveaway">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();
	const { state, dispatch } = useAppContext();
	const { postForm } = state.posts;

	const [formData, setFormData] = useState<IGiveaway>(
		defaultAddGiveawayFormData,
	);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChangeForm = (name: string, val: string | IPickerMedia) => {
		setFormData({
			...formData,
			[name]: val,
		});
	};

	const onSave = () => {
		setIsSubmitted(true);
		if (
			formData.prize === "" ||
			formData.winnerCount === "" ||
			formData.timezone === ""
		) {
			return;
		}
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				giveaway: formData,
			},
		});
		navigation.goBack();
	};

	useEffect(() => {
		setFormData(postForm.giveaway);
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
				title="Add giveaway"
				onClickLeft={() => navigation.goBack()}
			/>
			<ScrollView style={{ paddingTop: 24 }}>
				<AddGiveawayForm
					data={formData}
					isSubmitted={isSubmitted}
					onChangeForm={handleChangeForm}
					onSave={onSave}
				/>
			</ScrollView>
		</View>
	);
};

export default AddGiveAwayScreen;
